import colander
from deform_bootstrap import Form
import deform
from pyramid.view import view_config
css_widget = deform.widget.TextInputWidget(
            size=60, css_class='form-control')
class toolboxForm(colander.MappingSchema):
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
        description='Enter a password')


schema = toolboxForm()
myform = Form(schema, buttons=('submit',))
form_render = myform.render()

schema_login = RegisterForm()
login_form = Form(schema_login, buttons=('submit',))
login_form_render = login_form.render()

