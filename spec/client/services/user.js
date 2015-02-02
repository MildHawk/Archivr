describe('User', function() {
  var User;

  beforeEach(module('Archivr.services.User'));
  beforeEach(inject(function(_User_) {
    User = _User_;
  }));

  describe('User#setUser', function() {

    it('assigns and gets a user', function() {
      User.setUser('Andrew');
      expect(User.getUser()).to.equal('Andrew');
    });

  });

  describe('User#methods', function() {
    it('should only have `getUser`, `setUser` keys', function() {
      expect(User).to.have.keys('getUser', 'setUser');
    });
  });
});
