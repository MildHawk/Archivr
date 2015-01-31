function User() {
  var user = null;

  var getUser = function () {
    return user;
  };

  var setUser = function(newUser){
    user = newUser;
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
}

angular.module('Archivr.services.User', [])
  .factory('User', User);
