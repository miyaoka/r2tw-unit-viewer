'use strict';

angular.module('r2twDbApp')
  .filter('toI18n', function (I18n) {
    return function (input) {
      return I18n[input];
    };
  });
