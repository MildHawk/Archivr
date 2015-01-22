module.exports = function applicationRouter(app) {
  // mount user router to /api
  app.use('/api/user', require('./api/user'));

};
