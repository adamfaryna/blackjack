'use strict';

app.service('infoService', [function() {
  this.info = function(message) {
    angular.element('.info .content').html(message);
  };
}]);
