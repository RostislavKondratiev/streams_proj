(function(){
angular.module('app')
    .controller('chatCtrl', chatCtrl);

chatCtrl.$inject=['dataservice','$firebaseAuth','toastr'];
function chatCtrl(dataservice, $firebaseAuth, toastr){
    var auth=$firebaseAuth();
    var self=this;
    self.messagesView=false;
    self.chatState=false;
    self.unread=0;

    self.messages=dataservice.getMessages(self.messagesView);
    self.sendMessage=sendMessage;
    self.limitMessages=limitMessages;
    self.toggleChat=toggleChat;
    self.messages.$watch(watchHandler);

    auth.$onAuthStateChanged(function(authData){
        self.user=authData;
    });

    function watchHandler(event){
        if(self.chatState==false && event.event === "child_removed"){
            ++self.unread;
        }
    }

    function limitMessages(){
        self.messagesView = self.messagesView ? false : true
        self.messages=dataservice.getMessages(self.messagesView);
    }

    function toggleChat(){
        if(self.unread>0){
            self.unread=0;
        }
        self.chatState=self.chatState===false ? true : false;
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
})();