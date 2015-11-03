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
  .controller('BrowserCtrl', ['$scope', '$route', 'SharedDataService', '$localStorage','$location','$window','FilesTree','$http', '$resource',
      function ($scope, $route, SharedDataService, $localStorage, $location, $window, FilesTree, $http, $resource) {

      $scope.$storage = $localStorage;   //Initialization of the local storage
      $scope.NewFile = SharedDataService; //it's use to connect uploadCntrl & browserCntrl to detect changes then refresh the tree

      $scope.filesPath = 'Please select a file to view its path';  //Information for debugging
      $scope.relative_path = '';

        $scope.treeConfig = {
            core : {
                multiple : false,
                animation: true,
                error : function(error) {
                    $log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
                },
                check_callback : true,
                worker : true
            },
            types : {
                default : {
                    icon : 'glyphicon glyphicon-flash'
                },
                star : {
                    icon : 'glyphicon glyphicon-star'
                },
                cloud : {
                    icon : 'glyphicon glyphicon-cloud'
                }
            },
            version : 1,
            plugins : ['types','checkbox']
        };

      //Tree generation (AJAX request)
      var updateTree = function(){
        //$scope.treeModel = JSON.parse(JSON.stringify(FilesTree.query()));
        $http.get('/tree').
          then(function(response) {
            $scope.treeModel=response.data;
          });
        console.log($scope.treeModel);
        //$scope.treeModel = [{"parent":"#","path":"/Users/willispinaud/Dropbox/spinalcordtoolbox_web/server/server/static/tmp/None","text":"None","state":{"opened":"true","selected":"false"},"icon":"glyphicon glyphicon-user","type":"file","id":"/Users/willispinaud/Dropbox/spinalcordtoolbox_web/server/server/static/tmp/None","rel_path":"static/tmp/None"}];
      };

      updateTree();
      $scope.refresh = function(){
        updateTree();

      };
      $scope.$watch('NewFile.state', function () {
        if ($scope.NewFile.state) { //Update the tree when a file is uploaded
          updateTree();
        }
      });

      $scope.delete = function(path){
        for (i in files_id){
          var file_id = files_id[i];
          $http.delete("/users/"+$scope.$storage.uid+"/files/"+file_id);
        }
      };

      //When the event changedCB is activated, this function add the paths of the selected FILES to the filesPath variable
      $scope.changedCB = function (e, data) {
        var nodeChecked = [];
        var nodePath = [];
        var relative_nodePath = [];
        nodeChecked = angular.element("#jstree").jstree('get_checked'); // Get the checked elements in the trees
        for (var i in nodeChecked) {
          if (nodeChecked.hasOwnProperty(i)){
            if (angular.element("#jstree").jstree("get_node", nodeChecked[i]).original.type === 'file'){ //Select only files
              relative_nodePath.push(angular.element("#jstree").jstree("get_node", nodeChecked[i]).original.rel_path); //Get the relative path for the viewer
              nodePath.push(angular.element("#jstree").jstree("get_node", nodeChecked[i]).original.path); //Get the absolute path for the toolbox
            }
          }


        }
        $scope.$apply(function () {
          $scope.filesPath = nodePath; //filesPath has an array with absolute paths for the toolbox
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
            nii_url: path + '',
            template: {
              element_id: "volume-ui-template", viewer_insert_class: "volume-viewer-display"
            }
          };
          volumes_files.push(volume);
          console.log(volumes_files);
        }
         //if 1 file selected
          if(pathArray.length===1) {
            //Populate the array with relatives path and the right structure
            var path = pathArray[0];
            var volume = {
              type: "nifti1",
              nii_url: path + '',
              template: {
                element_id: "volume-ui-template", viewer_insert_class: "volume-viewer-display"
              }
            };
            volumes_files.push(volume);
            console.log("one file mode");
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

      $scope.delete = function(){
        //@TODO: ajouter une alerte pour valider la suppression des fichiers avec un if
        $http.post('/delete', {files_id:$scope.filesPath, uid:$scope.$storage.uid}).
          then(function(response) {
            //@TODO: alert('Your selection is delete !')
            updateTree();
          });
      };

      var responseType = 'arraybuffer';
      $scope.download = function(){
        $http.post('/download', {files_id:$scope.filesPath, uid:$scope.$storage.uid},{
          responseType: 'arraybuffer',
          headers: {'Content-Type': 'application/zip'}
        }).
          then(function(response) {
            openSaveAsDialog("isct_download.zip", response.data, 'application/zip');
          });
      };


      function openSaveAsDialog(filename, content, mediaType) {
        var blob = new Blob([content], {type: mediaType});
        saveAs(blob, filename);
      }

      $scope.alertMe = function() {
        setTimeout(function() {
          $window.alert('You\'ve selected the alert tab!');
        });
      };
    }
  ]);

