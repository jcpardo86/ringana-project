// js/recursos.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

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

// ------------------ Productos ------------------
export async function agregarProducto() {
  const nombre = document.getElementById("nuevoProducto").value;
  const puntos = parseInt(document.getElementById("puntosProducto").value) || 0;
  const mesesAviso = parseInt(document.getElementById("mesAvisoProducto").value) || 0;

  if (!nombre) return alert("Nombre requerido");

  await addDoc(collection(db, "productos"), {
    nombre,
    puntos,
    mesesAviso,
    creado: new Date()
  });

  document.getElementById("nuevoProducto").value = "";
  document.getElementById("puntosProducto").value = "";
  document.getElementById("mesAvisoProducto").value = "";
  cargarProductos();
}

export async function cargarProductos() {
  const cont = document.getElementById("productos");
  cont.innerHTML = "";
  const snapshot = await getDocs(collection(db, "productos"));

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const item = document.createElement("div");
    item.className = "flex justify-between items-center bg-white rounded p-2 border mb-2";
    item.innerHTML = `
      <span>${data.nombre} (${data.puntos} pts / aviso ${data.mesesAviso}m)</span>
      <div class="flex gap-2">
        <button onclick="editarProducto('${docSnap.id}', '${data.nombre}', ${data.puntos}, ${data.mesesAviso})">✏️</button>
        <button onclick="eliminarProducto('${docSnap.id}')">🗑️</button>
      </div>`;
    cont.appendChild(item);
  });
}

window.eliminarProducto = async (id) => {
  await deleteDoc(doc(db, "productos", id));
  cargarProductos();
};

window.editarProducto = (id, nombre, puntos, meses) => {
  const nuevoNombre = prompt("Nuevo nombre:", nombre);
  if (!nuevoNombre) return;
  const nuevosPuntos = prompt("Puntos:", puntos) || 0;
  const nuevosMeses = prompt("Meses aviso:", meses) || 0;

  updateDoc(doc(db, "productos", id), {
    nombre: nuevoNombre,
    puntos: parseInt(nuevosPuntos),
    mesesAviso: parseInt(nuevosMeses)
  }).then(cargarProductos);
};

export function toggleProductos() {
  document.getElementById("productos")?.classList.toggle("hidden");
}

// ------------------ Clientas ------------------
export async function agregarClienta() {
  const nombre = document.getElementById("nuevaClienta").value;
  if (!nombre) return alert("Nombre requerido");

  await addDoc(collection(db, "clientas"), {
    nombre,
    creado: new Date()
  });

  document.getElementById("nuevaClienta").value = "";
  cargarClientas();
}

export async function cargarClientas() {
  const cont = document.getElementById("clientas");
  cont.innerHTML = "";
  const snapshot = await getDocs(collection(db, "clientas"));

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const item = document.createElement("div");
    item.className = "flex justify-between items-center bg-white rounded p-2 border mb-2";
    item.innerHTML = `
      <span>${data.nombre}</span>
      <div class="flex gap-2">
        <button onclick="editarClienta('${docSnap.id}', '${data.nombre}')">✏️</button>
        <button onclick="eliminarClienta('${docSnap.id}')">🗑️</button>
      </div>`;
    cont.appendChild(item);
  });
}

window.eliminarClienta = async (id) => {
  await deleteDoc(doc(db, "clientas", id));
  cargarClientas();
};

window.editarClienta = (id, nombre) => {
  const nuevoNombre = prompt("Nuevo nombre:", nombre);
  if (!nuevoNombre) return;

  updateDoc(doc(db, "clientas", id), {
    nombre: nuevoNombre
  }).then(cargarClientas);
};

export function toggleClientas() {
  document.getElementById("clientas")?.classList.toggle("hidden");
}

// ------------------ Bonos ------------------
export async function agregarBono() {
  const nombre = document.getElementById("nuevoBono").value;
  if (!nombre) return alert("Nombre requerido");

  await addDoc(collection(db, "bonos"), {
    nombre,
    creado: new Date()
  });

  document.getElementById("nuevoBono").value = "";
  cargarBonos();
}

export async function cargarBonos() {
  const cont = document.getElementById("bonos");
  cont.innerHTML = "";
  const snapshot = await getDocs(collection(db, "bonos"));

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const item = document.createElement("div");
    item.className = "flex justify-between items-center bg-white rounded p-2 border mb-2";
    item.innerHTML = `
      <span>${data.nombre}</span>
      <div class="flex gap-2">
        <button onclick="editarBono('${docSnap.id}', '${data.nombre}')">✏️</button>
        <button onclick="eliminarBono('${docSnap.id}')">🗑️</button>
      </div>`;
    cont.appendChild(item);
  });
}

window.eliminarBono = async (id) => {
  await deleteDoc(doc(db, "bonos", id));
  cargarBonos();
};

window.editarBono = (id, nombre) => {
  const nuevoNombre = prompt("Nuevo nombre:", nombre);
  if (!nuevoNombre) return;

  updateDoc(doc(db, "bonos", id), {
    nombre: nuevoNombre
  }).then(cargarBonos);
};

export function toggleBonos() {
  document.getElementById("bonos")?.classList.toggle("hidden");
}

// ------------------ Socios ------------------
export async function agregarSocio() {
  const nombre = document.getElementById("nuevoSocio").value;
  if (!nombre) return alert("Nombre requerido");

  await addDoc(collection(db, "socios"), {
    nombre,
    creado: new Date()
  });

  document.getElementById("nuevoSocio").value = "";
  cargarSocios();
}

export async function cargarSocios() {
  const cont = document.getElementById("socios");
  cont.innerHTML = "";
  const snapshot = await getDocs(collection(db, "socios"));

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const item = document.createElement("div");
    item.className = "flex justify-between items-center bg-white rounded p-2 border mb-2";
    item.innerHTML = `
      <span>${data.nombre}</span>
      <div class="flex gap-2">
        <button onclick="editarSocio('${docSnap.id}', '${data.nombre}')">✏️</button>
        <button onclick="eliminarSocio('${docSnap.id}')">🗑️</button>
      </div>`;
    cont.appendChild(item);
  });
}

window.eliminarSocio = async (id) => {
  await deleteDoc(doc(db, "socios", id));
  cargarSocios();
};

window.editarSocio = (id, nombre) => {
  const nuevoNombre = prompt("Nuevo nombre:", nombre);
  if (!nuevoNombre) return;

  updateDoc(doc(db, "socios", id), {
    nombre: nuevoNombre
  }).then(cargarSocios);
};

export function toggleSocios() {
  document.getElementById("socios")?.classList.toggle("hidden");
}