(function() {
angular.module('app')
    .filter('bottomblog', bottomblog)

    function bottomblog() {
        return function(items) {
            return items.slice(4);
            }
        }
}());
