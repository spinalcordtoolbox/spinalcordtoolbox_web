from pyramid.view import view_config
from .. import resource
from .. import schemas
from ..models import models
import colander
from pyramid.httpexceptions import exception_response, HTTPFound

from ..mailers import send_email

@view_config(route_name='home', renderer='index.mako')
@view_config(route_name='contact', renderer='contact.mako')
def default(context,request):
    return {}

from pyramid.view import notfound_view_config, forbidden_view_config
from pyramid.response import Response


@view_config(route_name="api",
             context=resource.UserContainer,
             name="register",
             renderer="json",
             request_method="POST")
def register_view(context, request):
    context.register(schemas.RegisterSchema().deserialize(request.POST)["email"])
    return {}


@view_config(route_name="api",
             context=resource.UserContainer,
             name="activate",
             renderer="json",
             request_method="POST")
def activate_view(context, request):
    data = schemas.ActivateSchema().deserialize(request.POST)
    new_user = context.activate(**data)
    return dict(email=new_user.email, id=new_user.id)



@view_config(route_name="api",
             context=resource.UserContainer,
             name="forgot",
             renderer="json",
             request_method="POST")
def forgot_view(context, request):
    data = schemas.ForgotSchema().deserialize(request.POST)
    context.request_reset(data["email"])
    return {}


@view_config(route_name="api",
             context=resource.UserContainer,
             name="reset",
             renderer="json",
             request_method="POST")
def reset_view(context, request):
    data = schemas.ResetSchema().deserialize(request.POST)
    user = context.do_reset(**data)
    return dict(email=user.email, id=user.id)

@view_config(route_name="api",
             context=resource.APIRoot,
             name="login",
             renderer="json",
             request_method="POST")
def login_view(context, request):
    context["user"].login(**schemas.LoginSchema().deserialize(request.POST))
    return {}


@view_config(route_name="api",
             context=resource.APIRoot,
             name="logout",
             renderer="json",
             request_method="POST")
def logout_view(context, request):
    context["user"].logout()
    return {}


@view_config(route_name="api",
             context=resource.UserContainer,
             name="me",
             renderer="json")
def me_view(context, request):
    u = request.authenticated_user()
    if u:
        return dict(email=u.email, first_name=u.first_name, last_name=u.last_name, id=u.id)
    else:
        raise exception_response(403)


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
@notfound_view_config()
def notfound(request):
    return HTTPFound(location='/404')
@view_config(route_name='404', renderer='exceptions/404.mako')
def notFoundRender(context,request):
    return {}
@forbidden_view_config()
def forbidden(request):
    return HTTPFound(location='/403')
@view_config(route_name='403', renderer='exceptions/403.mako')
def forbiddenRender(context,request):
    return {}