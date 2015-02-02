/**
 *  The user service is for keeping track of the authenicated user across controllers
 */

function User($cookies) {
  var user = null;

  var getUser = function () {
    return $cookies.user;
  };

  var setUser = function(newUser){
    $cookies.user = newUser;
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
}

Auth.$inject = ['$cookies'];

angular.module('Archivr.services.User', ['ngCookies'])
  .factory('User', User);
