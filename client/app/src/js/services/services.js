/**
 * Auth
 * ====
 * Responsible for authenticating user. Handles JWT from server which contains
 * user model data. JWT is stored in localStorage as 'com.archivr'.
 */
function Auth($http, $location, $window) {
  var signin = function(user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };



  var signup = function(user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function(resp) {
      return resp.data.token;
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
    return $http.get('/api/screenshots');

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

function User() {
  // TODO: build out User factory?
  return {};
}

angular.module('Archivr.services', [])
.factory('Auth', Auth)
.factory('Screenshots', Screenshots)
.factory('User', User);
