/**
 * ScreenshotsController
 * ====================
 * Handles display of a user screenshots.
 */

function ScreenshotsController(Screenshots, Auth) {
  this.screenshots = [];

  this.getScreenshots = function(){
    Screenshots.grabScreenshots()
    .success(function(data){
      // TODO:  e.g. data = [{size},{},..]
      this.screenshots = data;
    })
    .error(function(err){
      console.log(err);
    });
  };


  // Call to get public screenshots on load
  this.getScreenshots();

}

ScreenshotsController.$inject = ['Screenshots','Auth'];

angular.module('Archivr.screenshots', [
  'Archivr.services'
])
.controller('ScreenshotsController', ScreenshotsController);
