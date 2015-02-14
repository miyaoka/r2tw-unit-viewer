'use strict';

var _ = require('lodash');
var CampaignsTable = require('./campaigns_table.model');

// Get list of campaigns_tables
exports.index = function(req, res) {
  CampaignsTable.find(function (err, campaigns_tables) {
    if(err) { return handleError(res, err); }
    return res.json(200, campaigns_tables);
  });
};

// Get a single campaigns_table
exports.show = function(req, res) {
  CampaignsTable.findById(req.params.id, function (err, campaigns_table) {
    if(err) { return handleError(res, err); }
    if(!campaigns_table) { return res.send(404); }
    return res.json(campaigns_table);
  });
};

// Updates an existing campaigns_table in the DB.
exports.updateOrCreate = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  CampaignsTable.findById(req.params.id, function (err, campaigns_table) {
    if (err) { return handleError(res, err); }
    var updated = _.merge(campaigns_table || new CampaignsTable(), req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, campaigns_table);
    });
  });
};

// Deletes a campaigns_table from the DB.
exports.destroy = function(req, res) {
  CampaignsTable.findById(req.params.id, function (err, campaigns_table) {
    if(err) { return handleError(res, err); }
    if(!campaigns_table) { return res.send(404); }
    campaigns_table.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Deletes a campaigns_table from the DB.
exports.drop = function(req, res) {
  CampaignsTable.remove(function(err) {
    if(err) { return handleError(res, err); }
    return res.send(204);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}