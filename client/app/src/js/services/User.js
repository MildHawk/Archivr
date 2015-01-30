function User() {

  var user = {};

  var getUser = function () {
    return user;
  };

  var setUser = function(user){
    user = user;
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
}

angular.module('Archivr.services.User', [
]).factory('User', User);
