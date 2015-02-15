'use strict';

angular.module('r2twDbApp')
  .factory('Api', function ($resource) {
    var apiRoot = '/api/';
    return {
      commander_unit_permissions: $resource(apiRoot + 'commander_unit_permissions_tables/:id', {}, {create: { method: 'POST'}} ),
      units_to_exclusive_faction_permissions: $resource(apiRoot + 'units_to_exclusive_faction_permissions_tables/:id', {}, {create: { method: 'POST'}} ),
      units_to_groupings_military_permissions: $resource(apiRoot + 'units_to_groupings_military_permissions_tables/:id', {}, {create: { method: 'POST'}} ),

      unit_shield_types: $resource(apiRoot + 'unit_shield_types_tables/:id', {id: '@key'}, {create: { method: 'PUT'}} ),
      unit_armour_types: $resource(apiRoot + 'unit_armour_types_tables/:id', {id: '@key'}, {create: { method: 'PUT'}} ),
      campaigns: $resource(apiRoot + 'campaigns_tables/:id', {id: '@campaign_name'}, {create: { method: 'PUT'}} ),
      factions: $resource(apiRoot + 'factions_tables/:id', {id: '@key'}, {create: { method: 'PUT'}} ),
      start_pos_factions: $resource(apiRoot + 'start_pos_factions_tables/:id', {id: '@ID'}, {create: { method: 'PUT'}} ),
      battle_entities: $resource(apiRoot + 'battle_entities_tables/:id', {id: '@key'}, {create: { method: 'PUT'}} ),
      projectiles: $resource(apiRoot + 'projectiles_tables/:id', {id: '@key'}, {create: { method: 'PUT'}} ),
      missile_weapons: $resource(apiRoot + 'missile_weapons_tables/:id', {id: '@key'}, {create: { method: 'PUT'}} ),
      melee_weapons: $resource(apiRoot + 'melee_weapons_tables/:id',{id: '@key'}, {create: { method: 'PUT'}} ),
      land_units: $resource(apiRoot + 'land_units_tables/:id', {id: '@key'}, {create: { method: 'PUT'}} ),
      main_units: $resource(apiRoot + 'main_units_tables/:id', {id: '@unit'}, {create: { method: 'PUT'}} )
    };
  });