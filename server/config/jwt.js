var jwt = require('express-jwt');

module.exports = function jwtConfig(app) {
  /**
   * middleware to check an authenticated user
   */
  app.use(jwt({
    secret: app.get('jwtTokenSecret')
  }));

  app.use(function(req, res, next) {
    var token = req.headers['x-access-token'];
    var user;

    // if (!token) {
    //   return res.send(403);
    // }

    // try {
    //   user = jwt.decode(token, app.get('jwtTokenSecret'));
    //   req.user = user;
    //   next();
    // } catch(err) {
    //   return next(err);
    // }

    next();

  });
};
