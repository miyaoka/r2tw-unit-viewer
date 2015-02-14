'use strict';

angular.module('r2twDbApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.readme', {
        url: '/readme',
        templateUrl: 'app/readme/readme.html',
        controller: 'ReadmeCtrl'
      });
  });