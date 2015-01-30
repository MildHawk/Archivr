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

  var getScreenshot = function(screenshotId) {
    var user = User.getUser().username;
    return $http.get('/api/user' + user + '/screenshot' + screenshotId)
    .then(function(response) {
      return response
    })
  }

  var addScreenshot = function (url) {
    var user = User.getUser();
    console.log(user);
    return $http.post('/api/user/' + user.username + '/screenshot', {
      url: url
    });
  };

  var getScreenshot = function(id){
    var user = User.getUser();
    return $http.get('/api/user/' + user.username + '/screenshot/' + id)
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
