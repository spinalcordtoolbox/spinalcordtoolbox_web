from pyramid.view import view_config
from .. import resource
from .. import schemas
from ..models import models
import colander
from pyramid.httpexceptions import exception_response, HTTPFound
from pyramid.view import notfound_view_config, forbidden_view_config
from ..mailers import send_email

from ..cfg import FILE_REP_TMP
import os

#Just some default route doing nothing
@view_config(route_name='app', renderer='app.mako')
@view_config(route_name='home', renderer='index.mako')
@view_config(route_name='contact', renderer='contact.mako')
def default(context,request):
    return {}

@view_config(context=colander.Invalid, renderer="json")
def validation_error_view(exc, request):
    request.response.status_int = 400
    return exc.asdict()

########
# get plugins get and execute
########

@view_config(route_name="api",
             name='all_executable',
             renderer='json')
def executable_ctrl(request):
    session = request.db
    return [i[0] for i in session.query(models.RegisteredTool.name).all()]

######
# Exception views
######
# @notfound_view_config()
# def notfound(request):
#     return HTTPFound(location='/404')
# @view_config(route_name='404', renderer='exceptions/404.mako')
# def notFoundRender(context,request):
#     return {}
# @forbidden_view_config()
# def forbidden(request):
#     return HTTPFound(location='/403')
# @view_config(route_name='403', renderer='exceptions/403.mako')
# def forbiddenRender(context,request):
#     return {}


#####
# AJAX TEST
#####
@view_config(route_name='generate_ajax_data', renderer='json')
def my_ajax_view(request):
    return {'message': "yo mamma's so classless she could be a marxist utopia hehe"}

@view_config(route_name='homee', renderer='mytemplate.mako')
def my_view(request):
    return {'project': 'greetings ajax'}
