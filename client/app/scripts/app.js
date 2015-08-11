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
    'angular-loading-bar'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/viewer.html',
        controller: 'ViewerCtrl',
        controllerAs: 'viewer'
      })
      .when('/toolbox', {
        templateUrl: 'views/toolbox.html',
        controller: 'ToolboxCtrl',
        controllerAs: 'toolbox'
      })
      .when('/file-upload', {
        templateUrl: 'views/file-upload.html',
        controller: 'FileUploadCtrl',
        controllerAs: 'fileUpload'
      })
      .when('/generale', {
        templateUrl: 'views/generale.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
