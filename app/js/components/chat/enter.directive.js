(function(){
    angular.module('app')
        .directive('enterDir', enterDir)


    function enterDir(){
        return{
            restrict:'A',
            link:function(scope, element, attrs){
                element.bind('keydown keypress', function(event){
                    if(event.which==13 && !event.shiftKey){
                        if(event.which==13){
                        scope.$apply(function(){
                            scope.$eval(attrs.enterDir)
                        })
                        event.preventDefault();
                        }
                    }
                   
                })
            }
        }
    }    
})();