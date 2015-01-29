/**
 * ProfileBarController
 * ====================
 * Handles display of profile bar on a user page.
 */

function ProfileBarController(User) {

  this.user = User.user;

}
ProfileBarController.$inject = ['User'];

angular.module('Archivr.profile', ['Archivr.services.User'])
.controller('ProfileBarController', ProfileBarController);

