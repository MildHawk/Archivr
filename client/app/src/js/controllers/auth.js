function AuthController($window, $location, Auth) {

  this.signin = function (user,password) {
    // TODO: resolve issue of how to get user and pass params
    console.log('TODO:', user, password);
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
    console.log('Signed out');
    Auth.signout();
  };

}

AuthController.$inject = ['$window','$location','Auth'];

angular.module('Archivr.auth', [])
.controller('AuthController', AuthController);
