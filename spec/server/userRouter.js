var expect = require('chai').expect;
var request = require('request');

describe('GET /api/user', function() {
  it('Should respond with 200 status code', function(done) {
    request.get('http://localhost:3000/api/user', function(error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});

describe('POST /api/user', function() {
  it('Should respond with 201 status code', function(done) {
    request.post('http://localhost:3000/api/user', function(error, response, body) {
      expect(response.statusCode).toBe(201);
      done();
    });
  });
});

describe('GET /api/user/:id', function() {
  it('Should respond with a 200 status code', function(done) {
    request.get('http://localhost:3000/api/user/1', function(done) {

    });
  });
});

describe('PUT /api/user/:id', function() {

});

describe('DELETE /api/user/:id', function() {
});
