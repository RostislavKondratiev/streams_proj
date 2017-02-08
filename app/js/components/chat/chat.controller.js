(function(){
angular.module('app')
    .controller('chatCtrl', chatCtrl);

chatCtrl.$inject=['$scope','dataservice','$firebaseAuth','toastr'];
function chatCtrl($scope, dataservice, $firebaseAuth,toastr){
    var auth=$firebaseAuth();
    var self=this;

    auth.$onAuthStateChanged(function(authData){
        self.user=authData;
    });

    self.messages=dataservice.getMessages();
    self.closeChat=closeChat
    self.sendMessage=sendMessage


    function closeChat(){
        $scope.$parent.$ctrl.openChat();
    }

    function sendMessage(){
        if(dataservice.userData != null){
            var data={
                author:dataservice.userData.email,
                authorUid:dataservice.userData.uid,
                text:self.mess.text
            }
            if(self.mess.text!=''){
                dataservice.sendMessage(data);
                self.mess.text='';
            } else toastr.warning('Write Some Message','Warning')
        } else toastr.warning('Authorize Please','Warning')
    }
}    
})()