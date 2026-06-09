// js/auth.js
// Protege páginas solo para ADMIN.
// Importar en: deposito.html, totales.html, productos.html

import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function obtenerUsuario() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = "index.html";
        return;
      }
      const snap = await getDoc(doc(db, "usuarios", user.uid));
      if (!snap.exists()) {
        await signOut(auth);
        window.location.href = "index.html";
        return;
      }
      resolve({ uid: user.uid, ...snap.data() });
    });
  });
}

export async function soloAdmin() {
  const usuario = await obtenerUsuario();
  if (usuario.rol !== "admin") {
    window.location.href = "dashboard.html";
  }
  return usuario;
}

document.getElementById("logoutBtn")?.addEventListener("click", () => {
  signOut(auth).then(() => window.location.href = "index.html");
});
