from pyramid.view import view_config
import os
import uuid
import shutil
from pyramid.response import Response
from ..models import models
from ..forms import form_render
from ..cfg import FILE_REP_TMP

@view_config(route_name='upload',
             renderer='upload.mako',
             permission='user')
def upload(request):
    try:
        filename = request.POST['file'].filename
        print (filename)
    finally:
        return {}

@view_config(route_name='upload_nii',
             request_method='POST',
             renderer='brainbrowser.mako',
             permission='user')
def upload_nii(request):
    userid = request.unauthenticated_userid #return the user.id without doing again the identification process

    filename = request.POST['files-nii'].filename
    # ``input_file`` contains the actual file data which needs to be
    # stored somewhere.
    input_file = request.POST['files-nii'].file

    # Note that we are generating our own filename instead of trusting
    # the incoming filename since that might result in insecure paths.
    # Please note that in a real application you would not use /tmp,
    # and if you write to an untrusted location you will need to do
    # some extra work to prevent symlink attacks.
    #nii_filename = '%s.nii' % uuid.uuid4()
    try:
        os.mkdir(os.path.join(FILE_REP_TMP,str(userid)))
    except FileExistsError:
        print ('The folder already exist.')

    file_path = os.path.join(os.path.join(FILE_REP_TMP,str(userid)), filename)

    # We first write to a temporary file to prevent incomplete files from
    # being used.
    temp_file_path = file_path + '~'

    # Finally write the data to a temporary file
    input_file.seek(0)
    with open(temp_file_path, 'wb') as output_file:
        shutil.copyfileobj(input_file, output_file)

    # Now that we know the file has been fully saved to disk move it into place.
    os.rename(temp_file_path, file_path)
    file_path_local = 'static/tmp/'+str(userid)+'/'+ filename #Dirty but will be deleted soon

    session = request.db
    u = models.File(filename = os.path.splitext(filename)[0],
                    serverpath = file_path_local,
                    localpath=file_path_local,
                    type = os.path.splitext(filename)[1],
                    user_id = userid
)
    session.add(u)
    session.commit()
    return {'form':form_render,'file_path':file_path_local}
