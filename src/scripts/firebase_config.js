// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import{ getAuth } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAI0oqHE_jvpSxMJEbHVkzSqIUKdIKYUmA",
  authDomain: "f-shere.firebaseapp.com",
  projectId: "f-shere",
  storageBucket: "f-shere.firebasestorage.app",
  messagingSenderId: "785980930072",
  appId: "1:785980930072:web:2c30238780fc5f44efeb6d",
  measurementId: "G-W362Y344RS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);