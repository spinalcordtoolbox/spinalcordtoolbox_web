'use strict';

/**
 * @ngdoc function
 * @name angularSeedApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the angularSeedApp
 */
angular.module('angularSeedApp')
  .controller('RegisterCtrl', function ($scope) {

    var ref = new Firebase("https://isct.firebaseio.com");

    $scope.email = "";
    $scope.password = "";

    $scope.register = function(){
      ref.createUser({
        email    : $scope.email,
        password : $scope.password
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
        }
      });
    };


  });
