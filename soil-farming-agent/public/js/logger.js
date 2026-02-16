import { db } from "./firebase-config.js";
import { collection, addDoc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function logAction(action, uid) {
  await addDoc(collection(db, "logs"), {
    action,
    uid,
    timestamp: new Date()
  });
}
