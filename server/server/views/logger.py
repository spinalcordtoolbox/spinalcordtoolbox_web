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

    uid = request.headers.get('uid')
    # test = SCTLog(uid)

    # return test.log_tail()
    info = SCTLog(1)
    log = info.log_tail(maxline=100)
    return log
    if request.GET["old"]:
        log = info.old_log()
    else:
        log = info.log_tail()
    return log
