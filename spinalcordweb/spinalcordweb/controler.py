"""
This module is ...
"""
import importlib
import logging
import os
import pkgutil
import psutil
import platform
import queue
import shutil
import subprocess
import signal
import sys
import time
import threading

import simplejson as json
from sqlalchemy.exc import SQLAlchemyError

try:
    from .models import models
    from . import cfg
except SystemError:
    from models import models
    import cfg

# @TODO Write doc
# @TODO register plugins from there spinalcordtoolbox directory

__author__ = 'Pierre-Olivier Quirion <pioliqui@gmail.com>'


class PluginUpdater(object):
    def __init__(self, script_path, config=None, session=None, reload=False):

        if config:
            self.session = config.registry.dbmaker()
        else:
            self.session = session
        # self.script_path = script_path
        # plugin_list = self._load_old_plugins(config)
        plugin_list = self._load_plugins(config, script_path, reload=reload)
        self.rebuild_table(plugin_list)

    def rebuild_table(self, plugin_list):
        """
        Update exiting plugins, add new ones and remove others
        :param plugin_list:
        :return:
        """
        # remove old plugins
        try:
            self.session.query(models.RegisteredTool).delete()
            self.session.add_all(plugin_list)
            self.session.commit()
        except SQLAlchemyError:
            self.session.rollback()


    def _load_plugins(self, config, script_path, reload=False):


        # all_script = os.listdir(script_path)
        if reload or not os.path.isdir(cfg.EXEC_TMP):
            shutil.rmtree(cfg.EXEC_TMP, ignore_errors=True)
            shutil.copytree(script_path, cfg.EXEC_TMP)
            subprocess.call(["/usr/bin/env", "2to3-3.4",  "-w", cfg.EXEC_TMP])

        modules = pkgutil.iter_modules([cfg.EXEC_TMP])
        sys.path.insert(0, "{}/../".format(cfg.EXEC_TMP))
        importlib.__import__(cfg.SCT_TMP_PKG, globals(), locals(), [], 0)
        sct_tools = []
        for loader, mod_name, ispkg in modules:
            module = importlib.import_module('.'+mod_name, package=cfg.SCT_TMP_PKG)
            get_parser = getattr(module, cfg.GET_PARSER, None)
            if get_parser:
                parser = get_parser()
                options = {}
                for o in parser.options.values():
                    if not getattr(o, cfg.OPTION_DEPRECATED, None):
                        options.update({o.name: {k: v for k, v in o.__dict__.items() if k in cfg.OPTION_TRANSMIT}})

                # options.sort(key=lambda e: e[cfg.OPTION_ORDER])
                sct_tools.append(models.RegisteredTool(name=mod_name,
                                                       help_str=parser.usage.description,
                                                       options=options))

        return sct_tools



    def _load_old_plugins(self, config):

        path = cfg.OLD_TYPE_JSON
        list_path = os.path.join(path, 'liste_scripts.json')
        config_path = os.path.join(path, 'config')
        with open(list_path) as fp:
            tool_list = json.load(fp)

        rtools = []
        for script in tool_list:
            if script['activateScript']:
                name = script['title']
                help_str = 'no help yet'
                cfg_path = os.path.join(config_path, name + '_config.json')
                if not os.path.isfile(cfg_path):
                    continue
                with open(cfg_path) as fp:
                    options = json.load(fp)[0]
                rtools.append(models.RegisteredTool(name=name, help_str=help_str, options=options))

        return rtools


def get_platform():
    """
    TODO ADD windows support
    :return: platform name
    """
    if "linux" in platform.platform().lower():
        return "linux"
    else:
        return "osx"

