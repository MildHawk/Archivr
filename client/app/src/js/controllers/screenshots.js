/**
 * ScreenshotsController
 * ====================
 * Handles display of a user screenshots.
 */

function ScreenshotsController($stateParams, $location, screenshots, Screenshot, User) {

  this.screenshots = screenshots;
  this.url = '';
  /**
   * displays the form for adding another screenshot if the authenticated user
   * is the same user whos page we are viewing.
   */
  this.isUser = User.getUser() !== null && User.getUser().username === $stateParams.username;

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
  '$stateParams',
  '$location',
  'screenshots',
  'Screenshot',
  'User'
];

angular.module('Archivr.screenshots', [
  'Archivr.services.User',
  'Archivr.services.Screenshot'
]).controller('ScreenshotsController', ScreenshotsController);
