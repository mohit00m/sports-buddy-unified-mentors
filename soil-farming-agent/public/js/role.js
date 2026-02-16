import { auth, db } from "./firebase-config.js";
import { doc, getDoc }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function isAdmin() {
  const user = auth.currentUser;
  const docSnap = await getDoc(doc(db, "users", user.uid));
  return docSnap.data().role === "admin";
}
