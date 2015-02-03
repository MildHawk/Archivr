/**
 * NavController
 * ====================
 * Handles control across the navigation bar
 */
function NavController($rootScope, Auth, User) {

  this.loggedIn = $rootScope.Authenticated;
  this.homeUrl = '/';


  /**
   * watches for changes on the $rootscope.Authenicated.  if we
   * stop being authenicated the loggedIn property will be updated as well
   */
  $rootScope.$watch('Authenticated', function(authenticated) {
    this.loggedIn = authenticated;

    // dynamically set the home url
    if(User.getUser() !== null){
      this.homeUrl = '/users/' + User.getUser().username + '/screenshots';
    } else {
      this.homeUrl = '/';
    }

  }.bind(this));

  // ng-click function for header logout
  this.logout = function() {
    Auth.signout();
  };

}
NavController.$inject = ['$rootScope', 'Auth', 'User'];

angular.module('Archivr.nav', [
  'Archivr.services.User',
  'Archivr.services.Auth'
]).controller('NavController', NavController);

