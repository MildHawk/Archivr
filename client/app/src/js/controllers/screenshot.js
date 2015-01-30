/**
 * ScreenshotController
 * ====================
 * Handles display of a single screenshot.
 */

function ScreenshotController(Screenshot) {
}
ScreenshotController.$inject = ['Screenshot'];

angular.module('Archivr.screenshot', [
  'Archivr.services.Screenshot'
]).controller('ScreenshotController', ScreenshotController);

