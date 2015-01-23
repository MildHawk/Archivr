function config($urlRouterProvider, $stateProvider, $locationProvider) {

  // enable HTML5 mode
  $locationProvider.html5Mode(true);

}

angular
  .module('Archivr', [
    'ui.router'
  ])
  .config(config);
