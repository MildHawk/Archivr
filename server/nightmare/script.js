//var Nightmare = require('nightmare');
//var Promise = require('bluebird');
var Screenshot = require('url-to-screenshot');
var fs = require('fs');
var cloudinary = require('cloudinary');

var width = 800 //require('').width;
var height = 600//require('').height;
//var height = require('');

var takeScreenshot = function(url, cb) {
    var randomString = Math.random().toString(36).substring(7);
    var fileName = "./" + randomString + ".png";
    Screenshot(url)
    .width(width)
    .height(height)
    .capture(function(err, img) {
      if(err) throw err;
      //fs.writeFile(fileName, img, function(err) {
        //if(err) throw err
        //console.log("img saved!!");
      //})
      cloudinary.uploader.upload(randomString + ".png", function(result) {
        console.log(result);
        cb(result.url);
      })
    })
  //return ("/" + randomString + '.png');
};

module.exports = takeScreenshot;

