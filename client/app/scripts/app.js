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
    'ngTouch',
    'jsTree.directive',
    'ngFileUpload',
    'angular-loading-bar',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
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
      })
      .when('/tools', {
        templateUrl: 'views/tools.html',
        controller: 'ToolsCtrl',
        controllerAs: 'tools'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
