/**
 * ScreenshotsController
 * ====================
 * Handles display of a user screenshots.
 */

function ScreenshotsController($location, screenshots, Screenshot) {
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
        //this.screenshots = data; -> don't need this since we resolve the screenshots on app.js and inject them here
      });
  };
  this.changeView = function(screenshotId) {
    $location.path('/screenshot/' + screenshotId);
  };
}

ScreenshotsController.$inject = [
  '$location',
  'screenshots',
  'Screenshot'
];

angular.module('Archivr.screenshots', [
  'Archivr.services.User',
  'Archivr.services.Screenshot'
]).controller('ScreenshotsController', ScreenshotsController);
