(function(){
    angular.module('app')
        .filter('names', names)

    function names(){
        return function(item){
            return item.split('@')[0];
        }
    }        
})();