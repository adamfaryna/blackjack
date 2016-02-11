'use strict';

describe('blackjack module', function () {
  beforeEach(function () {
    module('blackjack');
    jasmine.addMatchers({
      toEqualArray: function () {
        return {
          compare: function (actual, expected) {
            var result = {};

            if (angular.isArray(actual) || actual.length !== expected.length) {
              result.pass = false;
              result.message = "Actual array '" + JSON.stringify(actual) +
                "' is not the same as expected array '" + JSON.stringify(expected) + "'.";

            } else {
              for (var i = 0; i !== expected.length; i++) {
                if (actual[i] !== expected[i]) {
                  result.pass = false;
                  result.message = "Elements are not equal '" + actual[i] + " and " + expected[i] + "'.";
                }
              }
            }

            result.pass = result.pass || true;
            return result;
          }
        };
      }
    });
  });

  describe('startFrom filter', function () {
    var input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    it('should be defined', inject(function (startFromFilter) {
        expect(startFromFilter).toBeDefined();
      })
    );

    it('should return all array elements except first', inject(function (startFromFilter) {
        expect(startFromFilter(input, 1)).toEqualArray(input.slice(1));
      })
    );

    it('should return all array elements except first 5 elements', inject(function (startFromFilter) {
        expect(startFromFilter(input, 5)).toEqualArray(input.slice(1));
      })
    );
  });
});
