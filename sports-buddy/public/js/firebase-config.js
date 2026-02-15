// Firebase SDK Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Paste your Firebase config here
const firebaseConfig = {
  apiKey:"AIzaSyDmFaeDnXnZJ3SyZEqFlsPz3CaG5W_J6M0",
  authDomain:"sportsbuddy-mohit-2026.firebaseapp.com",
  projectId:"sportsbuddy-mohit-2026",
  storageBucket:"sportsbuddy-mohit-2026.firebasestorage.app",
  messagingSenderId:"788913055835",
  appId:"1:788913055835:web:f5f815e8e3e92d973e377e"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
