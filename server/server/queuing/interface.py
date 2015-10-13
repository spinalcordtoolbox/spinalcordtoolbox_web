"""
This module is ...
"""
# @TODO Write doc!
__author__ = 'Pierre-Olivier Quirion <pioliqui@gmail.com>'

import logging
import os
import subprocess

import redis

# REDIS KEY

# The last UID that was used
UID = "UID"

# Process status
READY = "STATUS:READY"
FAILED = "STATUS:FAILED"
PROCESSING = "STATUS:PROCESSING"
WAITING = "STATUS:WAITING"
DONE = "STATUS:DONE"

# Process Info
STORE = "PROCESS:STORE"  # all that is needed for execution
STATUS = "PROCESS:STATUS"  # all that is needed to track the status of a process
LOG = "PROCESS:LOG"  # log info
LOG = "PROCESS:LOG:PUBSUB"  # log info


class Queue(object):

    # The client connection
    _CLI = None

    def __init__(self):
        pass

    @property
    def cli(self):
        if self._CLI is None:
            self._CLI = redis.Redis(host='localhost', port=44444, db=0)
        return self._CLI

    def add_process(self, new_process, priority=None):
        """
        Add a process to the queue
        The process will be in waiting mode by default
        """
        if not isinstance(new_process, Process):
            message = "{} is not a {}".format(new_process, type(Process()))
            raise TypeError(message)

        if priority is None:
            priority = 0

        # get the
        uid = self.cli.incr(UID)
        logging.info("adding {} to queue as process {}".format(new_process, uid))

        pipe = self.cli.pipeline()
        self.cli.zadd(READY, priority, uid)
        self.cli.hset(STORE, uid, new_process.serialize())
        self.cli.sadd(STORE, uid, new_process.dependency_graph())


    def get_process(self):
        """
        Get process to be executed
        Get the oldest process in the queue
        """
        pass

    def failed(self):
        """
        Return all failed process
        """
        pass

    def ready(self):
        pass

    def done(self):
        pass

    def waiting(self):
        pass

class Process(object):
    """
        Process should be alone or be part of a pipeline
        For now they are all alone and do not have dependencies
    """

    def __init__(self, cmdline=None, name=None, uid=None):

        self.name = name
        self.uid = uid

    def __repr__(self):
        return "{}:{}:{}".format(self.name, self.uid, type(self))

    def serialize(self):
        """
            Should be able to serialize basic python type and let got objects
        """
        pass

    def deserialize(self):
        """
            Should be able to serialize basic python type and let got objects
        """
        pass


    def dependency_graph(self):
        pass

    def run(self):
        """
        This is meant to be overwritten by the specific execution class
        """
        pass


class CmdLineProcess(Process):

    def __init__(self, cmdline, name=None, env=None, cwd=None, *args, **kwargs):

        if name is None:
            name = os.path.basename(cmdline.split()[0])
        self.cmdline = cmdline
        self.env = env
        self.cwd = cwd
        super().__init__(name=name, *args, **kwargs)


    def run(self):
        """
        Run the command and lock.
        """
        if isinstance(self.cmdline, str):
            cmdline = self.cmdline.split()

        return subprocess.call(cmdline, env=self.env, cwd=self.cwd)


def test_process(cmd):
    process = CmdLineProcess(cmd, 'Test job')

    # a = process.run()

    return process

def test_add_queue(process):

    myq = Queue()

    myq.add_process(process)


def test_get_queue():
    pass
    # return process

def test_compare_process(p1, p2):
    pass

if __name__ == "__main__":

    process1 = test_process("env -0")
    test_add_queue(process1)
    # process2 = test_get_queue()
    # test_compare_process(process1, process2)