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
      publicIds.push(images[i].public_id);  // jshint ignore:line
    }

    // Delete from Cloudinary
    cloudinary.api.delete_resources(publicIds, function(result) { // jshint ignore:line
      cb(result);
    });

  });
}

describe('Bail functionality', function () {
  /**
   * This describe block is a basic proof of concept of using `bail`
   *
   * bail is used to cause `after` hook to skip deleting from Cloudinary
   * if no new image was created. If that wasn't there, non-test images
   * would get deleted.
   */
  var screenshot;
  var bail;

  afterEach(function (done) {
    if (bail) {
      // reset bail for next test
      bail = false;
      console.log('bailing');

      return done();
    }
    console.log('not bailing');
    done();
  });

  it('should bail on err', function (done) {
    bail = true;
    done();
  });

  it('should not bail on not err', function (done) {
    done();
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
        done();
      });
  });

});

describe('INTEGRATION: Server + DB: /api/user/:username/screenshot', function () {

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
    var bail;

    // remove image after each test
    afterEach(function (done) {
      // do not delete image if it was never created
      if (bail) {
        // reset bail for next test
        bail = false;
        return done();
      }
      // otherwise, delete from Cloudinary
      removeRecentImagesFromCloudinary(1, function(res) {
        done();
      });
    });


    it('should create a new screenshot', function (done) {
      request(app).post('/api/user/Ruben/screenshot')
        .send({ url: 'http://www.purple.com' })
        // should get back 201 response
        .expect(201)
        .end(function(err, res) {
          if (err) {
            bail = true;
            return done(err);
          }

          Screenshot.find(function(err, res) {
            expect(res.length).to.equal(1);
            done();
          });
        });
    });

    it('should append to user image property', function (done) {
      request(app).post('/api/user/Ruben/screenshot')
        .send({ url: 'http://www.purple.com' })
        .end(function(err, res) {
          if (err) {
            bail = true;
            return done(err);
          }

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

    it('should return screenshots belonging to user', function (done) {
      // Create a new shot
      var shot1 = new Screenshot({
        url: 'www.google.com',
        originalImage: 'image1.png',
        annotatedImage: 'image1a.png',
        user_id: 'notRuben' // jshint ignore:line
      });
      shot1.save();

      var shot2 = new Screenshot({
        url: 'www.google.com',
        originalImage: 'image1.png',
        annotatedImage: 'image1a.png',
        user_id: 'Ruben' // jshint ignore:line
      });

      // Save the shot, then...
      shot2.save(function(err, shot) {
        // query the server
        request(app).get('/api/user/Ruben/screenshot')
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

describe('INTEGRATION: Server + DB: /api/user/:username/screenshot/:id', function () {

  var screenshot;
  var bail;

  before(function (done) {
    // Clear users, create test account
    User.remove({}, function() {
      var user = new User({
        username: 'Ruben',
        password: 'password'
      });
      user.save(function() {
        // Clear screenshots
        Screenshot.remove({}, function() {

          // Create a new stock screenshot
          request(app).post('/api/user/Ruben/screenshot')
            .send({ url: 'http://www.purple.com' })
            .expect(function(res) {
              // store screenshot for later
              screenshot = res.body;
            })
            .end(function(err, res) {
              if (err) {
                // tell teardown to not delete recent image; not created
                bail = true;
                console.log('error creating new test screenshot');

                return done(err);
              }
              done();
            });

        });
      });
    });
  });

  // delete image from Cloudinary
  after(function (done) {
    // do not delete image if it was never created
    if (bail) {
      // reset bail for next test
      bail = false;

      return done();
    }
    // otherwise, delete from Cloudinary
    removeRecentImagesFromCloudinary(1, function(res) {
      done();
    });
  });

  describe('GET /', function () {

    it('should retrieve screenshots from a user', function (done) {
      request(app)
        .get('/api/user/Ruben/screenshot/' + screenshot._id)
        .expect(200)
        .expect(function(res) {
          expect(res.body).to.include.keys('url', 'originalImage', 'user_id');
        })
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('should fail to retrieve bad screenshot id', function (done) {
      request(app).get('/api/user/Ruben/screenshot/screenshotnotAnID')
        .expect(404, done);
    });

    it('should fail on bad username', function (done) {
      request(app).get('/api/user/billy/screenshot/' + screenshot._id)
        .expect(404, done);
    });

  });

  describe('PUT /', function () {

    it('should update a screenshot and store in DB', function (done) {
      request(app).put('/api/user/Ruben/screenshot/' + screenshot._id)
        .send({ visits: 2 })
        .expect(200)
        .expect(function(res) {
          console.log(res.body);
        })
        .end(function(err, res) {
          if (err) return done(err);
          request(app).get('/api/user/Ruben/screenshot/' + screenshot._id)
            .expect(function(res) {
              expect(res.body.visits).to.equal(2);
            })
            .end(function(err, res) {
              if (err) return done(err);
              done();
            });
        });
    });

  });

  describe('DELETE /', function () {
    it('should delete a screenshot', function (done) {
      request(app).delete('/api/user/Ruben/screenshot/' + screenshot._id)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          request(app).get('/api/user/Ruben/screenshot')
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
      request(app).delete('/api/user/Ruben/screenshot/screenshotnotanid')
        .expect(404, done);
    });

    it('should fail with bad username', function (done) {
      request(app).delete('/api/user/billy/screenshot/' + screenshot._id)
        .expect(404, done);
    });
  });

});


