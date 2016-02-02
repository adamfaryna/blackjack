'use strict';

app.directive('dialog', ['componentsPath', function(componentsPath) {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: componentsPath + '/dialog/dialog.html',
    link: function (scope, elm) {
      scope.$on('show-dialog', function (e, data) {
        scope.title = data.title;
        scope.message = data.message;

        $('.dialog', elm).dialog('open');
      });

      $('.dialog', elm).dialog({
        modal: true,
        //autoOpen: false,
        buttons: {
          ok: function() {
            $(this).dialog('close');
          }
        }
      });
    }
  };
}]);
