'use strict';

describe('Directive: equipIcon', function () {

  // load the directive's module and view
  beforeEach(module('r2twDbApp'));
  beforeEach(module('app/equip-icon/equip-icon.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<equip-icon></equip-icon>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the equipIcon directive');
  }));
});