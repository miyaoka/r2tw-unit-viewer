'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UnitsToGroupingsMilitaryPermissionsTableSchema = new Schema({
  unit: String,
  military_group: String
});

module.exports = mongoose.model('UnitsToGroupingsMilitaryPermissionsTable', UnitsToGroupingsMilitaryPermissionsTableSchema);