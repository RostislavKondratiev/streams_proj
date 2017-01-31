    angular.module('app',['firebase','ui.router','ngAnimate', 'toastr'])
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

    var config = {
        apiKey: "AIzaSyDfuicTxzKZS46anMXs5ypa1nOGN4OgyRo",
        authDomain: "stream-d6274.firebaseapp.com",
        databaseURL: "https://stream-d6274.firebaseio.com",
        storageBucket: "stream-d6274.appspot.com",
        messagingSenderId: "443244086555"
    };
    firebase.initializeApp(config);