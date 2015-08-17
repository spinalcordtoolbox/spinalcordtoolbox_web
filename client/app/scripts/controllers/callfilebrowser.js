'use strict';

/**
 * @ngdoc function
 * @name angularSeedApp.controller:CallfilebrowserCtrl
 * @description
 * # CallfilebrowserCtrl
 * Controller of the angularSeedApp
 */
angular.module('angularSeedApp')
    .controller('CallfilebrowserCtrl', ['$scope', '$modal','$localStorage', function ($scope, $modal, $localStorage) {

      // Retrieving a cookie
    $scope.$storage = $localStorage.$default({
      volumes_files: [{
        type: "nifti1",
        nii_url: "static/js/viewer/models/T1.nii",
        template: {
          element_id: "volume-ui-template", viewer_insert_class: "volume-viewer-display"
        }
      }, {
        type: "nifti1",
        nii_url: "static/js/viewer/models/T1.nii",
        template: {element_id: "volume-ui-template", viewer_insert_class: "volume-viewer-display"}
      }, {
        type: "nifti1",
        nii_url: "static/js/viewer/models/T1_aseg2.nii",
        template: {element_id: "volume-ui-template", viewer_insert_class: "volume-viewer-display"}
      }]
    });

      $scope.open = function () {

        var modalInstance = $modal.open({
          animation: true,
          templateUrl: '../views/browser.html',
          controller: 'BrowserCtrl'
        });

        modalInstance.result.then(
        );
      }  ;





    }]);
