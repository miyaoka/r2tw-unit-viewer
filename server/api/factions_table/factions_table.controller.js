'use strict';

var _ = require('lodash');
var FactionsTable = require('./factions_table.model');

// Get list of factions_tables
exports.index = function(req, res) {
  FactionsTable.find(function (err, factions_tables) {
    if(err) { return handleError(res, err); }
    return res.json(200, factions_tables);
  });
};

// Get a single factions_table
exports.show = function(req, res) {
  FactionsTable.findById(req.params.id, function (err, factions_table) {
    if(err) { return handleError(res, err); }
    if(!factions_table) { return res.send(404); }
    return res.json(factions_table);
  });
};

// Updates an existing factions_table in the DB.
exports.updateOrCreate = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  FactionsTable.findById(req.params.id, function (err, factions_table) {
    if (err) { return handleError(res, err); }
    var updated = _.merge(factions_table || new FactionsTable, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, factions_table);
    });
  });
};

// Deletes a factions_table from the DB.
exports.destroy = function(req, res) {
  FactionsTable.findById(req.params.id, function (err, factions_table) {
    if(err) { return handleError(res, err); }
    if(!factions_table) { return res.send(404); }
    factions_table.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Deletes a factions_table from the DB.
exports.drop = function(req, res) {
  FactionsTable.remove(function(err) {
    if(err) { return handleError(res, err); }
    return res.send(204);
  });
};
function handleError(res, err) {
  return res.send(500, err);
}