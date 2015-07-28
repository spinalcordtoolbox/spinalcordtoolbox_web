'use strict';

app
    .directive('decorateItem', function () {
        return {
            templateUrl: 'views/item/directive/decorator.html',
            restrict: 'E'
        }
    })
    .directive('decorateCategory', function () {
        return {
            templateUrl: 'views/category/directive/decorator.html',
            restrict: 'E'
        }
    })
;