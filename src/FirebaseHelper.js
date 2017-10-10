import * as Keys from "../config/keys.js"

export default class FirebaseHelper
{
    constructor()
    {
        var config = {
            apiKey: Keys.apiKey,
            authDomain: Keys.projectId + ".firebaseapp.com",
            databaseURL: "https://" + Keys.projectId + ".firebaseio.com",
            projectId: Keys.projectId,
            storageBucket: Keys.projectId + ".appspot.com",
            messagingSenderId: Keys.messagingSenderId
          };
          firebase.initializeApp(config);
    }

    isSignedIn()
    {
        return !!firebase.auth().currentUser;
    }

    login()
    {
        var database = firebase.database();

        var provider = new firebase.auth.FacebookAuthProvider();

        provider.setCustomParameters({
            'display': 'popup'
          });

        return firebase.auth().signInWithPopup(provider);
    }

    save(data)
    {
        firebase.database().ref('users/' + this.userId).set({items: data});
    }

    load()
    {
        let userId = firebase.auth().currentUser.uid;

        return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
            console.log(snapshot.val());
        });
    }
}

