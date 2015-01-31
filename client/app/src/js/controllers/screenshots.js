/**
 * ScreenshotsController
 * ====================
 * Handles display of a user screenshots.
 */

function ScreenshotsController(screenshots, Screenshot, $location) {
  this.screenshots = screenshots;
  this.url = '';
  this.addScreenshot = function(url){
    Screenshot.addScreenshot(url)
      .success(function(data){
        console.log(data);
      });
  };
  this.getScreenshots = function(id){
    Screenshot.getScreenshots(id)
      .success(function(data){
        console.log(data);
        this.screenshots = data;
      });
  };
  this.changeView = function(screenshotId) {
    $location.path('/screenshot/' + screenshotId);
  }
}

ScreenshotsController.$inject = [
  'screenshots',
  'Screenshot',
  '$location'
];

angular.module('Archivr.screenshots', [
  'Archivr.services.User',
  'Archivr.services.Screenshot'
]).controller('ScreenshotsController', ScreenshotsController);
