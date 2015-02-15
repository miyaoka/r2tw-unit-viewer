'use strict';

var _ = require('lodash');
var LandUnitsTable = require('./land_units_table.model');
var popOpt = 'primary_melee_weapon man_entity';

// Get list of land_units_tables
exports.index = function(req, res) {
  LandUnitsTable
    .find()
    .populate(popOpt)
    .exec(function (err, land_units_tables) {
    if(err) { return handleError(res, err); }
    return res.json(200, land_units_tables);
  });
};

// Get a single land_units_table
exports.show = function(req, res) {
  LandUnitsTable
    .findById(req.params.id)
    .populate(popOpt)
    .exec(function (err, land_units_table) {
    if(err) { return handleError(res, err); }
    if(!land_units_table) { return res.send(404); }
    return res.json(land_units_table);
  });
};

// Updates an existing land_units_table in the DB.
exports.updateOrCreate = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  LandUnitsTable.findById(req.params.id, function (err, land_units_table) {
    if (err) { return handleError(res, err); }
    var updated = _.merge(land_units_table || new LandUnitsTable(), req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, land_units_table);
    });
  });
};

// Deletes a land_units_table from the DB.
exports.destroy = function(req, res) {
  LandUnitsTable.findById(req.params.id, function (err, land_units_table) {
    if(err) { return handleError(res, err); }
    if(!land_units_table) { return res.send(404); }
    land_units_table.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Deletes a land_units_table from the DB.
exports.drop = function(req, res) {
  LandUnitsTable.remove(function(err) {
    if(err) { return handleError(res, err); }
    return res.send(204);
  });
};
function handleError(res, err) {
  return res.send(500, err);
}