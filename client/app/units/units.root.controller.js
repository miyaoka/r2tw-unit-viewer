'use strict';

angular.module('r2twDbApp')
  .controller('UnitsRootCtrl', function ($scope, Api, I18n, UnitsData) {
    $scope.data = UnitsData;
    $scope.graphMul = 1;
    var startPosFactions = {};

    $scope.searchFactions = function(){
      var filteredFactions = {};
      angular.forEach(startPosFactions, function(mgs, campaign){
        var filteredMgs = {};
        angular.forEach(mgs, function(factions, mg){
          var matchedFactions = [];

          factions.forEach(function(f){
            [f.faction.screen_name, f.faction.i18n_name].some(function(faction_name){
              if(faction_name.match(RegExp($scope.factionNameFilter, 'i')) ){
                matchedFactions.push(f);
                return true;
              }
            })
          });
          if(0 < matchedFactions.length){
            filteredMgs[mg] = matchedFactions;
          }
        });
        filteredFactions[campaign] = filteredMgs;
      });
      $scope.startPosFactions = filteredFactions;
    };


    $scope.campaigns = [];
    Api.campaigns.query(function(items){
      var campaigns = [];
      items.forEach(function(item){
        if(!item.is_tutorial){
          campaigns.push(item);
        }
      });
      campaigns.sort(function(a, b){
        return a.campaign_order - b.campaign_order;
      })

      $scope.campaigns = campaigns;
    });

    Api.start_pos_factions.query(function(items){
      startPosFactions = {};
      items.forEach(function(item){
        item.faction.i18n_name = I18n['factions_screen_name_' + item.faction.key];

        if(item.faction.key.match(/_civil_war$/)){
          return;
        }

        if(!startPosFactions[item.campaign]){
          startPosFactions[item.campaign] = {};
        }
        if(!startPosFactions[item.campaign][item.faction.military_group]){
          startPosFactions[item.campaign][item.faction.military_group] = [];
        }

        startPosFactions[item.campaign][item.faction.military_group].push(item);
      });

      $scope.searchFactions();
    });
  });