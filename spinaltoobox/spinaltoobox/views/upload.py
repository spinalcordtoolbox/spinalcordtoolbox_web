from pyramid.view import view_config

@view_config(route_name='upload',
             renderer='upload.mako')
def upload(request):
        return {}