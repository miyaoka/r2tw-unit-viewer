'use strict';

describe('Service: I18n', function () {

  // load the service's module
  beforeEach(module('r2twDbApp'));

  // instantiate service
  var I18n;
  beforeEach(inject(function (_I18n_) {
    I18n = _I18n_;
  }));

  it('should do something', function () {
    expect(!!I18n).toBe(true);
  });

});
