'use strict';

var _ = require('lodash');
var CommanderUnitPermissionsTable = require('./commander_unit_permissions_table.model');

// Get list of commander_unit_permissions_tables
exports.index = function(req, res) {
  CommanderUnitPermissionsTable.find(function (err, commander_unit_permissions_tables) {
    if(err) { return handleError(res, err); }
    return res.json(200, commander_unit_permissions_tables);
  });
};

// Get a single commander_unit_permissions_table
exports.show = function(req, res) {
  CommanderUnitPermissionsTable.findById(req.params.id, function (err, commander_unit_permissions_table) {
    if(err) { return handleError(res, err); }
    if(!commander_unit_permissions_table) { return res.send(404); }
    return res.json(commander_unit_permissions_table);
  });
};

// Creates a new commander_unit_permissions_table in the DB.
exports.create = function(req, res) {
  CommanderUnitPermissionsTable.create(req.body, function(err, commander_unit_permissions_table) {
    if(err) { return handleError(res, err); }
    return res.json(201, commander_unit_permissions_table);
  });
};

// Updates an existing commander_unit_permissions_table in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  CommanderUnitPermissionsTable.findById(req.params.id, function (err, commander_unit_permissions_table) {
    if (err) { return handleError(res, err); }
    if(!commander_unit_permissions_table) { return res.send(404); }
    var updated = _.merge(commander_unit_permissions_table, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, commander_unit_permissions_table);
    });
  });
};

// Deletes a commander_unit_permissions_table from the DB.
exports.destroy = function(req, res) {
  CommanderUnitPermissionsTable.findById(req.params.id, function (err, commander_unit_permissions_table) {
    if(err) { return handleError(res, err); }
    if(!commander_unit_permissions_table) { return res.send(404); }
    commander_unit_permissions_table.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Deletes a commander_unit_permissions_table from the DB.
exports.drop= function(req, res) {
  CommanderUnitPermissionsTable.remove(function(err) {
    if(err) { return handleError(res, err); }
    return res.send(204);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}