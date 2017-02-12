(function(){
angular.module('app')
    .filter('topblog',topblog)

    function topblog(){
    return function(items){
        return items.slice(0,4);
    }    
    }    
})();