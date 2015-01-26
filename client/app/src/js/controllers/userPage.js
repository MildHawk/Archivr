/**
 * UserPageController
 * ====================
 * Handles display of profile bar on a user page.
 */

// function UserPageController($stateParams, User) {
function UserPageController($stateParams) {

  // Get User object for reference
  this.user = new User($stateParams.username);

}
// UserPageController.$inject = ['$stateParams', 'User'];
UserPageController.$inject = ['$stateParams'];

angular.module('Archivr.userPage', [])
.controller('UserPageController', UserPageController);

