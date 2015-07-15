from pyramid.response import Response
from pyramid.view import view_config
from .forms import form_render

@view_config(route_name='brainbrowser', renderer='brainbrowser.mako')
def brainbrowser(request):
    return {'form':form_render, "file_path":"static/js/viewer/models/t2.nii"}