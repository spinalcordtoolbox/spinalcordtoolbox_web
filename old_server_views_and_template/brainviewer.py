from deform import ValidationFailure
from pyramid.response import Response
from pyramid.view import view_config
from ..forms import RegisterForm, form_render
from deform_bootstrap import Form

@view_config(route_name='brainbrowser', renderer='brainbrowser.mako')
def brainbrowser(request):
    return {'form':form_render, "file_path":"static/js/viewer/models/t2.nii"}

'''
BrainBrowser view:
GET: open the viewer with a volume by default,
POST: open (or upload the file into the user directory) and add this file to the layer explorer,
DELETE: remove a file from the layer explorer,
'''