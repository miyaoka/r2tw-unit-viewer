'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UnitsToExclusiveFactionPermissionsTableSchema = new Schema({
  key: String,
  faction: String,
  allowed: Boolean
});

module.exports = mongoose.model('UnitsToExclusiveFactionPermissionsTable', UnitsToExclusiveFactionPermissionsTableSchema);