// js/logger.js

import { db } from "./firebase-config.js";
import { collection, addDoc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function logAction(action, userId) {
  try {
    await addDoc(collection(db, "logs"), {
      action: action,
      userId: userId,
      timestamp: new Date()
    });
  } catch (error) {
    console.error("Logging Error:", error);
  }
}
