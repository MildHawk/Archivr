var router = require('express').Router();

/**
 * /api/user/
 */
router.route('/')
  // get a list of users
  .get(function(req, res, next) {
    res.send('A list of users');
  })
  // create a user
  .post(function(req, res, next) {
    res.send('Create a user');
  });

/**
 * /api/user/:id
 */
router.route('/:id')
  // get the user
  .get(function(req, res, next) {
    res.send('GET user with ID ' + req.params.id);
  })
  // update the user
  .put(function(req, res, next) {
    res.send('GET user with ID ' + req.params.id);
  })
  // delete the user
  .delete(function(req, res, next) {
    res.send('GET user with ID ' + req.params.id);
  });

module.exports = router;
