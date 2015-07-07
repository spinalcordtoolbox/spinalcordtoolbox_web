from pyramid.view import view_config

@view_config(route_name='signin', renderer='signin.mako')
def signin(request):
    return {}

@view_config(route_name='signup', renderer='signup.mako')
def signup(request):
    return {}