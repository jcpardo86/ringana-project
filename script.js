"use strict";

// --------------------------- VARIABLES GLOBALES ---------------------------
let productos = JSON.parse(localStorage.getItem('productos')) || [];
let clientas = JSON.parse(localStorage.getItem('clientas')) || [];
let bonos = JSON.parse(localStorage.getItem('bonos')) || [];
let ventas = JSON.parse(localStorage.getItem('ventas')) || [];
let socios = JSON.parse(localStorage.getItem('socios')) || [];
let puntos = JSON.parse(localStorage.getItem('puntos')) || [];
let periodos = JSON.parse(localStorage.getItem('periodos')) || [];
let orden = 'reciente'; // Orden por defecto

// --------------------------- UTILIDADES ---------------------------
function guardarLocalStorage() {
  localStorage.setItem('productos', JSON.stringify(productos));
  localStorage.setItem('clientas', JSON.stringify(clientas));
  localStorage.setItem('bonos', JSON.stringify(bonos));
  localStorage.setItem('ventas', JSON.stringify(ventas));
  localStorage.setItem('socios', JSON.stringify(socios));
  localStorage.setItem('puntos', JSON.stringify(puntos));
  localStorage.setItem('periodos', JSON.stringify(periodos));
}

function borrarLocalStorage() {
  if (confirm("¿Estás seguro de que deseas borrar todos los datos guardados?")) {
    localStorage.clear();
    alert("Todos los datos han sido borrados.");
    location.reload();
  }
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - (window.innerHeight / 2) + (section.offsetHeight / 2);
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --------------------------- GESTIÓN DE PRODUCTOS ---------------------------
function mostrarProductos() {
  const contenedor = document.getElementById('productos');
  if (!contenedor) return;
  contenedor.innerHTML = '';

  productos.forEach((producto, index) => {
    const div = document.createElement('div');
    div.className = 'flex flex-wrap gap-4 items-center mb-2';

    div.innerHTML = `
      <span id="productoRec-span-${index}" class="flex-1">${producto.nombre}</span>
      <input id="productoRec-input-${index}" type="text" value="${producto.nombre}" class="flex-1 p-1 border rounded hidden" />
      <span id="puntosRec-span-${index}" class="w-24 text-center">${producto.puntos}</span>
      <input id="puntosRec-input-${index}" type="number" min="0" value="${producto.puntos}" class="w-24 p-1 border rounded hidden" />
      <span id="mesAvisoRec-span-${index}" class="w-36 text-center">${producto.mesesAviso || 0}</span>
      <input id="mesAvisoRec-input-${index}" type="number" min="0" value="${producto.mesesAviso || 0}" class="w-36 p-1 border rounded hidden" />
      <button id="editarProductoRec-${index}" onclick="editarProducto(${index})" class="p-1 px-3 bg-yellow-400 text-white rounded hover:bg-yellow-500">✏️</button>
      <button id="guardarProductoRec-${index}" onclick="guardarProducto(${index})" class="p-1 px-3 bg-green-500 text-white rounded hover:bg-green-600 hidden">💾</button>
    `;

    contenedor.appendChild(div);
  });
}



function agregarProducto() {
  const nuevoProducto = document.getElementById('nuevoProducto')?.value.trim();
  const puntosProducto = parseInt(document.getElementById('puntosProducto')?.value, 10);
  const mesAviso = parseInt(document.getElementById('mesAvisoProducto')?.value, 10);
  if (!nuevoProducto) {
    alert("El nombre del producto no puede estar vacío.");
    return;
  }
  if (isNaN(puntosProducto) || puntosProducto < 0) {
    alert("Por favor, introduce un valor válido para los puntos.");
    return;
  }
  if (productos.find(p => p.nombre.toLowerCase() === nuevoProducto.toLowerCase())) {
    alert("Este producto ya existe. Intenta con otro nombre.");
    return;
  }
  productos.push({ 
    nombre: nuevoProducto, 
    puntos: puntosProducto, 
    mesesAviso: isNaN(mesAviso) ? 0 : mesAviso 
  });
  
  if (document.getElementById('nuevoProducto')) document.getElementById('nuevoProducto').value = '';
  if (document.getElementById('puntosProducto')) document.getElementById('puntosProducto').value = '';
  if (document.getElementById('mesAvisoProducto')) document.getElementById('mesAvisoProducto').value = '';
  guardarLocalStorage();
  mostrarProductos();
}

function eliminarProducto(index) {
  if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
    productos.splice(index, 1);
    guardarLocalStorage();
    mostrarProductos();
  }
}

function editarProducto(index) {
  document.getElementById(`productoRec-span-${index}`).classList.add('hidden');
  document.getElementById(`puntosRec-span-${index}`).classList.add('hidden');
  document.getElementById(`mesAvisoRec-span-${index}`).classList.add('hidden'); // ← Nuevo

  document.getElementById(`productoRec-input-${index}`).classList.remove('hidden');
  document.getElementById(`puntosRec-input-${index}`).classList.remove('hidden');
  document.getElementById(`mesAvisoRec-input-${index}`).classList.remove('hidden'); // ← Nuevo

  document.getElementById(`editarProductoRec-${index}`).classList.add('hidden');
  document.getElementById(`guardarProductoRec-${index}`).classList.remove('hidden');
}

function guardarProducto(index) {
  const nuevoNombre = document.getElementById(`productoRec-input-${index}`).value.trim();
  const nuevosPuntos = parseInt(document.getElementById(`puntosRec-input-${index}`).value, 10);
  const nuevosMesesAviso = parseInt(document.getElementById(`mesAvisoRec-input-${index}`).value, 10); // ← Nuevo

  if (!nuevoNombre || isNaN(nuevosPuntos) || nuevosPuntos < 0 || isNaN(nuevosMesesAviso) || nuevosMesesAviso < 0) {
    alert("Por favor, completa correctamente todos los campos.");
    return;
  }

  if (productos.find((producto, i) => i !== index && producto.nombre.toLowerCase() === nuevoNombre.toLowerCase())) {
    alert("Ya existe un producto con este nombre. Usa un nombre diferente.");
    return;
  }

  productos[index] = {
    nombre: nuevoNombre,
    puntos: nuevosPuntos,
    mesesAviso: nuevosMesesAviso // ← Nuevo
  };

  guardarLocalStorage();
  mostrarProductos();
}


