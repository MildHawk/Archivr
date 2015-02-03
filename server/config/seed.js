var mongoose = require('../db/index.js');
/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

 //drop database
 mongoose.db.dropDatabase();


var User = require('../api/user/userModel');
var Screenshot = require('../api/screenshot/screenshotModel');

// Store image IDs to insert into user creation... hacky solution
var imageIdsForAndrew = [];
var imageIdsForRuben = [];

// Clear screenshots and seed
Screenshot.find({}).remove(function() {
  // Screenshots for Andrew
  Screenshot.create({ // 1
    url: 'http://www.google.com',
    originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422651327/cl5at8odtqfjgsmber6i.png',
    annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422651327/cl5at8odtqfjgsmber6i.png',
    username: 'Andrew',
    width: 800,
    height: 600
  }, { // 2
    url: 'http://www.random.com',
    originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422749458/qgv2bwhwdrcqletbznnc.png',
    annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422749458/qgv2bwhwdrcqletbznnc.png',
    username: 'Andrew',
    width: 800,
    height: 600
  }, { // 3
    url: 'http://www.facebook.com',
    originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422752920/uxryntqxacyak5fwv5ez.png',
    annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422752920/uxryntqxacyak5fwv5ez.png',
    username: 'Andrew',
    width: 800,
    height: 600
  }, { // 4
    url: 'http://www.asana.com',
    originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753081/qnprmx3dapys2w6vtame.png',
    annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753081/qnprmx3dapys2w6vtame.png',
    username: 'Andrew',
    width: 800,
    height: 600
  }, { // 5
    url: 'http://www.purple.com',
    originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753106/m28t0rrgtgdt8zzruf8o.png',
    annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753106/m28t0rrgtgdt8zzruf8o.png',
    username: 'Andrew',
    width: 800,
    height: 600
  }, { // 6
    url: 'http://www.yahoo.com',
    originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753136/s83njghjf2t84mlslrpv.png',
    annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753136/s83njghjf2t84mlslrpv.png',
    username: 'Andrew',
    width: 800,
    height: 600
  }, { // 7
    url: 'http://www.hackreactor.com',
    originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753172/lfhyndtvkacmxksrxnmx.png',
    annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753172/lfhyndtvkacmxksrxnmx.png',
    username: 'Andrew',
    width: 800,
    height: 600
  }, { // 8
    url: 'http://www.evernote.com',
    originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753221/p1igphs2ybquinjenyeo.png',
    annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753221/p1igphs2ybquinjenyeo.png',
    username: 'Andrew',
    width: 800,
    height: 600
  }, { // 9
    url: 'http://www.heroku.com',
    originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753268/gnpnltvch0rkwfzx0uzj.png',
    annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753268/gnpnltvch0rkwfzx0uzj.png',
    username: 'Andrew',
    width: 800,
    height: 600
  }, { // 10
    url: 'http://www.cnn.com',
    originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753332/uzsrs4iv0fzhjyprbeou.png',
    annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753332/uzsrs4iv0fzhjyprbeou.png',
    username: 'Andrew',
    width: 800,
    height: 600
  }, { // 11
    url: 'http://www.apple.com',
    originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753360/xke2zfdigsotyfhrbvdk.png',
    annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753360/xke2zfdigsotyfhrbvdk.png',
    username: 'Andrew',
    width: 800,
    height: 600
  }, { // 12
    url: 'http://www.trello.com',
    originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753386/ee2bboyamcfur5odksan.png',
    annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753386/ee2bboyamcfur5odksan.png',
    username: 'Andrew',
    width: 800,
    height: 600
  }, function(err, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12) {
    // Get all image ids
    imageIdsForAndrew.push(m1._id);
    imageIdsForAndrew.push(m2._id);
    imageIdsForAndrew.push(m3._id);
    imageIdsForAndrew.push(m4._id);
    imageIdsForAndrew.push(m5._id);
    imageIdsForAndrew.push(m6._id);
    imageIdsForAndrew.push(m7._id);
    imageIdsForAndrew.push(m8._id);
    imageIdsForAndrew.push(m9._id);
    imageIdsForAndrew.push(m10._id);
    imageIdsForAndrew.push(m11._id);
    imageIdsForAndrew.push(m12._id);

    // THEN... Screenshots for Ruben
    Screenshot.create({ // 1
      url: 'http://www.google.com',
      originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422651327/cl5at8odtqfjgsmber6i.png',
      annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422651327/cl5at8odtqfjgsmber6i.png',
      username: 'Ruben',
      width: 800,
      height: 600
    }, { // 2
      url: 'http://www.random.com',
      originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422749458/qgv2bwhwdrcqletbznnc.png',
      annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422749458/qgv2bwhwdrcqletbznnc.png',
      username: 'Ruben',
      width: 800,
      height: 600
    }, { // 3
      url: 'http://www.facebook.com',
      originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422752920/uxryntqxacyak5fwv5ez.png',
      annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422752920/uxryntqxacyak5fwv5ez.png',
      username: 'Ruben',
      width: 800,
      height: 600
    }, function(err, m1, m2, m3) {
      imageIdsForRuben.push(m1._id);
      imageIdsForRuben.push(m2._id);
      imageIdsForRuben.push(m3._id);

      // THEN... Clear users and seed
      User.find({}).remove(function() {
        User.create({
          id: 'test',
          username: 'Andrew',
          password: 'Andrew',
          images: imageIdsForAndrew
        }, {
          username: 'Ruben',
          password: 'password',
          images: imageIdsForRuben
        }, function() {
          console.log('finished populating users');
        });
      });
    });
  });

});




