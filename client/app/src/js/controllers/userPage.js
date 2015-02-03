/**
 * UserPageController
 * ====================
 * Handles display of profile bar on a user page.
 */

function UserPageController($stateParams, User) {
  // Get User object for reference
  this.user = User.getUser();
}
UserPageController.$inject = ['$stateParams', 'User'];


angular.module('Archivr.userPage', [
  'Archivr.services.User'
]).controller('UserPageController', UserPageController);

