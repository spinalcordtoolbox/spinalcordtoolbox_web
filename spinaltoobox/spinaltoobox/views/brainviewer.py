from pyramid.response import Response
from pyramid.view import view_config

@view_config(route_name='brainbrowser', renderer='brainbrowser.mako')
def brainbrowser(request):
    return {}