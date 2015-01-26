var User = require('./userModel');

exports.list = function(req, res, next) {
  var page = req.params.page || 0;
  var usersPerPage = 10;
  var startAtUser = page * usersPerPage;

  User.find({}, {}, {skip: startAtUser, limit: usersPerPage}, function(err, users) {
    if(err) {
      res.status(500).end();
    }
    res.json(users);
  })
};

exports.create = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({username: username, password: password}, function(err, user) {
    if (err) {
      res.send(500)
    }
    if(!user) {
      var newUser = new User({username: username, password: password});
      newUser.save(function(err, user) {
        if(err) {
          res.status(500).end();
        }
        console.log("User created");
        res.status(201).end();
      });
    } else {
      console.log("already exists");
      res.status(409).end();
    }
  });

};

exports.show = function(req, res, next) {
  var username = req.params.username;
  console.log(req.foundUser);
  User.findOne({username: username}, function(err, user) {
    if(!user) {
      res.status(404).end();
    } else {
      res.status(200).json(user);
    }
  })
};

exports.update = function(req, res, next) {
  var username = req.body.username;
  var newData = req.body;
  User.update({username: username}, newData, function(err, numberAffected, raw) {
    if(err) {
      res.status(404).end();
    }
    res.end();
  })
  // the user exists, we need to make sure
  // the user is trying to update their own information
  // and not someone elses... so we need to check
  // the Auth'd user is the same as the resource thats being updated

  // if jwt.user._id !== user._id return forbidden
  // else update
};

exports.destroy = function(req, res, next) {
  var username = req.params.username;
  User.findOne({username: username}, function(err, user) {
    if(!user) {
      res.status(404).end();
    } else {
      User.remove({username: username}, function(err) {
        if(err) {
          res.status(500).end();
        }
        res.status(200).end();
      })
    }
  })
};
