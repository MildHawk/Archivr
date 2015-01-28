/**
 * ScreenshotController
 * ====================
 * Handles display of a single screenshot.
 */

function ScreenshotController(Screenshots) {
  Screenshots.grabScreenshots();
}
ScreenshotController.$inject = ['Screenshots'];

angular.module('Archivr.screenshot', ['Archivr.services'])
  .controller('ScreenshotController', ScreenshotController);

