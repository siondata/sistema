import { db } from './firebaseConfig.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

async function calcularTotales() {
  const snapshot = await getDocs(collection(db, "pedidos"));
  const hoy = new Date().toISOString().split("T")[0];
  let total = 0;

  snapshot.forEach(doc => {
    const data = doc.data();
    if (data.fecha.startsWith(hoy)) {
      data.productos.forEach(p => {
        total += (p.precio || 0) * p.cantidad;
      });
    }
  });

  document.getElementById("totalDia").textContent = "Total en Gs: " + total.toLocaleString();
}

calcularTotales();
