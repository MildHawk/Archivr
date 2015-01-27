/**
 * ScreenshotsController
 * ====================
 * Handles display of a user screenshots.
 */

function ScreenshotsController(Screenshots) {
  this.screenshots = [];
  var _this = this;

  this.getScreenshots = function(){
    Screenshots.grabScreenshots()
    .success(function(data){
      // TODO:  e.g. data = [{size},{},..]
      _this.screenshots = data;
    })
    .error(function(err){
      console.log(err);
    });
  };


  // Call to get public screenshots on load
  this.getScreenshots();
}

ScreenshotsController.$inject = ['Screenshots'];

angular.module('Archivr.screenshots', [
  'Archivr.services'
])
.controller('ScreenshotsController', ScreenshotsController);
