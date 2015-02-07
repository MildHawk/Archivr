/**
 * UserPageController
 * ====================
 * Handles display of profile bar on a user page.
 */

function UserPageController($stateParams, User) {
  // Get User object for reference
  this.user = User.getUser();
  this.message = 'Check my Scribblr gallery!';
  var self = this;
  self.profileImage = '../img/anonymous_200.gif';
  var checkLoginState = function(cb) {
    FB.getLoginStatus(function(response) {
      //- statusChangeCallback(response);
      // console.log('fb userID:', response.authResponse.userID);
      cb(response.authResponse.userID);
    });
  }

  checkLoginState(function(userID){
    FB.api(
      userID + "/picture",
      function(response) {
        if (response && !response.error) {
          console.log('response.data.url:', response.data.url);
          self.profileImage = response.data.url;
        }
      }
    );
  });
}

UserPageController.$inject = ['$stateParams', 'User'];


angular.module('Archivr.userPage', [
  'Archivr.services.User'
]).controller('UserPageController', UserPageController);

