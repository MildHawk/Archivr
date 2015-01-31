var userController = require('./userController');
var auth = require('../../config/auth');

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
    // TODO: reset auth requirement
    // .put(auth.modifiableOnlyByOwner, userController.update)
    .put(userController.update)
    // delete the user
    // TODO: reset auth requirement
    // .delete(auth.modifiableOnlyByOwner, userController.destroy);
    .delete(userController.destroy);
};
