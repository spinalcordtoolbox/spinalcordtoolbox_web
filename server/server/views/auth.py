from cornice.resource import resource, view
from cornice import Service
from pyramid_mailer import get_mailer
from pyramid_mailer.message import Message
import transaction
import datetime
from sqlalchemy.exc import SQLAlchemyError
from ..token import generate_confirmation_token, confirm_token

from ..models import models

login = Service('login','/login', 'Identify a user on the website')
register = Service('register', '/register', 'add a new user into the db')
confirm = Service('confirm', '/confirm/{token}', 'confirm a user after registration.')

#The model for this user registration is models.local_user
@register.post()
def register_post(request):
    email = request.json_body['email']
    password = request.json_body['password']
    session = request.db
    new_user = models.local_user(
        email=email,
        password=password,
        confirmed=False
    )
    try:
        session.add(new_user)
        session.commit()
    except Exception:
        return {"error":"User already exists"}


    #Add mailler
    mailer = get_mailer(request)
    token = generate_confirmation_token(email)
    decryt = confirm_token(token)


    confirm_url= request.resource_url(request.context, request, 'confirm', query={'token':token})


    message = Message(subject="hello world",
                  sender="isctoolbox@gmail.com",
                  recipients=[email],
                  body="<p>Welcome! Thanks for signing up. Please follow this link to activate your account:</p>\n<p>"
                       +"<a href='"+confirm_url+"'>"+decryt+"</a></p><br>\n<p>Cheers!</p>"
                      )
    mailer.send(message)
    try:
        transaction.commit()
    except:
        pass

    return {"ok":"New user added to the db"}

@confirm.get()
def confirm_get(request):
    token = request.GET['token']
    email = confirm_token(token)
    session = request.db
    try:
        user = models.local_user.by_mail(email, session)
        user.confirmed = True
        user.confirmed_on = datetime.datetime.now
        session.commit()
        return {'ok':'You have confirmed your account. Thanks!'}
    except:
        return {'error':'Wrong token'}


@login.post()
def login_post(request):
    email = request.json_body['email']
    password = request.json_body['password']

    session = request.db
    user = models.local_user.by_mail(email, session)

    if user and user.verify_password(password):
        return {"ok":"Good password","uid":user.id}
    else:
        return {"error":"Wrong Password or User doesn't exist, please register"}






'''RESTful users ressources'''

@resource(collection_path='/users', path='/users/{user_id}')
class User(object):

    def __init__(self, request):
        self.request = request

    @view()
    def collection_get(self):
        session = self.request.db
        all_user = session.query(models.User).all()
        return [e.serialize() for e in all_user]

    @view()
    def get(self):
        userid = self.request.matchdict['user_id']
        session = self.request.db
        user_selected = session.query(models.User).filter_by(id=userid).first()
        return {'user':user_selected.serialize()}

    @view()
    def delete(self):
        userid = self.request.matchdict['user_id']
        session = self.request.db
        selected_user = session.query(models.User).filter_by(id=userid).first()
        session.delete(selected_user)
        session.commit()
        all_user = session.query(models.User).all()
        return [e.serialize() for e in all_user]

# foobar = Service(name="foobar", path="/foobar")
# @foobar.post(schema=RegisterForm,
#              renderer = 'signup.mako')
# def foobar_post(request):
#     # Process the valid form data, do some work
#     session = request.db
#     new_user = User(first_name=request.validated['first_name'],
#                     last_name=request.validated['last_name'],
#                     email=request.validated['email'],
#                     password=request.validated['password'])
#     session.add(new_user)
#     session.commit()
#     return HTTPFound(location=request.route_url('signin'))
#
#
# @foobar.get(renderer = 'signup.mako')
# def foobar_get(request):
#     schema = RegisterForm()
#     myform = Form(schema, buttons=('Register',))
#     return {"form": myform.render(), "values": None}
#
# @view_config(route_name='signin', renderer='signin.mako')
# def signin(request):
#     schema = SigninForm()
#     submit = deform.Button(name='Sign-in', css_class='btn btn-action text-right signin')
#     myform = Form(schema, buttons=(submit,))
#
#     if 'Sign-in' in request.POST:
#         controls = request.POST.items()
#         try:
#             appstruct = myform.validate(controls)
#         except ValidationFailure as e:
#             return {'form':e.render(), 'values': False}
#         # Process the valid form data, do some work
#         email = appstruct['email']
#         session = request.db
#         if email:
#             user = models.User.by_mail(email, session)
#             if user and user.verify_password(appstruct['password']):
#                 headers = remember(request, user.id)
#             else:
#                 headers = forget(request)
#         else:
#             headers = forget(request)
#         return HTTPFound(location=request.route_url('myfiles'),
#                          headers=headers)
#     # We are a GET not a POST
#     return {"form": myform.render(), "values": None}
#
# @view_config(route_name='signup',
#              renderer='signup.mako')
# def signup(request):
#     schema = RegisterForm()
#     myform = Form(schema, buttons=('Register',))
#
#     if 'Register' in request.POST:
#         controls = request.POST.items()
#         try:
#             appstruct = myform.validate(controls)
#         except ValidationFailure as e:
#             return {'form':e.render(), 'values': False}
#         # Process the valid form data, do some work
#         session = request.db
#         new_user = User(first_name=appstruct['first_name'],
#                         last_name=appstruct['last_name'],
#                         email=appstruct['email'],
#                         password=appstruct['password'])
#         session.add(new_user)
#         session.commit()
#         return HTTPFound(location=request.route_url('signin'))
#
#     # We are a GET not a POST
#     return {"form": myform.render(), "values": None}

# @view_config(route_name='signout', renderer='string')
# def sign_out(request):
#     headers = forget(request)
#     return HTTPFound(location=request.route_url('home'),
#                      headers=headers)\