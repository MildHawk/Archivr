var mongoose = require('mongoose');
var db = require('../../db/index.js');
var bcrypt   = require('bcrypt-nodejs');

// TODO --> set username to be unique

var usersSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  images: { type: Array },
  galleries: { type: Array },
  createdAt: { type: Date, default: Date.now },
});

// hash password before saving a user 
usersSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      console.log('making a hash')
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });

});

// helper method to check if password sent is the same than the hashed password in the db 
usersSchema.methods.verifyPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, match) {
    if (err) {
      callback(false);
    } else {
      callback(match);
    }
  });
};

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
