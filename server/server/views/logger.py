__author__ = 'willispinaud'

from cornice import Service
<<<<<<< HEAD
from ..controler import SCTLog


=======
import string
from ..controler import SCTLog
>>>>>>> origin/test_merge

logger = Service('logger',
                 '/logger',
                 'Get the running SCT log and return it to the client')

@logger.get()
def logger_get(request):
<<<<<<< HEAD
    test = SCTLog(1)

    return test.log_tail()
=======
    uid = request.GET["uid"]
    info = SCTLog(uid)

    if request.GET["old"]:
        log = info.old_log()
    else:
        log = info.log_tail()
    return log
>>>>>>> origin/test_merge
