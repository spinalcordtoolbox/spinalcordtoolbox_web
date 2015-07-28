'use strict';

app
    .controller('categoryIndex', function ($scope) {
    })

    .controller('categoryList', function ($scope, categoryProvider) {
        $scope.categories = categoryProvider.getCategories();
    })

    .controller('categoryCreate', function ($scope, categoryProvider) {
        $scope.categories = categoryProvider.getCategories();

        $scope.createCategory = function (category) {
            $scope.categories = categoryProvider.create(category);
        }
    })

    .controller('categoryRemove', function ($scope) {
    })
;