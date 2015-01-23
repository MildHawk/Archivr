function config($urlRouterProvider, $stateProvider, $locationProvider) {


  // configure routes
  $stateProvider
    /**
     * Landing page
     * =============
     * The default entry point for the website.
     */
    .state('landing', {
      templateUrl: 'app/src/views/landing.html',
      controller: 'LandingController',
      controllerAs: 'landingCtrl',
      url: '/'
    })

    /**
     * User page
     * =========
     * Displays the user information and recent screen shots. Contains
     * multiple sibling views.
     */
    .state('user', {
      templateUrl: 'app/src/views/user.html',
      controller: 'UserPageController',
      controllerAs: 'userPageCtrl',
      url: ''
    })
  // default uncaught routes to landing page
  $urlRouterProvider.otherwise('/');

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
