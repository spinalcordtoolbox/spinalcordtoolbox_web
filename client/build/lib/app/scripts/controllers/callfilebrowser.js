'use strict';

/**
 * @ngdoc function
 * @name angularSeedApp.controller:CallfilebrowserCtrl
 * @description
 * # CallfilebrowserCtrl
 * Controller of the angularSeedApp
 */
angular.module('angularSeedApp')
    .controller('CallfilebrowserCtrl', function ($scope, $modal, $log) {

      $scope.items = ['item1', 'item2', 'item3'];

      $scope.animationsEnabled = true;

      $scope.open = function (size) {

        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: '../views/browser.html',
          controller: 'BrowserCtrl',
          size: size,
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };

      $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
      };

    });
