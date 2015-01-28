var Nightmare = require('nightmare');
var Promise = require('bluebird');

//var url = require('');
//var width = require('');
//var height = require('');

var takeScreenshot = function(url) {
    var randomString = Math.random().toString(36).substring(7);

    new Nightmare()
    //.viewport(900, 900)
    .goto(url)
    .screenshot('./screenshotsImages/' + randomString + '.png')
    .title(function(str) {
      console.log(str);
    })
    .run(function(err, nightmare) {
      console.log(nightmare);
    })

  return ("/" + randomString + '.png');
}

module.exports = takeScreenshot;
