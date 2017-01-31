(function(){
angular.module('app')
    .config(stateHandler)

stateHandler.$inject=['$stateProvider','$urlRouterProvider','$locationProvider'];
function stateHandler($stateProvider,$urlRouterProvider,$locationProvider){
    $stateProvider
        .state('main',{
            component:'mainComp',
            url:'/main'
        });


   $urlRouterProvider.otherwise('/main')     
}            
})()