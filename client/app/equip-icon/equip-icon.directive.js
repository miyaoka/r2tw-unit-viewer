'use strict';

angular.module('r2twDbApp')
  .directive('equipIcon', function () {
    var iconFiles = {
      weapon: {
        'spear' : 'W_Spear001.png',
        'club' : 'W_Mace001.png',
        'axe' : 'W_Axe001.png',
        'sword' : 'W_Dagger002.png',
        'falx' : 'W_Dagger003.png',
        'sword_long' : 'W_Sword001.png'
      },
      armour: {
        'body': 'null.png',
        'cloth' : 'A_Clothing01.png',
        'leather' : 'A_Clothing02.png',
        'chainmail' : 'A_Armor04.png',
        'segmented': 'A_Armour02.png',
        'bronze' : 'A_Armour03.png'
      },
      shield: {
        'body': 'null.png',
        'wicker': 'E_Wood01.png',
        'wood': 'E_Wood02.png',
        'bronze': 'E_Metal01.png'
      },
      projectile: {
        'arrow': 'W_Bow08.png',
        'javelin': 'W_Spear005.png',
        'small_stone': 'I_Rock02.png',

      }
    };
    var tooptipKeys = {
      weapon: 'damage ap_damage first_strike bonus_v_cavalry bonus_v_elephants bonus_v_infantry armour_penetrating armour_piercing shield_piercing weapon_length audio_material'.split(' '),
      armour: 'armour_value bonus_v_missiles weak_v_missiles audio_material'.split(' '),
      shield: 'shield_armour_value shield_defence_value audio_material'.split(' '),
      projectile: 'effective_range max_elevation muzzle_velocity marksmanship_bonus damage ap_damage collision_radius base_reload_time calibration_distance bonus_v_infantry bonus_v_cavalry bonus_v_elephant projectile_display projectile_audio'.split(' ')
    }
    return {
      templateUrl: 'app/equip-icon/equip-icon.html',
      restrict: 'E',
//      replace: true,
      scope: {
        'item' : '=',
        'type' : '@'
      },
      link: function (scope, element, attrs) {
        scope.$watch('item', function() {
//          console.log('change');

          var itemKey = !scope.item ? null : (scope.type === 'projectile') ? scope.item.projectile_audio : scope.item.audio_material;
          var tooptips = [];
          if(itemKey){
            scope.iconFile = iconFiles[scope.type][itemKey];
            tooptips = [scope.item.key, '--------'];
            tooptipKeys[scope.type].forEach(function(key){
              tooptips.push(key + ': ' + scope.item[key]);
            });

          } else {
            scope.iconFile = 'null.png';
          }

          scope.htmlTooltip = tooptips.join('<br>');
        });
      }
    };
  });