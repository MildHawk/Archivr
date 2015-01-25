function ScreenshotsController(Screenshots, Auth) {
  // Your code here
  this.data = {};

  this.getScreenshots = function(){
    Screenshots.grabScreenshots()//might have to pass something in here
    .success(function(data){
      this.results = data;
    })
    .error(function(err){
      console.log(err);
    });
  };




  this.getScreenshots();

}

ScreenshotsController.$inject = ['Screenshots','Auth'];

angular.module('Archivr.screenshots', [
  'Archivr.services'
])
.controller('ScreenshotsController', ScreenshotsController);
