(function(){
angular.module('app')
    .controller('blogCtrl', blogCtrl)

blogCtrl.$inject=['$firebaseAuth','dataservice']
function blogCtrl($firebaseAuth, dataservice){
    var self=this;
    var auth = $firebaseAuth();
    self.devider=false;
    self.user=false;

    self.posts=dataservice.getFirstPosts();
    self.deletePost=deletePost;

    auth.$onAuthStateChanged(function(authData){
        self.user=authData;
    });

    self.posts.$loaded(function(){
        self.devider=true;
    })

    console.log(self.posts);

    function deletePost(item){
        var answer=confirm("Are You Shure?")
        if(answer){
            dataservice.removePost(item);
        }
    }
}        
})();