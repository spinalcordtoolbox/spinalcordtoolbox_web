'use strict';

/**
 * @ngdoc function
 * @name angularSeedApp.controller:ToolboxCtrl
 * @description
 * # ToolboxCtrl
 * Controller of the angularSeedApp
 */
angular.module('angularSeedApp')
    .controller('ToolboxCtrl', ['$scope', 'FetchFileFactory',
    function($scope, FetchFileFactory) {

      $scope.fileViewer = 'Please select a file to view its contents';
 		var nodeChecked = [];

      $scope.nodeSelected = function(e, data) {
      	console.log('selected')
      	console.log(data)
      	nodeChecked.push(data.node.original.path);
        $scope.$apply(function() {
            $scope.fileViewer = data;
          });
      };
      $scope.nodeDeselected = function(e, data) {
      	console.log('nodeDeselected')
      	console.log(data)
      	var index = nodeChecked.indexOf(data.node.original.path);
      	if (index > -1){
      		nodeChecked.splice(index,1);
      	}
        $scope.$apply(function() {
            $scope.fileViewer = data;
          });
      };
    }
  ]);