function actualizarSelectProductos() {
  const selectProductos = document.getElementById('selectProductos');
  if (!selectProductos) return;
  selectProductos.innerHTML = '';
  productos.forEach(producto => {
    selectProductos.innerHTML += `<option value="${producto.nombre}">${producto.nombre}</option>`;
  });
}

// --------------------------- GESTIÓN DE CLIENTAS ---------------------------
function mostrarClientas() {
  const divClientas = document.getElementById('clientas');
  if (!divClientas) return;
  divClientas.innerHTML = '';
  clientas.forEach((clienta, index) => {
    divClientas.innerHTML += `
      <div class="flex items-center justify-between">
        <span id="clientaRec-span-${index}">${clienta}</span>
        <input type="text" value="${clienta}" id="clientaRec-input-${index}" class="border p-2 hidden">
        <div>
          <button class="icon-button" id="editarClientaRec-${index}" onclick="editarClienta(${index})">✏️</button>
          <button class="icon-button hidden" id="guardarClientaRec-${index}" onclick="guardarClienta(${index})">💾</button>
          <button class="icon-button" onclick="eliminarClienta(${index})">❌</button>
        </div>
      </div>
    `;
  });
  actualizarSelectClientas();
}

function agregarClienta() {
  const nuevaClienta = document.getElementById('nuevaClienta')?.value.trim();
  if (!nuevaClienta) {
    alert("El nombre de la clienta no puede estar vacío.");
    return;
  }
  if (clientas.find(clienta => clienta.toLowerCase() === nuevaClienta.toLowerCase())) {
    alert("Esta clienta ya existe. Intenta con otro nombre.");
    return;
  }
  clientas.push(nuevaClienta);
  if (document.getElementById('nuevaClienta')) document.getElementById('nuevaClienta').value = '';
  guardarLocalStorage();
  mostrarClientas();
}

function editarClienta(index) {
  document.getElementById(`clientaRec-span-${index}`).classList.add('hidden');
  document.getElementById(`clientaRec-input-${index}`).classList.remove('hidden');
  document.getElementById(`editarClientaRec-${index}`).classList.add('hidden');
  document.getElementById(`guardarClientaRec-${index}`).classList.remove('hidden');
}

function guardarClienta(index) {
  const nuevaClienta = document.getElementById(`clientaRec-input-${index}`).value.trim();
  if (!nuevaClienta) {
    alert("El nombre de la clienta no puede estar vacío.");
    return;
  }
  if (clientas.find((clienta, i) => i !== index && clienta.toLowerCase() === nuevaClienta.toLowerCase())) {
    alert("Ya existe una clienta con este nombre. Usa un nombre diferente.");
    return;
  }
  clientas[index] = nuevaClienta;
  guardarLocalStorage();
  const spanElement = document.getElementById(`clientaRec-span-${index}`);
  const inputElement = document.getElementById(`clientaRec-input-${index}`);
  spanElement.textContent = nuevaClienta;
  spanElement.classList.remove('hidden');
  document.getElementById(`guardarClientaRec-${index}`).classList.add('hidden');
  document.getElementById(`editarClientaRec-${index}`).classList.remove('hidden');
  actualizarSelectClientas();
}

function eliminarClienta(index) {
  if (confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
    clientas.splice(index, 1);
    guardarLocalStorage();
    mostrarClientas();
  }
}

function actualizarSelectClientas() {
  const selectClientas = document.getElementById('selectClientas');
  if (!selectClientas) return;
  selectClientas.innerHTML = '';
  clientas.forEach(clienta => {
    selectClientas.innerHTML += `<option value="${clienta}">${clienta}</option>`;
  });
}

// --------------------------- GESTIÓN DE BONOS ---------------------------
function mostrarBonos() {
  const divBonos = document.getElementById('bonos');
  if (!divBonos) return;
  divBonos.innerHTML = '';
  bonos.forEach((bono, index) => {
    divBonos.innerHTML += `
      <div class="flex items-center justify-between">
        <span id="bonoRec-span-${index}">${bono}</span>
        <input type="text" value="${bono}" id="bonoRec-input-${index}" class="border p-2 hidden">
        <div>
          <button class="icon-button" id="editarBonoRec-${index}" onclick="editarBonoRec(${index})">✏️</button>
          <button class="icon-button hidden" id="guardarBonoRec-${index}" onclick="guardarBonoRec(${index})">💾</button>
          <button class="icon-button" onclick="eliminarBono(${index})">❌</button>
        </div>
      </div>
    `;
  });
  actualizarSelectBonos();
}

function agregarBono() {
  const nuevoBono = document.getElementById('nuevoBono')?.value.trim();
  if (!nuevoBono) {
    alert("El nombre del bono no puede estar vacío.");
    return;
  }
  if (bonos.find(b => b.toLowerCase() === nuevoBono.toLowerCase())) {
    alert("Este bono ya existe. Intenta con otro nombre.");
    return;
  }
  bonos.push(nuevoBono);
  if (document.getElementById('nuevoBono')) document.getElementById('nuevoBono').value = '';
  guardarLocalStorage();
  mostrarBonos();
}

function editarBonoRec(index) {
  document.getElementById(`bonoRec-span-${index}`).classList.add('hidden');
  document.getElementById(`bonoRec-input-${index}`).classList.remove('hidden');
  document.getElementById(`editarBonoRec-${index}`).classList.add('hidden');
  document.getElementById(`guardarBonoRec-${index}`).classList.remove('hidden');
}

function guardarBonoRec(index) {
  const nuevoBono = document.getElementById(`bonoRec-input-${index}`).value.trim();
  if (!nuevoBono) {
    alert("El bono no puede estar vacío.");
    return;
  }
  if (bonos.find((bono, i) => i !== index && bono.toLowerCase() === nuevoBono.toLowerCase())) {
    alert("Ya existe un bono con este nombre. Usa un nombre diferente.");
    return;
  }
  bonos[index] = nuevoBono;
  guardarLocalStorage();
  const spanElement = document.getElementById(`bonoRec-span-${index}`);
  spanElement.textContent = nuevoBono;
  spanElement.classList.remove('hidden');
  document.getElementById(`bonoRec-input-${index}`).classList.add('hidden');
  document.getElementById(`guardarBonoRec-${index}`).classList.add('hidden');
  document.getElementById(`editarBonoRec-${index}`).classList.remove('hidden');
  actualizarSelectBonos();
}

