import { db } from './firebaseConfig.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const lista = document.getElementById('listaPedidos');

async function mostrarPedidos() {
  const snapshot = await getDocs(collection(db, "pedidos"));
  lista.innerHTML = "";
  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>Fecha:</strong> ${data.fecha}<br>
      <strong>Sucursal:</strong> ${data.sucursal}<br>
      <strong>Productos:</strong> ${data.productos.map(p => p.nombre + " x" + p.cantidad).join(", ")}<br>
      <strong>Comentarios:</strong> ${data.comentarios || "N/A"}<hr>
    `;
    lista.appendChild(div);
  });
}

mostrarPedidos();
