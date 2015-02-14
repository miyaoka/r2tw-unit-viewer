'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommanderUnitPermissionsTableSchema = new Schema({
  unit_key: String,
  faction_key: String,
  culture_key: String,
  subculture_key: String
});

module.exports = mongoose.model('CommanderUnitPermissionsTable', CommanderUnitPermissionsTableSchema);