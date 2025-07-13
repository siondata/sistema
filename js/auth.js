import { auth } from './firebaseConfig.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "index.html";
  }
});

document.getElementById("logoutBtn")?.addEventListener("click", () => {
  signOut(auth);
});
