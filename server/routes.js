var User = require('./api/user/userModel');

module.exports = function applicationRouter(app) {

  /**
   * middleware for handling username param
   * this is probably the place check if
   * this is a valid username and also get access to the user id
   */
  app.param('username', function(req, res, next, username) {
    // find the user
    User.findOne({ username: username }, function(err, user) {
      // there was an error
      if (err) return res.send(500);
      // the user doesn't exist
      if (!user) return res.send(404);

      if (user) {
        // the user exists, attach their ID to the request
        req.params.foundUser = user;
        // continue
        return next();
      } else {
        return next(new Error('Unable to find user.'));
      }

    });
  });

  // mount user and screenshot routers to /api
  app.use('/api/user', require('./api/user'));

  /**
   * screenshot routes are structured
   * /user/:id/screenshot
   * and /user/:id/screenshot/:id
   */
  app.use('/api/user', require('./api/screenshot'));

  /**
   * catch all other routes and send back to
   * index for angular to handle
   */
  app.get('/*', function(req, res, next) {
    res.render('index');
  });

};
