app.run(['$rootScope', function($rootScope) {
  $rootScope.constructor.prototype.$off = function(eventName, fn) {
    if (this.$$listeners) {
      var eventArr = this.$$listeners[eventName];

      if (eventArr) {
        for(var i = 0; i < eventArr.length; i++) {
          if(eventArr[i] === fn) {
            eventArr.splice(i, 1);
          }
        }
      }
    }
  }
}]);
