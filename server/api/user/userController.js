var User = require('./userModel');
var mongoosePaginate = require('mongoose-paginate');

User.plugin(mongoosePaginate);

exports.list = function(req, res, next) {
  User.paginate({}, 1, 16, function(err, pageCount, paginatedResults, itemCount) {
    if(err) return res.status(500).end();
    res.status(200).json({
      pageCount: pageCount,
      results: paginatedResults,
      count: itemCount
    });
  });
};

exports.create = function(req, res, next) {

};

exports.show = function(req, res, next) {
  var user = req.params.user;
  res.status(200).json(user);
};

exports.update = function(req, res, next) {
  var user = req.params.user;
  var updates = req.body;
  // the user exists, we need to make sure
  // the user is trying to update their own information
  // and not someone elses... so we need to check
  // the Auth'd user is the same as the resource thats being updated

  // if jwt.user._id !== user._id return forbidden
  // else update
};

exports.destroy = function(req, res, next) {
  res.send('DELETE user with ID ' + req.params.id);
};
