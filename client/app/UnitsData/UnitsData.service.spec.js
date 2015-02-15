'use strict';

describe('Service: UnitsData', function () {

  // load the service's module
  beforeEach(module('r2twDbApp'));

  // instantiate service
  var UnitsData;
  beforeEach(inject(function (_UnitsData_) {
    UnitsData = _UnitsData_;
  }));

  it('should do something', function () {
    expect(!!UnitsData).toBe(true);
  });

});
