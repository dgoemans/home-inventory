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

    authenticate()
    {
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) 
                {
                  resolve();
                } 
                else 
                {
                  reject();
                }
              });
        });
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
        let userId = firebase.auth().currentUser.uid;

        firebase.database().ref(Keys.databaseId).set({items: data});
    }

    load()
    {
        let userId = firebase.auth().currentUser.uid;

        return firebase.database().ref(Keys.databaseId).once('value').then(function(snapshot) {
            return new Promise((resolve, reject) => {
                snapshot.val() && snapshot.val().items && resolve(snapshot.val().items);
            });
        });
    }
}

