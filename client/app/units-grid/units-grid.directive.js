'use strict';

angular.module('r2twDbApp')
  .directive('unitsGrid', function () {
    return {
      templateUrl: 'app/units-grid/units-grid.html',
      restrict: 'E',
      scope:{
        units: '=',
        control: '='
      },
      link: function (scope, element, attrs) {
      },
      controller:function($scope, uiGridConstants, I18n, UnitsData, $timeout) {

        var cellTemplateBool = '<div class="ui-grid-cell-contents"><span class="glyphicon glyphicon-star" ng-show="COL_FIELD"></span></div>';

        function refreshGrid(){
          $scope.gridApi.grid.refresh();
          $scope.gridApi.core.handleWindowResize();
        }

        $timeout(refreshGrid, 100);

        $scope.control = {
          resetSort : function(){
            $scope.gridApi.grid.columns.map(function(item){
              item.sort = item.colDef.sort || {};
              return item;
            });
            refreshGrid();
          },
          setColWidth: function(mul){
            if(!Number.isFinite(mul)){
              return;
            }
            $scope.gridApi.grid.columns.map(function(item){
              if(item.colDef.graph){
                item.width = item.colDef.width * Math.max(.5, mul);
              }
              return item;
            });
            refreshGrid();
          },
          restoreColWidth: function(){
              console.log($scope.gridApi.grid);
            $scope.gridApi.grid.columns.map(function(item){
              item.width = item.colDef.width;
              return item;
            });
            refreshGrid();
          }
        }

        $scope.gridOptions = {
          data: [],
          enableColumnResizing: true,
          enableColumnMenus: false,
          enableRowSelection: false,
          enableRowHeaderSelection: false,
    //      enableScrollbars: uiGridConstants.scrollbars.ALWAYS,
          enableVerticalScrollbar: uiGridConstants.scrollbars.ALWAYS,
          enableHorizontalScrollbar: uiGridConstants.scrollbars.ALWAYS,
    //      multiSelect: true,
    //      noUnselect: false,
    //      modifierKeysToMultiSelect: true,
          showFooter: true,
          showGridFooter: true,
    //      showColumnFooter: true,
    //      horizontalScrollThreshold: 1,
          enableFiltering: true,
    //      scrollThrottle: 10,
          scrollThreshold: 1,
          excessColumns: 20,
          excessRows: 4,

          onRegisterApi: function(gridApi) {
            $scope.gridApi = gridApi;
            refreshGrid();
          },

          columnDefs: [
    //        { field: 'unit'  },
            {
              field: 'faction',
              name: '勢力名',
              pinnedLeft: true,
    /*
              sort: {
                direction: uiGridConstants.DESC,
                priority: 0
              },
    */
              width: 60,
              get visible(){ return (1 < UnitsData.factions.length) },
              cellTemplate: '<div class="ui-grid-cell-contents category_{{COL_FIELD}}">{{("factions_screen_name_" + COL_FIELD) | toI18n}}</div>'

            },
            {
              get visible(){ return (0 < UnitsData.factions.length) },
              width: 24,
              cellTemplate: '<div class="ui-grid-cell-contents"><span class="glyphicon glyphicon-star" ng-show="COL_FIELD"></span></div>',
              pinnedLeft: true,
              field: 'com_perm',
              name: '将軍'
            },
            {
              field: 'i18n_name',
              name: 'ユニット名',
              width: 160,
              pinnedLeft: true,
    //          enableColumnResizing: false,
              enableFiltering: true,
              filter: {
                condition: uiGridConstants.filter.CONTAINS
              },
    //          cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.armour}}{{COL_FIELD CUSTOM_FILTERS}}</div>'
              cellTemplate: '<div class="ui-grid-cell-contents"><span tooltip="{{row.entity.unit}}" tooltip-trigger="mouseenter" tooltip-placement="right">{{COL_FIELD}}</span></div>'

            },

            {
              field: 'land_unit.category',
              name: '兵科',
              width: 50,
              pinnedLeft: true,
              sort: {
                direction: uiGridConstants.DESC,
                priority: 1
              },
              cellTemplate: '<div class="ui-grid-cell-contents category_{{COL_FIELD}}">{{("land_units_category_" + COL_FIELD) | toI18n}}</div>'
    //          visible: false
            },

            {
              field: 'land_unit.class',
              name: '兵種',
              width: 50,
              pinnedLeft: true,
              sort: {
                direction: uiGridConstants.ASC,
                priority: 2
              },
              cellTemplate: '<div class="ui-grid-cell-contents class_{{COL_FIELD}}">{{("land_units_class_" + COL_FIELD) | toI18n}}</div>'
            },

            {
              graph: true,
              cellTemplate: '<div class="ui-grid-cell-contents bg-graph-cell"><bg-graph min="0" max="2000" items="[ {value: COL_FIELD, color:\'#ddc\'} ]">{{COL_FIELD}}</bg-graph></div>',
              field: 'recruitment_cost',
              name: '雇用費',
              sort: {
                direction: uiGridConstants.ASC,
                priority: 3
              },
              aggregationType:uiGridConstants.aggregationTypes.avg
            },
            {
              graph: true,
              cellTemplate: '<div class="ui-grid-cell-contents bg-graph-cell"><bg-graph min="0" max="400" items="[ {value: COL_FIELD, color:\'#ddc\'} ]">{{COL_FIELD}}</bg-graph></div>',
              field: 'upkeep_cost',
              name: '維持費',
              aggregationType:uiGridConstants.aggregationTypes.avg
            },




            {
              headerCellClass: 'attack',
              graph: true,
              cellTemplate: '<div class="ui-grid-cell-contents bg-graph-cell"><bg-graph min="0" max="80" items="[{value: COL_FIELD, color:\'#bb9\'}]">{{COL_FIELD}}</bg-graph></div>',
              field: 'land_unit.melee_attack',
              name: '白兵攻撃力'
            },
            {
              headerCellClass: 'attack',
              graph: true,
              cellTemplate: '<div class="ui-grid-cell-contents bg-graph-cell"><bg-graph min="0" max="80" items="[{value: COL_FIELD, color:\'#bb9\'}]">{{COL_FIELD}}</bg-graph></div>',
              field: 'land_unit.charge_bonus',
              name: '突撃ボーナス'
            },
            {
              headerCellClass: 'attack',
              graph: true,
              cellTemplate: '<div class="ui-grid-cell-contents bg-graph-cell"><bg-graph min="0" max="60" items="[ {value: row.entity.land_unit.primary_melee_weapon.ap_damage, color:\'#aa8\'}, {value: row.entity.land_unit.primary_melee_weapon.damage, color:\'#ddc\'}, {value: row.entity.weapon_max_bonus, color:\'#eeb\'} ]"><equip-icon item="row.entity.land_unit.primary_melee_weapon" type="weapon"></equip-icon>{{COL_FIELD}}</bg-graph></div>',
              field: 'weapon_damage',
              name: '武器ダメージ (Ap+Base +vs bonus)'
            },
            {
              cellTemplate: '<div class="ui-grid-cell-contents bg-graph-cell">{{COL_FIELD CUSTOM_FILTERS | number:1}}</div>',
              headerCellClass: 'attack',
              width: 40,
              field: 'land_unit.primary_melee_weapon.weapon_length',
              name: '武器の長さ'
            },

    /*
            {
              field: 'land_unit.primary_melee_weapon.ap_damage',
              name: 'weapon ap damage'
            },
            {
              field: 'land_unit.primary_melee_weapon.damage',
              name: 'weapon damage'
            },
    */

            {
              headerCellClass: 'defence',
              graph: true,
              cellTemplate: '<div class="ui-grid-cell-contents bg-graph-cell"><bg-graph min="0" max="100" items="[ {value: row.entity.land_unit.melee_defence, color:\'#aa8\'}, {value: row.entity.land_unit.shield.shield_defence_value, color:\'#ddc\'} ]"><equip-icon item="row.entity.land_unit.shield" type="shield"></equip-icon>{{COL_FIELD}}</bg-graph></div>',
               field: 'defence',
              name: '白兵防御力 (スキル+盾)'
            },

            {
              headerCellClass: 'defence',
              graph: true,
              cellTemplate: '<div class="ui-grid-cell-contents bg-graph-cell"><bg-graph min="0" max="150" items="[ {value: row.entity.land_unit.armour.armour_value, color:\'#aa8\'}, {value: row.entity.land_unit.shield.shield_armour_value, color:\'#ddc\'} ]"><equip-icon item="row.entity.land_unit.armour" type="armour"></equip-icon>{{COL_FIELD}}</bg-graph></div>',
              field: 'armour',
              name: '装甲値 (鎧+盾)'
            },
            {
              headerCellClass: 'defence',
              graph: true,
              cellTemplate: '<div class="ui-grid-cell-contents bg-graph-cell"><bg-graph min="0" max="100" items="[{value: COL_FIELD, color:\'#ddc\'}]">{{COL_FIELD}}</bg-graph></div>',
              field: 'land_unit.shield.missile_block_chance',
              name: '射撃ブロック率 (盾)'
            },
            {
              headerCellClass: 'defence',
              width: 40,
              cellTemplate: '<div class="ui-grid-cell-contents">{{0 > COL_FIELD ? "×" : (0 < COL_FIELD ? "◯" : "") }}</div>',
              field: 'v_missiles',
              name: '対射撃ボーナス（鎧）'
            },






            {
              headerCellClass: 'missile',
              graph: true,
              cellTemplate: '<div class="ui-grid-cell-contents bg-graph-cell"><bg-graph min="0" max="70" items="[ {value: row.entity.projectile.ap_damage, color:\'#aa8\'}, {value: row.entity.projectile.damage, color:\'#ddc\'},  {value: row.entity.projectile_max_bonus, color:\'#eeb\'} ]"><equip-icon item="row.entity.projectile" type="projectile"></equip-icon>{{COL_FIELD}}</bg-graph></div>',
              field: 'missile_damage',
              name: '射撃ダメージ (Ap+Base +vs bonus)'
            },
            {
              headerCellClass: 'missile',
              width: 40,
              field: 'land_unit.primary_missile_weapon.precursor',
              name: '突撃時のみ射撃',
              cellTemplate: '<div class="ui-grid-cell-contents"><i class="fa fa-check" ng-show="COL_FIELD" style="color:#696"></i></div>'
            },
            {
              headerCellClass: 'missile',
              graph: true,
              cellTemplate: '<div class="ui-grid-cell-contents bg-graph-cell"><bg-graph min="0" max="150" items="[{value: COL_FIELD, color:\'#ddc\'}]">{{COL_FIELD}}</bg-graph></div>',
              field: 'projectile.effective_range',
              name: '射程(m)'
            },


            {
              headerCellClass: 'missile',
              graph: true,
              cellTemplate: '<div class="ui-grid-cell-contents bg-graph-cell"><bg-graph min="0" max="30" items="[{value: COL_FIELD, color:\'#ddc\'}]">{{COL_FIELD}}</bg-graph></div>',
              field: 'land_unit.ammo',
              name: '射撃弾数'
            },
            {
              headerCellClass: 'missile',
              graph: true,
              cellTemplate: '<div class="ui-grid-cell-contents bg-graph-cell"><bg-graph min="0" max="10" items="[{value: COL_FIELD, color:\'#ddc\'}]">{{COL_FIELD CUSTOM_FILTERS | number:1}}</bg-graph></div>',
              field: 'shot_per_minute',
              name: '射撃回数/分'
            },
            {
              headerCellClass: 'missile',
              graph: true,
              cellTemplate: '<div class="ui-grid-cell-contents bg-graph-cell"><bg-graph min="0" max="350" items="[{value: COL_FIELD, color:\'#ddc\'}]">{{COL_FIELD CUSTOM_FILTERS | number:0}}</bg-graph></div>',
              field: 'damage_per_minute',
              name: '射撃ダメージ/分',
            },
            {
              headerCellClass: 'missile',
              graph: true,
              cellTemplate: '<div class="ui-grid-cell-contents bg-graph-cell"><bg-graph min="0" max="750" items="[{value: COL_FIELD, color:\'#ddc\'}]">{{COL_FIELD CUSTOM_FILTERS | number:0}}</bg-graph></div>',
              field: 'missile_damage_total',
              name: '全弾ダメージ'
            },


            {
              graph: true,
              cellTemplate: '<div class="ui-grid-cell-contents bg-graph-cell"><bg-graph min="0" max="80" items="[{value: COL_FIELD, color:\'#ddc\'}]">{{COL_FIELD}}</bg-graph></div>',
              field: 'land_unit.morale',
              name: '士気'
            },
            {
              graph: true,
              cellTemplate: '<div class="ui-grid-cell-contents bg-graph-cell"><bg-graph min="0" max="80" items="[{value: COL_FIELD, color:\'#ddc\'}]">{{COL_FIELD}}</bg-graph></div>',
              field: 'hit_point',
              name: '体力 (人体のみ)'
            },

            {
              field: 'weight',
              name: '重量',
              width: 55,
              cellTemplate: '<div class="ui-grid-cell-contents"><span tooltip="{{COL_FIELD}}" tooltip-trigger="mouseenter" tooltip-placement="right">{{("main_units_weight_" + COL_FIELD) | toI18n}}</span></div>'
            },

/*
            {
              field: 'land_unit.training_level',
              name: 'training_level',
              visible: false
            },

            {
              field: 'is_naval',
              visible: false
            },
*/
            {
              graph: true,
              cellTemplate: '<div class="ui-grid-cell-contents bg-graph-cell"><bg-graph min="0" max="160" items="[ {value: COL_FIELD, color:\'#ddc\'} ]">{{COL_FIELD}}</bg-graph></div>',
              field: 'num_men',
              name: '部隊人数'
            },

            {
              field: 'land_unit.mount',
              name: '騎乗 (馬・象)',
              width: 120
            },
            {
              field: 'land_unit.chariot',
              name: '搭乗戦車',
              width: 120
            },
            {
              field: 'land_unit.animal',
              name: '随伴動物',
              width: 120
            },
            {
              get visible(){ return (0 < UnitsData.factions.length) },
              width: 32,
              cellTemplate: '<div class="ui-grid-cell-contents"><span class="glyphicon glyphicon-star" ng-show="COL_FIELD"></span></div>',
              field: 'ex_perm',
              name: '勢力固有'
            }


          ]
        };

        $scope.gridOptions.columnDefs.map(function(item){
          item.minWidth = item.minWidth ? item.minWidth : 20;
          item.width = item.width ? item.width : 72;
    //      item.suppressRemoveSort = true;
          item.enableFiltering = item.enableFiltering ? item.enableFiltering : false;
          return item;
        });

        $scope.$watch('units', function(data) {
          $scope.gridOptions.data = $scope.units;
          refreshGrid();
        });





      }

    };
  });