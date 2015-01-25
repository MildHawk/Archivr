/**
 * LandingController
 * ====================
 * Handles display landing page.
 */

function LandingController(Screenshots, Auth) {

  // object to hold screenshots sent back from AJAX
  this.screenshots = {};

  this.getScreenshots = function(){
    // gets public screenshots
    Screenshots.grabScreenshots()
    .success(function(data){
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
