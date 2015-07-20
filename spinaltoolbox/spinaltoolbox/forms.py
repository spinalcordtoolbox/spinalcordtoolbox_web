import colander
from deform_bootstrap import Form
import deform
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .models import models
from deform.widget import OptGroup
css_widget = deform.widget.TextInputWidget(
            size=60, css_class='form-control')

def parseTools():
    engine = create_engine("sqlite:////Users/willispinaud/Dropbox/Amerique/Montreal/python_spinal_web/spinaltoolbox/dc.sqlite")
    Session = sessionmaker(bind=engine)
    session = Session()
    tools_list = [i[0] for i in session.query(models.RegisteredTool.name).all()]
    tools = (
            ('', '- Select -'),
            OptGroup('Tools Part 1',
                (tools_list[0],tools_list[0]),
                (tools_list[1],tools_list[1])),
            OptGroup('Tools Part 2',
                (tools_list[2],tools_list[2]),
                (tools_list[3],tools_list[3]))
            )
    session.close()
    return tools

def parseOpt():
    engine = create_engine("sqlite:////Users/willispinaud/Dropbox/Amerique/Montreal/python_spinal_web/spinaltoolbox/dc.sqlite")
    Session = sessionmaker(bind=engine)
    session = Session()
    opt_list = [i[0] for i in session.query(models.RegisteredTool.options).all()]
    opt = (
            ('', '- Select -'),
            OptGroup('Opt Part 1',
                (str(opt_list[0]),str(opt_list[0])),
                (str(opt_list[1]),str(opt_list[1]))),
            OptGroup('Opt Part 2',
                (str(opt_list[2]),str(opt_list[2])),
                (str(opt_list[3]),str(opt_list[3]))
            ))
    session.close()
    return opt_list


class toolboxForm(colander.MappingSchema):
    tools = colander.SchemaNode(
        colander.String(),
        title='Tools',
        widget=deform.widget.SelectWidget(values=parseTools())
        )
    name = colander.SchemaNode(
        colander.String(),
        title='Name',
        )
    surname = colander.SchemaNode(
        colander.String(),
        title='Surname',
        )
    title = colander.SchemaNode(colander.String())
    content = colander.SchemaNode(colander.String(),
                                  validator=colander.Length(1))
    input = colander.SchemaNode(colander.String(),
                                       validator=colander.Length(max=100),
                                       description='Input path')
    output = colander.SchemaNode(colander.String(),
                                       validator=colander.Length(max=100),
                                       description='Output path')

class RegisterForm(colander.MappingSchema):
    first_name = colander.SchemaNode(
        colander.String(),
        validator=colander.Length(max=50, min=5),
        widget = css_widget,
        title='First name',
        )
    last_name = colander.SchemaNode(
        colander.String(),
        validator=colander.Length(max=50, min=5),
        widget = css_widget,
        title='Last name',
        )
    email = colander.SchemaNode(
        colander.String(),
        validator=colander.Email(),
        widget = css_widget,
        title='Email',
        )
    password = colander.SchemaNode(
        colander.String(),
        validator=colander.Length(min=5, max=100),
        widget=deform.widget.PasswordWidget(size=20, css_class='form-control'),
        description='Please enter a password length of at least 5 characters.')

class SigninForm(colander.MappingSchema):
    email = colander.SchemaNode(
        colander.String(),
        validator=colander.Email(),
        widget = css_widget,
        title='Email',
        )
    password = colander.SchemaNode(
        colander.String(),
        validator=colander.Length(min=5, max=100),
        widget=deform.widget.PasswordWidget(size=20, css_class='form-control')
        )


schema = toolboxForm()
myform = Form(schema, buttons=('submit',))
form_render = myform.render()

schema_login = RegisterForm()
login_form = Form(schema_login, buttons=('submit',))
login_form_render = login_form.render()

