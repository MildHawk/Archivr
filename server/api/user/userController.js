var User = require('./userModel');

exports.list = function(req, res, next) {
  res.send('List of users');
};

exports.create = function(req, res, next) {
  res.send('Create a user');
};

exports.show = function(req, res, next) {
  res.send('GET user with ID ' + req.params.id);
};

exports.update = function(req, res, next) {
  res.send('PUT user with ID ' + req.params.id);
};

exports.destroy = function(req, res, next) {
  res.send('DELETE user with ID ' + req.params.id);
};