function eliminarBono(index) {
  if (confirm("¿Estás seguro de que deseas eliminar este bono?")) {
    bonos.splice(index, 1);
    guardarLocalStorage();
    mostrarBonos();
  }
}

function actualizarSelectBonos() {
  const selectBonos = document.getElementById('selectBonos');
  if (!selectBonos) return;
  selectBonos.innerHTML = '<option value="">Seleccionar bono</option>';
  bonos.forEach(bono => {
    selectBonos.innerHTML += `<option value="${bono}">${bono}</option>`;
  });
}

// --------------------------- GESTIÓN DE SOCIOS ---------------------------
function mostrarSocios() {
  const divSocios = document.getElementById('socios');
  if (!divSocios) return;
  divSocios.innerHTML = '';
  socios.forEach((socio, index) => {
    divSocios.innerHTML += `
      <div class="flex items-center justify-between">
        <span id="socioRec-span-${index}">${socio}</span>
        <input type="text" value="${socio}" id="socioRec-input-${index}" class="border p-2 hidden">
        <div>
          <button class="icon-button" id="editarSocioRec-${index}" onclick="editarSocioRec(${index})">✏️</button>
          <button class="icon-button hidden" id="guardarSocioRec-${index}" onclick="guardarSocioRec(${index})">💾</button>
          <button class="icon-button" onclick="eliminarSocio(${index})">❌</button>
        </div>
      </div>
    `;
  });
  actualizarSelectSocios();
}

function agregarSocio() {
  const nuevoSocio = document.getElementById('nuevoSocio')?.value.trim();
  if (!nuevoSocio) {
    alert("El nombre del socio no puede estar vacío.");
    return;
  }
  if (socios.find(s => s.toLowerCase() === nuevoSocio.toLowerCase())) {
    alert("Este socio ya existe. Intenta con otro nombre.");
    return;
  }
  socios.push(nuevoSocio);
  if (document.getElementById('nuevoSocio')) document.getElementById('nuevoSocio').value = '';
  guardarLocalStorage();
  mostrarSocios();
}

function editarSocioRec(index) {
  document.getElementById(`socioRec-span-${index}`).classList.add('hidden');
  document.getElementById(`socioRec-input-${index}`).classList.remove('hidden');
  document.getElementById(`editarSocioRec-${index}`).classList.add('hidden');
  document.getElementById(`guardarSocioRec-${index}`).classList.remove('hidden');
}

function guardarSocioRec(index) {
  const nuevoSocio = document.getElementById(`socioRec-input-${index}`).value.trim();
  if (!nuevoSocio) {
    alert("El nombre del socio no puede estar vacío.");
    return;
  }
  if (socios.find((s, i) => i !== index && s.toLowerCase() === nuevoSocio.toLowerCase())) {
    alert("Ya existe un socio con este nombre. Usa un nombre diferente.");
    return;
  }
  socios[index] = nuevoSocio;
  guardarLocalStorage();
  const spanElement = document.getElementById(`socioRec-span-${index}`);
  spanElement.textContent = nuevoSocio;
  spanElement.classList.remove('hidden');
  document.getElementById(`guardarSocioRec-${index}`).classList.add('hidden');
  document.getElementById(`editarSocioRec-${index}`).classList.remove('hidden');
  actualizarSelectSocios();
}

function eliminarSocio(index) {
  if (confirm("¿Estás seguro de que deseas eliminar este socio?")) {
    socios.splice(index, 1);
    guardarLocalStorage();
    mostrarSocios();
  }
}

function actualizarSelectSocios() {
  const selectSocio = document.getElementById('selectSocio');
  if (!selectSocio) return;
  selectSocio.innerHTML = '';
  socios.forEach(socio => {
    selectSocio.innerHTML += `<option value="${socio}">${socio}</option>`;
  });
}

// --------------------------- EXPORTAR, IMPORTAR Y COPIA DE SEGURIDAD ---------------------------
function exportarDatos() {
  const datos = [
    ['Fecha', 'Clientas', 'Productos', 'Bono', 'Puntos', 'Comentario'],
    ...ventas.map(venta => [venta.fecha, venta.clienta, venta.producto, venta.bono, venta.puntos, venta.comentario])
  ];
  const csvContent = datos.map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ventas_registradas.xls';
  a.click();
  URL.revokeObjectURL(url);
}

function importarDatos() {
  const archivo = document.getElementById('importarArchivo')?.files[0];
  if (!archivo) {
    alert("Por favor, selecciona un archivo CSV para importar.");
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    const contenido = e.target.result;
    const filas = contenido.split("\n").slice(1);
    filas.forEach((fila, index) => {
      const [fecha, clienta, producto, bono, puntosVal, comentario] = fila.split(",");
      if (!fecha || !clienta || !producto || !comentario) {
        console.warn(`Fila ${index + 2}: Datos incompletos. Esta fila será ignorada.`);
        return;
      }
      const puntosConvertidos = parseInt(puntosVal, 10) || 0;
      ventas.push({
        fecha: fecha.trim(),
        clienta: clienta.trim(),
        producto: producto.trim(),
        bono: bono ? bono.trim() : "N/A",
        puntos: puntosConvertidos,
        comentario: comentario.trim()
      });
    });
    guardarLocalStorage();
    mostrarVentas();
    alert("Los datos del archivo han sido importados correctamente.");
  };
  reader.readAsText(archivo);
}

function guardarCopiaSeguridad() {
  const copiaSeguridad = { productos, clientas, bonos, ventas };
  const blob = new Blob([JSON.stringify(copiaSeguridad)], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'copia_seguridad.json';
  a.click();
  URL.revokeObjectURL(url);
}

function restaurarCopiaSeguridad() {
  const archivo = document.getElementById('cargarCopiaSeguridad')?.files[0];
  if (archivo) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const contenido = e.target.result;
      const copiaSeguridad = JSON.parse(contenido);
      productos = copiaSeguridad.productos;
      clientas = copiaSeguridad.clientas;
      bonos = copiaSeguridad.bonos;
      ventas = copiaSeguridad.ventas;
      guardarLocalStorage();
      mostrarProductos();
      mostrarClientas();
      mostrarBonos();
      mostrarVentas();
    };
    reader.readAsText(archivo);
  }
}

