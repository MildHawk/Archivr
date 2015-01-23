var router = require('express').Router();
var userController = require('./userController');

/**
 * /api/user/
 */
router.route('/')
  // get a list of users
  .get(userController.list)
  // create a user
  .post(userController.create);

/**
 * /api/user/:id
 */
router.route('/:id')
  // get the user
  .get(userController.show)
  // update the user
  .put(userController.update)
  // delete the user
  .delete(userController.destroy);

module.exports = router;
