/*jshint -W079 */

var expect = require('chai').expect;
var request = require('supertest');
var express = require('express');
var app = require('../../server/index.js');
var User = require('../../server/api/user/userModel');
var Screenshot = require('../../server/api/screenshot/screenshotModel');
var cloudinary = require('cloudinary');

function removeRecentImagesFromCloudinary(number, cb) {
  // Get images from server
  cloudinary.api.resources(function(result) {
    var images = result.resources.slice(0, number);

    // Store public IDs to delete
    var publicIds = [];
    for (var i = 0; i < images.length; i++) {
      publicIds.push(images[i].public_id);
    }

    // Delete from Cloudinary
    cloudinary.api.delete_resources(publicIds, function(result) {
      cb(result);
    });

  });
}

xdescribe('TEST working with Cloudinary', function () {

    // cloudinary.api.delete_resources(['rarniozvwkulalqu0hyo'], function(result){
    // });
    // cloudinary.api.resources(function(result) {
    //   returns {resources: [...]}
    // })

  it('should get resources', function (done) {
    cloudinary.api.resources(function(result) {
      console.log(result)
      expect(true).to.equal(true);
      done();
    });
  });
});

describe('Working with Cloudinary', function () {

  var numImagesBeforeTest;

  before(function (done) {
    cloudinary.api.resources(function(result) {
      numImagesBeforeTest = result.resources.length;
      done();
    });
  });

  after(function (done) {
    removeRecentImagesFromCloudinary(1, function(result) {
      cloudinary.api.resources(function(result) {
        if (numImagesBeforeTest !== result.resources.length) {
          done('Issue cleaning on Cloudinary');
        } else {
          done();
        }
      });
    });
  });

  it('should be able to clean up after itself', function (done) {
    // Create new image
    request(app).post('/api/user/Ruben/screenshot')
      .send({ url: 'http://www.google.com' })
      .end(function(err, res) {
        if (err) return done(err);
        console.log('create result:', res.body);
        done();
        // // clean up
        // removeRecentImagesFromCloudinary(1, function(result) {
        //   console.log('delete result:', result);
        //   done();
        // })
      });
  });

});

describe('INTEGRATION: Server + DB: /api/screenshot/:username/screenshot', function () {

  // Clear users and screenshots collections
  beforeEach(function (done) {
    User.remove({}, function() {
      var user = new User({
        username: 'Ruben',
        password: 'password'
      });
      user.save(function() {});
    });

    Screenshot.remove({}, function() {
      done();
    });
  });

  describe('POST /', function () {

    it('should create a new screenshot', function (done) {
      request(app).post('/api/user/Ruben/screenshot')
        .send({ url: 'http://www.purple.com' })
        // should get back 201 response
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);

          Screenshot.find(function(err, res) {
            expect(res.length).to.equal(1);
            removeRecentImagesFromCloudinary(1, function(result) {
              done();
            });
          });
        });
    });

    it('should append to user image property', function (done) {
      request(app).post('/api/screenshot/Ruben/screenshot')
        .send({ url: 'http://www.purple.com' })  // TODO: why send annotatedImage?
        .end(function(err, res) {
          if (err) return done(err);
          request(app).get('/api/user/Ruben')
            .expect(function(res) {
              // should append id to user images
              expect(res.body.images).to.have.length(1);
            })
            .end(function(err, res) {
              if (err) return done(err);
              done();
            });
        });
    });
  });

  describe('GET /', function () {

    it('should return a screenshot', function (done) {
      // Create a new shot
      var shot = new Screenshot({
        url: 'www.google.com',
        originalImage: 'image1.png',
        annotatedImage: 'image1a.png',
        user: 'Ruben'
      });

      // Save the shot, then...
      shot.save(function(err, shot) {
        // query the server
        request(app).get('/api/screenshot/Ruben/screenshot')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(function(res) {
            expect(res.body).to.have.length(1);
          })
          .end(function(err, res) {
            if (err) return done(err);
            done();
          });
      });
    });


  });
});

describe('INTEGRATION: Server + DB: /api/screenshot/:username/screenshot/:id', function () {

  var shotID;

  beforeEach(function (done) {
    // Clear users and screenshots collections
    User.remove({}, function() {
      var user = new User({
        username: 'Ruben',
        password: 'password'
      });
      user.save(function() {});
    });

    Screenshot.remove({}, function() {});

    // Create a new stock screenshot
    request(app).post('/api/screenshot/Ruben/screenshot')
      .send({ url: 'http://www.purple.com' })
      .expect(function(res) {
        shotID = res.body;  // TODO may need to change later
      })
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  describe('GET /', function () {

    it('should retrieve screenshots from a user', function (done) {
      request(app)
        .get('/api/screenshot/Ruben/screenshot/' + shotID)
        .expect(200)
        .expect('Content-Type', /image/)
        .end(function(err, res) {
          if (err) done(err);
          done();
        });
    });

    it('should fail to retrieve bad screenshot id', function (done) {
      request(app).get('/api/screenshot/Ruben/screenshot/notAnID')
        .expect(404, done);
    });

    it('should fail on bad username', function (done) {
      request(app).get('/api/screenshot/billy/screenshot/' + shotID)
        .expect(404, done);
    });

  });

  describe('PUT /', function () {

    it('TODO: what should screenshot PUT do?', function (done) {
      expect(true).to.equal(false);
      done();
    });

  });

  describe('DELETE /', function () {
    it('should delete a screenshot', function (done) {
      request(app).delete('/api/screenshot/Ruben/screenshot/' + shotID)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          request(app).get('/api/screenshot/Ruben/screenshot')
            .expect(function(res) {
              expect(res.body).to.have.length(0);
            })
            .end(function(err, res) {
              if (err) return done(err);
              done();
            });
        });
    });

    it('should fail to delete with bad ID', function (done) {
      request(app).delete('/api/screenshot/Ruben/screenshot/notanid')
        .expect(404, done);
    });

    it('should fail with bad username', function (done) {
      request(app).delete('/api/screenshot/billy/screenshot/' + shotID)
        .expect(404, done);
    });
  });

});


