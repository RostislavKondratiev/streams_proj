(function(){
angular.module('app')
    .controller('playlistCtrl', playlistCtrl);

playlistCtrl.$inject=['dataservice','toastr','$firebaseAuth','$state'];
function playlistCtrl(dataservice, toastr,$firebaseAuth,$state){
    var auth=$firebaseAuth();
    var self = this;

    auth.$onAuthStateChanged(function(authData){
        self.disabled=false;
        self.playlist=[];
        if(authData){
            self.user=authData;
            self.playlist=dataservice.getPlaylist(self.user.uid);
        } else {
            self.disabled=true;
            if($state.current.name==='main.playlist'){
                toastr.info('You Are Not Authorized, to enable playlist please login', 'Info');
            }
        }

    });
    
    self.addPlayerHandler=addPlayerHandler;
    self.deletePlayerHandler=deletePlayerHandler;

    function addPlayerHandler() {
        var channel = self.addplayer.site;
        switch (self.addplayer.service){
            case 'twitch':
                var url='https://player.twitch.tv/?autoplay=false&channel=';
                var twitchAdress={};
                twitchAdress.path = url+channel;
                twitchAdress.service=self.addplayer.service;
                dataservice.addToPlaylist(dataservice.userData.uid.toString(),twitchAdress);
                toastr.success(channel+' added to playlist','Success');
                break;

            case 'cybergame':
                var url1='https://api.cybergame.tv/p/embed.php?c=';
                var url2='&w=600&h=360&type=embed';
                var cyberAdress={};
                cyberAdress.path = url1+channel+url2;
                cyberAdress.service=self.addplayer.service;
                dataservice.addToPlaylist(dataservice.userData.uid.toString(),cyberAdress);
                toastr.success(channel+' added to playlist','Success');
                break;
        }
    }

    function deletePlayerHandler(item){
        dataservice.deleteFromPlaylist(dataservice.userData.uid, item);
    }
    
}        
})();