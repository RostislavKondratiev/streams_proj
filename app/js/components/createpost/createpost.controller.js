(function(){
angular.module('app')
    .controller('createCtrl', createCtrl);

createCtrl.$inject=['dataservice','toastr','$state']
function createCtrl(dataservice,toastr,$state){
    var self=this;
    self.addPost=addPost;
    self.goBack=goBack;

    
    console.log(this);
    

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
       
})()