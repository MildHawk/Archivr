//import user
//import screenshots
var expect = require('chai').expect;
var User = require('../../server/api/user/userModel');

describe('User', function() {

  beforeEach(function(done) {
    // truncate users
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

  describe('#createUser', function() {
    it('should create a new user', function(done) {
      User.find({}, function(err, users) {
        expect(users.length).to.equal(1);
        done();
      });
    });

    it('should save user and password', function(done){
      User.findOne({ username: 'Ruben' }, function(err, user) {
        expect(user.username).to.equal('Ruben');
        done();
      });
    });
  });

  // describe('#createGallery', function() {
  //   it('should create a new gallery for a specific user', function() {
  //     var user = createUser("Ruben", "1010");
  //     var gallery = user.createGallery("Design");
  //     expect(user.galleries).to.not.be.empty;
  //   });
  // });

  // describe('#getGalleries', function() {
  //   it('should serve all galleries for a specific user', function() {
  //     var user = createUser("Ruben", "1010");
  //     var gallery = user.createGallery();
  //     var gallery2 = user.createGallery();
  //     expect(user.getGalleries()).to.equal([gallery, gallery2]);
  //   });
  // });

  // describe('#getGallery', function() {
  //   it('should serve a certain gallery from a specific user', function() {
  //     var user = createUser("Ruben", "1010");
  //     var gallery = user.createGallery();
  //     var gallery2 = user.createGallery();
  //     expect(user.getGallery(gallery.id)).to.equal(gallery);
  //   });
  // });

  // describe('#getScreenshot', function() {
  //   it('should serve a certain screenshot from a specific user'){
  //     var user = createUser("Ruben", "1010");
  //     var gallery = user.cre();
  //     var gallery2 = user.createGallery();
  //     expect(user.getGallery(gallery.id)).to.equal(gallery);
  //   };
  // });
  //describe('', function() {
    //it('should create a new gallery for a specific user'){

    //};
  //})


});
