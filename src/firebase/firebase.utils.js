import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAW_vzQwX3zycycVkkb4XS035QOvkD8pD0",
  authDomain: "crwn-db-5efd3.firebaseapp.com",
  databaseURL: "https://crwn-db-5efd3.firebaseio.com",
  projectId: "crwn-db-5efd3",
  storageBucket: "crwn-db-5efd3.appspot.com",
  messagingSenderId: "641368726456",
  appId: "1:641368726456:web:4131ef9400e8aadf554d4d"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      })
    } catch(error) {
      console.log('error creating user', error.message );
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;