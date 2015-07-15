import colander
from deform_bootstrap import Form
import deform
from pyramid.view import view_config

@colander.deferred
def deferred_choices_widget(node, kw):
    choices = kw.get('choices')
    return deform.widget.SelectWidget(values=choices)

@colander.deferred
def deferred_default(node, kw):
    return kw['default']

choices = (
    ('', '- Select -'),
    ('habanero', 'Habanero'),
    ('jalapeno', 'Jalapeno'),
    ('chipotle', 'Chipotle')
    )
css_widget = deform.widget.TextInputWidget(
            css_class='deform-widget-with-style')

class Toolbox(colander.MappingSchema):
    tools = colander.SchemaNode(
        colander.String(),
        default=deferred_default,
        widget=deferred_choices_widget,
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
                                        widget=css_widget,
                                       description='Input path')
    output = colander.SchemaNode(colander.String(),
                                       validator=colander.Length(max=100),
                                        widget=css_widget,
                                       description='Output path')

class loginForm(colander.MappingSchema):
    first_name = colander.SchemaNode(
        colander.String(),
        widget=deform.widget.TextInputWidget(
            css_class='top-margin'),
        title='Username/Email',
        )
    Password = colander.SchemaNode(
        colander.String(),
        widget=deform.widget.TextInputWidget(
            css_class='top-margin'),
        title='Password',
        )


schema = Toolbox().bind(choices=choices, default='')
myform = Form(schema, buttons=('submit',))
form_render = myform.render()

schema_login = loginForm()
login_form = Form(schema_login, buttons=('submit',))
login_form_render = login_form.render()

