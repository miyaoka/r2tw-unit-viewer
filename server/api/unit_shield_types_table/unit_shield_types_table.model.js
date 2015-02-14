'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UnitShieldTypesTableSchema = new Schema({
  _id: String,
  key: String,
  shield_defence_value: Number,
  shield_armour_value: Number,
  audio_material: String,
  missile_block_chance: Number
});

UnitShieldTypesTableSchema.path('key').set(function (val) {
  this._id = val;
  return val;
});

module.exports = mongoose.model('UnitShieldTypesTable', UnitShieldTypesTableSchema);