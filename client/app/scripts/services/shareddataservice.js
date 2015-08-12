'use strict';

/**
 * @ngdoc service
 * @name angularSeedApp.SharedDataService
 * @description
 * # SharedDataService
 * Service in the angularSeedApp.
 */
angular.module('angularSeedApp')
  .service('SharedDataService', function () {
     var NewFile = {
        path: '',
        text: '',
        state: false,
        pathArray: []
    };
    return NewFile;
});
