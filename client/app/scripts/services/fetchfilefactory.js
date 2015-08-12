'use strict';

/**
 * @ngdoc service
 * @name angularSeedApp.FetchFileFactory
 * @description
 * # FetchFileFactory
 * Factory in the angularSeedApp.
 */
angular.module('angularSeedApp')
  .factory('FetchFileFactory', ['$http',
    function($http) {
      var _factory = {};
 
      _factory.fetchFile = function(file) {
        return $http.get('/resource?resource=' + encodeURIComponent(file));
      };
 
      return _factory;
    }
  ]);