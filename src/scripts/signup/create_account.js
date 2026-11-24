
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js';

import {
    setDoc,
    doc,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js';

import { auth, db } from '../firebase_config.js';
import { lodingState } from './signup_UI.js';
import { handleSignupError } from "../../utils/authErrorHandler.js"
import { displaySignupError, hideSignupError } from "../../utils/authErrorDisplayer.js"

let isigning = false;

// Create a new account
export const createAccount = async () => {

    if (isigning) return;

    const fistName = document.getElementById('first-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const lastName = document.getElementById("last-name").value.trim();
    const confirmPassword = document.getElementById('confirm-password').value;

    hideSignupError();

    // Validate name
    if (fistName === "" || lastName === "") {
        displaySignupError(
            'Name required',
            'Please enter your full name.'
        );
        return;
    }

    // Validate passwords
    if (password !== confirmPassword) {
        displaySignupError(
            'Password mismatch',
            'Your passwords do not match. Please check and try again.'
        );
        return;
    }

    isigning = true;
    lodingState(true);

    let authUserCreated = false;

    try {

        // Create Firebase authentication account
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        authUserCreated = true;

        const user = userCredential.user;

        // Create the user's Firestore profile
        const userRef = doc(db, 'users', user.uid);

        await setDoc(userRef, {
            email: email,
            firstName: fistName,
            lastName: lastName,
            createdAt: serverTimestamp(),
            emailVerified: user.emailVerified

        });
       
        await sendEmailVerification(user);

        if (user.emailVerified) {
            //  allow access to the dashboard.

        } else{
            // redirect to the verification page
        }

        // Further success handling can be added here.

        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                // ...
            } else {
                // User is signed out
                // ...
            }
        });



    } catch (error) {
        handleSignupError(error, authUserCreated)
    } finally {
        isigning = false;
        lodingState(false);

    }
};
