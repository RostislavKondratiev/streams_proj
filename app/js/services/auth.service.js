(function(){
angular.module('app')
    .service('authservice', authservice)

authservice.$inject=['$firebaseAuth']
function authservice($firebaseAuth){
    self.auth=$firebaseAuth();

    self.register=register;
    self.login=login;


    function register(email, pass){
        self.auth.createUserWithEmailAndPassword(email,pass).catch(function (error) {
            console.log(error.code);
            console.log(error.message);
        })
    }

    function login(email,pass) {
        self.auth.signInWithEmailAndPassword(email,pass).catch(function (error) {
            console.log(error.code);
            console.log(error.message);
        })
    }
}        
})();