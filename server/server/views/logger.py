__author__ = 'willispinaud'

from cornice import Service
import string
import random


logger = Service('logger',
                 '/logger',
                 'Get the running SCT log and return it to the client')

@logger.get(renderer="string")
def logger_get(request):
    return ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(10))
