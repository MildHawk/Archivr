/**
 * Screenshot
 * ====
 * Responsible for authenticating user. Handles JWT from server which contains
 * user model data. JWT is stored in localStorage as 'com.archivr'.
 */


function Screenshot($http, User) {

  var getScreenshots = function() {
    var user = User.getUser();
    return $http.get('/api/screenshot')
      .then(function(response) {
        return response;
      });
  };

  var addScreenshot = function (url) {
    var user = User.getUser();
    return $http.post('/api/user/' + user.username + '/screenshot', {
      url: url
    });
  };

  // should return a screenshot object owned by the requested user
  var getScreenshot = function(user, id){
    return $http.get('/api/user/' + user + '/screenshot/' + id)
      .then(function(response) {
        return response;
      });
  };

  return {
    getScreenshots: getScreenshots,
    addScreenshot: addScreenshot,
    getScreenshot: getScreenshot
  };
}
Screenshot.$inject = ['$http', 'User'];

angular.module('Archivr.services.Screenshot', [
  'Archivr.services.User'
]).factory('Screenshot', Screenshot);
