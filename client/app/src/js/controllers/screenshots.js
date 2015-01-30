/**
 * ScreenshotsController
 * ====================
 * Handles display of a user screenshots.
 */

function ScreenshotsController(screenshots, Screenshot) {
  this.screenshots = screenshots;
  this.url = '';
  this.addScreenshot = function(url){
    Screenshot.addScreenshot(url)
      .success(function(data){
        console.log(data);
      });
  };
  this.getScreenshot = function(id){
    Screenshot.getScreenshot(id)
      .success(function(data){
        console.log(data);
      });

  };
}

ScreenshotsController.$inject = [
  'screenshots',
  'Screenshot'
];

angular.module('Archivr.screenshots', [
  'Archivr.services.User',
  'Archivr.services.Screenshot'
]).controller('ScreenshotsController', ScreenshotsController);
