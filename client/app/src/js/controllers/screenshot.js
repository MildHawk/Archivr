/**
 * ScreenshotController
 * ====================
 * Handles display of a single screenshot.
 */

function ScreenshotController(Screenshot, User, screenshot) {
  this.screenshot = screenshot;
  console.log(screenshot);
}
ScreenshotController.$inject = ['Screenshot', 'User', 'screenshot'];

angular.module('Archivr.screenshot', [
  'Archivr.services.Screenshot',
  'Archivr.services.User'
]).controller('ScreenshotController', ScreenshotController);

