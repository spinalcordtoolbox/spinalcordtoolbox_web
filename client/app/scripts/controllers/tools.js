'use strict';

/**
 * @ngdoc function
 * @name angularSeedApp.controller:ToolsCtrl
 * @description
 * # ToolsCtrl
 * Controller of the angularSeedApp
 */
angular.module('angularSeedApp')
  .controller('ToolsCtrl', ['$scope', '$resource', 'SharedDataService', 'getTools', function ($scope, $resource, SharedDataService, getTools) {
    var sctoolbox = $resource('/sctoolbox');
    $scope.tools = sctoolbox.query(); //Because the server return an array, if it was a real json that would be .get()
    $scope.toolSelected = {};

    $scope.NewFile = SharedDataService;

    $scope.$watch('NewFile.pathArray', function () {
      $scope.inputs = $scope.NewFile.pathArray;
    });

    //Launch the tool with the user's config
    $scope.compute = function (tool_name, args_user, inputs) {
      //envoyer les arg à la fonction choisie sur le server !
      console.log("le nom du tool:" + tool_name);
      console.log("les registered tools:" + args_user);
      console.log("le path des inputs:" + inputs);
      var args_tool = $scope.toolSelected['_sa_instance_state']['py/state']['ext.mutable.values'][0];

      for (var i in args_tool) {

        for (var arg_user_order in args_user) {
          var arg_tool = args_tool[i];

          if (arg_tool["order"] == arg_user_order) {

            arg_tool["value"] = args_user[arg_user_order]
            console.log(arg_tool["value"])
          }

        }

      }

      sctoolbox.save({tool_name: tool_name, args: args_user, inputs: inputs});

    };

    //Generate the form associate with the selected tool
    $scope.change = function () {
      var prop = {};
      var args = $scope.toolSelected['_sa_instance_state']['py/state']['ext.mutable.values'][0];
      var requir = [];
      for (var i in args) {
        var arg = args[i];
        var name = arg['name'];
        var type = arg['type_value'];
        var description = arg['description'];
        var help = arg['help'];
        var default_value = arg["default_value"];
        var order = arg["order"];
        var example = arg["example"];


        if ((example) && (example.length > 1) && (typeof(example) === "object")) {
          prop[order] = {
            "title": name,
            "type": "string",
            "default": default_value,
            "description": description,
            "order": order,
            "enum": example
          };
        }
        else if (name) {
          console.log(example);
          prop[order] = {
            "title": name,
            "type": "string",
            "default": default_value,
            "description": description,
            "order": order,
            "x-schema-form": {
              "placeholder": example
            }
          };
        }

      }

      //@TODO: fix required field
      console.log(prop);
      $scope.schema = {
        "type": "object",
        "title": "args",
        "properties": prop
      }
    };


    $scope.form = [
      "*",
      {
        "type": "submit",
        "title": "OK"

      }
    ];

    $scope.args = {};
  }]);
