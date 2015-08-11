'use strict';

/**
 * @ngdoc function
 * @name angularSeedApp.controller:ToolboxCtrl
 * @description
 * # ToolboxCtrl
 * Controller of the angularSeedApp
 */
angular.module('angularSeedApp')
    .controller('ToolboxCtrl', ['$scope', '$route', 'SharedDataService',
    function($scope, $route, SharedDataService) {
      $scope.NewFile = SharedDataService;

      $scope.fileViewer = 'Please select a file to view its contents';

        $scope.$watch('NewFile.state', function () {
        if ($scope.NewFile.state){
          $route.reload();
        }
    });

      $scope.changedCB = function(e, data) {
      	var nodeChecked = new Array();
      	var nodePath = [];
		nodeChecked = angular.element("#jstree").jstree('get_checked');
		for (var i in nodeChecked){
			nodePath.push(angular.element("#jstree").jstree("get_node",nodeChecked[i]).original.path);
		}
        $scope.$apply(function() {
            $scope.fileViewer = nodePath;
          });
      };
    }
  ]);


  //   .each(function(index) {
		// nodeChecked.push($(this).attr('path'));
		// });