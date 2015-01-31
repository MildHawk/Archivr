/**
 * ScreenshotController
 * ====================
 * Handles display of a single screenshot.
 */

function ScreenshotController(Screenshot, User) {

  this.screenshot = {};

  this.getScreenshot = function(id) {
    Screenshot.getScreenshot(id)
      .success(function(data) {
        console.log(data);
        this.screenshot = data;
      })
  };
  this.getScreenshot();
}
ScreenshotController.$inject = ['Screenshot'];

angular.module('Archivr.screenshot', [
  'Archivr.services.Screenshot',
  'Archivr.services.User'
]).controller('ScreenshotController', ScreenshotController);

