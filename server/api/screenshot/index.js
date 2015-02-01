var screenshotController = require('./screenshotController');
var auth = require('../../config/auth');

module.exports = function(router) {
  /**
   * /api/screenshot
   */
  router.route('/api/screenshot')
    //get all screenshots
    .get(screenshotController.retrieveAll);
  /**
   * /api/user/:username/screenshot
   */
  router.route('/api/user/:username/screenshot')
    // get all screenshots from a user
    .get(screenshotController.list)
    // create a screenshot
    // TODO: reset to require auth
    // .post(auth.modifiableOnlyByOwner, screenshotController.create);
    .post(screenshotController.create);

  /**
   * /api/user/:username/screenshot/:id
   */
  router.route('/api/user/:username/screenshot/:id')
    // get an specific screenshot from a user
    .get(screenshotController.show)
    // update the screenshot
    // TODO: reset to require auth
    // .put(auth.modifiableOnlyByOwner, screenshotController.update)
    .put(screenshotController.update)
    // delete the screenshot
    // TODO: reset to require auth
    // .delete(auth.modifiableOnlyByOwner, screenshotController.destroy);
    .delete(screenshotController.destroy);

};
