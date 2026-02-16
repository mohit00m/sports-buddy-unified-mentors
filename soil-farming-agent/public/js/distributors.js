import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const list = document.getElementById("distList");
const btn = document.getElementById("addDistBtn");

btn?.addEventListener("click", async () => {
  await addDoc(collection(db, "distributors"), {
    name: document.getElementById("distName").value,
    contact: document.getElementById("distContact").value
  });

  document.getElementById("distName").value = "";
  document.getElementById("distContact").value = "";
  load();
});

async function load() {
  list.innerHTML = "";
  const snap = await getDocs(collection(db, "distributors"));

  snap.forEach((docSnap) => {
    const data = docSnap.data();

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${data.name}</strong> - ${data.contact}
    `;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = async () => {
      await deleteDoc(doc(db, "distributors", docSnap.id));
      load();
    };

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = async () => {
      const newName = prompt("Enter new name:", data.name);
      const newContact = prompt("Enter new contact:", data.contact);

      if (newName && newContact) {
        await updateDoc(doc(db, "distributors", docSnap.id), {
          name: newName,
          contact: newContact
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
