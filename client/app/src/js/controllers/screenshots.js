


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

  this.sendMessage = function(){
    Contacts.sendMesh(number)
      .success(function(data){
        this.results = data;
      })
      .error(function(err){
        console.log(err);
      });

    }
  };

  this.getContacts();


};
ScreenshotsController.$inject = ['Screenshots','Auth'];

angular.module('archivr.screenshots', [])
.controller('ScreenshotsController', ScreenshotsController);
