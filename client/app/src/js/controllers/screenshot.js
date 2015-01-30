/**
 * ScreenshotController
 * ====================
 * Handles display of a single screenshot.
 */

function ScreenshotController(Screenshot, User) {
  this.screenshot = {};

}
ScreenshotController.$inject = ['Screenshot'];

angular.module('Archivr.screenshot', [
  'Archivr.services.Screenshot',
  'Archivr.services.Screenshot'
]).controller('ScreenshotController', ScreenshotController);

