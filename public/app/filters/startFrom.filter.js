app.filter('startFrom', function() {
  'use strict';

  return function(input, start) {
    if (input) {
      start = +start;
      return input.slice(start);
    }

    return [];
  }
});
