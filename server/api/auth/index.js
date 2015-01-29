var authController = require('./authController');
/**
 * /api/auth/
 */
module.exports = function(router) {
  // sign a user up --- convenience for user.create
  router.post('/api/auth/signup', authController.signup);
  // create a session / authenticate a user
  router.post('/api/auth/login', authController.login);
};
