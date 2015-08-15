'use strict';

/**
 * @ngdoc function
 * @name angularSeedApp.controller:BrowserCtrl
 * @description
 * # BrowserCtrl
 * Controller of the angularSeedApp
 */
angular.module('angularSeedApp')
  .controller('BrowserCtrl', ['$scope', '$route', 'SharedDataService', '$localStorage','$location','$window',
    function ($scope, $route, SharedDataService, $localStorage, $location,$window) {
      $scope.$storage = $localStorage;

      $scope.NewFile = SharedDataService; //it's use to connect upload & browser to detect change and update the tree

      $scope.fileViewer = 'Please select a file to view its contents';
      $scope.relative_path = '';

      $scope.$watch('NewFile.state', function () {
        if ($scope.NewFile.state) { //Update the tree when a file is uploaded
          $route.reload();
        }
      });

      $scope.changedCB = function (e, data) {
        var nodeChecked = [];
        var nodePath = [];
        var relative_nodePath = [];
        nodeChecked = angular.element("#jstree").jstree('get_checked');
        for (var i in nodeChecked) {
          nodePath.push(angular.element("#jstree").jstree("get_node", nodeChecked[i]).original.path);
          if (angular.element("#jstree").jstree("get_node", nodeChecked[i]).original.type === 'file'){
            relative_nodePath.push(angular.element("#jstree").jstree("get_node", nodeChecked[i]).original.rel_path);
          }

        }
        $scope.$apply(function () {
          $scope.fileViewer = nodePath;
          $scope.NewFile.pathArray = nodePath;
          $scope.relative_path = relative_nodePath;
          $scope.NewFile.relative_pathArray = relative_nodePath;
        });

      };
      $scope.brainbrowser = function (pathArray) {

        console.log(pathArray);

        var volumes_files = [];

        for (var i in pathArray) {

          var path = pathArray[i];
          var volume = {
            type: "nifti1",
            nii_url: path,
            template: {
              element_id: "volume-ui-template", viewer_insert_class: "volume-viewer-display"
            }
          };

          volumes_files.push(volume);


        }
        $scope.$storage.volumes_files = volumes_files;

        if ($location.path()==="/viewer"){
          $window.location.reload();
        }
        else{
          $location.path("viewer");
        }


      };

    }
  ]);


//   .each(function(index) {
// nodeChecked.push($(this).attr('path'));
// });
