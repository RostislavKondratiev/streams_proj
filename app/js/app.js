    angular.module('app',['firebase','ui.router','ngAnimate', 'toastr','luegg.directives'])
    .config(function(toastrConfig) {
        angular.extend(toastrConfig, {
        autoDismiss: false,
        containerId: 'toast-container',
        maxOpened: 0,    
        newestOnTop: true,
        positionClass: 'toast-bottom-right',
        preventDuplicates: false,
        preventOpenDuplicates: false,
        target: 'body'
        });
    });


(function() {
angular.module('app')
        .run(function ($rootScope, $timeout) {
            $rootScope.$on('$viewContentLoaded', function(){
            $timeout(function() {
                componentHandler.upgradeAllRegistered();
            })
        })
    });    
}());
    
    

    var config = {
        apiKey: "AIzaSyDfuicTxzKZS46anMXs5ypa1nOGN4OgyRo",
        authDomain: "stream-d6274.firebaseapp.com",
        databaseURL: "https://stream-d6274.firebaseio.com",
        storageBucket: "stream-d6274.appspot.com",
        messagingSenderId: "443244086555"
    };
    firebase.initializeApp(config);
