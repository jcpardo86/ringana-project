// js/calendar.js
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const SCOPES = "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events";
const API_KEY = "YOUR_API_KEY"; // No necesario si ya lo usás con Firebase Hosting
const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";

const auth = getAuth();

// Inicializa cliente de Google APIs
function initGoogleClient(token) {
  console.log("🔐 Inicializando cliente de Google API con token:", token);

  gapi.load("client", async () => {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });

    gapi.client.setToken({ access_token: token });
    console.log("✅ Cliente Google API inicializado y token asignado");
    listarEventos();
  });
}

// Obtener accessToken del usuario actual en Firebase
export async function conectarConGoogleCalendar() {
  const user = auth.currentUser;
  if (!user) return alert("Debes iniciar sesión primero");

  console.log("👤 Usuario logueado:", user.email);

  const providerData = user.providerData.find(p => p.providerId === "google.com");
  if (!providerData) {
    alert("Este usuario no está autenticado con Google");
    console.warn("⚠️ Usuario autenticado, pero no con Google:", user);
    return;
  }

  const token = (await user.getIdTokenResult()).token;
  console.log("🔑 Token de acceso Firebase obtenido");
  initGoogleClient(token);
}

// Listar eventos del calendario
function listarEventos() {
  console.log("📅 Solicitando eventos del calendario...");

  gapi.client.calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 10,
    orderBy: "startTime"
  }).then(response => {
    const eventos = response.result.items;
    const contenedor = document.getElementById("eventos");
    contenedor.innerHTML = "";

    if (!eventos.length) {
      console.log("ℹ️ No hay eventos próximos.");
      contenedor.innerHTML = "<p class='text-gray-500'>No hay eventos próximos.</p>";
      return;
    }

    console.log(`✅ ${eventos.length} evento(s) cargado(s)`);

    eventos.forEach(ev => {
      const div = document.createElement("div");
      div.className = "mb-2 p-2 border rounded";
      div.textContent = `${ev.summary} - ${ev.start.dateTime || ev.start.date}`;
      contenedor.appendChild(div);
    });
  });
}

// Crear un nuevo evento sencillo
export function crearEvento() {
  const titulo = prompt("Título del evento:");
  const fecha = prompt("Fecha (YYYY-MM-DD):");

  if (!titulo || !fecha) return;

  const evento = {
    summary: titulo,
    start: { date: fecha },
    end: { date: fecha }
  };

  console.log("🆕 Creando evento:", evento);

  gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: evento
  }).then(() => {
    alert("✅ Evento creado");
    listarEventos();
  }).catch(err => {
    console.error("❌ Error al crear evento:", err);
    alert("❌ Error al crear evento");
  });
}
