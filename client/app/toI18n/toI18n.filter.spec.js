'use strict';

describe('Filter: toI18n', function () {

  // load the filter's module
  beforeEach(module('r2twDbApp'));

  // initialize a new instance of the filter before each test
  var toI18n;
  beforeEach(inject(function ($filter) {
    toI18n = $filter('toI18n');
  }));

  it('should return the input prefixed with "toI18n filter:"', function () {
    var text = 'angularjs';
    expect(toI18n(text)).toBe('toI18n filter: ' + text);
  });

});
