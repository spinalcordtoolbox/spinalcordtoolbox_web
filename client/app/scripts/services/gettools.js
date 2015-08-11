'use strict';

/**
 * @ngdoc service
 * @name angularSeedApp.getTools
 * @description
 * # getTools
 * Service in the angularSeedApp.
 */
angular.module('angularSeedApp')
  .service('getTools', function () {
    // Get tools from server
    var tools = [
      {
        "value": 0,
        "displayName": "Hernandez",
        "description": "Dawson"
      },
      {
        "value": 1,
        "displayName": "Foley",
        "description": "Porter"
      },
      {
        "value": 2,
        "displayName": "Nunez",
        "description": "Knight"
      },
      {
        "value": 3,
        "displayName": "Victoria",
        "description": "Rowe"
      },
      {
        "value": 4,
        "displayName": "Berg",
        "description": "Gross"
      },
      {
        "value": 5,
        "displayName": "Carver",
        "description": "Perkins"
      },
      {
        "value": 6,
        "displayName": "Warner",
        "description": "Hopkins"
      },
      {
        "value": 7,
        "displayName": "Meyers",
        "description": "Alston"
      },
      {
        "value": 8,
        "displayName": "Gallagher",
        "description": "Silva"
      }
    ];
    return tools;
  });
