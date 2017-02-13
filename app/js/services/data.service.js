(function(){
angular.module('app')
    .service('dataservice', dataservice)


dataservice.$inject=['$firebaseObject','$firebaseArray'];
function dataservice($firebaseObject, $firebaseArray){
    var profileRef = firebase.database().ref().child('profiles');
    var postsRef = firebase.database().ref().child('posts');
    var messagesRef = firebase.database().ref().child('messages');
    var self = this;


    self.getPosts=getPosts;
    self.getPostDetails=getPostDetails;
    self.addToPlaylist=addToPlaylist;
    self.getPlaylist=getPlaylist;
    self.deleteFromPlaylist=deleteFromPlaylist;
    self.getMessages=getMessages;
    self.sendMessage=sendMessage;
    self.addPost=addPost;
    self.removePost=removePost;
    self.addComment=addComment;
    self.getComments=getComments;


    function getComments(id){
        return $firebaseArray(postsRef.child(id).child('comments'));
    }

    function addComment(id,item){
        return $firebaseArray(postsRef.child(id).child('comments')).$add(item);
    }   

    function removePost(item){
        return $firebaseObject(postsRef.child(item)).$remove();
    }

    function addPost(item){
        return $firebaseArray(postsRef).$add(item);
    }

    function sendMessage(item){
        return $firebaseArray(messagesRef).$add(item);
    }

    function getMessages(state){
        if(state){
            return $firebaseArray(messagesRef)
        }
        return $firebaseArray(messagesRef.limitToLast(15))
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

    function getPosts(limit){
        return $firebaseArray(postsRef.limitToLast(limit))
    }


}        
})();