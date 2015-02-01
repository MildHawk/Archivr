/**
 * Defines function to take screenshot
 */

var screenshot = require('url-to-screenshot');
var fs = require('fs');
var cloudinary = require('cloudinary');

/**
 * takeScreenshot
 * ==============
 * Creates screenshot using PhantomJS service. Stores image in Cloudinary.
 * Passes the Cloudinary file URL to the callback.
 */
var takeScreenshot = function(url, cb) {
  // Set screenshot properties
  var randomString = Math.random().toString(36).substring(7);
  var fileName = '/' + randomString + '.png';
  var width = 800;
  var height = 600;

  // Take screenshot
  screenshot(url)
    .width(width)
    .height(height)
    .capture(function(err, img) {
      if (err) return cb('Error capturing image: ' + err, null, null);

      // Write the capture screenshot to disk temporarily
      fs.writeFile(__dirname + fileName, img, function(err) {
        if (err) return cb('Error writing file to disk: ' + err, null, null);

        // Upload to cloudinary
        cloudinary.uploader.upload(__dirname + fileName, function(result) {

          //delete local file and return cloudinary url
          fs.unlink(__dirname + fileName, function() {
            cb(null, result.url, result.public_id); // jshint ignore:line
          });
        });
      });
    });
};

module.exports = takeScreenshot;
