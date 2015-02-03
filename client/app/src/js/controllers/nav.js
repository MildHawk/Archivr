/**
 * NavController
 * ====================
 * Handles control across the navigation bar
 */
function NavController($rootScope, Auth, User, $location) {

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

  this.goToMyScreenshots = function(){
    $location.path('/users/' + User.getUser().username + '/screenshots');
  };

}
NavController.$inject = ['$rootScope', 'Auth', 'User', '$location'];

angular.module('Archivr.nav', [
  'Archivr.services.User',
  'Archivr.services.Auth'
]).controller('NavController', NavController);

