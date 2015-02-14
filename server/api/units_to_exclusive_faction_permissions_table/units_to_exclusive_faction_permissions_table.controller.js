'use strict';

var _ = require('lodash');
var UnitsToExclusiveFactionPermissionsTable = require('./units_to_exclusive_faction_permissions_table.model');

// Get list of units_to_exclusive_faction_permissions_tables
exports.index = function(req, res) {
  UnitsToExclusiveFactionPermissionsTable.find(function (err, units_to_exclusive_faction_permissions_tables) {
    if(err) { return handleError(res, err); }
    return res.json(200, units_to_exclusive_faction_permissions_tables);
  });
};

// Get a single units_to_exclusive_faction_permissions_table
exports.show = function(req, res) {
  UnitsToExclusiveFactionPermissionsTable.findById(req.params.id, function (err, units_to_exclusive_faction_permissions_table) {
    if(err) { return handleError(res, err); }
    if(!units_to_exclusive_faction_permissions_table) { return res.send(404); }
    return res.json(units_to_exclusive_faction_permissions_table);
  });
};

// Creates a new units_to_exclusive_faction_permissions_table in the DB.
exports.create = function(req, res) {
  UnitsToExclusiveFactionPermissionsTable.create(req.body, function(err, units_to_exclusive_faction_permissions_table) {
    if(err) { return handleError(res, err); }
    return res.json(201, units_to_exclusive_faction_permissions_table);
  });
};

// Updates an existing units_to_exclusive_faction_permissions_table in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  UnitsToExclusiveFactionPermissionsTable.findById(req.params.id, function (err, units_to_exclusive_faction_permissions_table) {
    if (err) { return handleError(res, err); }
    if(!units_to_exclusive_faction_permissions_table) { return res.send(404); }
    var updated = _.merge(units_to_exclusive_faction_permissions_table, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, units_to_exclusive_faction_permissions_table);
    });
  });
};

// Deletes a units_to_exclusive_faction_permissions_table from the DB.
exports.destroy = function(req, res) {
  UnitsToExclusiveFactionPermissionsTable.findById(req.params.id, function (err, units_to_exclusive_faction_permissions_table) {
    if(err) { return handleError(res, err); }
    if(!units_to_exclusive_faction_permissions_table) { return res.send(404); }
    units_to_exclusive_faction_permissions_table.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.drop = function(req, res) {
  UnitsToExclusiveFactionPermissionsTable.remove(function(err) {
    if(err) { return handleError(res, err); }
    return res.send(204);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}