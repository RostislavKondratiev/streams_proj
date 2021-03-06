(function(){
angular.module('app')
    .directive('authDialog',function(){
        return{
            restrict:'E',
            templateUrl:'js/components/main/auth.page.html',
            link:authLink
        }
    })

    function authLink(scope, elem, attrs){
        var dialog = document.querySelector('#dialog');
        if (! dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        angular.element(window).bind('click', function(event) {
            if (event.target == dialog) {
                for(key in scope.$ctrl.data){
                    scope.$ctrl.data[key]=undefined;
                }
            dialog.close();
            }
        })
    }    
})();