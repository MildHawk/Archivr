var router = require('express').Router();

/**
 * /api/screenshot/
 */
router.route('/')
  // create a screenshot
  .post(function(req, res, next) {
    res.send('Create a screenshot');
  });

/**
 * /api/screenshot/:id
 */
router.route('/:id')
  // get the screenshot
  .get(function(req, res, next) {
    res.send('GET screenshot with ID ' + req.params.id);
  })
  // update the screenshot
  .put(function(req, res, next) {
    res.send('PUT screenshot with ID ' + req.params.id);
  })
  // delete the screenshot
  .delete(function(req, res, next) {
    res.send('DELETE screenshot with ID ' + req.params.id);
  });

module.exports = router;
