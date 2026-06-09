import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCr0SM_u0c4aEG_tT_CXWLcvd6alZJT44c",
  authDomain: "siondata22.firebaseapp.com",
  projectId: "siondata22",
  storageBucket: "siondata22.appspot.com",
  messagingSenderId: "946379205241",
  appId: "1:946379205241:web:0fe04a6246518451ee42a8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

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
      const snap = await getDoc(doc(db, "usuarios", credencial.user.uid));

      if (!snap.exists()) {
        throw new Error("Usuario no registrado en el sistema. Contactá al administrador.");
      }

      mensaje.textContent = "✅ Sesión iniciada. Redirigiendo...";
      mensaje.style.color = "green";
      setTimeout(() => { window.location.href = "dashboard.html"; }, 800);

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
