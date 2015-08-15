'use strict';

/**
 * @ngdoc function
 * @name angularSeedApp.controller:ArgumentsCtrl
 * @description
 * # ArgumentsCtrl
 * Controller of the angularSeedApp
 */
angular.module('angularSeedApp')
    .controller('ArgumentsCtrl', function($scope) {

      $scope.schema = {
        type: "object",
        properties: {
          name: { type: "string", minLength: 2, title: "Name", description: "Name or alias" },
          title: {
            type: "string",
            enum: ['dr','jr','sir','mrs','mr','NaN','dj']
          }
        }
      };

      $scope.form = [
        "*",
        {
          type: "submit",
          title: "Save"
        }
      ];

      $scope.model = {};
    });
