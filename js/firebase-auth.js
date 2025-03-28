import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

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

// LOGIN
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert("❌ Error al iniciar sesión: " + error.message);
  }
};

// LOGOUT
window.logout = async function () {
  await signOut(auth);
};

// REGISTRO
window.register = async function () {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });

    window.location.href = "/ringana-project/index.html";
  } catch (error) {
    alert("❌ Error al registrar: " + error.message);
  }
};

// MOSTRAR FORMULARIO DE REGISTRO
window.showRegister = () => {
  document.getElementById("loginContainer")?.classList.add("hidden");
  document.getElementById("registerContainer")?.classList.remove("hidden");
};

// VOLVER A LOGIN
window.showLogin = () => {
  document.getElementById("registerContainer")?.classList.add("hidden");
  document.getElementById("loginContainer")?.classList.remove("hidden");
};

// CONTROL DE SESIÓN Y CARGA DEL MENÚ
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

    // Mostrar mensaje de bienvenida con nombre limpio
    if (welcomeMessage) {
      let name = "Usuario";

      if (user.displayName) {
        name = user.displayName;
      } else if (user.email) {
        name = user.email.split("@")[0];
      }

      welcomeMessage.textContent = `Bienvenid@ ${name}`;
      welcomeMessage.classList.remove("hidden");
    }

    // Cargar menú desde la raíz del sitio
    fetch("/ringana-project/pages/modulos/menu.html")
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

    if (welcomeMessage) {
      welcomeMessage.textContent = '';
      welcomeMessage.classList.add("hidden");
    }

    if (menuContainer) menuContainer.innerHTML = '';
  }
});
