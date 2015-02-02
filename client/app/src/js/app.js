function config($urlRouterProvider, $stateProvider, $locationProvider, $httpProvider) {


  // configure routes
  $stateProvider
    /**
     * Landing page
     * =============
     * The default entry point for the website.
     */
    .state('landing', {
      templateUrl: '/views/landing.html',
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
      url: '/users/:username',
      // resolve: {
      //   screenshots: function($stateParams, Screenshot) {
      //     return Screenshot.getScreenshots($stateParams.username)
      //       .then(function(screenshots){
      //         return screenshots.data;
      //       }).catch(function(err) {
      //         console.log('Error getting screenshots: ', err);
      //       });
      //   }
      // },
      views: {

        // main view
        '': {
          templateUrl: '/views/user.html',
          controller: 'UserPageController',
          controllerAs: 'userPageCtrl'
        },

        /**
         * profile bar
         * ===========
         * Creates a sidebar to display details for this user's page.
         * Information such as profile image, name, number of screenshots, etc.
         */
        'profile@user': {
          templateUrl: '/views/profileBar.html',
          controller: 'ProfileBarController',
          controllerAs: 'profileBarCtrl'
        }//,

        /**
         * screenshots
         * ===========
         * Displays all the screenshots from a user
         */

        // 'screenshots@user': {
        //   templateUrl: '/views/userScreenshots.html',
        //   controller: 'ScreenshotsController',
        //   controllerAs: 'screenshotsCtrl'
        // }

      }
    })

    /**
     * screenshots
     * ==========
     * nested view to display the collection of user screenshots
     */
    .state('user.screenshots', {
      url: '/screenshots',
      templateUrl: '/views/userScreenshots.html',
      controller: 'ScreenshotsController',
      controllerAs: 'screenshotsCtrl',
      resolve: {
        screenshots: function($stateParams, Screenshot) {
          return Screenshot.getScreenshots($stateParams.username)
            .then(function(screenshots){
              return screenshots.data;
            }).catch(function(err) {
              console.log('Error getting screenshots: ', err);
            });
        }
      }
    })

    /**
     * screenshot
     * ==========
     * Provides view of a single screenshot. Sibling view to the user page.
     * Contains details on the screenshot as well as the ability to edit
     * the screenshot details (when authorized).
     */
    .state('user.screenshot', {
      url: '/screenshots/:screenshotId',
      templateUrl: '/views/screenshot.html',
      controller: 'ScreenshotController',
      controllerAs: 'screenshotCtrl',
      resolve: {
        // get screenshot base on requested username and id and inject into controller
        screenshot: function($stateParams, Screenshot) {
          return Screenshot.getScreenshot($stateParams.username, $stateParams.screenshotId)
            .then(function(response){
              return response.data;
            }).catch(function(err){
              console.log('Error fetching screenshot: ', err);
            });
        }
      }
    })

    /**
     * Sign up
     * =======
     * Allows user to sign up for the app.
     */
    .state('signup', {
      url: '/signup',
      templateUrl: '/views/signup.html',
      controller: 'AuthController',
      controllerAs: 'authCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: '/views/login.html',
      controller: 'AuthController',
      controllerAs: 'authCtrl'
    })

    .state('logout', {
      url: '/logout',
      templateUrl: '/views/logout.html',
      controller: 'AuthController',
      controllerAs: 'authCtrl'
    });

  // default uncaught routes to landing page
  $urlRouterProvider.otherwise('/');

  // enable HTML5 mode
  $locationProvider.html5Mode(true);

  // add tokens to $http request
  $httpProvider.interceptors.push('AttachTokens');
}

function AttachTokens($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  return {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.archivr');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
}

/**
 * Run function is executed at bootstrap time.  We can inject things
 * that we want to have available to use through our app
 * this sets $rootScope.Authenticated to true or false on every route state change
 */
function run($rootScope, $location, Auth) {
  $rootScope.Authenticated = Auth.isAuth();

  $rootScope.$on('$stateChangeStart', function(event) {
    $rootScope.Authenticated = Auth.isAuth();
  }.bind(this));

}
run.$inject = ['$rootScope', '$location', 'Auth'];

angular
  .module('Archivr', [
    'Archivr.auth',
    'Archivr.landing',
    'Archivr.profile',
    'Archivr.screenshots',
    'Archivr.screenshot',
    'Archivr.services.Auth',
    'Archivr.nav',
    'Archivr.services.User',
    'Archivr.services.Screenshot',
    'Archivr.userPage',
    'ui.router'
  ])
  .config(config)
  .run(run)
  .factory('AttachTokens', AttachTokens);
