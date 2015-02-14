'use strict';

angular.module('r2twDbApp')
  .controller('UnitsAllCtrl', function ($scope, UnitsData) {

    UnitsData.factions = [];
    UnitsData.getAllUnits();

  });
