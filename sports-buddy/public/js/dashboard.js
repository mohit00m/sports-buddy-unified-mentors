import { auth, db } from "./firebase-config.js";
import { logoutUser } from "./auth.js";

import {
  collection,
  getDocs,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const totalEventsEl = document.getElementById("totalEvents");
const totalUsersEl = document.getElementById("totalUsers");
const userSection = document.getElementById("userSection");
const adminSection = document.getElementById("adminSection");
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", logoutUser);

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  try {

    // Get user data
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.data();

    userSection.innerHTML = `
      <p>Welcome, <strong>${userData.name}</strong></p>
      <button onclick="location.href='events.html'">
        View Events
      </button>
    `;

    // Load Stats
    loadStats();

    // Admin Panel
    if (userData.role === "admin") {
      adminSection.innerHTML = `
        <button onclick="location.href='events.html'">
          Manage Events
        </button>
      `;
    }

  } catch (error) {
    console.error("Dashboard Error:", error);
  }

});

// Load Stats
async function loadStats() {

  const eventsSnapshot = await getDocs(collection(db, "events"));
  const usersSnapshot = await getDocs(collection(db, "users"));

  totalEventsEl.textContent = eventsSnapshot.size;
  totalUsersEl.textContent = usersSnapshot.size;
}
