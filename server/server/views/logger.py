__author__ = 'willispinaud'

from cornice import Service
from ..controler import SCTLog



logger = Service('logger',
                 '/logger',
                 'Get the running SCT log and return it to the client')

@logger.get(renderer="string")
def logger_get(request):
    test = SCTLog(1)

    return test.log_tail()
