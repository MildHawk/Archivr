module.exports = function applicationRouter(app) {

  // mount user and screenshot routers to /api
  app.use('/api/user', require('./api/user'));
  app.use('/api/screenshot', require('./api/screenshot'));

  /**
   * catch all other routes and send back to
   * index for angular to handle
   */
  app.get('/*', function(req, res, next) {
    res.render('index');
  });

};
