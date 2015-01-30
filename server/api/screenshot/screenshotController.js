var Screenshot = require('./screenshotModel');
var User = require('../user/userModel');
var takeScreenshot = require('../../screenshotCapture/script.js');
var Promise = require('bluebird');

exports.list = function(req, res, next){
  // user found through router.param
  var user = req.foundUser;
  // find screenshots whos user_id's match the found users username
  Screenshot.find({ user_id: user.username }, function(err, screenshots){
    if (err) return res.status(500).json({
      status: 500, message: 'Internal Server Error'
    });
    res.status(200).json(screenshots);
  });
};

exports.create = function(req, res, next) {
  var url = req.body.url;
  var username = req.params.username;
  var annotatedImage = req.body.annotatedImage;

  takeScreenshot(url, function(imageUrl) {
    var originalImage = imageUrl;

    var newScreenshot = new Screenshot({url: url, originalImage: originalImage,
                      annotatedImage: annotatedImage, user_id: username});
    console.log('new screenshot:', newScreenshot);

    newScreenshot.save(function(err, screenshot) {
      if (err) {
        console.log('err', err);
        return res.status(500).end(err);
      }
      User.findOne({username: username}, function(err, user) {
        if (err) {
          console.log('err', err);
          return res.status(404).end(err);
        }
        User.update({username: username}, {$push: {"images": screenshot._id}}, function(err, numAffected, rawResponse) {
          if (err) {
            console.log('err', err);
            return res.status(500).end(err);
          }
          res.status(201).end(screenshot);
        })
      })
    });
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
    if (err) {
      return res.status(500).end();
    }
    res.end();
  })
};

exports.destroy = function(req, res, next) {
  var username = req.params.username;
  var id = req.params.id;
  Screenshot.findOne({_id: id}, function(err, screenshot) {
    if (!screenshot) {
      res.status(404).end();
    } else {
      Screenshot.remove({_id: id}, function(err) {
        if (err) {
          return res.status(500).end();
        }
        res.status(200).end();
      })
    }
  })
};
