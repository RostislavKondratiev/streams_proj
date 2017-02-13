(function(){
angular.module('app')
    .controller('blogCtrl', blogCtrl)

blogCtrl.$inject=['$firebaseAuth','dataservice']
function blogCtrl($firebaseAuth, dataservice){
    var self=this;
    var limit=12;
    var auth = $firebaseAuth();
    
    self.devider=false;
    self.user=false;

    self.posts=dataservice.getPosts(limit);
    self.deletePost=deletePost;
    self.viewMorePosts=viewMorePosts;

    auth.$onAuthStateChanged(function(authData){
        self.user=authData;
    });

    self.posts.$loaded(function(){
        self.devider=true;
    })

    function viewMorePosts(){
        limit+=4;
        var newposts=dataservice.getPosts(limit);
        newposts.$loaded(function(){
            self.posts=newposts;
        })
        window.scrollTo(0,document.body.scrollHeight);
    }

    function deletePost(item){
        var answer=confirm("Are You Shure?")
        if(answer){
            dataservice.removePost(item);
        }
    }
}        
})();