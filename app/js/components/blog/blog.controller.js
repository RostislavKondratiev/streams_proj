(function(){
angular.module('app')
    .controller('blogCtrl', blogCtrl)

blogCtrl.$inject=['dataservice','$window']
function blogCtrl(dataservice, $window){
    var self=this;
    self.devider=false;

    self.otherPosts=dataservice.getOtherPosts();
    self.otherPosts.$loaded(function(){
        self.devider=true;
    })
    self.posts=dataservice.getFirstPosts();
    self.ex=dataservice.getExPost();
    self.openDialog=openDialog;
    self.closeDialog=closeDialog;

    console.log(self.ex);
    console.log(self.posts);


    function openDialog(id){
        self.details=dataservice.getPostDetails(id);
        detail.showModal();
        $window.scrollTo('5','0')
    }

    function closeDialog() {
        // document.querySelector('main.mdl-layout__content').style.overflowY = '';
        detail.close();
        // document.querySelector('main.mdl-layout__content').style.overflowY = 'auto';
    }
}        
})()