var router = require('express').Router();
var authController = require('./authController');

/**
 * /api/auth/
 */
router.post('/signup', authController.signup);
// create a session
router.post('/login', authController.login);
  // destroy a session
// router.get.delete(authController.logout);

module.exports = router;
