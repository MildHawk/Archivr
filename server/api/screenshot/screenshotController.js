var Screenshot = require('./screenshotModel');
var User = require('../user/userModel');
var takeScreenshot = require('../../nightmare/script.js');
var Promise = require('bluebird');

exports.list = function(req, res, next){
  var user = req.foundUser;
  Screenshot.find({ userId: user._id }, function(err, screenshots){
    if (err) return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    res.status(200).json(screenshots);
  });
};

exports.create = function(req, res, next) {
  var url = req.body.url;
  var username = req.params.username;
  var annotatedImage = req.body.annotatedImage;
  var originalImage = takeScreenshot(url);

  console.log("originalImage -->", originalImage);

  var newScreenshot = new Screenshot({url: url, originalImage: originalImage,
                      annotatedImage: annotatedImage, user_id: username});

  newScreenshot.save(function(err, screenshot) {
    if(err) {
      return res.status(500).end();
    }
    User.findOne({username: username}, function(err, user) {
      if(err) {
        return res.status(404).end();
      }
      User.update({username: username}, {$push: {"images": screenshot._id}}, function(err, numAffected, rawResponse) {
        if(err) {
          return res.status(500).end();
        }
        res.end();
      })
    })
  });
};

exports.show = function(req, res, next) {
  var username = req.params.username;
  var id = req.params.id;
  Screenshot.findOne({ _id: id }, function(err, screenshot) {
    if (err) return res.send(500);
    res.status(200).json(screenshot);
  });
};

exports.update = function(req, res, next) {
  var id = req.params.id;
  var newData = {}; //, get new notes
  Screenshot.update({_id: id}, newData, function(err, numberAffected, raw) {
    if(err) {
      return res.status(500).end();
    }
    res.end();
  })
  //res.send('PUT screenshot with ID ' + req.params.id);
};

exports.destroy = function(req, res, next) {
  var username = req.params.username;
  var id = req.params.id;
  Screenshot.findOne({_id: id}, function(err, screenshot) {
    if(!screenshot) {
      res.status(404).end();
    } else {
      Screenshot.remove({_id: id}, function(err) {
        if(err) {
          return res.status(500).end();
        }
        res.status(200).end();
      })
    }
  })
  //res.send('DELETE screenshot with ID ' + req.params.id);
};