// --------------------------- FUNCIONES DE UTILIDAD (TOGGLE, ETC.) ---------------------------
function toggleProductos() {
  const divProductos = document.getElementById('productos');
  if (divProductos) divProductos.classList.toggle('hidden');
  const icono = document.getElementById('icono-productos');
  if (icono) icono.textContent = icono.textContent === '👁️' ? '🙈' : '👁️';
}


function toggleClientas() {
  const divClientas = document.getElementById('clientas');
  if (divClientas) divClientas.classList.toggle('hidden');
  const icono = document.getElementById('icono-clientas');
  if (icono) icono.textContent = icono.textContent === '👁️' ? '🙈' : '👁️';
}

function toggleBonos() {
  const divBonos = document.getElementById('bonos');
  if (divBonos) divBonos.classList.toggle('hidden');
  const icono = document.getElementById('icono-bonos');
  if (icono) icono.textContent = icono.textContent === '👁️' ? '🙈' : '👁️';
}

function toggleSocios() {
  const divSocios = document.getElementById('socios');
  if (divSocios) divSocios.classList.toggle('hidden');
  const icono = document.getElementById('icono-socios');
  if (icono) icono.textContent = icono.textContent === '👁️' ? '🙈' : '👁️';
}

// --------------------------- GESTIÓN DE VENTAS ---------------------------
function mostrarVentas() {
  const tablaVentas = document.getElementById('tablaVentas');
  if (!tablaVentas) return;
  tablaVentas.innerHTML = '';
  if (ventas.length === 0) {
    tablaVentas.innerHTML = '<tr><td colspan="8" class="text-center py-4">No hay ventas registradas.</td></tr>';
    return;
  }
  ventas.forEach((venta, index) => {
    const periodo = encontrarPeriodo(venta.fecha);
    tablaVentas.innerHTML += `
      <tr>
        <td class="py-2 px-4 border">
          <span id="periodo-span-${index}">${periodo || 'No asignado'}</span>
          <input type="text" id="periodo-input-${index}" value="${periodo || 'No asignado'}" class="hidden border p-2 w-full">
        </td>
        <td class="py-2 px-4 border">
          <span id="fecha-span-${index}">${venta.fecha}</span>
          <input type="date" id="fecha-input-${index}" value="${venta.fecha}" class="hidden border p-2 w-full">
        </td>
        <td class="py-2 px-4 border">
          <span id="clienta-span-${index}">${venta.clienta}</span>
          <input type="text" id="clienta-input-${index}" value="${venta.clienta}" class="hidden border p-2 w-full">
        </td>
        <td class="py-2 px-4 border">
          <span id="producto-span-${index}">${venta.producto}</span>
          <input type="text" id="producto-input-${index}" value="${venta.producto}" class="hidden border p-2 w-full">
        </td>
        <td class="py-2 px-4 border">
          <span id="puntos-span-${index}">${venta.puntos}</span>
          <input type="number" id="puntos-input-${index}" value="${venta.puntos}" class="hidden border p-2 w-full">
        </td>
        <td class="py-2 px-4 border">
          <span id="bono-span-${index}">${venta.bono || ''}</span>
          <input type="text" id="bono-input-${index}" value="${venta.bono || ''}" class="hidden border p-2 w-full">
        </td>
        <td class="py-2 px-4 border">
          <span id="comentario-span-${index}">${venta.comentario || ''}</span>
          <input type="text" id="comentario-input-${index}" value="${venta.comentario || ''}" class="hidden border p-2 w-full">
        </td>
        <td class="py-2 px-4 border text-center">
          <button class="icon-button" id="editarVenta-${index}" onclick="habilitarEdicionVenta(${index})">✏️</button>
          <button class="icon-button hidden" id="guardarVenta-${index}" onclick="guardarVenta(${index})">💾</button>
          <button class="icon-button" onclick="eliminarVenta(${index})">❌</button>
        </td>
      </tr>
    `;
  });
}

function registrarVenta() {
  const fechaVenta = document.getElementById('fechaVenta').value;
  const clientasSeleccionadas = Array.from(document.getElementById('selectClientas').selectedOptions)
    .map(option => option.value);
  const productosSeleccionados = Array.from(document.getElementById('selectProductos').selectedOptions)
    .map(option => option.value);
  const bonoSeleccionado = document.getElementById('selectBonos').value;
  const comentarioVenta = document.getElementById('comentarioVenta').value.trim();

  if (!fechaVenta || clientasSeleccionadas.length === 0 || productosSeleccionados.length === 0) {
    alert("Por favor, completa todos los campos obligatorios antes de registrar la venta.");
    return;
  }

  const fechaVentaObj = new Date(fechaVenta);

  clientasSeleccionadas.forEach(clienta => {
    productosSeleccionados.forEach(productoNombre => {
      const inputPuntos = document.getElementById(`puntos-${productoNombre}`);
      const puntos = inputPuntos ? parseInt(inputPuntos.value, 10) || 0 : 0;

      ventas.push({
        fecha: fechaVenta,
        clienta: clienta,
        producto: productoNombre,
        bono: bonoSeleccionado || '',
        puntos: puntos,
        comentario: comentarioVenta || ''
      });

      // Eventos Google Calendar
      const fechaEvento7 = new Date(fechaVentaObj);
      fechaEvento7.setDate(fechaEvento7.getDate() + 7);
      crearEventoGoogleCalendar(
        `Seguimiento de envío - ${clienta} - ${productoNombre}`,
        fechaEvento7,
        "Revisar si el producto ha llegado."
      );

      const fechaEvento15 = new Date(fechaVentaObj);
      fechaEvento15.setDate(fechaEvento15.getDate() + 15);
      crearEventoGoogleCalendar(
        `Feedback producto - ${clienta} - ${productoNombre}`,
        fechaEvento15,
        "Ver cómo le ha ido el producto al cliente."
      );

      const productoObj = productos.find(p => p.nombre === productoNombre);
      if (productoObj && productoObj.mesAviso && productoObj.mesAviso > 0) {
        const fechaAviso = new Date(fechaVentaObj);
        fechaAviso.setMonth(fechaAviso.getMonth() + productoObj.mesAviso);
        crearEventoGoogleCalendar(
          `Aviso de reposición - ${clienta} - ${productoNombre}`,
          fechaAviso,
          "Revisar aviso calculado para reposición de producto."
        );
      }
    });
  });

  guardarLocalStorage();
  mostrarVentas();
  actualizarDatosPeriodoActual();

  // Reiniciar el formulario
  const formulario = document.querySelector('#ventas form');
  if (formulario) formulario.reset();
  document.getElementById('puntosPorProductoContainer').innerHTML = '';

  // ✅ Mostrar mensaje de éxito visual
  const boton = document.getElementById('registrarVentaBtn');
  if (boton) {
    boton.disabled = true;
    const textoOriginal = boton.innerText;
    boton.innerText = "✅ VENTA REGISTRADA";
    boton.classList.add("opacity-70", "cursor-not-allowed");

    setTimeout(() => {
      boton.innerText = textoOriginal;
      boton.disabled = false;
      boton.classList.remove("opacity-70", "cursor-not-allowed");
    },
    3000);
  }
  // Mostrar toast visual de éxito
const toast = document.getElementById('toast-exito');
if (toast) {
  toast.classList.remove('hidden', 'opacity-0');
  toast.classList.add('opacity-100');

  setTimeout(() => {
    toast.classList.add('opacity-0');
    setTimeout(() => toast.classList.add('hidden'), 500);
  }, 3000);
  }
}

