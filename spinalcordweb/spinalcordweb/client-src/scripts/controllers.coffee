app
  .controller "categoryList", ($scope, categoryProvider) ->
    $scope.categories = categoryProvider.getCategories()
    $scope.category = categoryProvider.getName()