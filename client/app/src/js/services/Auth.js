/**
 * Auth
 * ====
 * Responsible for authenticating user. Handles JWT from server which contains
 * user model data. JWT is stored in localStorage as 'com.archivr'.
 */
function Auth($http, $location, $window, User) {
  // sign a user in
  var signin = function(user) {
    return $http({
      method: 'POST',
      url: '/api/auth/login',
      data: user
    }).then(function(resp) {
      return resp.data;
    });
  };

  // sign a user up
  var signup = function(user) {
    return $http({
      method: 'POST',
      url: '/api/auth/signup',
      data: user
    }).then(function(resp) {
      return resp.data;
    });
  };

  var isAuth = function() {
    return !!$window.localStorage.getItem('com.archivr');
  };

  var signout = function() {
    console.log('Logging user out, destroying JWT');
    $window.localStorage.removeItem('com.archivr');
    User.setUser(null);
    $location.path('/login');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
}
Auth.$inject = ['$http', '$location', '$window', 'User'];

angular.module('Archivr.services.Auth', [
  'Archivr.services.User'
]).factory('Auth', Auth);
