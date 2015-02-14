'use strict';

angular.module('r2twDbApp')
  .factory('UnitsData', function (Api, I18n) {

    var _factions = [];

    function _getFactionsUnits(factionKeys){
      if(0 >= factionKeys.length){
        return;
      }
      _getFactionUnits(factionKeys.shift(), function(units){
        UnitsData.units = UnitsData.units.concat(units);
        _getFactionsUnits(factionKeys);
      });
    }
    function _getFactionUnits(factionKey, cb){
      Api.main_units.query({
        faction: factionKey
      }, function(items){
  //      $scope.gridOptions.data = items;
        var units = [];
        items.forEach(function(item){
          if(item.is_naval || item.land_unit.category == 'artillery'){
            return;
          }
          var lu = item.land_unit;
          item.faction = factionKey;
          item.hit_point = lu.man_entity.hit_points + lu.bonus_hit_points;



          if(!lu.primary_missile_weapon){
//            item.land_unit.ammo = 0;
          }

          item.projectile = lu.primary_missile_weapon
          ? lu.primary_missile_weapon.default_projectile
          : {
            base_reload_time: 0,
            ap_damage:0,
            damage:0,
            effective_range:0
          };

          item.reload_time = item.projectile.base_reload_time * (1 - lu.reload * .01);
          item.missile_damage = item.projectile.ap_damage + item.projectile.damage;
          item.missile_damage_total = item.missile_damage * lu.ammo;
          item.shot_per_minute = item.reload_time == 0 ? 0 : 60 / item.reload_time;
          item.damage_per_minute = item.missile_damage * item.shot_per_minute;

          item.weapon_damage = lu.primary_melee_weapon.damage + lu.primary_melee_weapon.ap_damage;
          item.weapon_max_bonus = Math.max(
            lu.primary_melee_weapon.bonus_v_cavalry,
            lu.primary_melee_weapon.bonus_v_elephants,
            lu.primary_melee_weapon.bonus_v_infantry
          );
          item.projectile_max_bonus = !item.projectile ? 0 : Math.max(
            item.projectile.bonus_v_cavalry,
            item.projectile.bonus_v_elephant,
            item.projectile.bonus_v_infantry
          );
          item.defence = lu.melee_defence + lu.shield.shield_defence_value;
          item.armour = lu.armour.armour_value + lu.shield.shield_armour_value;
          item.v_missiles = (lu.armour.bonus_v_missiles ? 1 : 0) + (lu.armour.weak_v_missiles ? -1 : 0);

          item.category_class = lu.category + '/' + lu.class;
          item.i18n_name = I18n['land_units_onscreen_name_' + lu.key];
          units.push(item);
        });
        cb(units);

      });
    }
    var UnitsData = {
      units: [],
      get factions(){
        return _factions;
      },
      set factions(items){
        _factions = items;
        UnitsData.getUnits();
      },
      getUnits : function(){
        UnitsData.units = [];
        if(0 < _factions.length){
          _getFactionsUnits(angular.copy(_factions));
        }
      },
      getAllUnits: function(){
        _getFactionUnits(null, function(units){
          UnitsData.units = UnitsData.units.concat(units);
        });
      }
    };
    return UnitsData;
  });
