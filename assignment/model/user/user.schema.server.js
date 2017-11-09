/**
 * Created by kamat on 11/5/2017.
 */

var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Website'}],
  dateCreated: { type: Date, default: Date.now }
}, {collection: 'Users'});

module.exports = UserSchema;
