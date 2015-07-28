from deform import ValidationFailure
from pyramid.response import Response
from pyramid.view import view_config
from ..forms import RegisterForm, form_render
from deform_bootstrap import Form

@view_config(route_name='brainbrowser', renderer='brainbrowser.mako')
def brainbrowser(request):
    return {'form':form_render, "file_path":"static/js/viewer/models/t2.nii"}
