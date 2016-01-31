app.directive('playerTable', ['componentsPath', function(componentsPath) {
  return {
    restrict: 'E',
    templateUrl: componentsPath + '/playerTable/playerTable.html',
    link: function(scope, elm, attrs) {
      scope.hit = function() {

      };

      scope.stand = function() {

      };
    }
  };
}]);
