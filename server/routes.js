module.exports = function applicationRouter(app) {

  // mount user router to /api
  app.use('/api/user', require('./api/user'));

  /**
   * catch all other routes and send back to
   * index for angular to handle
   */
  app.get('/*', function(req, res, next) {
    res.render('index');
  });

};
