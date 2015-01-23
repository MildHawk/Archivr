function AuthController($scope, $window, $location, Auth) {

  this.signin = function (user,password) {
    Auth.signin() //should send in user?
      .then(function (token) {
        $window.localStorage.setItem('com.archivr', token);
        $location.path('/screenshots');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  this.signup = function () {
    Auth.signup()
      .then(function (token) {
        $window.localStorage.setItem('com.archivr', token);
        $location.path('/screenshots');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  this.logout = function(){
    console.log("Signed out!!!!!!!!!!!");
    Auth.signout();
  };

}

angular.module('Archivr.auth', [])
.controller('AuthController', AuthController);
