/**
 * UserPageController
 * ====================
 * Handles display of profile bar on a user page.
 */

function UserPageController($stateParams) {

  this.user = $stateParams.username;

}
UserPageController.$inject = ['$stateParams'];

angular.module('Archivr.userPage', [])
.controller('UserPageController', UserPageController);

