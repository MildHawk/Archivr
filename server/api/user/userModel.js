var mongoose = require('mongoose');
var db = require('../../db/index.js');
var bcrypt   = require('bcrypt-nodejs');

//TODO --> set username to be unique

var usersSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  images: { type: Array },
  galleries: { type: Array },
  createdAt: { type: Date, default: Date.now },
});

usersSchema.pre('save', function(next) {
  var user = this;
  console.log('asgagasgsagsagsagsa')
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

usersSchema.methods.verifyPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, match) {
    if (err) {
      callback(false);
    } else {
      callback(true);
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
