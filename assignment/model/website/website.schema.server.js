/**
 * Created by kamat on 11/5/2017.
 */

var mongoose = require('mongoose');
var WebsiteSchema = mongoose.Schema({
  _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  name: String,
  description: String,
  pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Page'}],
  dateCreated: Date
}, {collection: 'Websites'});

module.exports = WebsiteSchema;
