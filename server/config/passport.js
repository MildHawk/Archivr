var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');

module.exports = function(app) {
  // initialize passport on the app
  app.use(passport.initialize());

  // configure local strategy (standard user/pass authentication)
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }

        if (!user) { return done(null, false); }

        if (!user.verifyPassword(password)) { return done(null, false); }

        return done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    findById(id, function (err, user) {
      done(err, user);
    });
  });

};
