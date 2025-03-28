// js/calendar.js
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const SCOPES = "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events";
const API_KEY = "YOUR_API_KEY"; // No necesario si ya lo usás con Firebase Hosting
const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";

const auth = getAuth();

// Inicializa cliente de Google APIs
function initGoogleClient(token) {
  gapi.load("client", async () => {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });

    gapi.client.setToken({ access_token: token });
    listarEventos();
  });
}

// Obtener accessToken del usuario actual en Firebase
export async function conectarConGoogleCalendar() {
  const user = auth.currentUser;
  if (!user) return alert("Debes iniciar sesión primero");

  const tokenResult = await user.getIdTokenResult();

  const credential = GoogleAuthProvider.credential(null, tokenResult.token);

  user.getIdToken(true).then(idToken => {
    user.getIdTokenResult().then(() => {
      user.reload().then(() => {
        user.getIdToken().then(() => {
          user.getIdTokenResult().then(() => {
            user.reload();
          });
        });
      });
    });
  });

  const providerData = user.providerData.find(p => p.providerId === "google.com");
  if (!providerData) {
    alert("Este usuario no está autenticado con Google");
    return;
  }

  const token = (await user.getIdTokenResult()).claims.firebase?.identities?.["google.com"]?.[0];

  if (!token) {
    alert("No se encontró token de Google válido");
    return;
  }

  initGoogleClient(token);
}

// Listar eventos del calendario
function listarEventos() {
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
      contenedor.innerHTML = "<p class='text-gray-500'>No hay eventos próximos.</p>";
      return;
    }

    eventos.forEach(ev => {
      const div = document.createElement("div");
      div.className = "mb-2 p-2 border rounded";
      div.textContent = `${ev.summary} - ${ev.start.dateTime || ev.start.date}`;
      contenedor.appendChild(div);
    });
  });
}
