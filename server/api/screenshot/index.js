var screenshotController = require('./screenshotController');

module.exports = function(router) {
  /**
   * /api/user/:username/screenshot
   */
  router.route('/api/user/:username/screenshot')
    // create a screenshot
    .get(screenshotController.list)
    .post(screenshotController.create);

  /**
   * /api/user/:username/screenshot/:id
   */
  router.route('/api/user/:username/screenshot/:id')
    // get the screenshot
    .get(screenshotController.show)
    // update the screenshot
    .put(screenshotController.update)
    // delete the screenshot
    .delete(screenshotController.destroy);

};
