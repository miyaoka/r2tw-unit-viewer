'use strict';

var _ = require('lodash');
var MainUnitsTable = require('./main_units_table.model');
var FactionsTable = require('../factions_table/factions_table.model');
var UnitsToGroupingsMilitaryPermissionsTable = require('../units_to_groupings_military_permissions_table/units_to_groupings_military_permissions_table.model');
var UnitsToExclusiveFactionPermissionsTable = require('../units_to_exclusive_faction_permissions_table/units_to_exclusive_faction_permissions_table.model');

var popOpt = 'land_unit.man_entity land_unit.primary_melee_weapon land_unit.primary_missile_weapon.default_projectile land_unit.shield land_unit.armour';
var CommanderUnitPermissionsTable = require('../commander_unit_permissions_table/commander_unit_permissions_table.model');


// Get list of main_units_tables
exports.index = function(req, res) {
  var factionKey = req.query.faction;

  // all units
  if(!factionKey){
    MainUnitsTable
    .find()
    .deepPopulate(popOpt)
    .exec(function (err, main_units_tables) {
      if(err) { return handleError(res, err); }
      return res.json(200, main_units_tables);
    });
    return;
  }

  // faction units
  FactionsTable.findById(factionKey, function(err, faction){
    if (err) { return handleError(res, err); }
    if(!faction){ return res.send(404); }

    UnitsToGroupingsMilitaryPermissionsTable.find(
      {military_group: faction.military_group}, function(err, perms){
      if (err) { return handleError(res, err); }

      var unitKeys = [];
      perms.forEach(function(item){
        unitKeys.push(item.unit);
      });

      UnitsToExclusiveFactionPermissionsTable.find({faction: faction}, function(err, exPerms){
        if (err) { return handleError(res, err); }
        exPerms.forEach(function(item){
          unitKeys.push(item.key);
        });

        CommanderUnitPermissionsTable
        .find( {$or: [ {faction_key: factionKey}, {subculture_key: faction.subculture}] }, function(err, comPerms){
          if (err) { return handleError(res, err); }

          MainUnitsTable
          .find({_id: {$in: unitKeys} })
          .deepPopulate(popOpt)
          .lean()
          .exec(function (err, main_units_tables) {
            if(err) { return handleError(res, err); }
            main_units_tables.map(function(unit){
              exPerms.some(function(exPerm){
                if(unit._id == exPerm.key)
                {
                  unit.ex_perm = true;
                  return true;
                }
              });
              comPerms.some(function(comPerm){
                if(unit._id == comPerm.unit_key)
                {
                  unit.com_perm = true;
                  return true;
                }
              });

              return unit;
            });
            return res.json(200, main_units_tables);
          });
        });
      });
    });
  });

};


// Get a single main_units_table
exports.show = function(req, res) {
  MainUnitsTable
    .findById(req.params.id)
    .deepPopulate(popOpt)
    .exec(function (err, main_units_table) {
    if(err) { return handleError(res, err); }
    if(!main_units_table) { return res.send(404); }
    return res.json(main_units_table);
  });
};

// Updates an existing main_units_table in the DB.
exports.updateOrCreate = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  MainUnitsTable.findById(req.params.id, function (err, main_units_table) {
    if (err) { return handleError(res, err); }
    var updated = _.merge(main_units_table || new MainUnitsTable(), req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, main_units_table);
    });
  });
};

// Deletes a main_units_table from the DB.
exports.destroy = function(req, res) {
  MainUnitsTable.findById(req.params.id, function (err, main_units_table) {
    if(err) { return handleError(res, err); }
    if(!main_units_table) { return res.send(404); }
    main_units_table.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Deletes a main_units_table from the DB.
exports.drop = function(req, res) {
  MainUnitsTable.remove(function(err) {
    if(err) { return handleError(res, err); }
    return res.send(204);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}