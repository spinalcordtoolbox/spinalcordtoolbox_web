from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from spinaltoobox.models.models import MyModel

from .models import (
    DBSession,
    Base,
    )


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine
    config = Configurator(settings=settings)
    config.include('pyramid_mako')
    config.include('pyramid_chameleon')
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_route('myfiles','/myfiles')
    config.add_route('brainbrowser','/viewer')
    config.add_route('upload','/upload')
    config.add_route('contact','/contact')
    config.add_route('signin','/signin')
    config.add_route('toolbox','/toolbox')
    config.add_route('signup','/signup')
    config.add_route('auth', '/sign/{action}')
    config.scan()
    return config.make_wsgi_app()
