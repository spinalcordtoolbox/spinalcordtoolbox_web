(function() {
  app.config([
    '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      var FORM_CONTENT_TYPE;
      FORM_CONTENT_TYPE = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };
      $urlRouterProvider.otherwise('/');
      $stateProvider.state('app', {
        url: '/',
        resolve: {
          user: [
            '$http', function($http) {
              return $http.post('/api/user/me').then(function(response) {
                return response.data;
              }, function(response) {
                return {};
              });
            }
          ]
        },
        templateUrl: 'app.html',
        controller: [
          '$scope', 'user', function($scope, user) {
            $scope.APP_NAME = 'spinalcordweb';
            return $scope.user = user;
          }
        ]
      });
      return $stateProvider.state('category', {
        url: '/category',
        resolve: {
          user: [
            '$http', function($http) {
              return $http.post('/api/user/me').then(function(response) {
                return response.data;
              }, function(response) {
                return {};
              });
            }
          ]
        },
        templateUrl: 'category/list.html',
        controller: 'categoryList'
      }).state('viewer', {
        url: '/viewer',
        templateUrl: 'viewer/volume-viewer-PolyCustom.html'
      }).state('login', {
        url: '/login',
        templateUrl: 'user/login_form.html',
        controller: [
          '$scope', '$http', '$state', function($scope, $http, $state) {
            $scope.form = {};
            $scope.errors = {};
            return $scope.doLogin = function() {
              return $http.post('/api/login', $.param($scope.form), {
                headers: FORM_CONTENT_TYPE
              }).then(function(response) {
                return $state.go('app', {}, {
                  reload: true
                });
              }, function(response) {
                if (response.status === 400) {
                  return $scope.errors = response.data;
                } else {
                  return $scope.errors = {
                    login_id: "wrong id or password"
                  };
                }
              });
            };
          }
        ]
      }).state('logout', {
        url: '/logout',
        template: 'logging out...',
        controller: [
          '$http', '$state', function($http, $state) {
            return $http.post('/api/logout', {}, {
              headers: FORM_CONTENT_TYPE
            })["finally"](function(response) {
              return $state.go('app', {}, {
                reload: true
              });
            });
          }
        ]
      }).state('register', {
        url: '/register',
        templateUrl: 'user/register.html',
        controller: [
          '$scope', '$http', '$state', function($scope, $http, $state) {
            $scope.form = {};
            $scope.errors = {};
            return $scope.doRegister = function() {
              return $http.post('/api/user/register', $.param($scope.form), {
                headers: FORM_CONTENT_TYPE
              }).then(function(response) {
                return $state.go('app', {}, {
                  reload: true
                });
              }, function(response) {
                if (response.status === 400) {
                  return $scope.errors = response.data;
                } else {
                  return $scope.errors = {
                    email: "could not register with this email"
                  };
                }
              });
            };
          }
        ]
      }).state('activate', {
        url: '/activate/:cmdId',
        templateUrl: 'user/activate.html',
        controller: [
          '$scope', '$http', '$state', function($scope, $http, $state) {
            $scope.form = {};
            $scope.form.command_id = $state.params.cmdId;
            return $scope.doActivate = function() {
              return $http.post('/api/user/activate', $.param($scope.form), {
                headers: FORM_CONTENT_TYPE
              }).then(function(result) {
                return $state.go('app', {}, {
                  reload: true
                });
              }, function(response) {
                if (response.status === 400) {
                  return $scope.errors = response.data;
                } else {
                  return $scope.errors = {
                    email: "could not create your account"
                  };
                }
              });
            };
          }
        ]
      }).state('forgot', {
        url: '/forgot',
        templateUrl: 'user/forgot.html',
        controller: [
          '$scope', '$http', '$state', function($scope, $http, $state) {
            $scope.form = {};
            $scope.errors = {};
            return $scope.doForgot = function() {
              return $http.post('/api/user/forgot', $.param($scope.form), {
                headers: FORM_CONTENT_TYPE
              }).then(function(response) {
                return $state.go('app', {}, {
                  reload: true
                });
              }, function(response) {
                if (response.status === 400) {
                  return $scope.errors = response.data;
                } else {
                  return $scope.errors = {
                    email: "could not reset password with this email"
                  };
                }
              });
            };
          }
        ]
      }).state('reset', {
        url: '/reset/:cmdId',
        templateUrl: 'user/reset.html',
        controller: [
          '$scope', '$http', '$state', function($scope, $http, $state) {
            $scope.form = {};
            $scope.form.command_id = $state.params.cmdId;
            return $scope.doReset = function() {
              return $http.post('/api/user/reset', $.param($scope.form), {
                headers: FORM_CONTENT_TYPE
              }).then(function(result) {
                return $state.go('app', {}, {
                  reload: true
                });
              }, function(response) {
                if (response.status === 400) {
                  return $scope.errors = response.data;
                } else {
                  return $scope.errors = {
                    email: "could not reset your password"
                  };
                }
              });
            };
          }
        ]
      });
    }
  ]);

}).call(this);

(function() {
  app.controller("categoryList", function($scope, categoryProvider) {
    $scope.categories = categoryProvider.getCategories();
    return $scope.category = categoryProvider.getName();
  });

}).call(this);

(function() {
  app.directive("decorateCategory", function() {
    return {
      templateUrl: "category/directive/decorator.html",
      restrict: "E"
    };
  });

}).call(this);

(function() {
  var categories;

  categories = [
    {
      id: 1,
      name: "films"
    }, {
      id: 2,
      name: "musiques"
    }
  ];

  app.service("categoryProvider", function() {
    this.getCategories = function() {
      return categories;
    };
    this.getName = function() {
      return categories[0].name;
    };
    return null;
  });

}).call(this);
