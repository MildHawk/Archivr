/**
 * Screenshot
 * ====
 * Responsible for authenticating user. Handles JWT from server which contains
 * user model data. JWT is stored in localStorage as 'com.archivr'.
 */


function Screenshot($http, User) {

  var getAllScreenshots  = function() {
    return $http.get('/api/screenshot')
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
  };

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

  // should return a screenshot object owned by the requested user
  var getScreenshot = function(user, id){
    return $http.get('/api/user/' + user + '/screenshot/' + id)
      .then(function(response) {
        return response;
      });
  };
  var addDrawing = function(drawing, id){
    var user = User.getUser();
    return $http.put('/api/user/' + user.username + '/screenshot/' + id, {
      annotatedImage : drawing
    }).success(function(data, status, headers, config) {
      // console.log(data, status, header, config)
      return data;
    // this callback will be called asynchronously
    // when the response is available
    }).error(function(data, status, header, config) {
    
    console.log("ERR ",data, status, header, config)
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    });
  };


  return {
    getAllScreenshots: getAllScreenshots,
    getScreenshots: getScreenshots,
    addScreenshot: addScreenshot,
    getScreenshot: getScreenshot,
    addDrawing : addDrawing
  };
}
Screenshot.$inject = ['$http', 'User'];

angular.module('Archivr.services.Screenshot', [
  'Archivr.services.User'
]).factory('Screenshot', Screenshot);
