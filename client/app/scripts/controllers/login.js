'use strict';

/**
 * @ngdoc function
 * @name angularSeedApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the angularSeedApp
 */
angular.module('angularSeedApp')
  .controller('LoginCtrl', ["$scope", "Auth", "$localStorage", "$http", "$location",
    function($scope, Auth, $localStorage, $http, $location) {
      $scope.$storage = $localStorage;

      /*
      * Idées pour le login/register/logout
      *
      * 1) register avec un POST qui va ajouter une entrée utilisateur dans la base de donnée.
      * login avec un get qui va vérifier user/clé cryptée et si la réponse est ok alors écrire dans le local storage
      * sinon renvoie une erreur et log l'ip avec le nombre d'essais dans la base de donnée?
      * logout supprimer la variable dans le localstorage
      * Recuperer le password -> mail à l'admin ou envoi d'un mail avec lien et token unique
      *
      * 2) ajouter un envoie de mail pour valider le compte lorsque l'étape d'enregistrement est terminée
      *
      * 3)..sinon personae ?
      * */

      /*var auth = Auth;
      $scope.auth = Auth;
      var ref = new Firebase("https://isct.firebaseio.com");


      // any time auth status updates, add the user data to scope
      auth.$onAuth(function(authData) {
        $scope.authData = authData;
        $scope.$storage.uid = authData.uid.split(':')[1];
        $scope.$storage.name = authData.password.email.replace(/@.*!/, '');

      });*/

      $scope.logout = function(){
        //Auth.$unauth();
        $scope.$storage.uid = null;
      };

      $scope.login = function() {
        /*$scope.authData = null;
        $scope.error = null;

        ref.authWithPassword({
          email    : $scope.email,
          password : $scope.password
        }, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
            $scope.error = error;
          } else {
            console.log("Authenticated successfully with payload:", authData);
          }
        });*/

        //Add function to send infos with http.post
        $http.post('/login', {email:$scope.email, password:$scope.password}).
          then(function(response) {
            //@TODO: Go to the toolbox page and add a case if the response is wrong
            if (response.data.ok){
              $scope.$storage.uid=response.data.uid;
              $scope.$storage.name = $scope.email.replace(/@.*!/, '');
            }
            else{
              $scope.$storage.uid=null; //to be sure
              $scope.error = response.data.error; //display error message
            }
          });
      };
    }
  ]);
