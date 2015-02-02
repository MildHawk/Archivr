describe('Screenshot', function() {
  var $httpBackend, Screenshot, User;

  beforeEach(module('Archivr.services.Screenshot'));
  beforeEach(module('Archivr.services.User'));
  beforeEach(inject(function(_$httpBackend_, _Screenshot_, _User_) {
    $httpBackend = _$httpBackend_;
    Screenshot = _Screenshot_;
    User = _User_;
  }));

  describe('#getAllScreenshots', function() {

    it('requests from correct api', function() {
      $httpBackend
        .expectGET('/api/screenshot')
        .respond(200);

      var success;
      Screenshot.getAllScreenshots()
        .then(function(data) {
          success = true;
        });

      $httpBackend.flush();
      expect(success).to.equal(true);
    });

  });

  describe('#getScreenshots', function() {

    // Prep httpBackend for requests
    beforeEach(function() {
      $httpBackend
        .expectGET('/api/user/Andrew/screenshot')
        .respond(200);
    });

    it('should fetch screenshots for a user', function() {
      var success;
      Screenshot.getScreenshots('Andrew')
        .then(function() {
          success = true;
        });

      $httpBackend.flush();
      expect(success).to.equal(true);
    });

  });

  describe('#addScreenshot', function() {

    it('requests from correct api', function() {
      // Set up user
      User.setUser({ username: 'Andrew' });

      var url = 'http://www.google.com';

      $httpBackend
        .expectPOST('/api/user/Andrew/screenshot', {
          url: url
        })
        .respond(200);

      var success;
      Screenshot.addScreenshot(url)
        .then(function(data) {
          success = true;
        });

      $httpBackend.flush();
      expect(success).to.equal(true);
    });

  });

  describe('#getScreenshot', function() {

    it('should request from correct api', function() {
      $httpBackend
        .expectGET('/api/user/Andrew/screenshot/123')
        .respond(200);

      var success;
      Screenshot.getScreenshot('Andrew', '123')
        .then(function() {
          success = true;
        });

      $httpBackend.flush();
      expect(success).to.equal(true);
    });

  });

});
