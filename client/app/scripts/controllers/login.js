'use strict';

/**
 * @ngdoc function
 * @name angularSeedApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the angularSeedApp
 */
angular.module('angularSeedApp')
  .controller('LoginCtrl', ["$scope", "Auth",
    function($scope, Auth) {

      var auth = Auth;
      $scope.auth = Auth;
      var ref = new Firebase("https://isct.firebaseio.com");


      // any time auth status updates, add the user data to scope
      auth.$onAuth(function(authData) {
        $scope.authData = authData;
      });

      $scope.login = function() {
        $scope.authData = null;
        $scope.error = null;

        ref.authWithPassword({
          email    : $scope.email,
          password : $scope.password
        }, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
          }
        });
      };
    }
  ]);
