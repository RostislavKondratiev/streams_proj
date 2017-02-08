(function(){
angular.module('app')
    .config(stateHandler)

stateHandler.$inject=['$stateProvider','$urlRouterProvider','$locationProvider'];
function stateHandler($stateProvider,$urlRouterProvider,$locationProvider){
    $stateProvider
        .state('main',{
            abstract: true,
            component:'mainComp',
        })
        .state('main.blog',{
            component:'blogComp',
            url:'/blog'
        })
        .state('main.postdetails',{
            component:'postdetails',
            url:'/post/{postId}',
            resolve:{
                data:getPostDetails,
                comments:getComments
            }
        })
        .state('main.playlist',{
            component:'playlist',
            url:'/playlist',
        })
        .state('main.createpost',{
            component:'createPost',
            url:'/create'
        });


   $urlRouterProvider.otherwise('/blog')     
}

getComments.$inject=['dataservice','$transition$']
function getComments(dataservice, $transition$){
    return dataservice.getComments($transition$.params().postId)
}

getPostDetails.$inject=['dataservice', '$transition$']
function getPostDetails(dataservice, $transition$){
    return dataservice.getPostDetails($transition$.params().postId)
}

})();