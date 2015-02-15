'use strict';

var _ = require('lodash');
var FactionToMercenarySetJunctionsTable = require('./faction_to_mercenary_set_junctions_table.model');

// Get list of faction_to_mercenary_set_junctions_tables
exports.index = function(req, res) {
  FactionToMercenarySetJunctionsTable.find(function (err, faction_to_mercenary_set_junctions_tables) {
    if(err) { return handleError(res, err); }
    return res.json(200, faction_to_mercenary_set_junctions_tables);
  });
};

// Get a single faction_to_mercenary_set_junctions_table
exports.show = function(req, res) {
  FactionToMercenarySetJunctionsTable.findById(req.params.id, function (err, faction_to_mercenary_set_junctions_table) {
    if(err) { return handleError(res, err); }
    if(!faction_to_mercenary_set_junctions_table) { return res.send(404); }
    return res.json(faction_to_mercenary_set_junctions_table);
  });
};

// Creates a new faction_to_mercenary_set_junctions_table in the DB.
exports.create = function(req, res) {
  FactionToMercenarySetJunctionsTable.create(req.body, function(err, faction_to_mercenary_set_junctions_table) {
    if(err) { return handleError(res, err); }
    return res.json(201, faction_to_mercenary_set_junctions_table);
  });
};

// Updates an existing faction_to_mercenary_set_junctions_table in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  FactionToMercenarySetJunctionsTable.findById(req.params.id, function (err, faction_to_mercenary_set_junctions_table) {
    if (err) { return handleError(res, err); }
    if(!faction_to_mercenary_set_junctions_table) { return res.send(404); }
    var updated = _.merge(faction_to_mercenary_set_junctions_table, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, faction_to_mercenary_set_junctions_table);
    });
  });
};

// Deletes a faction_to_mercenary_set_junctions_table from the DB.
exports.destroy = function(req, res) {
  FactionToMercenarySetJunctionsTable.findById(req.params.id, function (err, faction_to_mercenary_set_junctions_table) {
    if(err) { return handleError(res, err); }
    if(!faction_to_mercenary_set_junctions_table) { return res.send(404); }
    faction_to_mercenary_set_junctions_table.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}