export default class FirebaseHelper
{
    constructor()
    {
        var config = {
            apiKey: "AIzaSyB9D9Td4XJuegtLzoKIdmlzoyunHnHSGHk",
            authDomain: "home-inventory-26d6e.firebaseapp.com",
            databaseURL: "https://home-inventory-26d6e.firebaseio.com",
            projectId: "home-inventory-26d6e",
            storageBucket: "home-inventory-26d6e.appspot.com",
            messagingSenderId: "890481878875"
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

