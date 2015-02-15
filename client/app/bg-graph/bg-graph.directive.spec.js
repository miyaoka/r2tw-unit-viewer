'use strict';

describe('Directive: bgGraph', function () {

  // load the directive's module and view
  beforeEach(module('r2twDbApp'));
  beforeEach(module('app/bg-graph/bg-graph.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bg-graph></bg-graph>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the bgGraph directive');
  }));
});