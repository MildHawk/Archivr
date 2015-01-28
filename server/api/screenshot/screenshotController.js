var Screenshot = require('./screenshotModel');

exports.list = function(req, res, next){
  var user = req.foundUser;
  Screenshot.find({ userId: user._id }, function(err, screenshots){
    if (err) return res.send(500);
    res.status(200).json(screenshots);
  });
};

exports.create = function(req, res, next) {
  var url = req.body.url;
  var username = req.params.username;
  //var originalImage = call method to take screenshot

  var newScreenshot = new Screenshot({url: url, originalImage: originalImage});
  newScreenshot.save(function(err, screenshot) {
    if(err) {
      res.status(500).end();
    }
    console.log("Screenshot created");
    User.findOne({username: username}, function(err, user) {
      if(err) {
        res.status(404).end();
      }
      user.images.push(screenshot._id);
      res.end();
    })
  }); 
};

exports.show = function(req, res, next) {
  var user = req.foundUser;
  var id = req.params.id;
  Screenshot.findOne({ _id: id }, function(err, screenshot) {
    if (err) return res.send(500);
    res.status(200).json(screenshot)
  });
};

exports.update = function(req, res, next) {

  res.send('PUT screenshot with ID ' + req.params.id);
};

exports.destroy = function(req, res, next) {
  res.send('DELETE screenshot with ID ' + req.params.id);
};
