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
    $scope.tools = getTools; //Sera un service qui se chargera de récuperer les tools
    $scope.toolSelected = {};

    $scope.NewFile = SharedDataService;

    $scope.$watch('NewFile.pathArray', function () {
      $scope.inputs = $scope.NewFile.pathArray;
    });

    $scope.compute = function(tool_id,args,inputs){
      //envoyer les arg à la fonction choisie sur le server !
      console.log("l'ID du tool:"+tool_id);
      console.log("les data:"+args);
      console.log("le path des inputs:"+inputs);
    };

    $scope.change = function(){
      $scope.schema = $scope.toolSelected.schema;
    };




    $scope.form = [
      "*"
    ];

    $scope.args = {};
  }]);
