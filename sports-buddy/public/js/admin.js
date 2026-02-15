import { auth, db } from "./firebase-config.js";
import { logoutUser } from "./auth.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  collection,
  addDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// ================= ADMIN PROTECTION =================

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const userDoc = await getDoc(doc(db, "users", user.uid));

  if (!userDoc.exists() || userDoc.data().role !== "admin") {
    alert("Access Denied - Admin Only");
    window.location.href = "dashboard.html";
  }

});


// ================= ADD CATEGORY =================

document.getElementById("addCategoryBtn")
  .addEventListener("click", async () => {

    const user = auth.currentUser;
    if (!user) return alert("Not Logged In");

    const name = document.getElementById("categoryName").value;

    if (!name) {
      alert("Enter category name");
      return;
    }

    await addDoc(collection(db, "categories"), {
      name,
      createdBy: user.uid,
      createdAt: new Date()
    });

    alert("Category Added");
    document.getElementById("categoryName").value = "";
});


// ================= ADD CITY =================

document.getElementById("addCityBtn")
  .addEventListener("click", async () => {

    const user = auth.currentUser;
    if (!user) return alert("Not Logged In");

    const name = document.getElementById("cityName").value;

    if (!name) {
      alert("Enter city name");
      return;
    }

    await addDoc(collection(db, "cities"), {
      name,
      createdBy: user.uid,
      createdAt: new Date()
    });

    alert("City Added");
    document.getElementById("cityName").value = "";
});


// ================= ADD AREA =================

document.getElementById("addAreaBtn")
  .addEventListener("click", async () => {

    const user = auth.currentUser;
    if (!user) return alert("Not Logged In");

    const name = document.getElementById("areaName").value;

    if (!name) {
      alert("Enter area name");
      return;
    }

    await addDoc(collection(db, "areas"), {
      name,
      createdBy: user.uid,
      createdAt: new Date()
    });

    alert("Area Added");
    document.getElementById("areaName").value = "";
});


// ================= LOGOUT =================

document.getElementById("logoutBtn")
  .addEventListener("click", logoutUser);
