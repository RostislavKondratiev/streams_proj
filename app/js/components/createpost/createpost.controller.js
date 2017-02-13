(function(){
angular.module('app')
    .controller('createCtrl', createCtrl);

createCtrl.$inject=['dataservice','toastr','$state','$firebaseAuth']
function createCtrl(dataservice,toastr,$state, $firebaseAuth){
    var auth = $firebaseAuth();
    var self=this;

    self.addPost=addPost;
    self.goBack=goBack;
    
    auth.$onAuthStateChanged(function(authData){
        dataservice.userData=authData;
        if(dataservice.userData==null){
            $state.go('main.blog');
        }
    });
    
    function addPost(){
        if(!self.data.content==""){
            self.data.author=dataservice.userData.email;
            self.data.authorUid=dataservice.userData.uid;
            dataservice.addPost(self.data).then(function(res){
            toastr.success("Post with name "+self.data.title+" successfully added", "success")
            $state.go('main.blog');
            })
        } else toastr.warning('Fill the content field','Warning');  
    }

    function goBack(){
        $state.go('main.blog');
    }  
       
}
       
})();