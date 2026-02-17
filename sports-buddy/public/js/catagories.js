import { db, auth } from "../firebase-config.js";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { requireAdmin } from "./adminGuard.js";
import { logAction } from "../utils/logger.js";
import { validateText } from "../utils/validator.js";

requireAdmin();

const input = document.getElementById("categoryName");
const btn = document.getElementById("addCategoryBtn");
const list = document.getElementById("categoryList");

let editId = null;

async function loadCategories() {
  list.innerHTML = "";
  const snapshot = await getDocs(collection(db, "categories"));

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const li = document.createElement("li");
    li.textContent = data.name;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      input.value = data.name;
      editId = docSnap.id;
      btn.textContent = "Update";
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = async () => {
      await deleteDoc(doc(db, "categories", docSnap.id));
      await logAction(auth.currentUser.uid, "Deleted Category", "Admin");
      loadCategories();
    };

    li.appendChild(editBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

btn.addEventListener("click", async () => {

  const name = input.value.trim();
  if (!validateText(name, "Category")) return;

  const user = auth.currentUser;

  if (editId) {
    await updateDoc(doc(db, "categories", editId), { name });
    await logAction(user.uid, "Updated Category", "Admin");
    editId = null;
    btn.textContent = "Add Category";
  } else {

    const q = query(collection(db, "categories"), where("name", "==", name));
    const existing = await getDocs(q);

    if (!existing.empty) {
      alert("Category already exists!");
      return;
    }

    await addDoc(collection(db, "categories"), { name });
    await logAction(user.uid, "Created Category", "Admin");
  }

  input.value = "";
  loadCategories();
});

loadCategories();
