(function(){
angular.module('app')
    .controller('mainCtrl',mainCtrl);


mainCtrl.$inject=['$firebaseAuth','toastr','dataservice','$state'];
function mainCtrl($firebaseAuth, toastr, dataservice, $state){
    var auth = $firebaseAuth();
    
    var self = this;
    self.chatState=false;

    self.data={};
    self.showdialog=showdialog;
    self.closedialog=closedialog;
    self.login=login;
    self.loginGoogle=loginGoogle;
    self.register=register;
    self.logout=logout;
    self.openChat=openChat;
   

    auth.$onAuthStateChanged(function(authData){
        self.user=authData;
        dataservice.userData=authData;
        console.log(dataservice.userData);
    });

    function showdialog() {
        dialog.showModal();
    }

    function closedialog() {
        document.querySelector('main.mdl-layout__content').style.overflowY = '';
        dialog.close();
        document.querySelector('main.mdl-layout__content').style.overflowY = 'auto';
    }

    function register(email, pass, conf){
        if(pass===conf){
            auth.$createUserWithEmailAndPassword(email, pass).then(successHandler, errorHandler)
        } else alert("Wrong Password");
    }

    function login(email, pass){
        auth.$signInWithEmailAndPassword(email, pass).then(successHandler,errorHandler)
    }

    function loginGoogle(){
        var state=$state.current.name;
        auth.$signInWithPopup('google').then(successHandler,errorHandler)
    }

    function logout(){
        dataservice.userData={};
        auth.$signOut();
    }

    function openChat(){
        self.chatState=self.chatState===false ? true : false;
    }
  
    function successHandler(firebaseUser){
        closedialog();
        console.log(firebaseUser);
        toastr.success('Authorization Complete','Success');
    }

    function errorHandler(error){
        toastr.error(error.message,'Error');
    }

}
})();