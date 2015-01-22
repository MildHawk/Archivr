//import user
//import screenshots


describe('User', function() {

  beforeEach(function () {
  });

  describe('#createUser', function() {
    it('should create a new user', function(){
      createUser("Ruben", "1010");
      //var user = new User({username: 'Ruben', password: '1010'});
      //user.save();
      expect(User.find().length).to.equal(1);
    });
  });

  describe('#createGallery', function() {
    it('should create a new gallery for a specific user'){
      var user = createUser("Ruben", "1010");
      user.createGallery()
    };
  });
  
  describe('#getGalleries', function() {
    it('should serve all galleries for a specific user'){
      var user = createUser("Ruben", "1010");
      var gallery = user.createGallery();
      var gallery2 = user.createGallery();
      expect(user.getGalleries()).to.equal([gallery, gallery2]);
    };
  })

  describe('#getGallery', function() {
    it('should serve a certain gallery from a specific user'){
      var user = createUser("Ruben", "1010");
      var gallery = user.createGallery();
      var gallery2 = user.createGallery();
      expect().to.equal(gallery);
    };
  });

  //describe('', function() {
    //it('should create a new gallery for a specific user'){

    //};
  //})


});
