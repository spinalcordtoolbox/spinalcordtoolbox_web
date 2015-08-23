__author__ = 'willispinaud'

from cornice import Service
from ..controler import SCTLog


import string
from ..controler import SCTLog

logger = Service('logger',
                 '/logger',
                 'Get the running SCT log and return it to the client')

@logger.get()
def logger_get(request):
    '''
    :param request.uid: The user uid, it's used to find the process launched by the user
    :return: one line of the log
    '''
    test = SCTLog(1)

    return test.log_tail()
    uid = request.GET["uid"]
    info = SCTLog(uid)

    if request.GET["old"]:
        log = info.old_log()
    else:
        log = info.log_tail()
    return log
