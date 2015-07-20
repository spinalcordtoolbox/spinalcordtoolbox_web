import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))
with open(os.path.join(here, 'README.md')) as f:
    README = f.read()
with open(os.path.join(here, 'CHANGES.md')) as f:
    CHANGES = f.read()

requires = [
    'pyramid',
    'cryptacular',
    'waitress',
    'sqlalchemy',
    'alembic',
    'passlib',
    'colander',
    'pyramid_marrowmailer',
    'html2text',
    'pyramid_tm',
    'sqlalchemy-utils',
    'wtforms', 
    'deform',
    'zope.sqlalchemy',
    'simplejson',
    'psutil',
    'pyramid_mako',
    'pyramid_debugtoolbar',
    'deform_bootstrap',
    'pyramid_chameleon'
    ]

setup(name='spinaltoolbox',
      version='0.0',
      description='spinaltoolbox',
      long_description=README + '\n\n' + CHANGES,
      classifiers=[
        "Programming Language :: Python",
        "Framework :: Pyramid",
        "Topic :: Internet :: WWW/HTTP",
        "Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
        ],
      author='Willis Pinaud & P-O Quirion',
      author_email='willispinaud@gmail.com & pioliqui@gmail.com',
      url='',
      keywords='web pyramid spinal web toolbox',
      packages=find_packages(),
      include_package_data=True,
      zip_safe=False,
      install_requires=requires,
      tests_require=requires,
      test_suite="test",
      entry_points="""\
      [paste.app_factory]
      main = spinaltoolbox:main
      """,
      )
