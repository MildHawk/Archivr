/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

var User = require('../api/user/userModel');
var Screenshot = require('../api/screenshot/screenshotModel');

var imageIdsForAndrew = [];
var imageIdsForRuben = [];

// Clear screenshots and seed
Screenshot.find({}).remove(function() {
  // Screenshots for Andrew
  Screenshot.create({ // 1
    url: 'http://www.google.com',
    originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422651327/cl5at8odtqfjgsmber6i.png',
    annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422651327/cl5at8odtqfjgsmber6i.png',
    user_id: 'Andrew'
  }, { // 2
    url: 'http://www.random.com',
    originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422749458/qgv2bwhwdrcqletbznnc.png',
    annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422749458/qgv2bwhwdrcqletbznnc.png',
    user_id: 'Andrew'
  }, { // 3
    url: 'http://www.facebook.com',
    originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422752920/uxryntqxacyak5fwv5ez.png',
    annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422752920/uxryntqxacyak5fwv5ez.png',
    user_id: 'Andrew'
  }, { // 4
    url: 'http://www.asana.com',
    originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753081/qnprmx3dapys2w6vtame.png',
    annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753081/qnprmx3dapys2w6vtame.png',
    user_id: 'Andrew'
  }, { // 5
    url: 'http://www.purple.com',
    originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753106/m28t0rrgtgdt8zzruf8o.png',
    annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753106/m28t0rrgtgdt8zzruf8o.png',
    user_id: 'Andrew'
  }, { // 6
    url: 'http://www.yahoo.com',
    originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753136/s83njghjf2t84mlslrpv.png',
    annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753136/s83njghjf2t84mlslrpv.png',
    user_id: 'Andrew'
  }, { // 7
    url: 'http://www.hackreactor.com',
    originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753172/lfhyndtvkacmxksrxnmx.png',
    annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753172/lfhyndtvkacmxksrxnmx.png',
    user_id: 'Andrew'
  }, { // 8
    url: 'http://www.evernote.com',
    originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753221/p1igphs2ybquinjenyeo.png',
    annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753221/p1igphs2ybquinjenyeo.png',
    user_id: 'Andrew'
  }, { // 9
    url: 'http://www.heroku.com',
    originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753268/gnpnltvch0rkwfzx0uzj.png',
    annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753268/gnpnltvch0rkwfzx0uzj.png',
    user_id: 'Andrew'
  }, { // 10
    url: 'http://www.cnn.com',
    originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753332/uzsrs4iv0fzhjyprbeou.png',
    annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753332/uzsrs4iv0fzhjyprbeou.png',
    user_id: 'Andrew'
  }, { // 11
    url: 'http://www.apple.com',
    originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753360/xke2zfdigsotyfhrbvdk.png',
    annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753360/xke2zfdigsotyfhrbvdk.png',
    user_id: 'Andrew'
  }, { // 12
    url: 'http://www.trello.com',
    originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753386/ee2bboyamcfur5odksan.png',
    annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422753386/ee2bboyamcfur5odksan.png',
    user_id: 'Andrew'
  }, function(err, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12) {
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

    // Screenshots for Ruben
    Screenshot.create({ // 1
      url: 'http://www.google.com',
      originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422651327/cl5at8odtqfjgsmber6i.png',
      annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422651327/cl5at8odtqfjgsmber6i.png',
      user_id: 'Ruben'
    }, { // 2
      url: 'http://www.random.com',
      originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422749458/qgv2bwhwdrcqletbznnc.png',
      annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422749458/qgv2bwhwdrcqletbznnc.png',
      user_id: 'Ruben'
    }, { // 3
      url: 'http://www.facebook.com',
      originalImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422752920/uxryntqxacyak5fwv5ez.png',
      annotatedImage: 'http://res.cloudinary.com/hdflpcx8g/image/upload/v1422752920/uxryntqxacyak5fwv5ez.png',
      user_id: 'Ruben'
    }, function(err, m1, m2, m3) {
      imageIdsForRuben.push(m1._id);
      imageIdsForRuben.push(m2._id);
      imageIdsForRuben.push(m3._id);

      // Clear users and seed
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




