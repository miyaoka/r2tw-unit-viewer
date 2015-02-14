'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MeleeWeaponsTableSchema = new Schema({
  _id: String,
  key: String,
  damage: Number,
  ap_damage: Number,
  first_strike: Number,
  bonus_v_infantry: Number,
  bonus_v_cavalry: Number,
  bonus_v_elephants: Number,
  armour_piercing: Boolean,
  shield_piercing: Boolean,
  armour_penetrating: Number,
  weapon_length: Number,
  melee_weapon_type: String,
  audio_material: String
});

MeleeWeaponsTableSchema.path('key').set(function (val) {
  this._id = val;
  return val;
});

module.exports = mongoose.model('MeleeWeaponsTable', MeleeWeaponsTableSchema);