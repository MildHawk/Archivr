/**
 * LandingController
 * ====================
 * Handles display landing page.
 */

function LandingController(Screenshots, Auth) {
  this.screenshots = [];
  this.getScreenshots = function() {
    Screenshots.getScreenshots()
      .success(function(data) {
        this.screenshots = data;
      })
  }
  this.getScreenshots();
}

LandingController.$inject = ['Screenshot','Auth'];


angular.module('Archivr.landing', [
  'Archivr.services.Screenshot',
  'Archivr.services.Auth'
]).controller('LandingController', LandingController);
