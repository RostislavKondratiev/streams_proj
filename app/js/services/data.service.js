(function(){
angular.module('app')
    .service('dataservice', dataservice)


dataservice.$inject=['$firebaseObject','$firebaseArray'];
function dataservice($firebaseObject, $firebaseArray){
    var profileRef = firebase.database().ref().child('profiles');
    var postsRef = firebase.database().ref().child('posts');
    var messagesRef = firebase.database().ref().child('messages');
    var exRef = firebase.database().ref().child('posts').child('post1');
    var self = this;


    self.getFirstPosts=getFirstPosts;
    self.getOtherPosts=getOtherPosts;
    self.getExPost=getExPost;
    self.getPostDetails=getPostDetails;
    self.addToPlaylist=addToPlaylist;
    self.getPlaylist=getPlaylist;
    self.deleteFromPlaylist=deleteFromPlaylist;
    self.getMessages=getMessages;
    self.sendMessage=sendMessage;
    self.addPost=addPost;


    function addPost(item){
        return $firebaseArray(postsRef).$add(item);
    }

    function sendMessage(item){
        return $firebaseArray(messagesRef).$add(item);
    }

    function getMessages(){
        return $firebaseArray(messagesRef);
    }

    function deleteFromPlaylist(id, item){
        return $firebaseObject(profileRef.child(id).child(item)).$remove();
    }

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