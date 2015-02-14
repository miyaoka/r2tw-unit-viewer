'use strict';

var _ = require('lodash');
var MercenaryPoolToGroupsJunctionsTable = require('./mercenary_pool_to_groups_junctions_table.model');

// Get list of mercenary_pool_to_groups_junctions_tables
exports.index = function(req, res) {
  MercenaryPoolToGroupsJunctionsTable.find(function (err, mercenary_pool_to_groups_junctions_tables) {
    if(err) { return handleError(res, err); }
    return res.json(200, mercenary_pool_to_groups_junctions_tables);
  });
};

// Get a single mercenary_pool_to_groups_junctions_table
exports.show = function(req, res) {
  MercenaryPoolToGroupsJunctionsTable.findById(req.params.id, function (err, mercenary_pool_to_groups_junctions_table) {
    if(err) { return handleError(res, err); }
    if(!mercenary_pool_to_groups_junctions_table) { return res.send(404); }
    return res.json(mercenary_pool_to_groups_junctions_table);
  });
};

// Creates a new mercenary_pool_to_groups_junctions_table in the DB.
exports.create = function(req, res) {
  MercenaryPoolToGroupsJunctionsTable.create(req.body, function(err, mercenary_pool_to_groups_junctions_table) {
    if(err) { return handleError(res, err); }
    return res.json(201, mercenary_pool_to_groups_junctions_table);
  });
};

// Updates an existing mercenary_pool_to_groups_junctions_table in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  MercenaryPoolToGroupsJunctionsTable.findById(req.params.id, function (err, mercenary_pool_to_groups_junctions_table) {
    if (err) { return handleError(res, err); }
    if(!mercenary_pool_to_groups_junctions_table) { return res.send(404); }
    var updated = _.merge(mercenary_pool_to_groups_junctions_table, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, mercenary_pool_to_groups_junctions_table);
    });
  });
};

// Deletes a mercenary_pool_to_groups_junctions_table from the DB.
exports.destroy = function(req, res) {
  MercenaryPoolToGroupsJunctionsTable.findById(req.params.id, function (err, mercenary_pool_to_groups_junctions_table) {
    if(err) { return handleError(res, err); }
    if(!mercenary_pool_to_groups_junctions_table) { return res.send(404); }
    mercenary_pool_to_groups_junctions_table.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}