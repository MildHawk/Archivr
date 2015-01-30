/**
 * ScreenshotController
 * ====================
 * Handles display of a single screenshot.
 */

function ScreenshotController(Screenshot, User) {

  this.screenshot = screenshot;

  this.getScreenshot = function(id) {
    Screenshot.getScreenshot(id)
      .success(function(data) {
        console.log(data);
        this.screenshot = data;
      })
  };
}
ScreenshotController.$inject = ['Screenshot'];

angular.module('Archivr.screenshot', [
  'Archivr.services.Screenshot',
  'Archivr.services.User'
]).controller('ScreenshotController', ScreenshotController);