class ToolboxRunner(object):
    """
    Class that can be used to execute script
    TODO write a parent class that will be used to build runner for other software (niak)
    """

    def __init__(self, register_tool: models.RegisteredTool,
                 bin_dir: str, input_file_path: str, output_dir: str):

        self.rt = register_tool

        self.cancel = False
        self._activity = {}
        self._timeout_once_done = cfg.TIMEOUT

        self.fill_cmd_template = {
            cfg.INPUT_FILE_TAG: input_file_path,
            cfg.EXEC_DIR_TAG: bin_dir,
            cfg.OUTPUT_DIR_TAG: output_dir}



    def toolbox_env(self):
        """
        @TODO could be worth it to clean the env var to be minimal
        :return:
        """

        SCT_DIR= cfg.SPINALCORDTOOLBOX

        PATH=[cfg.SPINALCORD_BIN]

        PATH.append("{}/{}".format(cfg.SPINALCORD_BIN,get_platform()))

        PYTHONPATH="{}/scripts".format(cfg.SPINALCORDTOOLBOX)

        all_env = os.environ

        all_env["PATH"] = ":".join(PATH) + ":" + all_env["PATH"]
        all_env["PYTHONPATH"] = PYTHONPATH
        all_env["SCT_DIR"] = SCT_DIR

        return all_env


    def run(self):
        """
        Running mechanism that return stderr and stdout
        :return:
        """

        cmd = self.rt.cmd.format(**self.fill_cmd_template)
        logging.info('Executing {0}'.format(cmd))

        child = subprocess.Popen(cmd.split(' '),
                                 stderr=subprocess.PIPE,
                                 stdin=subprocess.PIPE,
                                 stdout=subprocess.PIPE,
                                 bufsize=1,
                                 env=self.toolbox_env())

        completion_time = 0
        process_is_done = False
        stdout_is_close = False
        interrupt_the_process = False

        # (stdout, stderr) = child.communicate()

        stdout_queue = queue.Queue()
        stdout_monitor_thread = threading.Thread(
            target=self.read_from_stream,
            args=(child.stdout, self._activity, stdout_queue, True),
            )

        stdout_monitor_thread.daemon = True
        stdout_monitor_thread.start()

        stderr_monitor_thread = threading.Thread(
            target=self.read_from_stream,
            args=(child.stderr, self._activity, None, True),
            )
        stderr_monitor_thread.daemon = True
        stderr_monitor_thread.start()

        stdout_lines = []
        while not (process_is_done or stdout_is_close):

            now = time.time()

            # We need to cancel the processing!
            if self.cancel:
                logging.info('The execution needs to be stopped.')
                break

            # If the subprocess is dead/done, we exit the loop.
            if child.poll() is not None:
                logging.info("Subprocess is done.")
                process_is_done = True

            # Once the process is done, we keep
            # receiving standard out/err up until we reach the done_timeout.
            if (completion_time > 0) and (self.timeout_once_done > 0) and (now - completion_time > self.timeout_once_done):
                logging.info("Done-timeout reached.")
                break

            # TODO Check if that is really necessary
            # If there is nothing received from child process, either from the
            # standard output or the standard error streams, past a given amount
            # of time, we assume that the sidekick is done/dead.
            # if (self.inactivity_timeout > 0) and (now - self._activity['last'] > self.inactivity_timeout):
            #     logging.info("Inactivity-timeout reached.")
            #     break

            # Handle the standard output from the child process
            if child.stdout:
                while not stdout_queue.empty():
                    stdout_lines.append(stdout_queue.get_nowait())
            else:
                interrupt_the_process = False
                stdout_is_close = True
                process_is_done = True

            # Start the countdown for the done_timeout
            if process_is_done and not completion_time:
                completion_time = now

            # Sleep a bit to avoid using too much CPU while waiting for execution to be done.
            time.sleep(cfg.PROCESS_LOOP_SLEEP)

        return_code = child.poll()

        if return_code is None:

            if interrupt_the_process:
                logging.info("The sidekick is running (PID {0}). Sending it an interrupt signal..."
                             .format(child.pid))
                child.send_signal(signal.SIGTERM)


            # Let the subprocess die peacefully...
            time_to_wait = cfg.PEACEFUL_DEAD_CLOCK
            while time_to_wait > 0 and child.poll() is None:
                time.sleep(0.1)
                time_to_wait -= 0.1

            # Force the process to die if it's still running.
            return_code = child.poll()
            if return_code is None:
                logging.info("The sidekick is still running (PID {}). Sending it a kill signal..."
                             .format(child.pid))
                self.force_stop(child)

        return_code = child.poll()
        if return_code == 0:
            logging.error("The process has exited with a non-zero return code: {}".format(return_code))
        else:
            logging.info("The process was completed and returned 0 (success)")

        return return_code


    @staticmethod
    def read_from_stream(stream, activity, std_queue=None, echo=False):
        for line in iter(stream.readline, b''):
            if std_queue:
                std_queue.put(line)
            activity['last'] = time.time()
            if echo:
                sys.stderr.write(line.decode('utf-8'))
        stream.close()

    @staticmethod
    def force_stop(sub_proc, including_parent=True):
        """
        Stops the execution of process and of its children
        :param sub_proc a process with a pid attribute:
        :param including_parent:
        :return:
        """
        parent = psutil.Process(sub_proc.pid)
        logging.info("Killing the sub-processes using psutil.")
        for child in parent.children(recursive=True):
            child.kill()
        if including_parent:
            parent.kill()


