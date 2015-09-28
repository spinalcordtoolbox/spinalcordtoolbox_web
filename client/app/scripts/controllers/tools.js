'use strict';

/**
 * @ngdoc function
 * @name angularSeedApp.controller:ToolsCtrl
 * @description
 * # ToolsCtrl
 * Controller of the angularSeedApp
 */
angular.module('angularSeedApp')
  .controller('ToolsCtrl', ['$scope', '$resource', 'SharedDataService', 'getTools', '$localStorage', function ($scope, $resource, SharedDataService, getTools, $localStorage) {

    $scope.$storage = $localStorage;   //Initialization of the local storage

    //Initalize the communication with the server on /sctoolbox
    var sctoolbox = $resource('/sctoolbox');
    //GET all the tool
    $scope.tools = sctoolbox.query(); //Because the server return an array, if it was a real json that would be .get()
    $scope.toolSelected = {};

    $scope.NewFile = SharedDataService;

    $scope.$watch('NewFile.pathArray', function () {
      $scope.inputs = $scope.NewFile.pathArray; //Update a shared variable with the selected files in the tree
      //$scope.$$childTail.model['1'] = $scope.NewFile.pathArray;
    });

    //Launch the tool with the user's config
    //TODO: Return a proper JSON with all the filled value
    $scope.compute = function (tool_name, args_user, inputs) {
      //envoyer les arg à la fonction choisie sur le server !
      var args_tool = $scope.toolSelected['_sa_instance_state']['py/state']['ext.mutable.values'][0];
      for (var i in args_tool) {

        for (var arg_user_order in args_user) {
          var arg_tool = args_tool[i];
          //Update the value in the original JSON with the value entered by the user
          if (arg_tool["order"] == arg_user_order) {
            arg_tool["value"] = args_user[arg_user_order];
          }
        }

      }
      //POST Request on /sctoolbox in order to launch the toolbox
      sctoolbox.save({tool_name: tool_name, args: args_user, uid: $scope.$storage.uid});

    };

    Array.prototype.move = function (old_index, new_index) {
      if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
          this.push(undefined);
        }
      }
      this.splice(new_index, 0, this.splice(old_index, 1)[0]);
      return this; // for testing purposes
    };

    //Generate the form associate with the selected tool
    //TODO: modify the order to be: Name, description, example, inputbox
    $scope.change = function () {
      var prop = {};
      var sections = [];
      //var item = [{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0},{key:0}];
      var item = [];
      var z=0;
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
        var section = arg["section"];
        var mandatory = arg["mandatory"];
        var mandatoryClass = "";
        z++;

        if (mandatory){
          description = "Mandatory: "+description;
          mandatoryClass = "mandatory";
        }
        if (typeof(section)!="undefined") {

          var tag = 0;
          for (var m in sections){

            if(sections[m].title){ //append to title
              if (sections[m].title===section){ //verify if the title is the same as the section name
                sections[m].items.push({key:order}); //add an item to the section
                tag = 1;
              }
            }
            else if (tag === 0){ //add new section
              sections.push(
              {
                title: section,
                items: [{key:order}] //Add the first item
              });
            }
          }

        }


        //If the example is an array create a SELECT
        if ((example) && (example.length > 1) && (typeof(example) === "object")) {
          prop[order] = {
            "title": name,
            "type": "string",
            "default": default_value,
            "description": description,
            "order": order,
            "enum": example,
            "x-schema-form": {
              "htmlClass": mandatoryClass

            }
          };
        }
        //Or just put the example as placeholder (information inside the input)
        else if (name && type!=null) {
          prop[order] = {
            "title": name,
            "type": "string",
            "default": default_value,
            "description": description,
            "order": order,
            "x-schema-form": {
              "placeholder": example,
              "htmlClass": mandatoryClass
            }
          };
        }

        else if (type===null){
          prop[order] = {
            "title": name,
            "type": "boolean",
            "default": default_value,
            "description": description,
            "order": order,
            "x-schema-form": {
              "placeholder": example,
              "htmlClass": mandatoryClass
            }
          };
        }

      }



      //@TODO: add required field
      $scope.schema = {
        "type": "object",
        //"title": "args",
        "properties": prop
      };
      sections.reverse();
      $scope.form = [
        {
          type: "tabs",
          tabs: sections
        }
      ];


      //console.log($scope.form);

    };


    $scope.form = [];

    $scope.args = {}; //the arguments entered by the user

    function sortNumber(a,b) {
      return a - b;
    }

  }]);
