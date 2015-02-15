'use strict';

angular.module('r2twDbApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.units', {
        url: '',
        templateUrl: 'app/units/units.root.html',
        controller: 'UnitsRootCtrl'
      })

      .state('main.units.all', {
        url: '/all_units',
        template: '全ユニット表示',
        controller: 'UnitsAllCtrl'
      })
      .state('main.units.faction', {
        url: '/?faction',
        templateUrl: 'app/units/units.faction.html',
        controller: 'UnitsFactionCtrl'
      })
      /*
      .state('main.units.home', {
        url: '/',
        templateUrl: 'app/units/units.home.html',
        controller: 'UnitsHomeCtrl'
//        templateUrl: 'app/units/units.root.html',
//        controller: 'UnitsRootCtrl'
      });
*/
  });