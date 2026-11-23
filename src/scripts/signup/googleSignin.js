import { GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js';

import {
    setDoc,
    doc,
    serverTimestamp,
    getDoc
} from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js';

import { auth, db } from '../firebase_config.js';
import { lodingState } from './signup_UI.js';
import { handleSignupError } from "../../utils/authErrorHandler.js"
import { hideSignupError } from "../../utils/authErrorDisplayer.js"

let authUserCreated = false;
let isigning = false;

export const googleSignIn = async () => {
    if (isigning) return

    isigning = true
    lodingState(true)

    hideSignupError();

    try {
        const provider = new GoogleAuthProvider();

        provider.setCustomParameters({
            prompt: "select_account"
        });

        const result = await signInWithPopup(auth, provider);

        authUserCreated = true;

        // The signed-in user info.
        const user = result.user;

        const userRef = doc(db, "users", user.uid);

        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            await setDoc(userRef, {
                fullName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                createdAt: serverTimestamp(),
                emailVerified: user.emailVerified
            });
        }


    } catch (error) {
        // Handle Errors here.
    handleSignupError(error, authUserCreated);
    } finally {
        isigning = false;
        lodingState(false);
    }

}