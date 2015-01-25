var jwt = require('express-jwt');

module.exports = function jwtConfig(app) {
  /**
   * middleware to check an authenticated user
   */
  app.use(jwt({
    secret: app.get('jwtTokenSecret'),
    credentialsRequired: false
  }));

};
