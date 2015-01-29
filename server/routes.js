var User = require('./api/user/userModel');
var config = require('./config/environment');
var jwt = require('express-jwt');
var router = require('express').Router();

module.exports = function applicationRouter(app) {

  /**
   * middleware for handling username param
   * this is probably the place check if
   * this is a valid username and also get access to the user id
   */
  router.param('username', function(req, res, next, username) {
    // find the user
    User.findOne({ username: username }, function(err, user) {
      // there was an error
      if (err) return res.send(500);
      // the user doesn't exist
      if (!user) return res.send(404);
      // found the user
      if (user) {
        // the user exists, attach their ID to the request
        req.foundUser = user;
        // continue
        return next();
      } else {
        return next(new Error('Unable to find user.'));
      }

    });
  });

  // mounts JWT checker to all routes prefixed with /api
  // the idea is this should deserialize the JWT and attach
  // the user to req.user when the user is authenticated
  router.use('/api', jwt({
    secret: config.jwtTokenSecret,
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring(req) {
      if(req.headers['x-access-header']){
        return req.headers['x-access-header'];
      }
      return null;
    }
  }));

  // // authentication related routes
  // router.use('/api/auth', require('./api/auth'));

  // // mount user and screenshot routers to /api
  // router.use('/api/user', require('./api/user'));

  /**
   * screenshot routes are structured
   * /user/:id/screenshot
   * and /user/:id/screenshot/:id
   */

  // TODO: everything must be mounted to the same router to use params middleware
  require('./api/auth')(router);
  require('./api/user')(router);
  require('./api/screenshot')(router);

  /**
   * catch all other routes and send back to
   * index for angular to handle
   */
  router.get('/*', function(req, res, next) {
    res.render('index');
  });

  app.use(router);

};
