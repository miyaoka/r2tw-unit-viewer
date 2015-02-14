'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StartPosFactionsTableSchema = new Schema({
  _id: Number,
  ID: Number,
  faction: {
    type: String,
    ref: 'FactionsTable'
  },
  campaign: String,
  playable: Boolean,
  treasury: Number,
  starting_order: Number,
  government_type: String,
  state_religion: String,
  is_major: Boolean,
  description: String,
  difficulty: String,
  ai_manager: String,
  ai_personality: String,
  long_victory_region_count: Number,
  short_victory_region_count: Number,
  prestige_victory_region_count: Number,
  world_domination_victory_region_count: Number,
  short_victory_year_end: Number,
  long_victory_year_end: Number,
  prestige_victory_year_end: Number,
  world_domination_victory_year_end: Number,
  prestige_army: Number,
  prestige_navy: Number,
  prestige_economy: Number,
  prestige_enlightenment: Number,
  short_victory_week_in_year_end: Number,
  long_victory_week_in_year_end: Number,
  prestige_victory_week_in_year_end: Number,
  world_domination_victory_week_in_year_end: Number,
  honour: Number,
  ai_technology_manager: String,
  ai_character_skill_tree_manager: String,
  cai_agent_distribution_profile: String,
  cai_agent_recruitment_profile: String,
  cai_starting_personality: String,
  mp_one_vs_one_region_count: Number,
  mp_2p_co_op_region_count: Number,
  mp_2p_co_op_region_count_long: Number,
  long_description: String,
  can_ever_convert_religion: Boolean,
  cdir_military_generator_config: String
});

StartPosFactionsTableSchema.path('ID').set(function (val) {
  this._id = val;
  return val;
});

module.exports = mongoose.model('StartPosFactionsTable', StartPosFactionsTableSchema);