class LogSct:

    all_my_log = {}

    @classmethod
    def add_new(cls,queue):
        pass
        cls.all_my_log[id(queue)] = queue

        return

    def getlog(self, queue_id):

        return self.all_my_log[queue_id].get()



class SctTool(object):

    def __init__(self, name, options, help_str, input_path, output_path):
        """ Has the same variable than the models.models.RegisteredTool

        @TODO use input and output from __init__, not  cfg.INPUT_FILE_TAG
        and  cfg.OUTPUT_DIR_TAG
        :param name:
        :param options:
        :param help_str:
        """

        self.name = name
        self.options = options
        self.help_str = help_str


    def _parse_options(self, options, name):
        """

        :param options:
        :return:
        """
        ret_dict = {}
        for o in options.values():
            if o['name'] == '-i':
                value = '{{{}}}'.format(cfg.INPUT_FILE_TAG)
            elif o['name'] == '-o':
                value = '{{{}}}'.format(cfg.OUTPUT_DIR_TAG)
            else:
                value = o.get("value") if o.get("value") else o.get("default_value")

            if value:
                ret_dict[o["name"]] = value
            elif o["mandatory"]:
                raise IOError("option {} in {} is mandatory but not provided".format(o["name"], name))

        return ret_dict

    @property
    def cmd(self):
        """
        :return:
        string of the form
        "{EXEC_DIR_TAG}/exec.ext -i {INPUT_FILE_TAG} -o {OUTPUT_DIR_TAG} [--option other_options ...] "

        """
        opt = self._parse_options(self.options)

        opt = ' '. join(['{} {}'.format(k, v)
                        for k, v in opt.items()])


        return "{{{0}}}/{1} {2}".format(cfg.EXEC_DIR_TAG, self.name, opt)
        # return "echo 33 "


if __name__ == "__main__":
    from sqlalchemy import create_engine
    from sqlalchemy.orm import sessionmaker
    import json

    logging.basicConfig(level=logging.DEBUG)

    # engine = create_engine("sqlite:////home/pquirion/travail/neuropoly/spinalcordtoolbox_web/spinalcordweb/db.sqlite")
    engine = create_engine("sqlite:////home/poquirion/neuropoly/spinalcordtoolbox_web/spinalcordweb/db.sqlite")
    Session = sessionmaker(bind=engine)
    session = Session()

    # pu = PluginUpdater(session=session, script_path="../../../spinalcordtoolbox/scripts", reload=False)
    pu = PluginUpdater(session=session, script_path="/home/poquirion/neuropoly/spinalcordtoolbox/scripts", reload=True)

    # pu._load_plugins(None, "/home/poquirion/neuropoly/spinalcordtoolbox/scripts")



    rt = session.query(models.RegisteredTool).filter(models.RegisteredTool.name == 'sct_propseg').first()

    plugins_path = cfg.SPINALCORD_BIN

    tbr = ToolboxRunner(
        rt, plugins_path, '{}/t2.nii'.format(cfg.INPUT_PATH), cfg.OUTPUT_PATH)

    tbr.run()
