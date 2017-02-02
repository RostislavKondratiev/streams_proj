(function(){
angular.module('app')
    .component('postdetails',{
        bindings:{
            data: '<'
        },
        templateUrl:'js/components/postdetails/postdetails.page.html',
        controller: function(){
            console.log(this);
        }
    })    
})()