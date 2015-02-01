/**
 * NavController
 * ====================
 * Handles control across the navigation bar
 */
function NavController($rootScope, Auth) {

  this.loggedIn = $rootScope.Authenticated;

  /**
   * watches for changes on the $rootscope.Authenicated.  if we
   * stop being authenicated the loggedIn property will be updated as well
   */
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

