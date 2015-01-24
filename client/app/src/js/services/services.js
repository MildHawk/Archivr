
function Screenshots() {
  // TODO: build out Screenshots factory
  return {};
}

Screenshots.$inject = [];

function Auth($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.archivr'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
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
    console.log("in services... signout!!!");
    $window.localStorage.removeItem('com.archivr');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
};
Auth.$inject = ['$http', '$location', '$window'];


angular.module('Archivr.services', [])
.factory('Auth', Auth)
.factory('Screenshots', Screenshots);
