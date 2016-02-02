'use strict';

app.directive('dialog', [function() {
  return {
    restrict: 'E',
    scope: {},
    template: '<p>{{message}}</p>',
    link: function (scope, elm) {
      scope.$on('show-dialog', function (e, data) {
        scope.message = data.message;

        var obj = $(elm);

        obj.dialog({
          title: data.title || 'Info'
        });

        obj.dialog('open');
      });

      $(elm).dialog({
        dialogClass: 'dialog',
        modal: true,
        resizable: false,
        autoOpen: false,
        buttons: {
          ok: function() {
            $(this).dialog('close');
          }
        }
      });
    }
  };
}]);
