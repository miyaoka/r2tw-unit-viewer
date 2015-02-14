'use strict';

angular.module('r2twDbApp')
  .controller('UnitsFactionCtrl', function ($scope, $stateParams, UnitsData) {

    UnitsData.factions = !$stateParams.faction
    ? [] : Array.isArray($stateParams.faction)
    ? $stateParams.faction : [$stateParams.faction];


  });
