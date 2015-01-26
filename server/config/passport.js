var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');
var User = require('../api/user/userModel');

module.exports = function(app) {
  // initialize passport on the app
  app.use(passport.initialize());

  // configure local strategy (standard user/pass authentication)
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        // return done if error
        if (err) { return done(err); }
        // there isnt a user return done with false authentication
        if (!user) { return done(null, false); }
        // password is wrong
        if(password !== user.password) return done(null, false);
        // if (!user.verifyPassword(password)) { return done(null, false); }
        // password is correct
        return done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    done(null, user);
  });

};
