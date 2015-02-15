'use strict';

var _ = require('lodash');
var StartPosFactionsTable = require('./start_pos_factions_table.model');
var popOpt = 'faction'

// Get list of start_pos_factions_tables
exports.index = function(req, res) {
  StartPosFactionsTable
    .find()
    .populate(popOpt)
    .exec(function (err, start_pos_factions_tables) {
    if(err) { return handleError(res, err); }
    return res.json(200, start_pos_factions_tables);
  });
};

// Get a single start_pos_factions_table
exports.show = function(req, res) {
  StartPosFactionsTable
    .findById(req.params.id)
    .populate(popOpt)
    .exec(function (err, start_pos_factions_table) {
    if(err) { return handleError(res, err); }
    if(!start_pos_factions_table) { return res.send(404); }
    return res.json(start_pos_factions_table);
  });
};

// Updates an existing start_pos_factions_table in the DB.
exports.updateOrCreate = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  StartPosFactionsTable.findById(req.params.id, function (err, start_pos_factions_table) {
    if (err) { return handleError(res, err); }
    var updated = _.merge(start_pos_factions_table || new StartPosFactionsTable(), req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, start_pos_factions_table);
    });
  });
};

// Deletes a start_pos_factions_table from the DB.
exports.destroy = function(req, res) {
  StartPosFactionsTable.findById(req.params.id, function (err, start_pos_factions_table) {
    if(err) { return handleError(res, err); }
    if(!start_pos_factions_table) { return res.send(404); }
    start_pos_factions_table.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Deletes a start_pos_factions_table from the DB.
exports.drop = function(req, res) {
  StartPosFactionsTable.remove(function(err) {
    if(err) { return handleError(res, err); }
    return res.send(204);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}