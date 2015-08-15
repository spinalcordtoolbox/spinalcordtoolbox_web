'use strict';

/**
 * @ngdoc service
 * @name angularSeedApp.getTools
 * @description
 * # getTools
 * Service in the angularSeedApp.
 */
angular.module('angularSeedApp')
  .service('getTools', function ($http) {
    // Get tools from server
    $http.get('/sctoolbox').
      then(function(response) {
        // this callback will be called asynchronously
        // when the response is available
        var tools = {"Ouiii":"Ca fonctionne"};
        return tools;
      }, function(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        var tools = {"error":"The server return an error"};
        return tools;
      });
  });
