var router = require('express').Router();
var screenshotController = require('./screenshotController');

/**
 * /api/screenshot/
 */
router.route('/')
  // create a screenshot
  .post(screenshotController.create);

/**
 * /api/screenshot/:id
 */
router.route('/:id')
  // get the screenshot
  .get(screenshotController.show)
  // update the screenshot
  .put(screenshotController.update)
  // delete the screenshot
  .delete(screenshotController.destroy);

module.exports = router;
