/**
 *  The user service is for keeping track of the authenicated user across controllers
 */

function User() {
  var user = null;

  var getUser = function () {
    return user;
  };

  var setUser = function(newUser){
    user = newUser;
    return user;
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
}

angular.module('Archivr.services.User', [])
  .factory('User', User);
