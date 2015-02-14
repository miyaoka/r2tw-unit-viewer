'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CampaignsTableSchema = new Schema({
  _id: String,
  campaign_name: String,
  onscreen_name: String,
  description: String,
  map_name: String,
  data_directory: String,
  is_grand: Boolean,
  exportable: Boolean,
  campaign_order: Number,
  bullet_list: String,
  display_location: String,
  is_tutorial: Boolean,
  banner_image: String,
  banner_icon: String,
  available_for_mp: Boolean,
  mp_sort_order: Number,
});

CampaignsTableSchema.path('campaign_name').set(function (val) {
  this._id = val;
  return val;
});

module.exports = mongoose.model('CampaignsTable', CampaignsTableSchema);