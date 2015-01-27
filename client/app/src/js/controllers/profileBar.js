/**
 * ProfileBarController
 * ====================
 * Handles display of profile bar on a user page.
 */

function ProfileBarController(User) {

  this.user = User.user;

}
ProfileBarController.$inject = ['User'];

angular.module('Archivr.profile', [])
.controller('ProfileBarController', ProfileBarController);

