// js/firebase-auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1D6o52R9eLzZBImfxer9QoE050XMIBys",
  authDomain: "ringana-dbc59.firebaseapp.com",
  projectId: "ringana-dbc59",
  storageBucket: "ringana-dbc59.firebasestorage.app",
  messagingSenderId: "23497738168",
  appId: "1:23497738168:web:415186e48b1d7968ce314d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert("❌ Error al iniciar sesión: " + error.message);
  }
};

window.logout = async function () {
  await signOut(auth);
};

onAuthStateChanged(auth, user => {
  const loginContainer = document.getElementById("loginContainer");
  const appContainer = document.getElementById("appContainer");
  const logoutButton = document.getElementById("logoutButton");
  const menuContainer = document.getElementById("menu-container");
  const welcomeMessage = document.getElementById("welcomeMessage");

  if (user) {
    loginContainer?.classList.add("hidden");
    appContainer?.classList.remove("hidden");
    logoutButton?.classList.remove("hidden");

    // Mostrar mensaje de bienvenida
    if (welcomeMessage) {
      const name = user.displayName || user.email || "Usuario";
      welcomeMessage.textContent = `Bienvenid@ ${name}`;
      welcomeMessage.classList.remove("hidden");
    }

    // Cargar el menú dinámico
    fetch("pages/modulos/menu.html")
      .then(res => res.text())
      .then(html => {
        if (menuContainer) menuContainer.innerHTML = html;
        import("./menu-highlight.js").then(module => module.highlightActiveMenu());
      })
      .catch(error => console.error("No se pudo cargar el menú:", error));

  } else {
    loginContainer?.classList.remove("hidden");
    appContainer?.classList.add("hidden");
    logoutButton?.classList.add("hidden");

    // Ocultar mensaje de bienvenida
    if (welcomeMessage) {
      welcomeMessage.textContent = '';
      welcomeMessage.classList.add("hidden");
    }

    if (menuContainer) menuContainer.innerHTML = '';
  }
});
