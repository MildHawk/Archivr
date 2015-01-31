function AuthController($window, $location, Auth, User) {

  // this.username = "";
  // this.password = "";
  // this.user = {};
  // the above are not currently used, commented out for JSHint to pass.

  this.login = function(user, pass) {
    Auth.signin({
      username: user,
      password: pass
    }).then(function(response) {
      $window.localStorage.setItem('com.archivr', response.token);
      User.setUser(response.user);
      console.log(response.user);
      $location.path('/users/' + response.user.username);
    }).catch(function (error) {
      console.log(error);
    });
  };

  this.signup = function(user, pass) {
    Auth.signup({
      username: user,
      password: pass
    }).then(function(response) {
      console.log(response);
      // $window.localStorage.setItem('com.archivr', token);
      // $location.path('/screenshots');
    }).catch(function(error) {
      console.error(error);
    });
  };

  this.logout = function(){
    console.log('Signed out');
    Auth.signout();
  };

}
AuthController.$inject = ['$window', '$location', 'Auth', 'User'];

angular.module('Archivr.auth', [
  'Archivr.services.User',
  'Archivr.services.Auth'
]).controller('AuthController', AuthController);
