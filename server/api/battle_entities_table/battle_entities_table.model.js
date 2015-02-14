'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BattleEntitiesTableSchema = new Schema({
  _id: String,
  key: String,
  type: String,
  walk_speed: Number,
  run_speed: Number,
  acceleration: Number,
  deceleration: Number,
  charge_speed: Number,
  crawl_speed: Number,
  charge_distance_commence_run: Number,
  charge_distance_adopt_charge_pose: Number,
  charge_distance_pick_target: Number,
  radius: Number,
  shape: String,
  radii_ratio: Number,
  mass: Number,
  height: Number,
  fire_arc_close: Number,
  fire_arc_loose: Number,
  turn_speed: Number,
  hit_points: Number,
  allow_turn_to_move_anim: Boolean,
  allow_static_turn_anim: Boolean,
  tracking_threshold: Number,
  min_turning_speed: Number,
  display_model_offset_z: Number
});

BattleEntitiesTableSchema.path('key').set(function (val) {
  this._id = val;
  return val;
});

module.exports = mongoose.model('BattleEntitiesTable', BattleEntitiesTableSchema);