(function(){
angular.module('app')
    .component('postdetails',{
        bindings:{
            data: '<',
            comments: '<'
        },
        templateUrl:'components/postdetails/postdetails.page.html',
        controller: "postDetailsCtrl"
    })    
})();