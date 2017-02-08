(function(){
angular.module('app')
    .controller('postDetailsCtrl', postDetailsCtrl);


postDetailsCtrl.$inject=['$firebaseAuth','dataservice','toastr']
function postDetailsCtrl($firebaseAuth, dataservice, toastr){
    var self = this;
    var auth=$firebaseAuth();
    console.log(this);
    
    auth.$onAuthStateChanged(function(authData){
        self.user=authData;
    });

    self.addComment=addComment;
    
    function addComment(){
        var comment={
            author:self.user.email,
            authorUid:self.user.uid,
            text:self.message
        }
        console.log(comment);
        dataservice.addComment(self.data.$id,comment).then(successHandler,errorHandler);
    }



    function successHandler(res){
        self.message='';
        toastr.success('Your Message Was Added','Success')
    }

    function errorHandler(error){
        self.message='';
        toastr.error(error.message, 'Error')
    }

}        
})()