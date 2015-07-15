import datetime
import os
import simplejson as json
from uuid import uuid4

from sqlalchemy import Column, Integer, UnicodeText, Unicode, DateTime, ForeignKey, Float
from sqlalchemy.ext.declarative import declared_attr, declarative_base
from sqlalchemy.ext.mutable import Mutable
from sqlalchemy.orm import relationship, backref
from sqlalchemy.types import TypeDecorator, VARCHAR
from sqlalchemy_utils.types.password import PasswordType

try:
    from spinaltoobox import cfg
except SystemError:
    import cfg


###################################################################################
# Custom column type to save python mutable
class JSONEncodedDict(TypeDecorator):
    "Represents an immutable structure as a json-encoded string."

    impl = VARCHAR

    def process_bind_param(self, value, dialect):
        if value is not None:
            value = json.dumps(value)
        return value

    def process_result_value(self, value, dialect):
        if value is not None:
            value = json.loads(value)
        return value


class MutableDict(Mutable, dict):
    @classmethod
    def coerce(cls, key, value):
        "Convert plain dictionaries to MutableDict."

        if not isinstance(value, MutableDict):
            if isinstance(value, dict):
                return MutableDict(value)

            # this call will raise ValueError
            return Mutable.coerce(key, value)
        else:
            return value

    def __setitem__(self, key, value):
        "Detect dictionary set events and emit change events."

        dict.__setitem__(self, key, value)
        self.changed()

    def __delitem__(self, key):
        "Detect dictionary del events and emit change events."

        dict.__delitem__(self, key)
        self.changed()


###################################################################################
# Base model for Table
class ModelBase(object):
    id = Column(Integer,autoincrement=True, primary_key=True)
    created_on = Column(DateTime, default=datetime.datetime.now)
    updated_on = Column(DateTime, onupdate=datetime.datetime.now)

    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()


Base = declarative_base(cls=ModelBase)


###################################################################################
# Tables
class User(Base):
    email = Column(Unicode(1024), unique=False)
    first_name = Column(Unicode(1024))
    last_name = Column(Unicode(1024))
    #password = Column(PasswordType(schemes=['pbkdf2_sha512', ]), nullable=True)
    password = Column(Unicode(1024), nullable=True)

    @classmethod
    def by_mail(cls, mail, session):
        return session.query(User).filter(User.email == mail).first()
    def verify_password(self, password):
        return self.password == password
    def __repr__(self):
        return "<User(fullname='%s %s', email='%s')>" \
               % (self.first_name, self.last_name, self.email)

class File(Base):
    filename = Column(Unicode(1024), unique=False)
    localpath = Column(Unicode(1024), unique=True)
    serverpath = Column(Unicode(1024), unique=True)
    type = Column(Unicode(1024), unique=False)
    size = Column(Float, unique=False)
    user_id = Column(Unicode(1024), ForeignKey('user.id'))
    user = relationship("User", backref='files', order_by='User.id')

    def __repr__(self):
        return "<File(filename='%s', type='%s', localpath='%s')>" \
               % (self.filename, self.type, self.localpath)

class Operation(Base):
    args = Column(Unicode(1024), unique=False)
    input_path = Column(Unicode(1024), unique=True)
    output_path = Column(Unicode(1024), unique=True)
    name = Column(Unicode(1024), ForeignKey("registeredtool.name"))
    file_id = Column(Unicode(1024), ForeignKey("file.id"))
    
class Command(Base):
    expire_on = Column(DateTime, nullable=False)
    command_id = Column(Unicode(36), default=lambda : str(uuid4()), unique=True)
    command_type = Column(Unicode(1024))
    command_date = Column(UnicodeText)
    identity = Column(Unicode(1024))


class RegisteredTool(Base):
    name = Column('name', Unicode(1024), unique=True)
    options = Column('options', MutableDict.as_mutable(JSONEncodedDict))
    help_str = Column('help', UnicodeText)


    def _parse_options(self, options):
        """
        Might me better to have that is in the models.RegisteredTool
        class but hey will see later.

        :param options:
        :return:
        """
        return self._parse_options_old_style(options)

    def _parse_options_old_style(self, options):

        mandatory_arg = {}
        optional_arg ={}
        for input_arg in options['arguments']:

            for param in input_arg['parameters']:
                output = False
                if param['command'] == '-i':
                    default = '{{{}}}'.format(cfg.INPUT_FILE_TAG)
                    arg_type = 'path'
                elif param['command'] == '-o':
                    default = '{{{}}}'.format(cfg.OUTPUT_DIR_TAG)
                    arg_type = 'path'
                    output = True
                else:
                    default = 't1'
                    arg_type = ''

                arg_struct = {param['command']:
                              {'value': default,
                               'type': arg_type,
                               'info': param['description'],
                               'name': param['HTMLRendering']['Title']}}

                if input_arg['argumentsSection'] == 'MANDATORY ARGUMENTS' or output:
                    mandatory_arg.update(arg_struct)
                else:
                    optional_arg.update(arg_struct)
        if not '-o' in mandatory_arg:

            mandatory_arg['-o'] = {'value': '{{{}}}'.format(cfg.OUTPUT_DIR_TAG),
                                   'type': 'path',
                                   'info': 'output path',
                                   'name': 'output path'}

            return mandatory_arg, optional_arg

    @property
    def cmd(self):
        """
        :return:
        string of the form
        "{EXEC_DIR_TAG}/exec.ext -i {INPUT_FILE_TAG} -o {OUTPUT_DIR_TAG} [--option other_options ...] "

        """
        mandatory, optional = self._parse_options(self.options)

        opt = ' '. join(['{} {}'.format(k, v['value'])
                        for k, v in mandatory.items()])


        return "{{{0}}}/{1} {2}".format(cfg.EXEC_DIR_TAG, self.name, opt)
        # return "echo 33 "