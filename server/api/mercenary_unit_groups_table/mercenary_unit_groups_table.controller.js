'use strict';

var _ = require('lodash');
var MercenaryUnitGroupsTable = require('./mercenary_unit_groups_table.model');

// Get list of mercenary_unit_groups_tables
exports.index = function(req, res) {
  MercenaryUnitGroupsTable.find(function (err, mercenary_unit_groups_tables) {
    if(err) { return handleError(res, err); }
    return res.json(200, mercenary_unit_groups_tables);
  });
};

// Get a single mercenary_unit_groups_table
exports.show = function(req, res) {
  MercenaryUnitGroupsTable.findById(req.params.id, function (err, mercenary_unit_groups_table) {
    if(err) { return handleError(res, err); }
    if(!mercenary_unit_groups_table) { return res.send(404); }
    return res.json(mercenary_unit_groups_table);
  });
};

// Creates a new mercenary_unit_groups_table in the DB.
exports.create = function(req, res) {
  MercenaryUnitGroupsTable.create(req.body, function(err, mercenary_unit_groups_table) {
    if(err) { return handleError(res, err); }
    return res.json(201, mercenary_unit_groups_table);
  });
};

// Updates an existing mercenary_unit_groups_table in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  MercenaryUnitGroupsTable.findById(req.params.id, function (err, mercenary_unit_groups_table) {
    if (err) { return handleError(res, err); }
    if(!mercenary_unit_groups_table) { return res.send(404); }
    var updated = _.merge(mercenary_unit_groups_table, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, mercenary_unit_groups_table);
    });
  });
};

// Deletes a mercenary_unit_groups_table from the DB.
exports.destroy = function(req, res) {
  MercenaryUnitGroupsTable.findById(req.params.id, function (err, mercenary_unit_groups_table) {
    if(err) { return handleError(res, err); }
    if(!mercenary_unit_groups_table) { return res.send(404); }
    mercenary_unit_groups_table.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}