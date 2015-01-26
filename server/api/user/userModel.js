var mongoose = require('mongoose');
var db = require('../../db/index.js');

//TODO --> set username to be unique

var usersSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  images: { type: Array },
  galleries: { type: Array },
  createdAt: { type: Date, default: Date.now },
});


usersSchema.methods.getGallery = function(gallery) {
  
};

usersSchema.methods.createGallery = function(data) {
  
};

usersSchema.methods.getGalleries = function() {

};

usersSchema.methods.createScreenshot = function() {

};

var User = mongoose.model('User', usersSchema);

module.exports = User;