/*jshint -W079 */

var expect = require('chai').expect;
var request = require('supertest');
var express = require('express');
var app = require('../../server/index.js');
var User = require('../../server/api/user/userModel');
var Screenshot = require('../../server/api/screenshot/screenshotModel');



describe('INTEGRATION: Server + DB: /api/auth', function () {

  // Clear users collection
  beforeEach(function (done) {
    User.remove({}, function() {
      var user = new User({
        username: 'Ruben',
        password: 'password'
      });
      console.log(user);
      user.save(function() {
        done();
      });
    });
  });

  describe('POST /signup', function () {

    it('should create a new user and return a token', function (done) {
      request(app).post('/api/auth/signup')
        .send({
          username: 'billy',
          password: 'billy'
        })
        .expect(201)
        .expect(function(res) {
          expect(JSON.stringify(res.body)).to.contain('token');
        })
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('should store new user in database', function (done) {
      request(app).post('/api/auth/signup')
        .send({
          username: 'billy',
          password: 'billy'
        })
        .end(function(err, res) {
          if (err) return done(err);
          // Otherwise, check for user in database
          User.findOne({ username: 'billy' }, function(err, res) {
            expect(res).to.have.length(1);
            done();
          });
        })
    });

    it('should hash the password', function (done) {
      request(app).post('/api/auth/signup')
        .send({
          username: 'billy',
          password: 'billy'
        })
        .end(function(err, res) {
          if (err) return done(err);
          User.findOne({ username: 'billy' }, function(err, res) {
            expect(res.password).to.not.equal('billy');
            done();
          });
        });
    });

    it('should disallow duplicate user creation', function (done) {
      request(app).post('/api/auth/signup')
        .send({
          username: 'Ruben',
          password: 'newPassword'
        })
        .expect(409)
        .end(function(err, res) {
          if (err) return done(err);
          User.findOne({ username: 'Ruben' }, function(err, user) {
            // Expect password to be unchanged
            user.verifyPassword('newPassword', function(match) {
              expect(match).to.be.not.ok;
              done();
            });
          });
        });
    });

    it('should not work if no username supplied', function (done) {
      request(app).post('/api/auth/signup')
        .send({
          password: 'hello'
        })
        .expect(400, done);
    });

    it('should not work if empty username supplied', function (done) {
      request(app).post('/api/auth/signup')
        .send({
          username: '',
          password: 'hello'
        })
        .expect(400, done);
    });

    it('should not work if no password supplied', function (done) {
      request(app).post('/api/auth/signup')
        .send({
          username: 'billy'
        })
        .expect(400, done);
    });

    it('should not work if empty password supplied', function (done) {
      request(app).post('/api/auth/signup')
        .send({
          username: 'billy',
          password: ''
        })
        .expect(400, done);
    });

  });

  describe('POST /login', function () {

    it('should work for a valid user and password', function (done) {
      request(app).post('/api/auth/login')
        .send({
          username: 'Ruben',
          password: 'password'
        })
        .expect(200, done);
    });

    it('should return JWT on valid login', function (done) {
      request(app).post('/api/auth/login')
        .send({
          username: 'Ruben',
          password: 'password'
        })
        .expect(function(res) {
          expect(res.body).to.include.keys('user');
          expect(res.body).to.include.keys('token');
        })
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('should not work on invalid username', function (done) {
      request(app).post('/api/auth/login')
        .send({
          username: 'billy',
          password: 'password'
        })
        .expect(404)
        .expect(/User does not exist/, done);
    });

    it('should not work on invalid password', function (done) {
      request(app).post('/api/auth/login')
        .send({
          username: 'Ruben',
          password: 'badPassword'
        })
        .expect(404)
        .expect(/Invalid password/, done);
    });

  });



});


