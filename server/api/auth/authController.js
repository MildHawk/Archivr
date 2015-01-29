var createUser = require('../user/userController').create;
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../../config/environment');

exports.signup = function(req, res, next) {
  createUser(req, res, next);
};

exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    // if theres an error throw a 500
    if (err) return res.send(500);

    // the user doesnt exist
    if (!user && info.match(/Incorrect username/)) return res.json(404, {
      message: 'User does not exist'
    });

    // invalid password
    if (!user && info.match(/Incorrect password/)) return res.json(404, {
      message: 'Invalid password'
    });

    // the user exists, log them in, send a jwt
    if (user) {
      // we dont need to send the user password along
      delete user.password;
      // send token and logged in user info
      res.json({
        user: user,
        token: jwt.sign(user, config.jwtTokenSecret, { expiresInMinutes: 60*5 })
      });
    }

  })(req, res, next);
};

exports.logout = function(req, res, next) {
  // logout happens on the frontend ?
  req.logout();
  res.send(200);
};
