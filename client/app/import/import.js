'use strict';

angular.module('r2twDbApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.import', {
//        url: '/import',
        templateUrl: 'app/import/import.html',
        controller: 'ImportCtrl'
      });
  });