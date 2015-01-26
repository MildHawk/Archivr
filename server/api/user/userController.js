var User = require('./userModel');
//var mongoosePaginate = require('mongoose-paginate');

//User.plugin(mongoosePaginate);

exports.list = function(req, res, next) {
  var users = User.find({}, function(err, users){
    console.log(users);
    res.end();
  });
  //User.find({}).sort().skip().limit()
  //var page = req.params.page || 1;
  //User.paginate({}, page, 16, function(err, pageCount, paginatedResults, itemCount) {
    //if (err) return res.status(500).end();
    //res.status(200).json({
      //pageCount: pageCount,
      //results: paginatedResults,
      //count: itemCount
    //});
  //});
};

exports.create = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username, password: password}, function(err, user) {
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
  })
};

exports.show = function(req, res, next) {
  var user = req.params.user;
  
  res.status(200).json(req.foundUser);
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
