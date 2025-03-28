
// ✅ Inicialización Firebase como módulo
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1D6o52R9eLzZBImfxer9QoE050XMIBys",
  authDomain: "ringana-dbc59.firebaseapp.com",
  projectId: "ringana-dbc59",
  storageBucket: "ringana-dbc59.firebasestorage.app",
  messagingSenderId: "23497738168",
  appId: "1:23497738168:web:415186e48b1d7968ce314d",
  measurementId: "G-7TKM5BCZGV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Exponer auth en window para otros módulos si se requiere
window.firebaseAuth = {
  auth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};

// ✅ Función LOGIN accesible desde HTML
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const { auth, signInWithEmailAndPassword } = window.firebaseAuth;
    await signInWithEmailAndPassword(auth, email, password);
    alert("✅ Sesión iniciada con éxito.");
    window.location.href = "/ringana-project/pages/dashboard.html";
  } catch (error) {
    alert("❌ Error al iniciar sesión: " + error.message);
  }
};

// ✅ Función REGISTRO accesible desde HTML
window.register = async function () {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  try {
    const { auth } = window.firebaseAuth;
    await createUserWithEmailAndPassword(auth, email, password);
    alert("✅ Cuenta creada con éxito para " + name);
    window.location.href = "/ringana-project/pages/dashboard.html";
  } catch (error) {
    alert("❌ Error al registrarse: " + error.message);
  }
};

// ✅ Cambiar entre Login y Registro
window.showRegister = function () {
  document.getElementById("loginContainer").classList.add("hidden");
  document.getElementById("registerContainer").classList.remove("hidden");
};

window.showLogin = function () {
  document.getElementById("registerContainer").classList.add("hidden");
  document.getElementById("loginContainer").classList.remove("hidden");
};

// ✅ Verificación automática de usuario logueado
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("👤 Usuario activo:", user.email);
  } else {
    console.log("🔒 Usuario deslogueado");
  }
});