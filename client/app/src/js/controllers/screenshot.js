/**
 * ScreenshotController
 * ====================
 * Handles display of a single screenshot.
 */

function ScreenshotController(Screenshot, User, screenshot) {
  this.screenshot = screenshot;
  this.message = 'Four developers in SF made an app. You will not believe what happened next!';
  console.log(screenshot);
}
ScreenshotController.$inject = ['Screenshot', 'User', 'screenshot'];

angular.module('Archivr.screenshot', [
  'Archivr.services.Screenshot',
  'Archivr.services.User'
]).controller('ScreenshotController', ScreenshotController);
