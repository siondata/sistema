// js/login.js
import { auth, db } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const mensaje = document.getElementById('mensaje');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
      mensaje.textContent = "Completá todos los campos.";
      mensaje.style.color = "red";
      return;
    }

    const btnSubmit = form.querySelector('button[type="submit"]');
    btnSubmit.disabled = true;
    btnSubmit.textContent = "Ingresando...";

    try {
      const credencial = await signInWithEmailAndPassword(auth, email, password);
      const uid = credencial.user.uid;

      // Leer el rol del usuario desde Firestore
      const snap = await getDoc(doc(db, "usuarios", uid));
      if (!snap.exists()) {
        throw new Error("Usuario no registrado en el sistema. Contactá al administrador.");
      }

      mensaje.textContent = "✅ Sesión iniciada. Redirigiendo...";
      mensaje.style.color = "green";

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 800);

    } catch (error) {
      let msg = "Error al iniciar sesión.";
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        msg = "Correo o contraseña incorrectos.";
      } else if (error.code === "auth/too-many-requests") {
        msg = "Demasiados intentos fallidos. Intentá más tarde.";
      } else if (error.message) {
        msg = error.message;
      }
      mensaje.textContent = "❌ " + msg;
      mensaje.style.color = "red";
      btnSubmit.disabled = false;
      btnSubmit.textContent = "Iniciar sesión";
    }
  });
});
