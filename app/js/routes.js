(function(){
angular.module('app')
    .config(stateHandler);

angular.module('app')
        .run(createRestrict);    


createRestrict.$inject=['$transitions', 'dataservice'];           
function createRestrict($transitions, dataservice){
        $transitions.onStart({to:['main.createpost']},function(trans){
            var state=trans.router.stateService;
            if(dataservice.userData==undefined){
                return state.target('main.blog');
            }
        })
    } 

stateHandler.$inject=['$stateProvider','$urlRouterProvider','$locationProvider'];
function stateHandler($stateProvider,$urlRouterProvider,$locationProvider){
    $stateProvider
        .state('main',{
            abstract: true,
            component:'mainComp'
        })
        .state('main.welcome',{
            component:'welcome',
            url:'/welcome'
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


   $urlRouterProvider.otherwise('/welcome')     
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