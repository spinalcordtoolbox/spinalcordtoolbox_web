'use strict';

/**
 * @ngdoc function
 * @name angularSeedApp.controller:BrowserCtrl
 * @description
 * # BrowserCtrl
 * Controller of the angularSeedApp
 */
angular.module('angularSeedApp')
  .controller('BrowserCtrl', ['$scope', '$route', 'SharedDataService',
    function ($scope, $route, SharedDataService) {
      $scope.NewFile = SharedDataService; //it's use to connect upload & browser to detect change and update the tree

      $scope.fileViewer = 'Please select a file to view its contents';

      $scope.$watch('NewFile.state', function () {
        if ($scope.NewFile.state) { //Update the tree when a file is uploaded
          $route.reload();
        }
      });

      $scope.changedCB = function (e, data) {
        var nodeChecked = [];
        var nodePath = [];
        nodeChecked = angular.element("#jstree").jstree('get_checked');
        for (var i in nodeChecked) {
          nodePath.push(angular.element("#jstree").jstree("get_node", nodeChecked[i]).original.path);
        }
        $scope.$apply(function () {
          $scope.fileViewer = nodePath;
        });
      };

      $scope.brainbrowser = function (pathArray) {

        console.log(pathArray);

      };
    }
  ]);


//   .each(function(index) {
// nodeChecked.push($(this).attr('path'));
// });
