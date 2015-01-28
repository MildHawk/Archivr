var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var jwt = require('jsonwebtoken');
var User = require('../api/user/userModel');

module.exports = function(app) {
  // initialize passport on the app
  app.use(passport.initialize());

  /**
   * Local Strategy
   */
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        // return done if error
        if (err) {
          return done(err);
        }
        // there isnt a user return done with false authentication
        if (!user) {
          return done(null, false);
        }

        // verify the password is correct
        user.verifyPassword(password, function(match){
          if(!match){
            console.log('bad password');
            return done(null, false);
          } else {
            console.log('correct password');
            return done(null, user);
          }
        });

      });
    }
  ));


  /**
   * Twitter Strategy
   */
  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }));

  passport.use(new TwitterStrategy({
    consumerKey: 'zN7KJXcI3ZB77tYZXNHpEL0o8',
    consumerSecret: '1iU7qKqlgWaFq4g3x48JtwKot1ykQVWldPFRKrbZX6CMjGQrT1',
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
  }, function(token, tokenSecret, profile, done) {
    User.findOne({ username: profile.screen_name }, function(err, user){
      if (err) return done(err);
      if (user) {
        // user exists
        return done(null, user);
      } else {
        // create the user
        var user = new User({ username: profile.screen_name });
        user.save(function(err, user) {
          if (err) return done(null, false);
          return done(null, user);
        })
      }
    })
  }));

  /**
   * Facebook Strategy
   */
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

  passport.use(new FacebookStrategy({
    clientID: '1669170366643206',
    clientSecret: '00a55e8ee633629d95da78cea4e019b2',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  }, function(accessToken, refreshToken, profile, done) {
    User.findOne({ username: profile.displayName }, function(err, user) {
      if (err) return done(err);
      if (user) {
        // user exists
      } else {
        // create user
      }
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    done(null, id);
  });

};
