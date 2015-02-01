/**
 * LandingController
 * ====================
 * Handles display landing page.
 */

function LandingController($location, Screenshots, Auth) {
  this.data = {screenshots: Screenshots.screenshots};
  this.getAllScreenshots = function() {
    Screenshots.getAllScreenshots()
      .success(function(data) {
        console.log(data);
        this.data.screenshots = data;
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
