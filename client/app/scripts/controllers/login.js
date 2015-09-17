'use strict';

/**
 * @ngdoc function
 * @name angularSeedApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the angularSeedApp
 */
angular.module('angularSeedApp')
  .controller('LoginCtrl', ["$scope", "$localStorage", "$http", "$window",
    function($scope, $localStorage, $http, $window) {
      $scope.$storage = $localStorage;

      $scope.logout = function(){
        $scope.$storage.uid = null;
      };

      $scope.login = function() {
        //Add function to send infos with http.post
        $http.post('/login', {email:$scope.email, password:$scope.password}).
          then(function(response) {
            if (response.data.ok){
              $scope.$storage.uid=response.data.uid;
              $scope.$storage.name = $scope.email.replace(/@.*!/, '');
              $window.location.href = '#/toolbox'
            }
            else{
              $scope.$storage.uid=null; //to be sure
              $scope.error = response.data.error; //display error message
            }
          });
      };
    }
  ]);
