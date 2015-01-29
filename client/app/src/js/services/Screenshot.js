/**
 * Screenshot
 * ====
 * Responsible for authenticating user. Handles JWT from server which contains
 * user model data. JWT is stored in localStorage as 'com.archivr'.
 */


function Screenshot($http, User) {

  var getScreenshots = function(user) {
    return $http.get('/api/user/' + user + '/screenshot')
    .then(function(response) {
      return response;
    });
  };

  var addScreenshot = function (url) {
    var user = User.getUser();
    console.log(user);
    return $http.post('/api/user/' + user.username + '/screenshot', {
      url: url
    });
  };

  return {
    getScreenshots: getScreenshots,
    addScreenshot: addScreenshot
  };
}
Screenshot.$inject = ['$http', 'User'];

angular.module('Archivr.services.Screenshot', [
  'Archivr.services.User'
]).factory('Screenshot', Screenshot);
