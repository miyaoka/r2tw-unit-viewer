'use strict';

var _ = require('lodash');
var ProjectilesTable = require('./projectiles_table.model');

// Get list of projectiles_tables
exports.index = function(req, res) {
  ProjectilesTable.find(function (err, projectiles_tables) {
    if(err) { return handleError(res, err); }
    return res.json(200, projectiles_tables);
  });
};

// Get a single projectiles_table
exports.show = function(req, res) {
  ProjectilesTable.findById(req.params.id, function (err, projectiles_table) {
    if(err) { return handleError(res, err); }
    if(!projectiles_table) { return res.send(404); }
    return res.json(projectiles_table);
  });
};

// Updates an existing projectiles_table in the DB.
exports.updateOrCreate = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ProjectilesTable.findById(req.params.id, function (err, projectiles_table) {
    if (err) { return handleError(res, err); }
    var updated = _.merge(projectiles_table || new ProjectilesTable(), req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, projectiles_table);
    });
  });
};

// Deletes a projectiles_table from the DB.
exports.destroy = function(req, res) {
  ProjectilesTable.findById(req.params.id, function (err, projectiles_table) {
    if(err) { return handleError(res, err); }
    if(!projectiles_table) { return res.send(404); }
    projectiles_table.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Deletes a projectiles_table from the DB.
exports.drop = function(req, res) {
  ProjectilesTable.remove(function(err) {
    if(err) { return handleError(res, err); }
    return res.send(204);
  });
};


function handleError(res, err) {
  return res.send(500, err);
}