/**
 * UserPageController
 * ====================
 * Handles display of profile bar on a user page.
 */

// function UserPageController($stateParams, User) {
function UserPageController($stateParams) {

  // Get User object for reference
  // this.user = new User($stateParams.username);
  // STAGING DEBUG
  this.user = {
    username: 'Andrew',
    images: ['image1.jpg', 'image2.jpg']
  }


}
// UserPageController.$inject = ['$stateParams', 'User'];
UserPageController.$inject = ['$stateParams'];

angular.module('Archivr.userPage', [])
.controller('UserPageController', UserPageController);

