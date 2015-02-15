/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/commander_unit_permissions_tables', require('./api/commander_unit_permissions_table'));
  app.use('/api/mercenary_unit_groups_tables', require('./api/mercenary_unit_groups_table'));
  app.use('/api/mercenary_pool_to_groups_junctions_tables', require('./api/mercenary_pool_to_groups_junctions_table'));
  app.use('/api/faction_to_mercenary_set_junctions_tables', require('./api/faction_to_mercenary_set_junctions_table'));
  app.use('/api/unit_shield_types_tables', require('./api/unit_shield_types_table'));
  app.use('/api/unit_armour_types_tables', require('./api/unit_armour_types_table'));
  app.use('/api/units_to_exclusive_faction_permissions_tables', require('./api/units_to_exclusive_faction_permissions_table'));
  app.use('/api/units_to_groupings_military_permissions_tables', require('./api/units_to_groupings_military_permissions_table'));
  app.use('/api/campaigns_tables', require('./api/campaigns_table'));
  app.use('/api/factions_tables', require('./api/factions_table'));
  app.use('/api/start_pos_factions_tables', require('./api/start_pos_factions_table'));
  app.use('/api/battle_entities_tables', require('./api/battle_entities_table'));
  app.use('/api/projectiles_tables', require('./api/projectiles_table'));
  app.use('/api/missile_weapons_tables', require('./api/missile_weapons_table'));
  app.use('/api/melee_weapons_tables', require('./api/melee_weapons_table'));
  app.use('/api/land_units_tables', require('./api/land_units_table'));
  app.use('/api/main_units_tables', require('./api/main_units_table'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
