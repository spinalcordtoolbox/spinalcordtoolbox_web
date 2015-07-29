The server has a some dependency that need to be instaled before it can run smoothly.

We recommand instaling a python3 virtual env to make it run in `./python_virtual` with the following command

```virtualenv -p /path/to/python3``` path/to/python_spinal_web/python_virtual`

then

```source python_virtual/bin/activate```

this makes `./python_virtual/bin/` the "default python path" is your terminal, this means that pip an easy_install are also called from there.

Some library are needed to have the server running they are include in the setup.py file
Runnig 'python setup.py develop' should install all that you need in your virtual environement
Did not forget to add the package you add for additional developpement in the setup.py file


'pyramid',
'waitress',
'sqlalchemy',
'alembic',
'pyramid_jinja2',
'pyramid_mako',
'passlib',
'colander',
'pyramid_marrowmailer',
'html2text',
'pyramid_tm',
'sqlalchemy_utils'
'cryptacular',
'wtforms',
'deform',
'zope.sqlalchemy',
'simplejson',
'psutil',
'pyramid_mako',
'pyramid_debugtoolbar',
'deform_bootstrap',
'pyramid_chameleon'



You need nodeJS to be installed so potential js goodies will work, the database is sqlite3, do not ferget to have that install too.
