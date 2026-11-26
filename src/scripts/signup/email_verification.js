
import { reload, sendEmailVerification, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js';

import {
    updateDoc,
    doc,
    getDoc,
} from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js';

import { auth, db } from '../firebase_config.js';
import { handleSignupError } from "../../utils/authErrorHandler.js";
import { lodingState } from './signup_UI.js';
import { displaySignupError, hideSignupError } from "../../utils/authErrorDisplayer.js"
import { renderhtml } from "./email_verification_UI.js"

let sendingEmail = false;
let updatingEmailStatus = false;

async function emailVerification() {
    renderhtml()
    const verificationBtn = document.querySelector("#verified-btn");
    const resendBtn = document.querySelector(".resend");
    const successMessage = document.querySelector(".successMessage");
    const loginBtn = document.querySelector(".login-btn");
    const signupBtn = document.querySelector(".signup-btn");
    const userEmail = document.querySelector(".user-email");

    loginBtn.addEventListener("click", () => {
        window.location.href = './signin.html'
    });

    signupBtn.addEventListener("click", () => {
        window.location.href = "../../signup.html"
    });

    let currentUser;
    onAuthStateChanged(auth, async (firebaseUser) => {
        lodingState(true);

        if (!firebaseUser) {
            displaySignupError(
                "Error",
                "No authenticated user, please sign in."
            )
            return;
        }
        currentUser = firebaseUser;

        try {
            const documentRef = doc(db, "users", currentUser.uid);
            const documentSnapshot = await getDoc(documentRef);

            if (!documentSnapshot.exists()) {
                displaySignupError(
                    "Error",
                    "User profile not found."
                );
                lodingState(false);
                return;
            }

            const userData = documentSnapshot.data();

            userEmail.textContent = userData.email;

            verificationBtn.addEventListener("click", async () => {
                if (updatingEmailStatus) return;
                hideSignupError();
                updatingEmailStatus = true;
                lodingState(true);

                try {
                    await reload(currentUser);

                    if (!currentUser.emailVerified) {
                        // Display a message asking the user to verify first.
                        displaySignupError(
                            "Error",
                            "Please verify your email."
                        )
                        return;
                    }

                    await updateDoc(doc(db, "users", currentUser.uid), {
                        emailVerified: true
                    });
                    console.log("email verified")
                    // Redirect to dashboard here.

                } catch (error) {
                    handleSignupError(error);
                } finally {
                    updatingEmailStatus = false;
                    lodingState(false);
                }
            });

            // Resend verification email.
            resendBtn.addEventListener("click", async () => {
                if (sendingEmail) return;
                hideSignupError();
                sendingEmail = true;
                lodingState(true);

                try {
                    await reload(currentUser);

                    if (currentUser.emailVerified) {

                        // Inform the user that verification is already complete.
                        successMessage.textContent = "verification is already complete.";
                        successMessage.style.display = "flex"
                        return;
                    }

                    await sendEmailVerification(currentUser);

                    // Display successful resend message.
                    successMessage.style.display = "flex"



                } catch (error) {
                    handleSignupError(error);
                } finally {
                    sendingEmail = false;
                    lodingState(false);
                }
            });

        } catch (error) {
            handleSignupError(error);
        } finally {
            lodingState(false);
        }


    });

    // Check verification status when the user clicks.

}

emailVerification();
