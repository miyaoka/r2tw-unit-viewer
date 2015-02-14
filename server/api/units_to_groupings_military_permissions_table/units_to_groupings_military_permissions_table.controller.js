'use strict';

var _ = require('lodash');
var UnitsToGroupingsMilitaryPermissionsTable = require('./units_to_groupings_military_permissions_table.model');

// Get list of units_to_groupings_military_permissions_tables
exports.index = function(req, res) {
  UnitsToGroupingsMilitaryPermissionsTable.find(function (err, units_to_groupings_military_permissions_tables) {
    if(err) { return handleError(res, err); }
    return res.json(200, units_to_groupings_military_permissions_tables);
  });
};

// Get a single units_to_groupings_military_permissions_table
exports.show = function(req, res) {
  UnitsToGroupingsMilitaryPermissionsTable.findById(req.params.id, function (err, units_to_groupings_military_permissions_table) {
    if(err) { return handleError(res, err); }
    if(!units_to_groupings_military_permissions_table) { return res.send(404); }
    return res.json(units_to_groupings_military_permissions_table);
  });
};

// Creates a new units_to_groupings_military_permissions_table in the DB.
exports.create = function(req, res) {
  UnitsToGroupingsMilitaryPermissionsTable.create(req.body, function(err, units_to_groupings_military_permissions_table) {
    if(err) { return handleError(res, err); }
    return res.json(201, units_to_groupings_military_permissions_table);
  });
};

// Updates an existing units_to_groupings_military_permissions_table in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  UnitsToGroupingsMilitaryPermissionsTable.findById(req.params.id, function (err, units_to_groupings_military_permissions_table) {
    if (err) { return handleError(res, err); }
    if(!units_to_groupings_military_permissions_table) { return res.send(404); }
    var updated = _.merge(units_to_groupings_military_permissions_table, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, units_to_groupings_military_permissions_table);
    });
  });
};

// Deletes a units_to_groupings_military_permissions_table from the DB.
exports.destroy = function(req, res) {
  UnitsToGroupingsMilitaryPermissionsTable.findById(req.params.id, function (err, units_to_groupings_military_permissions_table) {
    if(err) { return handleError(res, err); }
    if(!units_to_groupings_military_permissions_table) { return res.send(404); }
    units_to_groupings_military_permissions_table.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Deletes a units_to_groupings_military_permissions_table from the DB.
exports.drop = function(req, res) {
  UnitsToGroupingsMilitaryPermissionsTable.remove(function(err) {
    if(err) { return handleError(res, err); }
    return res.send(204);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}