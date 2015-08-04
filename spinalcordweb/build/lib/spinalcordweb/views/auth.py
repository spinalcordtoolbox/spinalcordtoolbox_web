from deform import ValidationFailure
import deform
from pyramid.view import view_config, forbidden_view_config
from ..forms import SigninForm, RegisterForm
from pyramid.httpexceptions import HTTPFound
from pyramid.security import remember, forget
from ..models.models import User
from deform_bootstrap import Form

@view_config(route_name='signin', renderer='signin.mako')
def signin(request):
    schema = SigninForm()
    submit = deform.Button(name='Sign-in', css_class='btn btn-action text-right signin')
    myform = Form(schema, buttons=(submit,))

    if 'Sign-in' in request.POST:
        controls = request.POST.items()
        try:
            appstruct = myform.validate(controls)
        except ValidationFailure as e:
            return {'form':e.render(), 'values': False}
        # Process the valid form data, do some work
        email = appstruct['email']
        session = request.db
        if email:
            user = User.by_mail(email, session)
            if user and user.verify_password(appstruct['password']):
                headers = remember(request, user.id)
            else:
                headers = forget(request)
        else:
            headers = forget(request)
        return HTTPFound(location=request.route_url('myfiles'),
                         headers=headers)
    # We are a GET not a POST
    return {"form": myform.render(), "values": None}


@view_config(route_name='signup',
             renderer='signup.mako')
def signup(request):
    schema = RegisterForm()
    myform = Form(schema, buttons=('Register',))

    if 'Register' in request.POST:
        controls = request.POST.items()
        try:
            appstruct = myform.validate(controls)
        except ValidationFailure as e:
            return {'form':e.render(), 'values': False}
        # Process the valid form data, do some work
        session = request.db
        new_user = User(first_name=appstruct['first_name'],
                        last_name=appstruct['last_name'],
                        email=appstruct['email'],
                        password=appstruct['password'])
        session.add(new_user)
        session.commit()
        return HTTPFound(location=request.route_url('signin'))

    # We are a GET not a POST
    return {"form": myform.render(), "values": None}

@view_config(route_name='signout', renderer='string')
def sign_out(request):
    headers = forget(request)
    return HTTPFound(location=request.route_url('home'),
                     headers=headers)\
