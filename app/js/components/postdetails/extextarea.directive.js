(function(){
angular.module('app')
    .directive('extextarea', extextarea)

    extextarea.$inject=['$window','$document']
    function extextarea($window,$document){
        return{
            restrict:'A',
            link: function(scope, elem, attr){
                console.log(angular.element(elem));
                var ta = angular.element(elem);
                ta.bind('keydown keypress',function(){
                    ta.css('height', '');
                    ta.css('height', Math.min(elem[0].scrollHeight)+'px');
                })
            }
        }
    }    
})();