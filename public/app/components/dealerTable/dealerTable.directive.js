app.directive('dealerTable', ['componentsPath', function(componentsPath) {
  return {
    restrict: 'E',
    templateUrl: componentsPath + '/dealerTable/dealerTable.html',
    link: function(scope, elm, attrs) {

    }
  };
}]);
