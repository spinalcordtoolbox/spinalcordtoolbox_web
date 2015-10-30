'use strict';

/**
 * @ngdoc service
 * @name angularSeedApp.getTools
 * @description
 * # getTools
 * Service in the angularSeedApp.
 */
angular.module('angularSeedApp')
  .factory('getTools', ['$resource',
    function($resource){
      return $resource('/tree').query();
    }]
  );