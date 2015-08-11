'use strict';

/**
 * @ngdoc function
 * @name angularSeedApp.controller:FileUploadCtrl
 * @description
 * # FileUploadCtrl
 * Controller of the angularSeedApp
 */
angular.module('angularSeedApp')
    .controller('FileUploadCtrl', ['$scope', 'Upload', '$timeout', 'SharedDataService', function ($scope, Upload, $timeout, SharedDataService) {
        $scope.NewFile = SharedDataService;
    

    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.upload([$scope.file]);
        }
    });
    $scope.log = '';

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/upload',
                    fields: {
                        'username': $scope.username
                    },
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage + '% ' +
                                evt.config.file.name + '\n' + $scope.log;
                }).success(function (data, status, headers, config) {
                    $timeout(function() {
                        $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                    });
                    console.log(config.file.name);
                    $scope.NewFile.text = config.file.name;
                    $scope.NewFile.state = true;
                });
            }
        }
        $scope.NewFile.state = false;
    };
}]);