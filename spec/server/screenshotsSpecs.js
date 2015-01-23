//import user
//import screenshots
var db = require('../../server/db/index');

describe('Screenshots', function() {

  beforeEach(function () {
  });

  describe('#createScreenshot', function() {
    it('should create a new screenshot', function(){
      var user = createUser("Ruben", "1010");
      user.createScreenshot();
      expect(Screenshots.find()).to.equal(1);
    });

    it('should set a screenshot to the right user', function() {
      var user = createUser("Ruben", "1010");
      user.createScreenshot();
      expect().to.equal(1);
    });
  });

  describe('#editScreenshot', function() {
    it('should edit a screenshot', function(){
    });
  })

});
