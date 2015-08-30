'use strict';

/**
 * @ngdoc function
 * @name angularSeedApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the angularSeedApp
 */
angular.module('angularSeedApp')
  .controller('HeaderCtrl', function ($scope,$location,$localStorage) {

    $scope.$storage = $localStorage;   //Initialization of the local storage

    $scope.actif = $location.path();

    $scope.logout = function(){
      auth.$unauth();
      $scope.$storage.uid = null;
    };

    $scope.is_active = function(route, view){
      if (route===view){
        return "active"
      }
      else{
       return ""
      }
    };



    $scope.$watch('$storage.uid', function () {

      console.log($scope.$storage.uid);

      if ($scope.$storage.uid===null){
          $scope.logout_class = "hidden";
          $scope.login_class = "";
      }
      else{
        $scope.logout_class = "";
        $scope.login_class = "hidden";
      }

    });

  });
