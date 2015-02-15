'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MissileWeaponsTableSchema = new Schema({
  _id: String,
  key: String,
  precursor: Boolean,
  default_projectile: {
    type: String,
    ref: 'ProjectilesTable'
  },
  can_fire_at_buildings: Boolean
});

MissileWeaponsTableSchema.path('key').set(function (val) {
  this._id = val;
  return val;
});

module.exports = mongoose.model('MissileWeaponsTable', MissileWeaponsTableSchema);