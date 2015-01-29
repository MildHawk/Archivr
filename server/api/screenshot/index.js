// var router = require('express').Router();
var screenshotController = require('./screenshotController');

module.exports = function(router){
  /**
   * /api/screenshot/
   */
  router.route('/api/user/:username/screenshot')
    // create a screenshot
    .get(screenshotController.list)
    .post(screenshotController.create);

  /**
   * /api/screenshot/:id
   */
  router.route('/api/user/:username/screenshot/:id')
    // get the screenshot
    .get(screenshotController.show)
    // update the screenshot
    .put(screenshotController.update)
    // delete the screenshot
    .delete(screenshotController.destroy);

};


// module.exports = router;
