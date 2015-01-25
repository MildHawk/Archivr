/**
 * LandingController
 * ====================
 * Handles display landing page.
 */

function LandingController(Screenshots, Auth) {

  // object to hold screenshots sent back from AJAX
  this.screenshots = {};

  /**
   * getScreenshots
   * ==============
   * Gets public screenshots from server. Assigns to object on
   * controller.
   */
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


};
LandingController.$inject = ['Screenshots','Auth'];

angular.module('Archivr.landing', [])
.controller('LandingController', LandingController);
