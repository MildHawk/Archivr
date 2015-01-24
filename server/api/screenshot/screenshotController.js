var Screenshot = require('./screenshotModel');

exports.create = function(req, res, next) {
  res.send('Create a screenshot');
};

exports.show = function(req, res, next) {
  res.send('GET screenshot with ID ' + req.params.id);
};

exports.update = function(req, res, next) {
  res.send('PUT screenshot with ID ' + req.params.id);
};

exports.destroy = function(req, res, next) {
  res.send('DELETE screenshot with ID ' + req.params.id);
};
