// firebase-auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
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

// Exponer funciones globales
window.login = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("✅ Sesión iniciada con éxito.");
    window.location.href = "/ringana-project/pages/dashboard.html";
  } catch (error) {
    alert("❌ Error al iniciar sesión: " + error.message);
  }
};

window.register = async function () {
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
      photoURL: photoURL || null
    });

    alert("✅ Cuenta creada con éxito.");
    window.location.href = "/ringana-project/pages/dashboard.html";
  } catch (error) {
    alert("❌ Error al registrarse: " + error.message);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("👤 Usuario activo:", user.displayName || user.email);
  } else {
    console.log("🔒 Usuario deslogueado");
  }
});
