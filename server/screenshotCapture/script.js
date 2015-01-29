//var Nightmare = require('nightmare');
//var Promise = require('bluebird');
var Screenshot = require('url-to-screenshot');
var fs = require('fs');
var cloudinary = require('cloudinary');

var width = 800 //require('').width;
var height = 600//require('').height;
//var height = require('');

//cloudinary.config({
//  cloud_name: name,
//  api_key: key,
//  api_secret: secret
//});


var takeScreenshot = function(url, cb) {
    var randomString = Math.random().toString(36).substring(7);
    var fileName = "/" + randomString + ".png";
    Screenshot(url)
    .width(width)
    .height(height)
    .capture(function(err, img) {
      if(err) throw err;
      console.log('img before saving', img)
      fs.writeFile(__dirname + fileName, img, function(err) {
        if(err) throw err
        console.log("img saved!!");
      })
      cloudinary.uploader.upload(__dirname + fileName, function(result) {
        //delete local file;
        fs.unlink(__dirname + fileName, function() {
          console.log('file removed!');
          cb(result.url);
        })
      })
    })
};

module.exports = takeScreenshot;
