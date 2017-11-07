/**
 * Created by kamat on 11/5/2017.
 */

var mongoose = require('mongoose');
var uri;

if(process.env.NODE_ENV == "prod")
  uri = process.env.MONGODB_URI;
else
  uri = 'mongodb://localhost/cs5610';

var db = mongoose.connect(uri,{useMongoClient : true});
module.exports = db;
