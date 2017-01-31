(function(){
angular.module('app')
    .service('dataservice', dataservice)


dataservice.$inject=['$firebaseObject']
function dataservice($firebaseObject){
    var ref = firebase.database().ref();
    var self = this;

}        
})()