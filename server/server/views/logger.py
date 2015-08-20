__author__ = 'willispinaud'

from cornice import Service
import string
from ..controler import SCTLog

logger = Service('logger',
                 '/logger',
                 'Get the running SCT log and return it to the client')

@logger.get()
def logger_get(request):
    uid = request.GET["uid"]
    info = SCTLog(uid)

    if request.GET["old"]:
        log = info.old_log()
    else:
        log = info.log_tail()
    return log
