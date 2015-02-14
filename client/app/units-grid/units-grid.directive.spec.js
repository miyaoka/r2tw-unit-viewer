'use strict';

describe('Directive: unitsGrid', function () {

  // load the directive's module and view
  beforeEach(module('r2twDbApp'));
  beforeEach(module('app/units-grid/units-grid.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<units-grid></units-grid>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the unitsGrid directive');
  }));
});