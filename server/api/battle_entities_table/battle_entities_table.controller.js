'use strict';

var _ = require('lodash');
var BattleEntitiesTable = require('./battle_entities_table.model');

// Get list of battle_entities_tables
exports.index = function(req, res) {
  BattleEntitiesTable.find(function (err, battle_entities_tables) {
    if(err) { return handleError(res, err); }
    return res.json(200, battle_entities_tables);
  });
};

// Get a single battle_entities_table
exports.show = function(req, res) {
  BattleEntitiesTable.findById(req.params.id, function (err, battle_entities_table) {
    if(err) { return handleError(res, err); }
    if(!battle_entities_table) { return res.send(404); }
    return res.json(battle_entities_table);
  });
};

// Updates an existing battle_entities_table in the DB.
exports.updateOrCreate = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  BattleEntitiesTable.findById(req.params.id, function (err, battle_entities_table) {
    if (err) { return handleError(res, err); }
    var updated = _.merge(battle_entities_table || new BattleEntitiesTable(), req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, battle_entities_table);
    });
  });
};

// Deletes a battle_entities_table from the DB.
exports.destroy = function(req, res) {
  BattleEntitiesTable.findById(req.params.id, function (err, battle_entities_table) {
    if(err) { return handleError(res, err); }
    if(!battle_entities_table) { return res.send(404); }
    battle_entities_table.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Deletes a battle_entities_table from the DB.
exports.drop = function(req, res) {
  BattleEntitiesTable.remove(function(err) {
    if(err) { return handleError(res, err); }
    return res.send(204);
  });
};
function handleError(res, err) {
  return res.send(500, err);
}