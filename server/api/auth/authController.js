var createUser = require('../user/userController').create;
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../../config/development');

exports.signup = function(req, res, next) {
  createUser(req, res, next);
};

exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    // if theres an error throw a 500
    if (err) return res.send(500);

    // the user doesnt exist
    if(!user) return res.json(404, {
      message: 'User does not exist'
    });

    // the user exists, log them in, send a jwt
    if (user) {
      res.json({
        user: user,
        token: jwt.sign(user._id, config.jwtTokenSecret, { expiresInMinutes: 60*5 })
      });
    }

  })(req, res, next);
};

exports.logout = function(req, res, next) {
  // logout happens on the frontend ?
  req.logout();
  res.send(200);
};
