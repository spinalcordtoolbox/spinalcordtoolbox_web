'use strict';

/**
 * @ngdoc function
 * @name angularSeedApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the angularSeedApp
 */
angular.module('angularSeedApp')
  .controller('HeaderCtrl', function ($scope,$location) {

    $scope.actif = $location.path();

    $scope.is_active = function(route, view){
      if (route===view){
        return "active"
      }
      else{
       return ""
      }
    };

    $scope.$watch('actif', function () {

    });

  });
