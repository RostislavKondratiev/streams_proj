(function(){
angular.module('app')
    .controller('mainCtrl',mainCtrl);


mainCtrl.$inject=['$firebaseAuth','toastr','dataservice','$state','$scope'];
function mainCtrl($firebaseAuth, toastr, dataservice, $state, $scope){
    var auth = $firebaseAuth();
    
    var self = this;
    self.user=false;
    self.data={};
    self.showdialog=showdialog;
    self.closedialog=closedialog;
    self.login=login;
    self.loginGoogle=loginGoogle;
    self.register=register;
    self.logout=logout;
    
    auth.$onAuthStateChanged(function(authData){
        self.user=authData;
        dataservice.userData=authData;
    });

    function showdialog() {
        dialog.showModal();
    }

    function closedialog() {
        document.querySelector('main.mdl-layout__content').style.overflowY = '';
        dialog.close();
        if(self.data){
            for(key in self.data){
            self.data[key]='';
            }
        }
        document.querySelector('main.mdl-layout__content').style.overflowY = 'auto';
    }

    function register(email, pass, conf){
        if(email && pass && conf != undefined){
            if(pass===conf){
                auth.$createUserWithEmailAndPassword(email, pass).then(successHandler, errorHandler)
            } else alert("Wrong Password");
        }else alert("Fill the fields");
    }

    function login(email, pass){
        if(email && pass != undefined){
            auth.$signInWithEmailAndPassword(email, pass).then(successHandler,errorHandler)
        } else alert("Fill the fields");
    }

    function loginGoogle(){
        var state=$state.current.name;
        auth.$signInWithPopup('google').then(successHandler,errorHandler)
    }

    function logout(){
        auth.$signOut();
        dataservice.userData={};
    }

  
    function successHandler(firebaseUser){
        closedialog();
        toastr.success('Authorization Complete','Success');
    }

    function errorHandler(error){
        toastr.error(error.message,'Error');
    }

}
})();