app.service('infoService', [function() {
  'use strict';

  this.info = function(message) {
    angular.element('.info .content').html(message);
  };
}]);
