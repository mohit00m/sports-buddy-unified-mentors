import { auth, db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const list = document.getElementById("soilList");
const addBtn = document.getElementById("addSoilBtn");

addBtn?.addEventListener("click", async () => {
  await addDoc(collection(db, "soils"), {
    name: document.getElementById("soilName").value,
    description: document.getElementById("soilDesc").value
  });

  document.getElementById("soilName").value = "";
  document.getElementById("soilDesc").value = "";
  load();
});

async function load() {
  list.innerHTML = "";
  const snap = await getDocs(collection(db, "soils"));

  snap.forEach((docSnap) => {
    const data = docSnap.data();

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${data.name}</strong> - ${data.description}
    `;

    // Delete Button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = async () => {
      await deleteDoc(doc(db, "soils", docSnap.id));
      load();
    };

    // Update Button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = async () => {
      const newName = prompt("Enter new soil name:", data.name);
      const newDesc = prompt("Enter new description:", data.description);

      if (newName && newDesc) {
        await updateDoc(doc(db, "soils", docSnap.id), {
          name: newName,
          description: newDesc
        });
        load();
      }
    };

    li.appendChild(editBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

load();
