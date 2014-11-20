'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
        .filter('total', function () {
        return function (input, property) {
            var i = input instanceof Array ? input.length : 0;
            if (typeof property === 'undefined' || i === 0) {
                return i;
            } else if (isNaN(input[0][property])) {
                throw 'filter total can count only numeric values';
            } else {
                var total = 0;
                while (i--)
                    total += input[i][property];
                return total;
            }
        };
    })
}]);
