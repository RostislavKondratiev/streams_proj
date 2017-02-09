(function(){
angular.module('app')
    .controller('chatCtrl', chatCtrl);

chatCtrl.$inject=['$scope','dataservice','$firebaseAuth','toastr'];
function chatCtrl($scope, dataservice, $firebaseAuth,toastr){
    var auth=$firebaseAuth();
    var self=this;
    self.messagesView=false;

    auth.$onAuthStateChanged(function(authData){
        self.user=authData;
    });

    self.messages=dataservice.getMessages(self.messagesView);
    self.closeChat=closeChat;
    self.sendMessage=sendMessage;
    self.limitMessages=limitMessages;


    
    function limitMessages(){
        self.messagesView = self.messagesView ? false : true
        self.messages=dataservice.getMessages(self.messagesView);
    }

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