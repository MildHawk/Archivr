/**
 * LandingController
 * ====================
 * Handles display landing page.
 */

function LandingController(Screenshots, Auth) {
  this.data = {};

  this.getScreenshots = function(){
    // gets public screenshots
    Screenshots.grabScreenshots()
    .success(function(data){
      this.results = data;
    })
    .error(function(err){
      console.log(err);
    });
  };



  this.getScreenshots();


};
LandingController.$inject = ['Screenshots','Auth'];

angular.module('Archivr.landing', [])
.controller('LandingController', LandingController);
