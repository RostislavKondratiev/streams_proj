(function(){
angular.module('app')
    .component('chat',{
        templateUrl:'js/components/chat/chat.page.html',
        controller:'chatCtrl'
    }
    // function(){
    //     return{
    //         restrict:'E',
    //         scope:{},
    //         controller:'chatCtrl',
    //         templateUrl:'js/components/chat/chat.page.html',
    //         controllerAs:'$ctrl',
    //     }
    // })    
)})()