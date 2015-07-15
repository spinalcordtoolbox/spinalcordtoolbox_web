from pyramid.view import view_config
from spinaltoobox.models import models
from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker
import os
from ..forms import form_render
@view_config(route_name='myfiles', renderer='myfiles.mako',
             permission='user')
def list_files(context, request):
    session = request.db
    userid = request.unauthenticated_userid #return the user.id without doing again the identification process
    return {'user':session.query(models.File).filter(models.File.user_id==userid).all()}


@view_config(route_name='displayFile', renderer='brainbrowser.mako',request_method='POST',
             permission='user')
def display_file(context,request):
    return {'form':form_render,'file_path':request.POST['go_viewer']}

@view_config(route_name='deleteFile', renderer='myfiles.mako',request_method='POST',
             permission='user')
def delete_file(context,request):
    #request a new session
    session = request.db
    userid = request.unauthenticated_userid #return the user.id without doing again the identification process
    #Find the file in the database
    file_to_delete = session.query(models.File).filter_by(id=request.POST['delete_file']).first()

    #Delete the file on the server
    # @TODO Write a function to remove the file on the server
    #os.remove(os.path.abspath(file_to_delete.serverpath))

    #Delete the entry
    session.delete(file_to_delete)
    session.commit()
    return {'user':session.query(models.File).filter(models.File.user_id==userid).all()}