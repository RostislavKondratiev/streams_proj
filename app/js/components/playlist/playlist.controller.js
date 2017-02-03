(function(){
angular.module('app')
    .controller('playlistCtrl', playlistCtrl);

playlistCtrl.$inject=['dataservice','toastr','$firebaseAuth','$timeout'];
function playlistCtrl(dataservice, toastr,$firebaseAuth,$timeout){
    var auth=$firebaseAuth();
    var self = this;

    auth.$onAuthStateChanged(function(authData){
        console.log(authData);
        self.playlist=[];
        if(authData){
            self.user=authData;
            self.playlist=dataservice.getPlaylist(self.user.uid);
        } else toastr.info('You Are Not Authorized, to enable playlist please login', 'Info');

    });
    
    self.addPlayerHandler=addPlayerHandler;

    function addPlayerHandler() {
        var channel = self.addplayer.site.split('/');
        switch (self.addplayer.service){
            case 'twitch':
                var url='https://player.twitch.tv/?autoplay=false&channel=';
                var twitchAdress={};
                twitchAdress.path = url+channel[channel.length-1];
                twitchAdress.service=self.addplayer.service;
                dataservice.addToPlaylist(dataservice.userData.uid.toString(),twitchAdress);
                toastr.success(channel[channel.length-1]+' added to playlist','Success');
                break;

            case 'cybergame':
                var url1='https://api.cybergame.tv/p/embed.php?c=';
                var url2='&w=600&h=360&type=embed';
                var cyberAdress={};
                cyberAdress.path = url1+channel[channel.length-2]+url2;
                cyberAdress.service=self.addplayer.service;
                dataservice.addToPlaylist(dataservice.userData.uid.toString(),cyberAdress);
                toastr.success(channel[channel.length-2]+' added to playlist','Success');
                break;
        }
    }
    
    function add(id, data) {
        
    }
}        
})();