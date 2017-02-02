(function(){
angular.module('app')
    .directive('postdesk',function(){
        return{
            restrict:"E",
            templateUrl: "js/components/blog/details.page.html",
            link:function(scope, element, attrs){
                var detail = document.querySelector('#detail');
                console.log(detail);
                if(! detail.showModal){
                    dialogPolyfill.registerDialog(detail);
                }
                angular.element(window).bind('click', function(event) {
                    if (event.target == detail) {
                        detail.close();
                    }
                })
            }
        }
    })
})()