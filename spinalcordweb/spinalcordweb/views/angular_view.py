import os
from ..cfg import FILE_REP_TMP
from cornice import Service
import jstree
import simplejson as json
#####
# AngularJS - File Tree
#####
tree = Service('tree',
                 '/tree',
                 'generate the json for JSTree')

def path_to_dict(path):
    d = {'text': os.path.basename(path)}
    if os.path.isdir(path):
        d['type'] = "directory"
        d['children'] = [path_to_dict(os.path.join(path,x)) for x in os.listdir(path)]
    else:
        d['type'] = "file"
        d['icon'] = "glyphicon glyphicon-file"
    return d

print

@tree.get()
def tree_get(request):
    return path_to_dict(os.path.abspath(FILE_REP_TMP))