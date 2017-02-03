(function(){
angular.module('app')
    .service('dataservice', dataservice)


dataservice.$inject=['$firebaseObject','$firebaseArray'];
function dataservice($firebaseObject, $firebaseArray){
    var profileRef = firebase.database().ref().child('profiles');
    var postsRef = firebase.database().ref().child('posts');
    var exRef = firebase.database().ref().child('posts').child('post1');
    var self = this;


    self.getFirstPosts=getFirstPosts;
    self.getOtherPosts=getOtherPosts;
    self.getExPost=getExPost;
    self.getPostDetails=getPostDetails;
    self.addToPlaylist=addToPlaylist;
    self.getPlaylist=getPlaylist;

    function addToPlaylist(id, data) {
        return $firebaseArray(profileRef.child(id)).$add(data);
    }

    function getPlaylist(id) {
        return $firebaseArray(profileRef.child(id));
    }
    
    function getPostDetails(id){
        return $firebaseObject(postsRef.child(id));
    }

    function getFirstPosts(){
        return $firebaseArray(postsRef.limitToFirst(4))
    }

    function getOtherPosts(){
        return $firebaseArray(postsRef.limitToLast(8))
    }

    function getExPost(){
        return $firebaseObject(exRef);
    }

}        
})();