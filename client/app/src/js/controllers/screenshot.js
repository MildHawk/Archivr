/**
 * ScreenshotController
 * ====================
 * Handles display of a single screenshot.
 */

function ScreenshotController(Screenshots) {
}
ScreenshotController.$inject = ['Screenshot'];

angular.module('Archivr.screenshot', [])
  .controller('ScreenshotController', ScreenshotController);

