(function(){
angular.module('app')
    .controller('blogCtrl', blogCtrl)

blogCtrl.$inject=['$firebaseAuth','dataservice']
function blogCtrl($firebaseAuth, dataservice){
    var self=this;
    var auth = $firebaseAuth();
    self.devider=false;
    self.user={};

    self.posts=dataservice.getFirstPosts();
    self.ex=dataservice.getExPost();
    self.deletePost=deletePost;

    auth.$onAuthStateChanged(function(authData){
        self.user=authData;
    });

    self.posts.$loaded(function(){
        self.count=(-(self.posts.length-4));
        self.devider=true;
    })

    console.log(self.posts);

    function deletePost(item){
        dataservice.removePost(item);
    }
}        
})()