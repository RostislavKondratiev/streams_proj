(function(){
angular.module('app')
    .controller('mainCtrl',mainCtrl);


mainCtrl.$inject=['$firebaseAuth','toastr']
function mainCtrl($firebaseAuth, toastr){
    var auth = $firebaseAuth();
    
    var dialog = document.querySelector('#dialog');
    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    

    var self = this;
    self.data={};
    self.showdialog=showdialog;
    self.closedialog=closedialog;
    self.login=login;
    self.loginGoogle=loginGoogle;
    self.register=register;
    self.logout=logout;
   

    auth.$onAuthStateChanged(function(authData){
        self.user=authData;
    })

    function showdialog() {
        dialog.showModal();
    }

    function closedialog() {
        dialog.close();
    }

    function register(email, pass, conf){
        if(pass===conf){
            auth.$createUserWithEmailAndPassword(email, pass).then(successHandler, errorHandler)
        } else alert("Wrong Password");
    }

    function login(email, pass){
        auth.$signInWithEmailAndPassword(email, pass).then(successHandler, errorHandler)
    }

    function loginGoogle(){
        auth.$signInWithPopup('google').then(successHandler, errorHandler)
    }

    function logout(){
        auth.$signOut();
    }

    function successHandler(firebaseUser){
        dialog.close();
        console.log(firebaseUser);
        toastr.success('Authorization Complete','Success');
    }

    function errorHandler(error){
        toastr.error(error.message,'Error');
    }
}
})();