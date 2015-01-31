/**
 * NavController
 * ====================
 * Handles control across the navigation bar
 */

function NavController($rootScope, Auth) {

  this.loggedIn = $rootScope.Authenticated;

  $rootScope.$watch('Authenticated', function(authenticated) {
    this.loggedIn = authenticated;
  }.bind(this));

  // ng-click function for header logout
  this.logout = function() {
    Auth.signout();
  };

}
NavController.$inject = ['$rootScope', 'Auth'];

angular.module('Archivr.nav', [
  'Archivr.services.User',
  'Archivr.services.Auth'
]).controller('NavController', NavController);

