function config($urlRouterProvider, $stateProvider, $locationProvider) {

  // enable HTML5 mode
  $locationProvider.html5Mode(true);

}

function AttachTokens($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var AttachTokens = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.archivr');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return AttachTokens;
}

angular
  .module('Archivr', [
    'ui.router',
    'Archivr.auth'
  ])
  .config(config)
  .factory('AttachTokens', AttachTokens)
