'use strict';

angular.module('r2twDbApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.changelog', {
        url: '/changelog',
        templateUrl: 'app/changelog/changelog.html',
        controller: 'ChangelogCtrl'
      });
  });