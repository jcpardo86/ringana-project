import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1D6o52R9eLzZBImfxer9QoE050XMIBys",
  authDomain: "ringana-dbc59.firebaseapp.com",
  projectId: "ringana-dbc59",
  storageBucket: "ringana-dbc59.appspot.com",
  messagingSenderId: "23497738168",
  appId: "1:23497738168:web:415186e48b1d7968ce314d",
  measurementId: "G-7TKM5BCZGV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

// LOGIN
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("✅ Bienvenido");
    window.location.href = "/private/dashboard.html";
  } catch (error) {
    alert("❌ Error al iniciar sesión: " + error.message);
  }
});

// REGISTRO
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const file = document.getElementById("regProfilePic").files[0];

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    let photoURL = "";
    if (file) {
      const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
      await uploadBytes(storageRef, file);
      photoURL = await getDownloadURL(storageRef);
    }

    await updateProfile(user, {
      displayName: name,
      photoURL
    });

    alert("✅ Registro exitoso");
    window.location.href = "/private/dashboard.html";
  } catch (error) {
    alert("❌ Error al registrarse: " + error.message);
  }
});

// Mostrar/Ocultar formularios
window.showRegister = function () {
  document.getElementById("loginContainer").classList.add("hidden");
  document.getElementById("registerContainer").classList.remove("hidden");
};

window.showLogin = function () {
  document.getElementById("registerContainer").classList.add("hidden");
  document.getElementById("loginContainer").classList.remove("hidden");
};

// Verifica sesión activa
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("👤 Sesión activa:", user.displayName || user.email);
  }
});