function editarVenta(index) {
  const fila = document.getElementById('tablaVentas')?.rows[index];
  if (!fila) return;
  fila.querySelectorAll('input').forEach(input => input.disabled = false);
  const editarBoton = fila.querySelector(`button[onclick="editarVenta(${index})"]`);
  const guardarBoton = fila.querySelector(`button[onclick="guardarEdicion(${index})"]`);
  if (editarBoton && guardarBoton) {
    editarBoton.style.display = 'none';
    guardarBoton.style.display = 'inline';
  }
}

function habilitarEdicionVenta(index) {
  const ids = ['fecha', 'clienta', 'producto', 'puntos', 'bono', 'comentario'];
  ids.forEach(id => {
    const span = document.getElementById(`${id}-span-${index}`);
    const input = document.getElementById(`${id}-input-${index}`);
    if (span && input) {
      span.classList.add('hidden');
      input.classList.remove('hidden');
    }
  });
  document.getElementById(`editarVenta-${index}`)?.classList.add('hidden');
  document.getElementById(`guardarVenta-${index}`)?.classList.remove('hidden');
}

function guardarVenta(index) {
  const nuevaFecha = document.getElementById(`fecha-input-${index}`).value.trim();
  const nuevaClienta = document.getElementById(`clienta-input-${index}`).value.trim();
  const nuevoProducto = document.getElementById(`producto-input-${index}`).value.trim();
  const nuevosPuntos = parseInt(document.getElementById(`puntos-input-${index}`).value, 10);
  const nuevoBono = document.getElementById(`bono-input-${index}`).value.trim();
  const nuevoComentario = document.getElementById(`comentario-input-${index}`).value.trim();
  if (!nuevaFecha || !nuevaClienta || !nuevoProducto || isNaN(nuevosPuntos) || nuevosPuntos < 0) {
    alert("Por favor, completa correctamente todos los campos.");
    return;
  }
  ventas[index] = {
    fecha: nuevaFecha,
    clienta: nuevaClienta,
    producto: nuevoProducto,
    bono: nuevoBono,
    puntos: nuevosPuntos,
    comentario: nuevoComentario
  };
  guardarLocalStorage();
  mostrarVentas();
  actualizarDatosPeriodoActual();
}

function eliminarVenta(index) {
  if (confirm("¿Estás seguro de que deseas eliminar esta venta?")) {
    ventas.splice(index, 1);
    guardarLocalStorage();
    mostrarVentas();
    actualizarDatosPeriodoActual();
  }
}

// --------------------------- GESTIÓN DE PERIODOS ---------------------------
function encontrarPeriodo(fechaVenta) {
  const fecha = new Date(fechaVenta);
  const periodoEncontrado = periodos.find(periodo => {
    const inicio = new Date(periodo.inicio);
    const fin = new Date(periodo.fin);
    return fecha >= inicio && fecha <= fin;
  });
  return periodoEncontrado ? periodoEncontrado.nombre : 'No asignado';
}

function mostrarPeriodos() {
  const tablaPeriodos = document.getElementById('tablaPeriodos');
  if (!tablaPeriodos) return;
  tablaPeriodos.innerHTML = '';
  if (periodos.length === 0) {
    tablaPeriodos.innerHTML = '<tr><td colspan="4" class="text-center py-4">No hay periodos registrados.</td></tr>';
    return;
  }
  periodos.forEach((periodo, index) => {
    tablaPeriodos.innerHTML += `
      <tr>
        <td class="py-2 px-4 border">
          <span id="periodoRec-nombre-span-${index}">${periodo.nombre}</span>
          <input type="text" id="periodoRec-nombre-input-${index}" value="${periodo.nombre}" class="hidden border p-1 w-full">
        </td>
        <td class="py-2 px-4 border">
          <span id="periodoRec-inicio-span-${index}">${periodo.inicio}</span>
          <input type="date" id="periodoRec-inicio-input-${index}" value="${periodo.inicio}" class="hidden border p-1 w-full">
        </td>
        <td class="py-2 px-4 border">
          <span id="periodoRec-fin-span-${index}">${periodo.fin}</span>
          <input type="date" id="periodoRec-fin-input-${index}" value="${periodo.fin}" class="hidden border p-1 w-full">
        </td>
        <td class="py-2 px-4 border text-center">
          <button class="icon-button" id="editarPeriodoRec-${index}" onclick="editarPeriodoRec(${index})">✏️</button>
          <button class="icon-button hidden" id="guardarPeriodoRec-${index}" onclick="guardarPeriodoRec(${index})">💾</button>
          <button class="icon-button" onclick="eliminarPeriodo(${index})">❌</button>
        </td>
      </tr>
    `;
  });
}

function agregarPeriodo() {
  const nombrePeriodo = document.getElementById('nombrePeriodo')?.value.trim();
  const fechaInicioPeriodo = document.getElementById('fechaInicioPeriodo')?.value;
  const fechaFinPeriodo = document.getElementById('fechaFinPeriodo')?.value;
  if (!nombrePeriodo || !fechaInicioPeriodo || !fechaFinPeriodo) {
    alert("Completa todos los campos del periodo.");
    return;
  }
  periodos.push({ nombre: nombrePeriodo, inicio: fechaInicioPeriodo, fin: fechaFinPeriodo });
  guardarLocalStorage();
  mostrarPeriodos();
  cargarPeriodosEnSelector('selectPeriodoActual');
  cargarPeriodosEnSelector('selectPeriodo');
  if (document.getElementById('nombrePeriodo')) document.getElementById('nombrePeriodo').value = '';
  if (document.getElementById('fechaInicioPeriodo')) document.getElementById('fechaInicioPeriodo').value = '';
  if (document.getElementById('fechaFinPeriodo')) document.getElementById('fechaFinPeriodo').value = '';
}

