// js/calendar.js
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const SCOPES = "https://www.googleapis.com/auth/calendar.events";
const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const CLIENT_ID = "309599233403-h8r78g25tpul9qdu50u8l396g5bbujas.apps.googleusercontent.com"; // ✅ Reemplazado con el real

const auth = getAuth();

function listarEventos() {
  console.log("📅 Cargando eventos...");

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

export async function conectarConGoogleCalendar() {
  const user = auth.currentUser;
  if (!user) return alert("Debes iniciar sesión primero");

  console.log("👤 Usuario logueado:", user.email);

  gapi.load("client:auth2", async () => {
    await gapi.client.init({
      discoveryDocs: [DISCOVERY_DOC],
      clientId: CLIENT_ID,
      scope: SCOPES
    });

    const authInstance = gapi.auth2.getAuthInstance();
    if (!authInstance.isSignedIn.get()) {
      await authInstance.signIn();
    }

    console.log("✅ Autenticado con Google Calendar");
    listarEventos();
  });
}

export function crearEvento() {
  const clienta = document.getElementById("clienta").value;
  const fecha = document.getElementById("fecha").value;
  const horaInicio = document.getElementById("horaInicio").value;
  const horaFin = document.getElementById("horaFin").value;

  if (!clienta || !fecha || !horaInicio || !horaFin) {
    alert("Todos los campos son obligatorios");
    return;
  }

  const inicio = new Date(`${fecha}T${horaInicio}:00`);
  const fin = new Date(`${fecha}T${horaFin}:00`);

  const evento = {
    summary: `Cita con ${clienta}`,
    start: { dateTime: inicio.toISOString() },
    end: { dateTime: fin.toISOString() }
  };

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

window.crearEvento = crearEvento;
window.conectarConGoogleCalendar = conectarConGoogleCalendar;
