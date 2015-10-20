'use strict';

/**
 * @ngdoc function
 * @name angularSeedApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the angularSeedApp
 */
angular.module('angularSeedApp')
  .controller('AdminCtrl', function ($scope, $resource) {
    //Connection with the server
    var users = $resource('/users/:userId', {userId:'@id'});
    var all_users = $resource('/users');
    var process = $resource('/process');
    var stats = $resource('/stats');

    //Local storage

    //User management
    $scope.users = all_users.query();

    $scope.delete = function(id){
      users.delete({userId:id});
      $scope.users = all_users.query();
    };

    //Process management
    $scope.process = 1; //process.query();


    //Stats website
    $scope.stats = 1; //stats.query();



  });
