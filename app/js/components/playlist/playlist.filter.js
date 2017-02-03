(function () {
angular.module('app')
    .filter('trusted', trusted);


    trusted.$inject=['$sce'];
    function trusted($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url)
        }

    }
})();