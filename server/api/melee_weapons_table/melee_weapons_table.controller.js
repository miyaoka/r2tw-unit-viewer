'use strict';

var _ = require('lodash');
var MeleeWeaponsTable = require('./melee_weapons_table.model');

// Get list of melee_weapons_tables
exports.index = function(req, res) {
  MeleeWeaponsTable.find(function (err, melee_weapons_tables) {
    if(err) { return handleError(res, err); }
    return res.json(200, melee_weapons_tables);
  });
};

// Get a single melee_weapons_table
exports.show = function(req, res) {
  MeleeWeaponsTable.findById(req.params.id, function (err, melee_weapons_table) {
    if(err) { return handleError(res, err); }
    if(!melee_weapons_table) { return res.send(404); }
    return res.json(melee_weapons_table);
  });
};

// Updates an existing melee_weapons_table in the DB.
exports.updateOrCreate = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  MeleeWeaponsTable.findById(req.params.id, function (err, melee_weapons_table) {
    if (err) { return handleError(res, err); }
    var updated = _.merge(melee_weapons_table || new MeleeWeaponsTable(), req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, melee_weapons_table);
    });
  });
};

// Deletes a melee_weapons_table from the DB.
exports.destroy = function(req, res) {
  MeleeWeaponsTable.findById(req.params.id, function (err, melee_weapons_table) {
    if(err) { return handleError(res, err); }
    if(!melee_weapons_table) { return res.send(404); }
    melee_weapons_table.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Deletes a melee_weapons_table from the DB.
exports.drop = function(req, res) {
  MeleeWeaponsTable.remove(function(err) {
    if(err) { return handleError(res, err); }
    return res.send(204);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}