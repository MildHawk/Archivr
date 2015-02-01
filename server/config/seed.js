/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

var User = require('../api/user/userModel');
var Screenshot = require('../api/screenshot/screenshotModel');

// Clear users and seed
User.find({}).remove(function() {
  User.create({
    username: 'Andrew',
    password: 'Andrew'
  }, {
    username: 'Ruben',
    password: 'password'
  }, function() {
    console.log('finished populating users');
  });
});
