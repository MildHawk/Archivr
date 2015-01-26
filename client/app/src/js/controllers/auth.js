function AuthController($window, $location, Auth, UserInfo) {

  this.signin = function (user,password) {
    // TODO: resolve issue of how to get user and pass params
    console.log('TODO:', user, password);
    Auth.signin() //should send in user?
      .then(function (token) {
        $window.localStorage.setItem('com.archivr', token);
        // from Andrew: I'm pretty sure the AuthController should not store
        // the username and password. (At least it doesn't on the shortly-angular
        // solution, and I'm using that as a reference point.)
        // UserInfo.username = _this.username;
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

AuthController.$inject = ['$window','$location','Auth','UserInfo'];

angular.module('Archivr.auth', [])
.controller('AuthController', AuthController);
