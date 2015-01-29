/*jshint -W079 */

var expect = require('chai').expect;
var request = require('supertest');
var express = require('express');
var app = require('../../server/index.js');
var User = require('../../server/api/user/userModel');

describe('INTEGRATION: Server + DB: /api/user', function () {

  // Clear Users database for testing
  beforeEach(function(done) {
    User.remove({}, function() {
      var user = new User({
        username: 'Ruben',
        password: 'password'
      });
      user.save(function() {
        done();
      });
    });
  });

  describe('GET /', function () {

    it('should return an array of User objects', function (done) {
      request(app)
        .get('/api/user')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.length(1);
        })
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

  });

  describe('POST /', function () {

    it('should store a new user', function (done) {
      request(app)
        .post('/api/user')
        .send({ username: 'billy', password: 'password' })
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);

          request(app).get('/api/user')
            .expect(function(res) {
              expect(JSON.stringify(res.body)).to.contain('billy');
            })
            .end(function(err, res) {
              if (err) return done(err);
              done();
            });
        });
    });

    it('should disallow duplicate user creation', function (done) {
      request(app)
        .post('/api/user')
        .send({ username: 'Ruben', password: 'Ruben' })
        .expect(409, done);
    });

  });

  describe('GET /:username', function () {

    it('should return a user that exists', function (done) {
      request(app)
        .get('/api/user/Ruben')
        .expect(200)
        .expect(function(res) {
          expect(res.body.username).to.equal('Ruben');
        })
        .end(function(err, res) {
          if (err) done(err);
          done();
        });
    });

    it('should return a 404 for a non-existent user', function (done) {
      request(app)
        .get('/api/user/billy')
        .expect(404, done);
    });

  });

  describe('PUT /:username', function () {

    it('should be able to update a user that exists', function (done) {
      request(app).put('/api/user/Ruben')
        .send({ username: 'Ruben', images: ['test'] })
        .end(function(err, res) {
          request(app).get('/api/user/Ruben')
            .expect(function(res) {
              expect(res.body.images).to.eql(['test']);
            })
            .end(function(err, res) {
              if (err) return done(err);
              done();
            });
        });
    });

    it('should not be able to update something that doesn\'t exist', function (done) {
      request(app).put('/api/user/billy')
        .expect(404, done);
    });
  });

  describe('DELETE /:username', function () {

    it('should delete a user', function (done) {
      request(app).delete('/api/user/Ruben')
        .expect(200)
        .send({ username: 'Ruben' })
        .end(function(err, res) {
          request(app).get('/api/user/Ruben')
            .expect(404, done);
        });
    });

    it('should not delete a non-existent user', function (done) {
      request(app).delete('/api/user/billy')
        .expect(404, done);
    });

  });
});
