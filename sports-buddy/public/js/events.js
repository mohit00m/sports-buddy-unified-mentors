import { showToast } from "./utils.js";
import { showLoader, hideLoader } from "./utils.js";

import { db, auth } from "./firebase-config.js";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const eventNameInput = document.getElementById("eventName");
const cityInput = document.getElementById("city");
const areaInput = document.getElementById("area");
const eventDateInput = document.getElementById("eventDate");
const addEventBtn = document.getElementById("addEventBtn");
const eventList = document.getElementById("eventList");
const totalEventsEl = document.getElementById("totalEvents");

let editId = null;
let currentUserRole = null;

// ================= AUTH CHECK =================
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const userDoc = await getDoc(doc(db, "users", user.uid));
  currentUserRole = userDoc.data().role;

  loadEvents(); // Load after role is known
});

// ================= ADD / UPDATE EVENT =================
addEventBtn.addEventListener("click", async () => {

  const name = eventNameInput.value.trim();
  const city = cityInput.value.trim();
  const area = areaInput.value.trim();
  const date = eventDateInput.value;

  if (!name || !city || !area || !date) {
    alert("Please fill all fields");
    return;
  }

  try {

    if (editId) {

      await updateDoc(doc(db, "events", editId), {
        name,
        city,
        area,
        date
      });

      editId = null;
      addEventBtn.textContent = "Add Event";

    } else {

      await addDoc(collection(db, "events"), {
        name,
        city,
        area,
        date,
        createdAt: new Date()
      });

    }

    clearForm();

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong");
  }

});

// ================= REAL-TIME LOAD EVENTS =================
function loadEvents() {

  onSnapshot(collection(db, "events"), (snapshot) => {

    eventList.innerHTML = "";
    totalEventsEl.textContent = snapshot.size;

    if (snapshot.empty) {
      eventList.innerHTML = "<p>No events available.</p>";
      return;
    }

    snapshot.forEach((docSnap) => {

      const data = docSnap.data();

      const li = document.createElement("li");

      const infoDiv = document.createElement("div");
      infoDiv.classList.add("event-info");
      infoDiv.innerHTML = `
        <strong>${data.name}</strong><br>
        ${data.city} | ${data.area} | ${data.date}
      `;

      const actionsDiv = document.createElement("div");
      actionsDiv.classList.add("event-actions");

      // Only Admin can edit/delete
      if (currentUserRole === "admin") {

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

        editBtn.onclick = () => {
          eventNameInput.value = data.name;
          cityInput.value = data.city;
          areaInput.value = data.area;
          eventDateInput.value = data.date;

          editId = docSnap.id;
          addEventBtn.textContent = "Update Event";
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.onclick = async () => {
          if (confirm("Are you sure?")) {
            await deleteDoc(doc(db, "events", docSnap.id));
          }
        };

        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);
      }

      li.appendChild(infoDiv);
      li.appendChild(actionsDiv);

      eventList.appendChild(li);

    });

  });
}

// ================= CLEAR FORM =================
function clearForm() {
  eventNameInput.value = "";
  cityInput.value = "";
  areaInput.value = "";
  eventDateInput.value = "";
}
if (!eventName || !city || !date) {
  showToast("All fields are required", "error");
  return;
}
