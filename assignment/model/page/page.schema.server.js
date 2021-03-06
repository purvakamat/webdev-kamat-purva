/**
 * Created by kamat on 11/5/2017.
 */

var mongoose = require('mongoose');
var PageSchema = mongoose.Schema({
  _website: {type: mongoose.Schema.Types.ObjectId, ref: 'Website'},
  name: String,
  title: String,
  description: String,
  widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Widget'}],
  dateCreated: { type: Date, default: Date.now },
}, {collection: 'Pages'});

module.exports = PageSchema;
