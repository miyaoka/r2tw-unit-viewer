'use strict';

angular.module('r2twDbApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ngFileReader',
  'cb.x2js',
  'ui.grid',
  'ui.grid.resizeColumns',
  'ui.grid.pinning',
//  'ui.grid.pagination',
  'ui.grid.selection',
  'btford.markdown'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });