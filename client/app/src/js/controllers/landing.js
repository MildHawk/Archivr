/**
 * LandingController
 * ====================
 * Handles display landing page.
 */

function LandingController(Screenshots, Auth) {

}

LandingController.$inject = ['Screenshot','Auth'];


angular.module('Archivr.landing', [
  'Archivr.services.Screenshot',
  'Archivr.services.Auth'
]).controller('LandingController', LandingController);