function editarPeriodoRec(index) {
  document.getElementById(`periodoRec-nombre-span-${index}`).classList.add('hidden');
  document.getElementById(`periodoRec-inicio-span-${index}`).classList.add('hidden');
  document.getElementById(`periodoRec-fin-span-${index}`).classList.add('hidden');
  document.getElementById(`periodoRec-nombre-input-${index}`).classList.remove('hidden');
  document.getElementById(`periodoRec-inicio-input-${index}`).classList.remove('hidden');
  document.getElementById(`periodoRec-fin-input-${index}`).classList.remove('hidden');
  document.getElementById(`editarPeriodoRec-${index}`).classList.add('hidden');
  document.getElementById(`guardarPeriodoRec-${index}`).classList.remove('hidden');
}

function guardarPeriodoRec(index) {
  const nuevoNombre = document.getElementById(`periodoRec-nombre-input-${index}`).value.trim();
  const nuevaFechaInicio = document.getElementById(`periodoRec-inicio-input-${index}`).value;
  const nuevaFechaFin = document.getElementById(`periodoRec-fin-input-${index}`).value;
  if (!nuevoNombre || !nuevaFechaInicio || !nuevaFechaFin) {
    alert("Completa correctamente todos los campos.");
    return;
  }
  periodos[index] = { nombre: nuevoNombre, inicio: nuevaFechaInicio, fin: nuevaFechaFin };
  guardarLocalStorage();
  mostrarPeriodos();
  cargarPeriodosEnSelector('selectPeriodoActual');
  cargarPeriodosEnSelector('selectPeriodo');
}

function eliminarPeriodo(index) {
  if (confirm("¿Estás seguro de que deseas eliminar este periodo?")) {
    periodos.splice(index, 1);
    guardarLocalStorage();
    mostrarPeriodos();
    cargarPeriodosEnSelector('selectPeriodoActual');
    cargarPeriodosEnSelector('selectPeriodo');
  }
}

function cargarPeriodosEnSelector(selectorId = 'selectPeriodoActual') {
  const selectPeriodo = document.getElementById(selectorId);
  if (!selectPeriodo) return;
  selectPeriodo.innerHTML = '<option value="">Seleccionar periodo</option>';
  if (periodos.length > 0) {
    const fechaActual = new Date();
    periodos.forEach(periodo => {
      const inicio = new Date(periodo.inicio);
      const fin = new Date(periodo.fin);
      const option = document.createElement('option');
      option.value = periodo.nombre;
      option.textContent = periodo.nombre;
      if (fechaActual >= inicio && fechaActual <= fin) {
        option.selected = true;
      }
      selectPeriodo.appendChild(option);
    });
  }
}

