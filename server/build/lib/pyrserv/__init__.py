from pyramid.config import Configurator


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    config.include('pyramid_chameleon')
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/home')
    config.scan()

    # Added these lines
    ## Pull in Angular App as python package, must have includeme() in __init__.py
    config.include('app')
    ## These pull along with static.py mount the angular app at /
    config.add_route('catchall_static', '/*subpath')
    config.add_view('server.static.static_view', route_name='catchall_static')

    return config.make_wsgi_app()
