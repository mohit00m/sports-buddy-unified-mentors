import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getAuth } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { getFirestore } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBqODlU6ONl-2lVgulB0lJ70Pnw8dBK5YA",
  authDomain: "soil-farming-agent-2026-3a8c3.firebaseapp.com",
  projectId: "soil-farming-agent-2026-3a8c3",
  storageBucket: "soil-farming-agent-2026-3a8c3.firebasestorage.app",
  messagingSenderId: "498349414656",
  appId: "1:498349414656:web:8d2a7f96a0311d15527be5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
