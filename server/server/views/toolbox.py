__author__ = 'willispinaud'

from pyramid.view import view_config
from ..models import models
from cornice.resource import resource, view
from cornice import Service
from .. import cfg
from ..controler import ToolboxRunner, PluginUpdater
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import jsonpickle
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
import json
import pickle

sctoolbox = Service('sctoolbox',
                 '/sctoolbox',
                 'communication with the toolbox')

@sctoolbox.get(renderer='string')
def sctoolbox_get(request):
    '''
    :param request:
    :return: Return a list of all the sctools which have a get_parser
    '''
    logging.basicConfig(level=logging.DEBUG)
    session = request.db
    #PluginUpdater(session=session, script_path="/Users/willispinaud/Dropbox/Amerique/Montreal/spinalcordtoolbox/scripts", reload=True)
    rt = session.query(models.RegisteredTool).all()
    rt_json = jsonpickle.dumps(rt)
    return rt_json

@sctoolbox.post()
def sctoolbox_post(request):
    '''
    :param request.inputs: I guess it's a useless field
    :param request.args: Args selected by the usergit pull
    :param request.tool_name: the tool selected by the user
    :return:
    '''

    session=request.db

    plugins_path = cfg.SPINALCORD_BIN

    inputs = request.json_body['inputs']
    options = request.json_body['args']
    tool_name = request.json_body['tool_name']

    rt = session.query(models.RegisteredTool).filter(models.RegisteredTool.name == tool_name).first()

    #update the RT object with user value
    for o in rt.options.values():
        for i in options:
            if o.get("order") == int(i):
                o["value"] = options[i]

    tbr = ToolboxRunner(
        rt,
        plugins_path,
        1
    )

    tbr.run()
    return {}






# pu._load_plugins(None, "/home/poquirion/neuropoly/spinalcordtoolbox/scripts")





