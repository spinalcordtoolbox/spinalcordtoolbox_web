# The iSpinalCordToolbox project[1] #

This project is awesome.

# Setting Up

## Contents

 - angular-seed - the frontend of the webapp
 - pyrserve - the backend of the webapp

## Building the Angular App as Python Setuptool Package

Presteps
 - Set up virtualenv and activate it
 - Install npm
 - Add setuptools files as per commit

Build Angular App
```
[Install NPM]
cd angular-seed
npm install
```

Package and Install as Package
```
[Activate a virtualenv]
cd angular-seed
python setup.py install
```

## Serving Angular App w/ Pyramid Dev Server

Setup, see routes, and serve pyramid app
```
cd ../pyrserve/
python setup.py develop
proutes development.ini
pserve development.ini --reload
```

Try URLs on localhost
- [The Client App](http://localhost:6543/)
- [The Server Root](http://localhost:6543/home)

## How to create a new page in the client Angular App
Presteps
 - install yeoman
 ```
 npm install -g yo
 npm install -g generator-angular
 ```

Call Yo to create your new page
```
yo angular:route mynewroute
```

[1]: https://github.com/neuropoly/spinalcordtoolbox_web












