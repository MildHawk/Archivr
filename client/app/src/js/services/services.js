/**
 * Auth
 * ====
 * Responsible for authenticating user. Handles JWT from server which contains
 * user model data. JWT is stored in localStorage as 'com.archivr'.
 */
function Auth($http, $location, $window) {
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
    console.log('in services... signout!!!');
    $window.localStorage.removeItem('com.archivr');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
}
Auth.$inject = ['$http', '$location', '$window'];

function Screenshots($http, $location, $window) {

  var grabScreenshots = function(){//should probably pass something in..
    return $http.get('/api/user/jackson/screenshot').then(function(response) {
      console.log(response);
    });
  };

  var addScreenshot = function (data) {
    return $http.post('/api/screenshots',data);
  };

  // TODO: do something with $window or remove
  console.log($window);

  // TODO: do something with $location or remove
  console.log($location);

  return {
    grabScreenshots:grabScreenshots,
    addScreenshot:addScreenshot
  };
}
Screenshots.$inject = ['$http','$location','$window'];

function User($http){

  /**
   * User Service
   * ====================
   * username variable is set on signin
   */

  // var user = {};
  // NOT USED currently, commented out for JSHint

  var getUserInfo = function(){
    var url = '/api/users/:' + this.username;
    return $http.get(url);
  };

  return {
    getUserInfo:getUserInfo
  };
}
User.$inject = ['$http'];

angular.module('Archivr.services', [])
.factory('Auth', Auth)
.factory('Screenshots', Screenshots)
.factory('User', User);
