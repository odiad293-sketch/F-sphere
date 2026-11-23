// Handle Firebase authentication errors
import { displaySignupError } from "./authErrorDisplayer.js"

export function handleSignupError(error, authUserCreated = false) {

    // Authentication succeeded, but Firestore profile creation failed.
    if (authUserCreated) {
        displaySignupError(
            'Profile creation failed',
            'Your authentication succeeded, but we could not save your profile. Please try again.'
        );
        return;
    }

    console.error('Signup error:', error.code, error.message);

    switch (error.code) {

        // Email and password errors
        case 'auth/email-already-in-use':
            displaySignupError(
                'Email already registered',
                'An account with this email already exists. Please sign in instead.'
            );
            break;

        case 'auth/invalid-email':
            displaySignupError(
                'Invalid email',
                'Please enter a valid email address.'
            );
            break;

        case 'auth/weak-password':
        case 'auth/password-does-not-meet-requirements':
            displaySignupError(
                'Weak password',
                'Please choose a stronger password that meets all password requirements.'
            );
            break;

        // Google popup errors
        case 'auth/popup-closed-by-user':
            displaySignupError(
                'Sign-in cancelled',
                'You closed the Google sign-in window before completing authentication.'
            );
            break;

        case 'auth/popup-blocked':
            displaySignupError(
                'Popup blocked',
                'Your browser blocked the Google sign-in window. Allow popups and try again.'
            );
            break;

        case 'auth/missing-password':
            displaySignupError(
                'Missing password',
                'Please enter your password to continue.'
            );
            break;

        case 'auth/cancelled-popup-request':
            displaySignupError(
                'Sign-in already in progress',
                'Another Google sign-in request is already running. Please wait.'
            );
            break;

        case 'auth/unauthorized-domain':
            displaySignupError(
                'Domain not authorized',
                'This website domain is not authorized for Google sign-in.'
            );
            break;

        case 'auth/account-exists-with-different-credential':
            displaySignupError(
                'Account already exists',
                'An account with this email already exists using another sign-in method. Try signing in with that method.'
            );
            break;

        case 'auth/credential-already-in-use':
            displaySignupError(
                'Account already linked',
                'This Google account is already associated with another account.'
            );
            break;

        // General authentication errors
        case 'auth/operation-not-allowed':
            displaySignupError(
                'Sign-in unavailable',
                'This sign-in method is currently disabled.'
            );
            break;

        case 'auth/network-request-failed':
            displaySignupError(
                'Connection problem',
                'Please check your internet connection and try again.'
            );
            break;

        case 'auth/too-many-requests':
            displaySignupError(
                'Too many attempts',
                'Too many attempts have been made. Please try again later.'
            );
            break;

        case 'auth/user-disabled':
            displaySignupError(
                'Account disabled',
                'This account has been disabled. Please contact support.'
            );
            break;

        case 'auth/invalid-credential':
            displaySignupError(
                'Invalid credentials',
                'Your sign-in credentials could not be verified. Please try again.'
            );
            break;

        // Firestore errors
        case 'permission-denied':
            displaySignupError(
                'Permission denied',
                'We could not save your profile because of a database permission issue.'
            );
            break;

        case 'unavailable':
            displaySignupError(
                'Database unavailable',
                'Our database is temporarily unavailable. Please try again.'
            );
            break;

        default:
            displaySignupError(
                'Something went wrong',
                'We could not complete your request. Please try again.'
            );
    }
}