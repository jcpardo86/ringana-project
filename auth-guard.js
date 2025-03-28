import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

// Tu configuración de Firebase (misma que usás en otros archivos)
const firebaseConfig = {
  apiKey: "AIzaSyC1D6o52R9eLzZBImfxer9QoE050XMIBys",
  authDomain: "ringana-dbc59.firebaseapp.com",
  projectId: "ringana-dbc59",
  storageBucket: "ringana-dbc59.firebasestorage.app",
  messagingSenderId: "23497738168",
  appId: "1:23497738168:web:415186e48b1d7968ce314d",
  measurementId: "G-7TKM5BCZGV"
};

// Inicializar Firebase (solo si no está ya inicializado)
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (e) {
  console.warn("Firebase ya estaba inicializado");
}

const auth = getAuth();

// Protege TODAS las páginas donde se incluya este script
onAuthStateChanged(auth, (user) => {
  const isLoginPage = window.location.pathname.endsWith("/pages/modulos/login.html");

  if (!user && !isLoginPage) {
    // Redirigir si no está logado y no está en login
    window.location.href = "/ringana-project/pages/modulos/login.html";
  }

  if (user && isLoginPage) {
    // Si está logado y trata de ir al login, lo mandamos al home
    window.location.href = "/ringana-project/index.html";
  }
});
