(function(){
angular.module('app')
    .component('postdetails',{
        bindings:{
            data: '<',
            comments: '<'
        },
        templateUrl:'js/components/postdetails/postdetails.page.html',
        controller: "postDetailsCtrl"
    })    
})()