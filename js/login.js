document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const mensaje = document.getElementById('mensaje');

  if (!form) {
    console.error("Formulario con id='login-form' no encontrado.");
    return;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email')?.value.trim();
    const password = document.getElementById('password')?.value;

    // Validación básica
    if (!email || !password) {
      mensaje.textContent = "Todos los campos son obligatorios.";
      mensaje.style.color = "red";
      return;
    }

    // Simulación de autenticación (ejemplo)
    if (email === "admin@sion.com" && password === "1234") {
      mensaje.textContent = "Inicio de sesión exitoso.";
      mensaje.style.color = "green";

      // Redireccionar luego de 1 segundo
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    } else {
      mensaje.textContent = "Correo o contraseña incorrectos.";
      mensaje.style.color = "red";
    }
  });
});

