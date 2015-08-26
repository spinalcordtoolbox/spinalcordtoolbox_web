'use strict';

/**
 * @ngdoc overview
 * @name angularSeedApp
 * @description
 * # angularSeedApp
 *
 * Main module of the application.
 */
angular
  .module('angularSeedApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    //'ngTouch',
    'jsTree.directive',
    'ngFileUpload',
    'angular-loading-bar',
    'ui.bootstrap',
    //'mgcrea.ngStrap',
    'schemaForm',
    'firebase',
    'ngStorage',
    'luegg.directives'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/viewer', {
        templateUrl: 'views/viewer.html',
        controller: 'ViewerCtrl',
        controllerAs: 'viewer'
      })
      .when('/browser', {
        templateUrl: 'views/browser.html',
        controller: 'BrowserCtrl',
        controllerAs: 'browser'
      })
      .when('/file-upload', {
        templateUrl: 'views/file-upload.html',
        controller: 'FileUploadCtrl',
        controllerAs: 'fileUpload'
      })
      .when('/toolbox', {
        templateUrl: 'views/toolbox.html',
        controller: 'ToolboxCtrl'
      })
      .when('/tools', {
        templateUrl: 'views/tools.html',
        controller: 'ToolsCtrl',
        controllerAs: 'tools'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/console', {
        templateUrl: 'views/console.html',
        controller: 'ConsoleCtrl',
        controllerAs: 'console'
      })
      .otherwise({
        redirectTo: '/',
        templateUrl: 'views/toolbox.html'
      });
  })
  .config(['$resourceProvider', function ($resourceProvider) {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
  }])
  /*Authentification factory*/
  .factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
      var ref = new Firebase("https://isct.firebaseio.com");
      return $firebaseAuth(ref);
    }
  ])
  .filter('capitalize', function() {
    return function(input, scope) {
      if (input!=null)
        input = input.toLowerCase();
      return input.substring(0,1).toUpperCase()+input.substring(1);
    }
  })
  .config(['$compileProvider',
    function ($compileProvider) {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
    }]);
