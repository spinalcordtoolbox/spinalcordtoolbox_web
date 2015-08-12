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
        "description": "Dawson",
        "schema": {
          type: "object",
          properties: {
            name: {type: "string", minLength: 2, title: "Test", description: "normalement ca change"},
            title: {
              type: "string",
              enum: ['dr', 'jr', 'sir', 'mrs', 'mr', 'NaN', 'dj']
            }
          }
        }
      },
      {
        "value": 1,
        "displayName": "Foley",
        "description": "Porter",
        "schema": {
          type: "object",
          properties: {
            name: {type: "integer", minLength: 2, title: "Un Chiffre", description: "put a number here", default:34},
            food: {
              type: "string",
              enum: ['pain', 'oeuf', 'bonbon']
            }
          }
        }
      },
      {
        "value": 2,
        "displayName": "Nunez",
        "description": "Knight",
        "schema": {
          type: "object",
          properties: {
            name: {type: "string", minLength: 2, title: "Name", description: "Name or alias"},
            title: {
              type: "string",
              title: "helllo",
              enum: ['dr', 'jr', 'sir', 'mrs', 'mr', 'NaN', 'dj']
            },
            encore: {
              type: "string",
              title: "One more",
              enum: ['dr', 'jr', 'sir', 'mrs', 'mr', 'NaN', 'dj']
            }
          }
        }
      },
      {
        "value": 3,
        "displayName": "Victoria",
        "description": "Rowe",
        "schema": {
          type: "object",
          properties: {
            name: {type: "string", minLength: 2, title: "Name", description: "Name or alias"},
            title: {
              type: "string",
              enum: ['dr', 'jr', 'sir', 'mrs', 'mr', 'NaN', 'dj']
            }
          }
        }
      },
      {
        "value": 4,
        "displayName": "Berg",
        "description": "Gross",
        "schema": {}
      },
      {
        "value": 5,
        "displayName": "Carver",
        "description": "Perkins",
        "schema": {}
      },
      {
        "value": 6,
        "displayName": "Warner",
        "description": "Hopkins",
        "schema": {}
      },
      {
        "value": 7,
        "displayName": "Meyers",
        "description": "Alston",
        "schema": {}
      },
      {
        "value": 8,
        "displayName": "Gallagher",
        "description": "Silva",
        "schema": {}
      }
    ];
    return tools;
  });
