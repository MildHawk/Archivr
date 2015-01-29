var userController = require('./userController');

module.exports = function(router) {
  /**
   * /api/user/
   */
  router.route('/api/user')
    // get a list of users
    .get(userController.list)
    // create a user
    .post(userController.create);

  /**
   * /api/user/:id
   */
  router.route('/api/user/:username')
    // get the user
    .get(userController.show)
    // update the user
    .put(userController.update)
    // delete the user
    .delete(userController.destroy);
};
