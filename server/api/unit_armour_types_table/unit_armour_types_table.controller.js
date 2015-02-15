'use strict';

var _ = require('lodash');
var UnitArmourTypesTable = require('./unit_armour_types_table.model');

// Get list of unit_armour_types_tables
exports.index = function(req, res) {
  UnitArmourTypesTable.find(function (err, unit_armour_types_tables) {
    if(err) { return handleError(res, err); }
    return res.json(200, unit_armour_types_tables);
  });
};

// Get a single unit_armour_types_table
exports.show = function(req, res) {
  UnitArmourTypesTable.findById(req.params.id, function (err, unit_armour_types_table) {
    if(err) { return handleError(res, err); }
    if(!unit_armour_types_table) { return res.send(404); }
    return res.json(unit_armour_types_table);
  });
};

// Updates an existing unit_armour_types_table in the DB.
exports.updateOrCreate = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  UnitArmourTypesTable.findById(req.params.id, function (err, unit_armour_types_table) {
    if (err) { return handleError(res, err); }
    var updated = _.merge(unit_armour_types_table || new UnitArmourTypesTable(), req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, unit_armour_types_table);
    });
  });
};

// Deletes a unit_armour_types_table from the DB.
exports.destroy = function(req, res) {
  UnitArmourTypesTable.findById(req.params.id, function (err, unit_armour_types_table) {
    if(err) { return handleError(res, err); }
    if(!unit_armour_types_table) { return res.send(404); }
    unit_armour_types_table.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Deletes a unit_armour_types_table from the DB.
exports.drop = function(req, res) {
  UnitArmourTypesTable.remove(function(err) {
    if(err) { return handleError(res, err); }
    return res.send(204);
  });
};


function handleError(res, err) {
  return res.send(500, err);
}