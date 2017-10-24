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
                this.allowed(user).then(() => {
                    resolve();  
                }).catch((error) => {
                    reject(error);
                });
            }.bind(this));
        });
    }

    allowed(user)
    {
        return new Promise((resolve, reject) => {
            if (user) 
            {
                firebase.database().ref(Keys.databaseId).once('value').then(function(snapshot) {
                    if(snapshot.val() && snapshot.val().users && snapshot.val().users.indexOf(user.email) !== -1)
                    {
                        resolve();
                    } 
                    else
                    {
                        reject({code: 400, message: "User not allowed"});
                    }
                });
            } 
            else 
            {
                reject({code: 200, message: "Failed to authenticate"});
            }
            
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

        return new Promise((resolve, reject) => {
            firebase.auth().signInWithPopup(provider).then((data) => 
            {
                this.allowed(data.user).then(() => {
                    resolve();  
                }).catch((error) => {
                    reject(error);
                });

            }).catch((error) => 
            {
                reject({code: 200, message: "Failed to login"});
            });
        });
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

