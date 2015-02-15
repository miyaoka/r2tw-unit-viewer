'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    deepPopulate = require('mongoose-deep-populate');

var MainUnitsTableSchema = new Schema({
  _id: String, //unit
  unit: String,
  land_unit: {
    type: String,
    ref: 'LandUnitsTable'
  },
  num_men: Number,
  naval_unit: String,
  num_ships: Number,
  min_men_per_ship: Number,
  max_men_per_ship: Number,
  is_naval: Boolean,
  weight: String,
  recruitment_cost: Number,
  upkeep_cost: Number,
  create_time: Number,
  campaign_cap: Number,
  multiplayer_cost: Number,
  multiplayer_cap: Number,
  caste: String,
  prestige: Number,
  additional_building_requirement: String,
  religion_requirement: String,
  recruitment_movie: String,
  campaign_total_cap: Number,
  resource_requirement: String,
  world_leader_only: Boolean,
  can_trade: Boolean,
  special_edition_mask: Number,
  unique_index: Number,
  in_encyclopedia: Boolean,
  region_unit_resource_requirement: String,
  audio_language: String
});

MainUnitsTableSchema.path('unit').set(function (val) {
  this._id = val;
  return val;
});

MainUnitsTableSchema.plugin(deepPopulate);

module.exports = mongoose.model('MainUnitsTable', MainUnitsTableSchema);