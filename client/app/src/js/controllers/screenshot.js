/**
 * ScreenshotController
 * ====================
 * Handles display of a single screenshot.
 */

function ScreenshotController(Screenshot, User, screenshot, $window, $document) {
  this.screenshot = screenshot;

  this.message = 'Four developers in SF made an app. You will not believe what happened next!';
  console.log(screenshot);
  // console.log(this.screenshot.el)
  this.saveScreenShot = function(data, canvas){
    console.log('Data from directive:', data);
    // console.log(el)
    console.log('running saveScreenshot');
    // var canvas = $document;
     // here is the most important part because if you dont replace you will get a DOM 18 exception.
    var image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'); 
    

    // it will save locally
    console.log('should be saved');
    // $window.location.href=image;
    console.log('should be in local storage');
  };


}
ScreenshotController.$inject = ['Screenshot', 'User', 'screenshot','$window','$document'];

angular.module('Archivr.screenshot', [
  'Archivr.services.Screenshot',
  'Archivr.services.User'
]).controller('ScreenshotController', ScreenshotController);
