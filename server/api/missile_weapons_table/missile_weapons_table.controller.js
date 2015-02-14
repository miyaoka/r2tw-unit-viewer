'use strict';

var _ = require('lodash');
var MissileWeaponsTable = require('./missile_weapons_table.model');
var popOpt = 'default_projectile';
// Get list of missile_weapons_tables
exports.index = function(req, res) {
  MissileWeaponsTable
    .find()
    .populate(popOpt)
    .exec(function (err, missile_weapons_tables) {
    if(err) { return handleError(res, err); }
    return res.json(200, missile_weapons_tables);
  });
};

// Get a single missile_weapons_table
exports.show = function(req, res) {
  MissileWeaponsTable
    .findById(req.params.id)
    .populate(popOpt)
    .exec(function (err, missile_weapons_table) {
    if(err) { return handleError(res, err); }
    if(!missile_weapons_table) { return res.send(404); }
    return res.json(missile_weapons_table);
  });
};

// Updates an existing missile_weapons_table in the DB.
exports.updateOrCreate = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  MissileWeaponsTable.findById(req.params.id, function (err, missile_weapons_table) {
    if (err) { return handleError(res, err); }
    var updated = _.merge(missile_weapons_table || new MissileWeaponsTable(), req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, missile_weapons_table);
    });
  });
};

// Deletes a missile_weapons_table from the DB.
exports.destroy = function(req, res) {
  MissileWeaponsTable.findById(req.params.id, function (err, missile_weapons_table) {
    if(err) { return handleError(res, err); }
    if(!missile_weapons_table) { return res.send(404); }
    missile_weapons_table.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Deletes a missile_weapons_table from the DB.
exports.drop = function(req, res) {
  MissileWeaponsTable.remove(function(err) {
    if(err) { return handleError(res, err); }
    return res.send(204);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}