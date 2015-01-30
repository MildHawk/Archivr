/*jshint -W079 */

var expect = require('chai').expect;
var request = require('supertest');
var express = require('express');
var app = require('../../server/index.js');
var User = require('../../server/api/user/userModel');
var Screenshot = require('../../server/api/screenshot/screenshotModel');

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
      request(app).post('/api/screenshot/Ruben/screenshot')
        .send({ url: 'http://www.purple.com' })  // TODO: why send annotatedImage?
        // should get back 201 response
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);

          Screenshot.find(function(err, res) {
            expect(res.length).to.equal(1);
            done();
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


