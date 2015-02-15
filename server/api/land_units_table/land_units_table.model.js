'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LandUnitsTableSchema = new Schema({
  _id: String,//key
  key: String,
  onscreen_name: String,
  category: String,
  class: String,
  short_description_text: String,
  historical_description_text: String,
  strengths_weaknesses_text: String,
  campaign_action_points: Number,
  supports_first_person: Boolean,
  man_entity:  {
    type: String,
    ref: 'BattleEntitiesTable'
  },
  man_animation: String,
  num_mounts: Number,
  mount: String,
  num_animals: Number,
  animal: String,
  spacing: String,
  rank_depth: Number,
  morale: Number,
  bonus_hit_points: Number,
  training_level: String,
  armour: {
    type: String,
    ref: 'UnitArmourTypesTable'
  },
  shield: {
    type: String,
    ref: 'UnitShieldTypesTable'
  },
  primary_missile_weapon: {
    type: String,
    ref: 'MissileWeaponsTable'
  },
  accuracy: Number,
  ammo: Number,
  primary_melee_weapon: {
    type: String,
    ref: 'MeleeWeaponsTable'
  },
  melee_attack: Number,
  charge_bonus: Number,
  melee_defence: Number,
  dismounted_melee_attack: Number,
  dismounted_charge_bonus: Number,
  dismounted_melee_defence: Number,
  num_guns: Number,
  officers: String,
  engine: String,
  articulated_record: String,
  is_male: Boolean,
  visibility_spotting_range_min: Number,
  visibility_spotting_range_max: Number,
  ability_global_recharge: Number,
  attribute_group: String,
  spot_dist_tree: Number,
  spot_dist_scrub: Number,
  chariot: String,
  num_chariots: Number,
  reload: Number,
  loose_spacing: Boolean,
  spotting_and_hiding: String,
  selection_vo: String,
  selected_vo_secondary: String,
  selected_vo_tertiary: String,
  hiding_scalar: Number
});

LandUnitsTableSchema.path('key').set(function (val) {
  this._id = val;
  return val;
});

module.exports = mongoose.model('LandUnitsTable', LandUnitsTableSchema);