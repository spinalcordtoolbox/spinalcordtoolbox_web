# PROJECT_ROOT = '/Users/willispinaud/Dropbox/Amerique/Montreal/angular-python-spinalcord/spinalcordweb/'
#PROJECT_ROOT = '/Users/willispinaud/Dropbox/Amerique/Montreal/spinalcordtoolbox_web/server/'
PROJECT_ROOT = '/home/poquirion/neuropoly/spinalcordtoolbox_web/server/'

# TOOLBOX PATH
#SPINALCORDTOOLBOX = "/Users/willispinaud/Dropbox/Amerique/Montreal/spinalcordtoolbox"
SPINALCORDTOOLBOX = "/home/poquirion/neuropoly/spinalcordtoolbox"
SPINALCORD_BIN = "{}/bin".format(SPINALCORDTOOLBOX)

# Executable/plugins
# SCT_TMP_PKG = "sct_scripts" # should be final name
SCT_PYTHONPATH = ""
SCT_TMP_PKG = "scripts" # DEBUG !!!
EXEC_TMP = PROJECT_ROOT+'../{}'.format(SCT_TMP_PKG)
EXEC_PATH = PROJECT_ROOT+'../../spinalcordtoolbox/scripts'
PYHTON_NAME = "python2.7 "


# Where input files are stored
FILE_REP_TMP = PROJECT_ROOT+'server/static/tmp/'
# INPUT_PATH = '/toolbox/input'
#INPUT_PATH = '/Users/willispinaud/Dropbox/Amerique/Montreal/spinalcordtoolbox_web/server/server/static/js/viewer/models'
# Where results are stored
#OUTPUT_PATH = '/Users/willispinaud/Dropbox/Amerique/Montreal/spinalcordtoolbox_web/server/server/static/tmp/willis'


PROCESS_LOOP_SLEEP = 0.05

TIMEOUT = 60

PEACEFUL_DEAD_CLOCK = 5


INPUT_FILE_TAG = 'INPUT_FILE'
OUTPUT_DIR_TAG = 'OUTPUT_FILE'
EXEC_DIR_TAG = 'EXEC_DIR'


GET_PARSER = 'get_parser'

PATHFSLBIN = '/usr/local/fsl/bin/'

OPTION_TRANSMIT = \
    ("default_value",
     "description",
     "help",
     "mandatory",
     "name",
     "type_value",
     "order",
     "example")

OPTION_DEPRECATED = "deprecated"
OPTION_ORDER = "order"
