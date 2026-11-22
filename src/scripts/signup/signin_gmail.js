import { GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js';

import {
    setDoc,
    doc,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js';

import { auth, db } from '../firebase_config.js';
import { lodingState } from './signup_UI.js';

let isigning = false;

export const googleSignIn = async () => {
    try {
        const provider = new GoogleAuthProvider();

        const result = await signInWithPopup(auth, provider);       

        // The signed-in user info.
        const user = result.user;
        console.log(user)
    } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode)
        // The email of the user's account used.
        const email = error.customData.email;
        console.log(email)
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential)
        // ...
    }
    
}