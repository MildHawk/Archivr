var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function (cb) {
  console.log('connected to mongodb');
});

exports.db = db;