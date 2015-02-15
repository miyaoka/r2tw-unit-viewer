'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MercenaryPoolToGroupsJunctionsTableSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('MercenaryPoolToGroupsJunctionsTable', MercenaryPoolToGroupsJunctionsTableSchema);