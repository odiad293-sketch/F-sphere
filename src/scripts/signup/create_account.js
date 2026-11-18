import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js';
import { setDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
import { auth, db } from '../firebase_config.js';
export const createAccount = async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        console.error("Passwords do not match");
        return;
    }

    try {
        const userDoc = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const userRef = doc(db, 'users', userDoc.user.uid);
        await setDoc(userRef, {
            email: email,
            fullName: name,
            createdAt: serverTimestamp(),
        });

    } catch (error) {
        console.error("Error creating user:", error);
    }
}