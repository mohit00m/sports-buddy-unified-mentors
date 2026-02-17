import { showToast } from "./utils.js";
import { showLoader, hideLoader } from "./utils.js";

import { auth, db } from "./firebase-config.js";

import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { 
  doc, 
  setDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// REGISTER
window.registerUser = async function () {
  const fullName = document.getElementById("name")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value.trim();

  if (!fullName || !email || !password) {
    alert("All fields required");
    return;
  }

  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    name: fullName,
    email,
    role: "user"
  });

  window.location.href = "login.html";
};
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

if (!validateEmail(email)) {
  showToast("Invalid email format", "error");
  return;
}

if (password.length < 6) {
  showToast("Password must be at least 6 characters", "error");
  return;
}



// LOGIN
window.loginUser = async function () {
  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value.trim();

  if (!email || !password) {
    alert("Enter email and password");
    return;
  }

  await signInWithEmailAndPassword(auth, email, password);
  window.location.href = "dashboard.html";
};


// LOGOUT (EXPORTED)
export async function logoutUser() {
  console.log("Logout clicked");   // 👈 debug line

  await signOut(auth);

  console.log("Signed out");       // 👈 debug line

  window.location.href = "login.html";
}