// --------------------------- DATOS DE META, DASHBOARD Y CHARTS ---------------------------
function actualizarDashboard() {
  // Actualizar indicadores clave
  if (document.getElementById('ventasTotales')) {
    document.getElementById('ventasTotales').textContent = ventas.length;
  }
  if (document.getElementById('metaAlcanzada')) {
    let metaObjetivo = 100; // Ejemplo de meta
    let metaPorcentaje = Math.min((ventas.length / metaObjetivo) * 100, 100);
    document.getElementById('metaAlcanzada').textContent = metaPorcentaje.toFixed(0) + '%';
  }
  if (document.getElementById('productoMasVendido')) {
    let productoFrecuencia = {};
    ventas.forEach(v => {
      productoFrecuencia[v.producto] = (productoFrecuencia[v.producto] || 0) + 1;
    });
    let productoMasVendido = 'N/A';
    let maxFrecuencia = 0;
    for (let prod in productoFrecuencia) {
      if (productoFrecuencia[prod] > maxFrecuencia) {
        maxFrecuencia = productoFrecuencia[prod];
        productoMasVendido = prod;
      }
    }
    document.getElementById('productoMasVendido').textContent = productoMasVendido;
  }
  // Gráfico de Ventas Mensuales
  if (document.getElementById('ventasMensualesChart')) {
    let ventasPorMes = {};
    ventas.forEach(v => {
      let fecha = new Date(v.fecha);
      let mesAnio = fecha.getFullYear() + '-' + String(fecha.getMonth() + 1).padStart(2, '0');
      ventasPorMes[mesAnio] = (ventasPorMes[mesAnio] || 0) + 1;
    });
    let etiquetasMes = Object.keys(ventasPorMes).sort();
    let datosMes = etiquetasMes.map(m => ventasPorMes[m]);
    let ctxVentas = document.getElementById('ventasMensualesChart').getContext('2d');
    if (window.ventasMensualesChartInstance) window.ventasMensualesChartInstance.destroy();
    window.ventasMensualesChartInstance = new Chart(ctxVentas, {
      type: 'line',
      data: {
        labels: etiquetasMes,
        datasets: [{
          label: 'Ventas Mensuales',
          data: datosMes,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          fill: true
        }]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });
  }
  // Gráfico de Productos Más Vendidos
  if (document.getElementById('productosVendidosChart')) {
    let productoFrecuencia = {};
    ventas.forEach(v => {
      productoFrecuencia[v.producto] = (productoFrecuencia[v.producto] || 0) + 1;
    });
    let etiquetasProd = Object.keys(productoFrecuencia);
    let datosProd = etiquetasProd.map(p => productoFrecuencia[p]);
    let ctxProductos = document.getElementById('productosVendidosChart').getContext('2d');
    if (window.productosVendidosChartInstance) window.productosVendidosChartInstance.destroy();
    window.productosVendidosChartInstance = new Chart(ctxProductos, {
      type: 'bar',
      data: {
        labels: etiquetasProd,
        datasets: [{
          label: 'Cantidad Vendida',
          data: datosProd,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });
  }
}

function actualizarDatosPeriodoActual() {
  if (typeof calcularMetaPeriodoActual === "function") calcularMetaPeriodoActual();
  if (typeof calcularProgresoMitadPeriodo === "function") calcularProgresoMitadPeriodo();
  if (typeof calcularDiasRestantes === "function") calcularDiasRestantes();
  if (typeof actualizarBarraProgreso === "function") actualizarBarraProgreso();
}

// --------------------------- GESTIÓN DE META (METAS, PROGRESO, ETC.) ---------------------------
function calcularPuntosVC(periodoSeleccionado) {
  let totalVC = 0;
  ventas.forEach(venta => {
    if (encontrarPeriodo(venta.fecha) === periodoSeleccionado) {
      totalVC += venta.puntos;
    }
  });
  return totalVC;
}

function calcularMetaPeriodoActual() {
  const periodoSeleccionado = document.getElementById('selectPeriodoActual')?.value;
  if (!periodoSeleccionado) return;
  let totalVC = calcularPuntosVC(periodoSeleccionado);
  let totalVE = 0;
  let puntosVEArray = [];
  puntos.forEach(punto => {
    if (punto.periodo === periodoSeleccionado) {
      puntosVEArray.push(punto.puntosVE);
      totalVE += punto.puntosVE;
    }
  });
  puntosVEArray.sort((a, b) => b - a);
  const metas = [
    { nivel: 1, vc: 110, ve: 0 },
    { nivel: 2, vc: 220, ve: 1000 },
    { nivel: 3, vc: 330, ve: 1600 },
    { nivel: 4, vc: 440, ve: 3200 },
    { nivel: 5, vc: 550, ve: 4000 },
    { nivel: 6, vc: 660, ve: 8000 },
    { nivel: 7, vc: 660, ve: 15000 },
    { nivel: 8, vc: 660, ve: 20000 },
    { nivel: 9, vc: 660, ve: 40000 },
    { nivel: 10, vc: 660, ve: 60000 },
  ];
  const VC_LIMIT = 660;
  totalVC = Math.min(totalVC, VC_LIMIT);
  let metaActual = 0;
  let metaSiguiente = null;
  let puntosRestantesVC = 0;
  let puntosRestantesVE = 0;
  for (let i = 0; i < metas.length; i++) {
    const meta = metas[i];
    let totalVEDescuento = totalVE;
    if (meta.desc) {
      for (let j = 0; j < Math.min(meta.desc, puntosVEArray.length); j++) {
        totalVEDescuento -= puntosVEArray[j];
      }
    }
    if (totalVC >= meta.vc && totalVEDescuento >= meta.ve) {
      metaActual = meta.nivel;
    } else {
      metaSiguiente = meta;
      puntosRestantesVC = Math.max(meta.vc - totalVC, 0);
      puntosRestantesVE = Math.max(meta.ve - totalVEDescuento, 0);
      break;
    }
  }
  if (document.getElementById('resultadoMeta')) {
    document.getElementById('resultadoMeta').textContent = `META ${metaActual} (VC: ${totalVC}, VE: ${totalVE})`;
  }
  if (document.getElementById('resultadoPuntosRestantes')) {
    document.getElementById('resultadoPuntosRestantes').textContent = metaSiguiente
      ? `Puntos restantes para la siguiente META${metaSiguiente.nivel}: ${puntosRestantesVC} VC / ${puntosRestantesVE} VE`
      : '¡Ya has alcanzado la Meta más alta!';
  }
}

function calcularProgresoMitadPeriodo() {
  const periodoSeleccionado = document.getElementById('selectPeriodoActual')?.value;
  const periodo = periodos.find(p => p.nombre === periodoSeleccionado);
  if (!periodo) {
    if (document.getElementById('progresoMitadPeriodo'))
      document.getElementById('progresoMitadPeriodo').textContent = 'Periodo no encontrado.';
    return;
  }
  const fechaInicio = new Date(periodo.inicio);
  const fechaFin = new Date(periodo.fin);
  const mitadPeriodo = new Date(fechaInicio.getTime() + (fechaFin.getTime() - fechaInicio.getTime()) / 2);
  let totalVC = 0, totalVE = 0;
  ventas.forEach(venta => {
    const fechaVenta = new Date(venta.fecha);
    if (fechaVenta <= mitadPeriodo && encontrarPeriodo(venta.fecha) === periodoSeleccionado) {
      totalVC += venta.puntos;
    }
  });
  puntos.forEach(punto => {
    if (punto.periodo === periodoSeleccionado) {
      totalVE += punto.puntosVE;
    }
  });
  if (document.getElementById('progresoMitadPeriodo')) {
    document.getElementById('progresoMitadPeriodo').textContent = `VC conseguidos: ${totalVC} / VE conseguidos: ${totalVE}`;
  }
}

function calcularDiasRestantes() {
  const periodoSeleccionado = document.getElementById('selectPeriodoActual')?.value;
  const periodo = periodos.find(p => p.nombre === periodoSeleccionado);
  if (!periodo) {
    if (document.getElementById('diasRestantes'))
      document.getElementById('diasRestantes').textContent = 'Periodo no encontrado.';
    return;
  }
  const fechaInicio = new Date(periodo.inicio);
  const fechaFin = new Date(periodo.fin);
  const hoy = new Date();
  let mensaje = '';
  if (hoy < fechaInicio) {
    mensaje = `El periodo aún no ha comenzado. Inicia en ${Math.ceil((fechaInicio - hoy) / (1000 * 60 * 60 * 24))} días.`;
  } else if (hoy <= fechaFin) {
    mensaje = `Faltan ${Math.ceil((fechaFin - hoy) / (1000 * 60 * 60 * 24))} días para finalizar el periodo.`;
  } else {
    mensaje = 'El periodo ya ha finalizado.';
  }
  if (document.getElementById('diasRestantes')) {
    document.getElementById('diasRestantes').textContent = mensaje;
  }
}

function actualizarBarraProgreso() {
  const periodoSeleccionado = document.getElementById('selectPeriodoActual')?.value;
  let totalVC = calcularPuntosVC(periodoSeleccionado);
  let totalVE = 0;
  puntos.forEach(punto => {
    if (punto.periodo === periodoSeleccionado) {
      totalVE += punto.puntosVE;
    }
  });
  const metas = [
    { nivel: 1, vc: 110, ve: 0 },
    { nivel: 2, vc: 220, ve: 1000 },
    { nivel: 3, vc: 330, ve: 1600 },
    { nivel: 4, vc: 440, ve: 3200 },
    { nivel: 5, vc: 550, ve: 4000 },
    { nivel: 6, vc: 660, ve: 8000 },
    { nivel: 7, vc: 660, ve: 15000 },
    { nivel: 8, vc: 660, ve: 20000 },
    { nivel: 9, vc: 660, ve: 40000 },
    { nivel: 10, vc: 660, ve: 60000 },
  ];
  const VC_LIMIT = 660;
  totalVC = Math.min(totalVC, VC_LIMIT);
  const metaSiguiente = metas.find(meta => (meta.vc + meta.ve) > (totalVC + totalVE));
  const barra = document.getElementById('barraProgreso');
  const textoProgreso = document.getElementById('textoProgreso');
  if (!metaSiguiente) {
    if (barra) {
      barra.style.width = '100%';
      barra.textContent = '';
    }
    if (textoProgreso) textoProgreso.textContent = '¡Meta más alta alcanzada!';
    return;
  }
  const puntosTotalesRequeridos = metaSiguiente.vc + metaSiguiente.ve;
  const puntosTotalesActuales = totalVC + totalVE;
  const progresoTotal = Math.min((puntosTotalesActuales / puntosTotalesRequeridos) * 100, 100);
  if (barra) barra.style.width = `${progresoTotal}%`;
  if (progresoTotal > 15) {
    if (barra) barra.textContent = `${Math.round(progresoTotal)}%`;
    if (textoProgreso) textoProgreso.textContent = '';
  } else {
    if (barra) barra.textContent = '';
    if (textoProgreso) textoProgreso.textContent = `${Math.round(progresoTotal)}% completado hacia META ${metaSiguiente.nivel}`;
  }
}
function actualizarPuntosPorProducto() {
  const productosSeleccionados = Array.from(document.getElementById('selectProductos').selectedOptions).map(option => option.value);
  const contenedor = document.getElementById('puntosPorProductoContainer');
  contenedor.innerHTML = ''; // Limpiar el contenedor antes de añadir nuevos inputs

  productosSeleccionados.forEach(productoNombre => {
      // Buscar el producto en el array global "productos"
      const producto = productos.find(p => p.nombre === productoNombre);

      if (producto) {
          const puntosPorDefecto = producto.puntos || 0; // Mostrar puntos predefinidos

          // Crear el input dinámico con los puntos asociados
          const label = document.createElement('label');
          label.textContent = `Puntos para ${producto.nombre}`;
          label.classList.add('block', 'mb-1');

          const input = document.createElement('input');
          input.type = 'number';
          input.value = puntosPorDefecto; // Rellenar con puntos predefinidos
          input.min = 0;
          input.id = `puntos-${producto.nombre}`;
          input.classList.add('border', 'p-2', 'mb-2', 'w-full', 'rounded-lg');

          contenedor.appendChild(label);
          contenedor.appendChild(input);
      } else {
          console.warn(`Producto no encontrado: ${productoNombre}`);
      }
  });
}


// --------------------------- GOOGLE CALENDAR ---------------------------
function initClient() {
  gapi.client.init({
    apiKey: 'TU_API_KEY',
    clientId: 'TU_CLIENT_ID',
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
    scope: "https://www.googleapis.com/auth/calendar.events"
  }).then(function () {
    console.log("Google API client inicializado");
  }, function(error) {
    console.error("Error al inicializar la API", error);
  });
}

if (typeof gapi !== 'undefined') {
  gapi.load('client:auth2', initClient);
}


function crearEventoGoogleCalendar(titulo, fechaInicio, descripcion) {
  var evento = {
    'summary': titulo,
    'description': descripcion,
    'start': {
      'dateTime': fechaInicio.toISOString(),
      'timeZone': 'America/Mexico_City'
    },
    'end': {
      'dateTime': new Date(fechaInicio.getTime() + 60 * 60 * 1000).toISOString(),
      'timeZone': 'America/Mexico_City'
    },
    'reminders': {
      'useDefault': true
    }
  };
  var request = gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': evento
  });
  request.execute(function(eventoCreado) {
    console.log('Evento creado: ' + (eventoCreado.htmlLink || 'Sin enlace'));
  });
}

// --------------------------- INICIALIZACIÓN ---------------------------
window.onload = function() {
  // Si existe el campo de fecha de venta, asigna la fecha actual
  const fechaVentaEl = document.getElementById('fechaVenta');
  if (fechaVentaEl) {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const anio = hoy.getFullYear();
    fechaVentaEl.value = `${anio}-${mes}-${dia}`;
  }

  // En la página de Registrar Venta, los selects deben llenarse con los datos almacenados
  if (document.getElementById('selectClientas')) {
    actualizarSelectClientas();
  }

  const selectProductosEl = document.getElementById('selectProductos');
  if (selectProductosEl && !selectProductosEl.dataset.listenerAttached) {
    selectProductosEl.addEventListener('change', actualizarPuntosPorProducto);
    selectProductosEl.dataset.listenerAttached = 'true'; // Evitar doble binding
  }


  if (document.getElementById('selectBonos')) {
    actualizarSelectBonos();
  }

  // En la página de Recursos (u otras donde se muestran las listas completas)
  if (document.getElementById('clientas')) {
    mostrarClientas();
  }
  if (document.getElementById('productos')) {
    mostrarProductos();
  }
  if (document.getElementById('bonos')) {
    mostrarBonos();
  }
  if (document.getElementById('socios')) {
    mostrarSocios();
    actualizarSelectSocios();
  }

  // En la sección de Ventas Registradas
  if (document.getElementById('tablaVentas')) {
    mostrarVentas();
  }
  // En la sección de Periodos de Facturación
  if (document.getElementById('tablaPeriodos')) {
    mostrarPeriodos();
  }
  if (document.getElementById('selectPeriodoActual')) {
    cargarPeriodosEnSelector('selectPeriodoActual');
  }
  if (document.getElementById('selectPeriodo')) {
    cargarPeriodosEnSelector('selectPeriodo');
  }

  // Actualiza las métricas (META, progresos, etc.)
  actualizarDatosPeriodoActual();

  // Si existe la función actualizarDashboard (por ejemplo, en la página Dashboard) se llama
  if (typeof actualizarDashboard === 'function') {
    actualizarDashboard();
  }
};

