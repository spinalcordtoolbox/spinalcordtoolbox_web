# [The iSpinalCordToolbox project](https://github.com/neuropoly/spinalcordtoolbox_web) #

This project is awesome.

# Setting Up

## Contents

 - client - the AngularJS frontend of the webapp
 - server - the Pyramid backend of the webapp

## How to install it

Presteps
 - Set up virtualenv and activate it
 - Install npm

Build Client side
```
[Install NPM]
cd client
npm install
```

Install Client side as Package
```
[Activate a virtualenv]
cd client
python setup.py install
```

## Serving Client Side w/ Pyramid Dev Server

Setup, see routes, and serve pyramid app
```
cd ../server/
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

##Create a soft link to auto-update your changes
```
[Activate a virtualenv]
cd *your_virtualenv*/lib/python3.4/site-packages/app_egg/
```
Rename the app to app_old
```
ln -s ../../../../../client/app app
```













