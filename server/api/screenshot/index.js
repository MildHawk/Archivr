var screenshotController = require('./screenshotController');
var auth = require('../../config/auth');

module.exports = function(router) {
  /**
   * /api/user/:username/screenshot
   */
  router.route('/api/user/:username/screenshot')
    // get a screenshot
    .get(screenshotController.list)
    // create a screenshot
    .post(auth.modifiableOnlyByOwner, screenshotController.create);

  /**
   * /api/user/:username/screenshot/:id
   */
  router.route('/api/user/:username/screenshot/:id')
    // get the screenshot
    .get(screenshotController.show)
    // update the screenshot
    .put(auth.modifiableOnlyByOwner, screenshotController.update)
    // delete the screenshot
    .delete(auth.modifiableOnlyByOwner, screenshotController.destroy);

};
