/**
 * Created by kamat on 11/5/2017.
 */

var mongoose = require('mongoose');
var WidgetSchema = mongoose.Schema({
  _page: {type: mongoose.Schema.Types.ObjectId, ref: 'Page'},
  type: String,
  name: String,
  text: String,
  placeholder: String,
  description: String,
  url: String,
  width: String,
  height: String,
  rows: Number,
  size: Number,
  class: String,
  icon: String,
  deletable: Boolean,
  formatted: Boolean,
  dateCreated: { type: Date, default: Date.now }
}, {collection: 'Widgets'});

module.exports = WidgetSchema;
