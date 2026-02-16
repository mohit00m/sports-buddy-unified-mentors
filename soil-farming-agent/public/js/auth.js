import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { doc, setDoc, getDoc }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { logAction } from "./logger.js";

export async function registerUser(name, email, password) {
  const userCred =
    await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", userCred.user.uid), {
    name,
    email,
    role: "user"
  });

  await logAction("Registered", userCred.user.uid);
  alert("Registered Successfully");
  window.location.href = "login.html";
}

export async function loginUser(email, password) {
  const userCred =
    await signInWithEmailAndPassword(auth, email, password);

  await logAction("Login", userCred.user.uid);
  window.location.href = "dashboard.html";
}

export async function logoutUser() {
  await logAction("Logout", auth.currentUser.uid);
  await signOut(auth);
  window.location.href = "login.html";
}
