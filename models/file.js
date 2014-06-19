var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var File = new Schema({
  userId: String,
  title: String,
  author: String,
  time: String,
  location: Number,
  text: String,
  tags: Array,
  bookmark: {type: String, default: '0'},
  done: {type: String, default: '0'},
  deleted: {type: Boolean, default: false},
  added: {type: Date, default: Date.now}
});

module.exports = mongoose.model('File', File);
