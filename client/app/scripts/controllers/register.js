'use strict';

/**
 * @ngdoc function
 * @name angularSeedApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the angularSeedApp
 */
angular.module('angularSeedApp')
  .controller('RegisterCtrl', function ($scope,$location) {

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
          $scope.error = error;
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
          $location.path("login"); //redirect to login page on success
        }
      });

      //Add function to send infos with http.post
      $http.post('/register', {mail:$scope.email, password:$scope.password}).
        then(function(response) {
          //@TODO: Go to the login page or automatically log the new user
        });
    };


  });
