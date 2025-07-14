// js/login.js

import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { auth } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const mensaje = document.getElementById('mensaje');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email')?.value.trim();
    const password = document.getElementById('password')?.value;

    if (!email || !password) {
      mensaje.textContent = "Completa todos los campos.";
      mensaje.style.color = "red";
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      mensaje.textContent = "Inicio de sesión exitoso.";
      mensaje.style.color = "green";
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    } catch (error) {
      mensaje.textContent = "Error: " + error.message;
      mensaje.style.color = "red";
    }
  });
});


