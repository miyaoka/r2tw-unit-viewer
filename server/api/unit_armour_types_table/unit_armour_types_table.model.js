'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UnitArmourTypesTableSchema = new Schema({
  _id: String,
  key: String,
  armour_value: Number,
  bonus_v_missiles: Boolean,
  weak_v_missiles: Boolean,
  audio_material: String
});

UnitArmourTypesTableSchema.path('key').set(function (val) {
  this._id = val;
  return val;
});

module.exports = mongoose.model('UnitArmourTypesTable', UnitArmourTypesTableSchema);