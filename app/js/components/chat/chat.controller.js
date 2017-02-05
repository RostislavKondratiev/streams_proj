(function(){
angular.module('app')
    .controller('chatCtrl', chatCtrl);

chatCtrl.$inject=['dataservice'];
function chatCtrl(dataservice){
    var self=this;
    console.log(this);

    self.messages=dataservice.getMessages();

    self.sendMessage=sendMessage

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
            } else alert('Write message before');
        } else alert('Authorize Please');
    }
}    
})()