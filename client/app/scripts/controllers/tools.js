'use strict';

/**
 * @ngdoc function
 * @name angularSeedApp.controller:ToolsCtrl
 * @description
 * # ToolsCtrl
 * Controller of the angularSeedApp
 */
angular.module('angularSeedApp')
  .controller('ToolsCtrl', ['$scope', 'SharedDataService', 'getTools', function ($scope, SharedDataService, getTools) {
    $scope.tools = getTools; //sera un service qui se chargera de récuperer les tools

    $scope.NewFile = SharedDataService;

    $scope.$watch('NewFile.pathArray', function () {
      $scope.inputs = $scope.NewFile.pathArray;
    });

    $scope.compute = function(tool_id,argJSON){
      //envoyer les arg à la fonction choisie sur le server !
    };
  }]);
