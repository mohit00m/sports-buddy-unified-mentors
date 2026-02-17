import { db, auth } from "./firebase-config.js";
import { collection, addDoc, getDocs, deleteDoc, doc }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { logAction } from "./logger.js";

// ADD EVENT
window.addEvent = async function () {
    const name = document.getElementById("eventName").value;
    const city = document.getElementById("city").value;
    const date = document.getElementById("date").value;

    const user = auth.currentUser;

    await addDoc(collection(db, "events"), {
        name,
        city,
        date,
        createdBy: user.uid
    });

    await logAction(user.uid, "Event Created");

    alert("Event Added");
    loadEvents();
};

// LOAD EVENTS
async function loadEvents() {
    const querySnapshot = await getDocs(collection(db, "events"));
    let html = "";

    querySnapshot.forEach((docItem) => {
        html += `
            <p>${docItem.data().name} - ${docItem.data().city}
            <button onclick="deleteEvent('${docItem.id}')">Delete</button>
            </p>`;
    });

    document.getElementById("eventsList").innerHTML = html;
}

window.deleteEvent = async function (id) {
    await deleteDoc(doc(db, "events", id));
    alert("Deleted");
    loadEvents();
};

loadEvents();
