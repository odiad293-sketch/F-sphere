
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js';

import {
    setDoc,
    doc,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js';

import { auth, db } from '../firebase_config.js';
import { lodingState } from './signup_UI.js';

let isigning = false;


// Display an error inside the error card
function displaySignupError(title, message) {
    const errorCard = document.querySelector('.error-card');

    if (!errorCard) return;

    const errorTitle = errorCard.querySelector('h3');
    const errorMessage = errorCard.querySelector('p');
    const closeButton = errorCard.querySelector('.error-close');

    errorTitle.textContent = title;
    errorMessage.textContent = message;

    errorCard.style.display = 'flex';

    // Close the error card
    closeButton.onclick = () => {
        errorCard.style.display = 'none';
    };
}


// Hide the error card
function hideSignupError() {
    const errorCard = document.querySelector('.error-card');

    if (errorCard) {
        errorCard.style.display = 'none';
    }
}


// Handle Firebase authentication errors
function handleSignupError(error) {

    console.error('Signup error:', error.code, error.message);

    if (error.code === 'auth/email-already-in-use') {

        displaySignupError(
            'Email already registered',
            'An account with this email already exists. Please sign in instead.'
        );

    } else if (error.code === 'auth/invalid-email') {

        displaySignupError(
            'Invalid email',
            'Please enter a valid email address.'
        );

    } else if (error.code === 'auth/weak-password') {

        displaySignupError(
            'Weak password',
            'Your password is too weak. Please choose a stronger password.'
        );

    } else if (error.code === "auth/password-does-not-meet-requirements") {
       displaySignupError(
        "Weak Password", 
        "Password must contain an upper case character, Password must contain a numeric character, Password must contain a non-alphanumeric character"
       )
    } else if (error.code === 'auth/operation-not-allowed') {

        displaySignupError(
            'Registration unavailable',
            'Email and password registration is currently disabled.'
        );

    } else if (error.code === 'auth/network-request-failed') {

        displaySignupError(
            'Connection problem',
            'Please check your internet connection and try again.'
        );

    } else if (error.code === 'auth/too-many-requests') {

        displaySignupError(
            'Too many attempts',
            'Too many attempts have been made. Please try again later.'
        );

    } else {

        displaySignupError(
            'Something went wrong',
            'We could not create your account. Please try again.'
        );
    }
}


// Create a new account
export const createAccount = async () => {

    if (isigning) return;

    const fistName = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const lastName = document.querySelector("last-name").value;
    const confirmPassword = document.getElementById('confirm-password').value;

    hideSignupError();

    // Validate name
    if (!fistName && lastName ) {
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
            fistName: fistName,
            lastName: lastName,
            createdAt: serverTimestamp()
        });

        console.log('Account created successfully:', user.uid);

        // Further success handling can be added here.

    } catch (error) {

        if (authUserCreated) {

            // Authentication succeeded, but Firestore failed.
            console.error('Profile creation failed:', error);

            displaySignupError(
                'Account created',
                'Your account was created, but we could not save your profile. Please contact support.'
            );

        } else {

            // Authentication itself failed.
            handleSignupError(error);
        }

    } finally {

        isigning = false;
        lodingState(false);

    }
};
