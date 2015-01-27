function AuthController($window, $location, Auth, User) {

  // this.username = "";
  // this.password = "";
  // this.user = {};
  // the above are not currently used, commented out for JSHint to pass.

  this.signin = function (user,password) {
    Auth.signin(user,password)
      .then(function (userObj) {
        $window.localStorage.setItem('com.archivr', userObj.token);
        User.user = userObj;
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
