/**
 * LandingController
 * ====================
 * Handles display landing page.
 */

function LandingController($location, Screenshots, Auth) {
  this.screenshots = [];

  this.getAllScreenshots = function() {
    Screenshots.getAllScreenshots()
      .then(function(data) {
        this.screenshots = data;
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  this.changeView = function(screenshotId) {
    $location.path('/screenshot/' + screenshotId);
  };

  this.getAllScreenshots();
}
LandingController.$inject = ['$location','Screenshot','Auth'];


angular.module('Archivr.landing', [
  'Archivr.services.Screenshot',
  'Archivr.services.Auth'
]).controller('LandingController', LandingController);
