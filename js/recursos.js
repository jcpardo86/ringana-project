import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Firebase config (igual que en otros archivos)
const firebaseConfig = {
  apiKey: "AIzaSyC1D6o52R9eLzZBImfxer9QoE050XMIBys",
  authDomain: "ringana-dbc59.firebaseapp.com",
  projectId: "ringana-dbc59",
  storageBucket: "ringana-dbc59.firebasestorage.app",
  messagingSenderId: "23497738168",
  appId: "1:23497738168:web:415186e48b1d7968ce314d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// PRODUCTOS
export async function agregarProducto() {
  const nombre = document.getElementById("nuevoProducto").value;
  const puntos = parseInt(document.getElementById("puntosProducto").value) || 0;
  const mesesAviso = parseInt(document.getElementById("mesAvisoProducto").value) || 0;

  if (!nombre) return alert("Por favor, introduce un nombre de producto.");

  try {
    await addDoc(collection(db, "productos"), {
      nombre,
      puntos,
      mesesAviso,
      creado: new Date()
    });
    alert("✅ Producto guardado");
    document.getElementById("nuevoProducto").value = "";
    document.getElementById("puntosProducto").value = "";
    document.getElementById("mesAvisoProducto").value = "";
  } catch (e) {
    console.error("Error al guardar producto:", e);
  }
}

// CLIENTAS
export async function agregarClienta() {
  const nombre = document.getElementById("nuevaClienta").value;
  if (!nombre) return alert("Introduce el nombre de la clienta.");

  try {
    await addDoc(collection(db, "clientas"), {
      nombre,
      creado: new Date()
    });
    alert("✅ Clienta guardada");
    document.getElementById("nuevaClienta").value = "";
  } catch (e) {
    console.error("Error al guardar clienta:", e);
  }
}

// SOCIOS
export async function agregarSocio() {
  const nombre = document.getElementById("nuevoSocio").value;
  if (!nombre) return alert("Introduce el nombre del socio.");

  try {
    await addDoc(collection(db, "socios"), {
      nombre,
      creado: new Date()
    });
    alert("✅ Socio guardado");
    document.getElementById("nuevoSocio").value = "";
  } catch (e) {
    console.error("Error al guardar socio:", e);
  }
}

// BONOS
export async function agregarBono() {
  const nombre = document.getElementById("nuevoBono").value;
  if (!nombre) return alert("Introduce el nombre del bono.");

  try {
    await addDoc(collection(db, "bonos"), {
      nombre,
      creado: new Date()
    });
    alert("✅ Bono guardado");
    document.getElementById("nuevoBono").value = "";
  } catch (e) {
    console.error("Error al guardar bono:", e);
  }
}

// (Opcional) toggles
export function toggleProductos() {
  document.getElementById("productos")?.classList.toggle("hidden");
}
export function toggleClientas() {
  document.getElementById("clientas")?.classList.toggle("hidden");
}
export function toggleSocios() {
  document.getElementById("socios")?.classList.toggle("hidden");
}
export function toggleBonos() {
  document.getElementById("bonos")?.classList.toggle("hidden");
}
