'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectilesTableSchema = new Schema({
  _id: String,
  key: String,
  category: String,
  shot_type: String,
  explosion_type: String,
  high_air_resistance: Boolean,
  spin_type: String,
  projectile_number: Number,
  trajectory_sight: String,
  effective_range: Number,
  minimum_range: Number,
  max_elevation: Number,
  muzzle_velocity: Number,
  marksmanship_bonus: Number,
  spread: Number,
  damage: Number,
  ap_damage: Number,
  penetration: String,
  incendiary: String,
  can_bounce: Boolean,
  collision_radius: Number,
  base_reload_time: Number,
  below_waterline_damage_modifer: Number,
  calibration_distance: Number,
  calibration_area: Number,
  bonus_v_infantry: Number,
  bonus_v_cavalry: Number,
  bonus_v_elephant: Number,
  projectile_display: String,
  overhead_stat_effect: String,
  contact_stat_effect: String,
  projectile_audio: String,
  shockwave_radius: Number,
  can_damage_buildings: Boolean,
  is_grapple: Boolean
});

ProjectilesTableSchema.path('key').set(function (val) {
  this._id = val;
  return val;
});

module.exports = mongoose.model('ProjectilesTable', ProjectilesTableSchema);