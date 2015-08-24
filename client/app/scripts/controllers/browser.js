'use strict';

/**
 * @ngdoc function
 * @name angularSeedApp.controller:BrowserCtrl
 * @description
 * # BrowserCtrl
 * Controller of the angularSeedApp
 * This controller provide a file browser for the website.
 * It uses a JSTree directive to represent the folder tree.
 */
angular.module('angularSeedApp')
  .controller('BrowserCtrl', ['$scope', '$route', 'SharedDataService', '$localStorage','$location','$window','$timeout',
    function ($scope, $route, SharedDataService, $localStorage, $location, $window, $timeout) {

      $scope.$storage = $localStorage;   //Initialization of the local storage
      $scope.NewFile = SharedDataService; //it's use to connect uploadCntrl & browserCntrl to detect changes then refresh the tree

      $scope.tree_path = "/tree/"+$scope.$storage.uid;  //The path to GET the tree with the user's uid

      $scope.fileViewer = 'Please select a file to view its path';  //Information for debugging
      $scope.relative_path = '';

      /*$scope.$watch('NewFile.state', function () {
        if ($scope.NewFile.state) { //Update the tree when a file is uploaded
          $route.reload();
        }
      });*/

      $scope.refresh = function(){
        $route.reload();
      };

      $scope.delete = function(path){
        for (i in files_id){
          var file_id = files_id[i];
          $http.delete("/users/"+$scope.$storage.uid+"/files/"+file_id);
        }
      };

      //When the event changedCB is activated, this function add the paths of the selected FILES to the fileviewer variable
      $scope.changedCB = function (e, data) {
        var nodeChecked = [];
        var nodePath = [];
        var relative_nodePath = [];
        nodeChecked = angular.element("#jstree").jstree('get_checked'); // Get the checked elements in the trees
        for (var i in nodeChecked) {
          if (angular.element("#jstree").jstree("get_node", nodeChecked[i]).original.type === 'file'){ //Select only files
            relative_nodePath.push(angular.element("#jstree").jstree("get_node", nodeChecked[i]).original.rel_path); //Get the relative path for the viewer
            nodePath.push(angular.element("#jstree").jstree("get_node", nodeChecked[i]).original.path); //Get the absolute path for the toolbox
          }

        }
        $scope.$apply(function () {
          $scope.fileViewer = nodePath; //fileViewer has an array with absolute paths for the toolbox
          $scope.NewFile.pathArray = nodePath;
          $scope.relative_path = relative_nodePath; //relative_path has an array with relative paths for the viewer
          $scope.NewFile.relative_pathArray = relative_nodePath;
        });

      };

      /*This function update the local storage with the new volumes to load. Then launch Brainbrowser at #/viewer */
      $scope.brainbrowser = function (pathArray) {
        var volumes_files = []; //Initialize the array to store volumes informations
        for (var i in pathArray) {
          //Populate the array with relatives path and the right structure
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
        $scope.$storage.volumes_files = volumes_files; //Update the localStorage with the new array of volumes
        //Redirection the the viewer
        if ($location.path()==="/viewer"){
          $window.location.reload();
        }
        else{
          $location.path("viewer");
        }
      };
    }
  ]);
