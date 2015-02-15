'use strict';

angular.module('r2twDbApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });