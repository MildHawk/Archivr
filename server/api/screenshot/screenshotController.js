var Screenshot = require('./screenshotModel');
var User = require('../user/userModel');
var takeScreenshot = require('../../screenshotCapture/script.js');
var cloudinary = require('cloudinary');
var urlModule = require('url');


/**
 * retrieveAll
 * ======
 * Returns all screenshots from all users
 * 
 */
exports.retrieveAll = function(req, res, next){
  Screenshot.find({ access: 'public' }, function(err, screenshots) {
    if(err) return res.status(500).json({ message: err });
    res.status(200).json(screenshots);
  });
};

/**
 * list
 * ======
 * Returns all screenshots from a specific user
 * 
 */
exports.list = function(req, res, next){
  // user found through router.param
  var user = req.foundUser;
  // find screenshots whos username's match the found users username
  Screenshot.find({ username: user.username }, function(err, screenshots){
    if (err) return res.status(500).json({
      status: 500, message: 'Internal Server Error'
    });
    res.status(200).json(screenshots);
  });
};

/**
 * create
 * ======
 * Takes screenshot of specified URL, creates new Screenshot in DB, and
 * adds screenshot to the user images.
 */
exports.create = function(req, res, next) {
  var username = req.params.username;
  var url = req.body.url;
  var width = req.body.width || 1024;
  var height = req.body.height || 768;

  var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;
  if( !url.match(rValidUrl) ) { 
    return res.status(500).json({ message: 'Invalid URL'});
  }

  takeScreenshot(url, width, height, function(err, imageUrl, imagePublicId) {
    if (err) return res.status(500).json({ message: err });

    // Save screenshot
    var newScreenshot = new Screenshot({url: url, originalImage: imageUrl, originalImageId: imagePublicId,
                      annotatedImage: imageUrl, username: username, width: width, height: height});
    newScreenshot.save(function(err, screenshot) {
      if (err) return res.status(500).json({ message: err });

      // Get user to add the screenshot
      User.findOne({username: username}, function(err, user) {
        if (err) return res.status(404).json({ message: err });

        // Add screenshot to user
        User.update({username: username}, {$push: {'images': screenshot._id}}, function(err, numAffected, rawResponse) {
          if (err) return res.status(500).json({ message: err });
          res.status(201).json(screenshot);
        });
      });
    });
  });
};

/**
 * show
 * ======
 * Returns the screenshot with the id passed in the request
 *
 */
exports.show = function(req, res, next) {
  // Get username and id sent in the request
  var username = req.params.username;
  var id = req.params.id;
  // Find screenshot with passed id and return it
  Screenshot.findOne({ _id: id }, function(err, screenshot) {
    if (err) return res.status(404).end();
    res.status(200).json(screenshot);
  });
};

/**
 * update
 * ======
 * Updates resource with new key-value pairs passed in the request body
 */
exports.update = function(req, res, next) {
  // Get id from the API endpoint and the new data passed in the request body
  var id = req.params.id;
  var newData = req.body;
  // Update screenshot that contains that id with new data passed in the request
  Screenshot.update({_id: id}, newData, function(err, numberAffected, raw) {
    if (err) {
      return res.status(404).end();
    }
    res.sendStatus(200);
  });
};

/**
 * destroy
 * ======
 * Returns the screenshot with the id passed in the request
 *
 */
exports.destroy = function(req, res, next) {
  // Get username and id passed in the request
  var username = req.params.username;
  var id = req.params.id;
  // Find screenshot with passed id
  Screenshot.findOne({_id: id}, function(err, screenshot) {
    if (!screenshot) {
      res.status(404).end();
    } else {
      /** If the screenshot exists, remove it
      * First from Cloudinary, -->TODO: create helper function to remove this from controller
      * We might want to use { invalidate: true } as seen in cloudinary.com/documentation/node_image_upload
      * so that the CDN doesn't return a cached copy
      */
      cloudinary.uploader.destroy(screenshot.originalImageId, function(result) {
        console.log('Image removed from Cloudinary, result -->', result);
      });
      // Then, from db
      Screenshot.remove({_id: id}, function(err) {
        if (err) {
          return res.status(500).end();
        }
        res.status(200).end();
      });
    }
  });
};
