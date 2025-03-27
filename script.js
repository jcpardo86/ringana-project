// Inicialización de variables globales
let productos = JSON.parse(localStorage.getItem('productos')) || [];
let clientas = JSON.parse(localStorage.getItem('clientas')) || [];
let bonos = JSON.parse(localStorage.getItem('bonos')) || [];
let ventas = JSON.parse(localStorage.getItem('ventas')) || [];
let socios = JSON.parse(localStorage.getItem('socios')) || [];
let puntos = JSON.parse(localStorage.getItem('puntos')) || [];
let periodos = JSON.parse(localStorage.getItem('periodos')) || [];
let orden = 'reciente'; // Orden por defecto

// --------------------------- Gestión de PRODUCTOS ---------------------------
function mostrarProductos() {
  const divProductos = document.getElementById('productos');
  divProductos.innerHTML = '';
  productos.forEach((producto, index) => {
    divProductos.innerHTML += `
      <div class="flex items-center justify-between">
        <span id="productoRec-span-${index}">${producto.nombre}</span>
        <span id="puntosRec-span-${index}">Puntos: ${producto.puntos}</span>
        <input type="text" value="${producto.nombre}" id="productoRec-input-${index}" class="border p-2 hidden">
        <input type="number" value="${producto.puntos}" id="puntosRec-input-${index}" class="border p-2 hidden">
        <div>
          <button class="icon-button" id="editarProductoRec-${index}" onclick="editarProducto(${index})">✏️</button>
          <button class="icon-button hidden" id="guardarProductoRec-${index}" onclick="guardarProducto(${index})">💾</button>
          <button class="icon-button" onclick="eliminarProducto(${index})">❌</button>
        </div>
      </div>
    `;
  });
  actualizarSelectProductos();
}

function agregarProducto() {
  const nuevoProducto = document.getElementById('nuevoProducto').value.trim();
  const puntosProducto = parseInt(document.getElementById('puntosProducto').value, 10);
  const mesAviso = parseInt(document.getElementById('mesAvisoProducto').value, 10);
  if (!nuevoProducto) {
    alert("El nombre del producto no puede estar vacío.");
    return;
  }
  if (isNaN(puntosProducto) || puntosProducto < 0) {
    alert("Por favor, introduce un valor válido para los puntos.");
    return;
  }
  const productoExistente = productos.find(p => p.nombre.toLowerCase() === nuevoProducto.toLowerCase());
  if (productoExistente) {
    alert("Este producto ya existe. Intenta con otro nombre.");
    return;
  }
  // Se almacena el mesAviso junto con los demás datos
  productos.push({ nombre: nuevoProducto, puntos: puntosProducto, mesAviso: isNaN(mesAviso) ? 0 : mesAviso });
  document.getElementById('nuevoProducto').value = '';
  document.getElementById('puntosProducto').value = '';
  document.getElementById('mesAvisoProducto').value = '';
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
  document.getElementById(`productoRec-input-${index}`).classList.remove('hidden');
  document.getElementById(`puntosRec-input-${index}`).classList.remove('hidden');
  document.getElementById(`editarProductoRec-${index}`).classList.add('hidden');
  document.getElementById(`guardarProductoRec-${index}`).classList.remove('hidden');
}

function guardarProducto(index) {
  const nuevoNombre = document.getElementById(`productoRec-input-${index}`).value.trim();
  const nuevosPuntos = parseInt(document.getElementById(`puntosRec-input-${index}`).value, 10);
  if (!nuevoNombre || isNaN(nuevosPuntos) || nuevosPuntos < 0) {
    alert("Por favor, completa correctamente todos los campos.");
    return;
  }
  const productoExistente = productos.find((producto, i) => i !== index && producto.nombre.toLowerCase() === nuevoNombre.toLowerCase());
  if (productoExistente) {
    alert("Ya existe un producto con este nombre. Usa un nombre diferente.");
    return;
  }
  productos[index] = { nombre: nuevoNombre, puntos: nuevosPuntos };
  guardarLocalStorage();
  mostrarProductos();
}

function actualizarSelectProductos() {
  const selectProductos = document.getElementById('selectProductos');
  selectProductos.innerHTML = '';
  productos.forEach(producto => {
    selectProductos.innerHTML += `<option value="${producto.nombre}">${producto.nombre}</option>`;
  });
}

// --------------------------- Gestión de CLIENTAS ---------------------------
function mostrarClientas() {
  const divClientas = document.getElementById('clientas');
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
  const nuevaClienta = document.getElementById('nuevaClienta').value.trim();
  if (!nuevaClienta) {
    alert("El nombre de la clienta no puede estar vacío.");
    return;
  }
  const clientaExistente = clientas.find(clienta => clienta.toLowerCase() === nuevaClienta.toLowerCase());
  if (clientaExistente) {
    alert("Esta clienta ya existe. Intenta con otro nombre.");
    return;
  }
  clientas.push(nuevaClienta);
  document.getElementById('nuevaClienta').value = '';
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
  const clientaExistente = clientas.find((clienta, i) => i !== index && clienta.toLowerCase() === nuevaClienta.toLowerCase());
  if (clientaExistente) {
    alert("Ya existe una clienta con este nombre. Usa un nombre diferente.");
    return;
  }
  clientas[index] = nuevaClienta;
  guardarLocalStorage();
  const spanElement = document.getElementById(`clientaRec-span-${index}`);
  const inputElement = document.getElementById(`clientaRec-input-${index}`);
  const guardarBoton = document.getElementById(`guardarClientaRec-${index}`);
  const editarBoton = document.getElementById(`editarClientaRec-${index}`);
  spanElement.textContent = nuevaClienta;
  spanElement.classList.remove('hidden');
  inputElement.classList.add('hidden');
  guardarBoton.classList.add('hidden');
  editarBoton.classList.remove('hidden');
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
  selectClientas.innerHTML = '';
  clientas.forEach(clienta => {
    selectClientas.innerHTML += `<option value="${clienta}">${clienta}</option>`;
  });
}

// --------------------------- Gestión de BONOS ---------------------------
function mostrarBonos() {
  const divBonos = document.getElementById('bonos');
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
  const nuevoBono = document.getElementById('nuevoBono').value.trim();
  if (!nuevoBono) {
    alert("El nombre del bono no puede estar vacío.");
    return;
  }
  const bonoExistente = bonos.find(b => b.toLowerCase() === nuevoBono.toLowerCase());
  if (bonoExistente) {
    alert("Este bono ya existe. Intenta con otro nombre.");
    return;
  }
  bonos.push(nuevoBono);
  document.getElementById('nuevoBono').value = '';
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
  const bonoExistente = bonos.find((bono, i) => i !== index && bono.toLowerCase() === nuevoBono.toLowerCase());
  if (bonoExistente) {
    alert("Ya existe un bono con este nombre. Usa un nombre diferente.");
    return;
  }
  bonos[index] = nuevoBono;
  guardarLocalStorage();
  const spanElement = document.getElementById(`bonoRec-span-${index}`);
  const inputElement = document.getElementById(`bonoRec-input-${index}`);
  const guardarBoton = document.getElementById(`guardarBonoRec-${index}`);
  const editarBoton = document.getElementById(`editarBonoRec-${index}`);
  spanElement.textContent = nuevoBono;
  spanElement.classList.remove('hidden');
  inputElement.classList.add('hidden');
  guardarBoton.classList.add('hidden');
  editarBoton.classList.remove('hidden');
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
  selectBonos.innerHTML = '<option value="">Seleccionar bono</option>';
  bonos.forEach(bono => {
    selectBonos.innerHTML += `<option value="${bono}">${bono}</option>`;
  });
}

// --------------------------- Gestión de SOCIOS ---------------------------
function mostrarSocios() {
  const divSocios = document.getElementById('socios');
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
  const nuevoSocio = document.getElementById('nuevoSocio').value.trim();
  if (!nuevoSocio) {
    alert("El nombre del socio no puede estar vacío.");
    return;
  }
  const socioExistente = socios.find(s => s.toLowerCase() === nuevoSocio.toLowerCase());
  if (socioExistente) {
    alert("Este socio ya existe. Intenta con otro nombre.");
    return;
  }
  socios.push(nuevoSocio);
  document.getElementById('nuevoSocio').value = '';
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
  const socioExistente = socios.find((s, i) => i !== index && s.toLowerCase() === nuevoSocio.toLowerCase());
  if (socioExistente) {
    alert("Ya existe un socio con este nombre. Usa un nombre diferente.");
    return;
  }
  socios[index] = nuevoSocio;
  guardarLocalStorage();
  const spanElement = document.getElementById(`socioRec-span-${index}`);
  const inputElement = document.getElementById(`socioRec-input-${index}`);
  const guardarBoton = document.getElementById(`guardarSocioRec-${index}`);
  const editarBoton = document.getElementById(`editarSocioRec-${index}`);
  spanElement.textContent = nuevoSocio;
  spanElement.classList.remove('hidden');
  inputElement.classList.add('hidden');
  guardarBoton.classList.add('hidden');
  editarBoton.classList.remove('hidden');
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
  selectSocio.innerHTML = '';
  socios.forEach(socio => {
    selectSocio.innerHTML += `<option value="${socio}">${socio}</option>`;
  });
}

// --------------------------- Funciones de EXPORTAR, IMPORTAR y COPIA DE SEGURIDAD ---------------------------
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
  a.download = 'ventas.csv';
  a.click();
  URL.revokeObjectURL(url);
}

function importarDatos() {
  const archivo = document.getElementById('importarArchivo').files[0];
  if (!archivo) {
    alert("Por favor, selecciona un archivo CSV para importar.");
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    const contenido = e.target.result;
    const filas = contenido.split("\n").slice(1);
    filas.forEach((fila, index) => {
      const [fecha, clienta, producto, bono, puntos, comentario] = fila.split(",");
      if (!fecha || !clienta || !producto || !comentario) {
        console.warn(`Fila ${index + 2}: Datos incompletos. Esta fila será ignorada.`);
        return;
      }
      const puntosConvertidos = parseInt(puntos, 10) || 0;
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
  const archivo = document.getElementById('cargarCopiaSeguridad').files[0];
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

// --------------------------- Funciones de UTILIDAD ---------------------------
function toggleProductos() {
  const divProductos = document.getElementById('productos');
  divProductos.classList.toggle('hidden');
  const icono = document.getElementById('icono-productos');
  icono.textContent = icono.textContent === '👁️' ? '🙈' : '👁️';
}

function toggleClientas() {
  const divClientas = document.getElementById('clientas');
  divClientas.classList.toggle('hidden');
  const icono = document.getElementById('icono-clientas');
  icono.textContent = icono.textContent === '👁️' ? '🙈' : '👁️';
}

function toggleBonos() {
  const divBonos = document.getElementById('bonos');
  divBonos.classList.toggle('hidden');
  const icono = document.getElementById('icono-bonos');
  icono.textContent = icono.textContent === '👁️' ? '🙈' : '👁️';
}

function toggleSocios() {
  const divSocios = document.getElementById('socios');
  divSocios.classList.toggle('hidden');
  const icono = document.getElementById('icono-socios');
  icono.textContent = icono.textContent === '👁️' ? '🙈' : '👁️';
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

document.getElementById('menuButton').addEventListener('click', function () {
  const menuList = document.getElementById('menuList');
  menuList.classList.toggle('hidden');
});

function exportarVentasExcel() {
  let datos = `
    <table>
      <tr>
        <th>Periodo de Facturación</th>
        <th>Fecha</th>
        <th>Clientas</th>
        <th>Productos</th>
        <th>Bono</th>
        <th>Puntos</th>
        <th>Comentario</th>
      </tr>
      ${ventas.map(venta => `
        <tr>
          <td>${encontrarPeriodo(venta.fecha)}</td>
          <td>${venta.fecha}</td>
          <td>${venta.clienta}</td>
          <td>${venta.producto}</td>
          <td>${venta.bono}</td>
          <td>${venta.puntos}</td>
          <td>${venta.comentario}</td>
        </tr>
      `).join('')}
    </table>
  `;
  const blob = new Blob([datos], { type: 'application/vnd.ms-excel' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ventas_registradas.xls';
  a.click();
  URL.revokeObjectURL(url);
}

// --------------------------- Gestión de VENTAS ---------------------------
function mostrarVentas() {
  const tablaVentas = document.getElementById('tablaVentas');
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
  let fechaVentaObj = new Date(fechaVenta);
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
      // Alerta de seguimiento de envío a los 7 días
      let fechaEvento7 = new Date(fechaVentaObj);
      fechaEvento7.setDate(fechaEvento7.getDate() + 7);
      let titulo7 = `Seguimiento de envío - ${clienta} - ${productoNombre}`;
      let descripcion7 = "Revisar si el producto ha llegado.";
      crearEventoGoogleCalendar(titulo7, fechaEvento7, descripcion7);
      // Alerta de feedback a los 15 días
      let fechaEvento15 = new Date(fechaVentaObj);
      fechaEvento15.setDate(fechaEvento15.getDate() + 15);
      let titulo15 = `Feedback producto - ${clienta} - ${productoNombre}`;
      let descripcion15 = "Ver cómo le ha ido el producto al cliente.";
      crearEventoGoogleCalendar(titulo15, fechaEvento15, descripcion15);
      // Alerta basada en mesAviso (si existe y > 0)
      const productoObj = productos.find(p => p.nombre === productoNombre);
      if (productoObj && productoObj.mesAviso && productoObj.mesAviso > 0) {
        let fechaAvisoCalculada = new Date(fechaVentaObj);
        fechaAvisoCalculada.setMonth(fechaAvisoCalculada.getMonth() + productoObj.mesAviso);
        let tituloAvisoCalc = `Aviso de reposición - ${clienta} - ${productoNombre}`;
        let descripcionAvisoCalc = "Revisar aviso calculado para reposición de producto.";
        crearEventoGoogleCalendar(tituloAvisoCalc, fechaAvisoCalculada, descripcionAvisoCalc);
      }
    });
  });
  guardarLocalStorage();
  mostrarVentas();
  actualizarDatosPeriodoActual();
  document.getElementById('fechaVenta').value = new Date().toISOString().split('T')[0];
  document.getElementById('comentarioVenta').value = '';
  document.getElementById('selectClientas').value = '';
  document.getElementById('selectProductos').value = '';
  document.getElementById('selectBonos').value = '';
  document.getElementById('puntosPorProductoContainer').innerHTML = '';
}

function editarVenta(index) {
  const fila = document.getElementById('tablaVentas').rows[index];
  fila.querySelectorAll('input').forEach(input => {
    input.disabled = false;
  });
  const editarBoton = fila.querySelector(`button[onclick="editarVenta(${index})"]`);
  const guardarBoton = fila.querySelector(`button[onclick="guardarEdicion(${index})"]`);
  if (editarBoton && guardarBoton) {
    editarBoton.style.display = 'none';
    guardarBoton.style.display = 'inline';
  } else {
    console.error("No se encontraron los botones de edición/guardado para el índice:", index);
  }
}

function habilitarEdicionVenta(index) {
  document.getElementById(`fecha-span-${index}`).classList.add('hidden');
  document.getElementById(`clienta-span-${index}`).classList.add('hidden');
  document.getElementById(`producto-span-${index}`).classList.add('hidden');
  document.getElementById(`puntos-span-${index}`).classList.add('hidden');
  document.getElementById(`bono-span-${index}`).classList.add('hidden');
  document.getElementById(`comentario-span-${index}`).classList.add('hidden');
  document.getElementById(`fecha-input-${index}`).classList.remove('hidden');
  document.getElementById(`clienta-input-${index}`).classList.remove('hidden');
  document.getElementById(`producto-input-${index}`).classList.remove('hidden');
  document.getElementById(`puntos-input-${index}`).classList.remove('hidden');
  document.getElementById(`bono-input-${index}`).classList.remove('hidden');
  document.getElementById(`comentario-input-${index}`).classList.remove('hidden');
  document.getElementById(`editarVenta-${index}`).classList.add('hidden');
  document.getElementById(`guardarVenta-${index}`).classList.remove('hidden');
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

function guardarEdicion(index) {
  const fila = document.getElementById('tablaVentas').rows[index];
  const fechaEdit = fila.querySelector(`#fecha-${index}`).value.trim();
  const clientaEdit = fila.querySelector(`#clienta-${index}`).value.trim();
  const productoEdit = fila.querySelector(`#producto-${index}`).value.trim();
  const bonoEdit = fila.querySelector(`#bono-${index}`).value.trim();
  const puntosEdit = parseInt(fila.querySelector(`#puntos-${index}`).value, 10) || 0;
  const comentarioEdit = fila.querySelector(`#comentario-${index}`).value.trim();
  if (!fechaEdit || !clientaEdit || !productoEdit) {
    alert("Por favor, completa todos los campos obligatorios.");
    return;
  }
  ventas[index] = {
    fecha: fechaEdit,
    clienta: clientaEdit,
    producto: productoEdit,
    bono: bonoEdit || 0,
    puntos: puntosEdit,
    comentario: comentarioEdit
  };
  guardarLocalStorage();
  fila.querySelectorAll('input').forEach(input => {
    input.disabled = true;
  });
  const guardarBoton = fila.querySelector(`button[onclick="guardarEdicion(${index})"]`);
  const editarBoton = fila.querySelector(`button[onclick="editarVenta(${index})"]`);
  if (guardarBoton && editarBoton) {
    guardarBoton.style.display = 'none';
    editarBoton.style.display = 'inline';
  }
}

function eliminarVenta(index) {
  if (confirm("¿Estás seguro de que deseas eliminar esta venta?")) {
    ventas.splice(index, 1);
    guardarLocalStorage();
    mostrarVentas();
    actualizarDatosPeriodoActual();
  }
}

// --------------------------- Gestión de PERIODOS ---------------------------
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
  const nombrePeriodo = document.getElementById('nombrePeriodo').value.trim();
  const fechaInicioPeriodo = document.getElementById('fechaInicioPeriodo').value;
  const fechaFinPeriodo = document.getElementById('fechaFinPeriodo').value;
  if (!nombrePeriodo || !fechaInicioPeriodo || !fechaFinPeriodo) {
    alert("Completa todos los campos del periodo.");
    return;
  }
  periodos.push({ nombre: nombrePeriodo, inicio: fechaInicioPeriodo, fin: fechaFinPeriodo });
  guardarLocalStorage();
  mostrarPeriodos();
  cargarPeriodosEnSelector('selectPeriodoActual');
  cargarPeriodosEnSelector('selectPeriodo');
  document.getElementById('nombrePeriodo').value = '';
  document.getElementById('fechaInicioPeriodo').value = '';
  document.getElementById('fechaFinPeriodo').value = '';
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
  } else {
    console.warn("No hay periodos disponibles.");
  }
}

function actualizarDatosPeriodoActual() {
  calcularMetaPeriodoActual();
  calcularProgresoMitadPeriodo();
  calcularDiasRestantes();
  actualizarBarraProgreso();
}

// --------------------------- Gestión de SOCIAS VE ---------------------------
function mostrarVentasPorSocia() {
  const tablaPuntos = document.getElementById('tablaPuntos');
  tablaPuntos.innerHTML = '';
  if (puntos.length === 0) {
    tablaPuntos.innerHTML = '<tr><td colspan="4" class="text-center py-4">No hay puntos registrados.</td></tr>';
    return;
  }
  puntos.forEach((punto, index) => {
    tablaPuntos.innerHTML += `
      <tr>
        <td class="py-2 px-4 border">
          <span id="socio-span-${index}">${punto.socio}</span>
          <input type="text" id="socio-input-${index}" value="${punto.socio}" class="hidden border p-1 w-full">
        </td>
        <td class="py-2 px-4 border">
          <span id="periodo-span-${index}">${punto.periodo}</span>
          <input type="text" id="periodo-input-${index}" value="${punto.periodo}" class="hidden border p-1 w-full">
        </td>
        <td class="py-2 px-4 border">
          <span id="puntosVE-span-${index}">${punto.puntosVE}</span>
          <input type="number" id="puntosVE-input-${index}" value="${punto.puntosVE}" class="hidden border p-1 w-full">
        </td>
        <td class="py-2 px-4 border text-center">
          <button class="icon-button" id="editarPuntos-${index}" onclick="habilitarEdicionPuntosPorSocia(${index})">✏️</button>
          <button class="icon-button hidden" id="guardarPuntos-${index}" onclick="guardarPuntosPorSocia(${index})">💾</button>
          <button class="icon-button" onclick="eliminarPuntosPorSocia(${index})">❌</button>
        </td>
      </tr>
    `;
  });
}

function guardarPuntosPorSocia(index) {
  const nuevoSocio = document.getElementById(`socio-input-${index}`).value.trim();
  const nuevoPeriodo = document.getElementById(`periodo-input-${index}`).value.trim();
  const nuevosPuntosVE = parseInt(document.getElementById(`puntosVE-input-${index}`).value, 10);
  if (!nuevoSocio || !nuevoPeriodo || isNaN(nuevosPuntosVE) || nuevosPuntosVE < 0) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }
  puntos[index] = { socio: nuevoSocio, periodo: nuevoPeriodo, puntosVE: nuevosPuntosVE };
  guardarLocalStorage();
  mostrarVentasPorSocia();
}

function registrarPuntosPorSocia() {
  const socio = document.getElementById('selectSocio').value.trim();
  const periodo = document.getElementById('selectPeriodo').value.trim();
  const puntosVE = parseInt(document.getElementById('puntosVE').value, 10);
  if (!socio || !periodo || isNaN(puntosVE) || puntosVE <= 0) {
    alert("Por favor, selecciona un socio, un periodo y añade puntos VE válidos.");
    return;
  }
  const existe = puntos.find(p => p.socio === socio && p.periodo === periodo);
  if (existe) {
    if (confirm("Este socio ya tiene puntos registrados en este periodo. ¿Deseas actualizar los puntos?")) {
      existe.puntosVE += puntosVE;
    }
  } else {
    puntos.push({ socio, periodo, puntosVE });
  }
  guardarLocalStorage();
  mostrarVentasPorSocia();
  actualizarDatosPeriodoActual();
}

function habilitarEdicionPuntosPorSocia(index) {
  document.getElementById(`socio-span-${index}`).classList.add('hidden');
  document.getElementById(`periodo-span-${index}`).classList.add('hidden');
  document.getElementById(`puntosVE-span-${index}`).classList.add('hidden');
  document.getElementById(`socio-input-${index}`).classList.remove('hidden');
  document.getElementById(`periodo-input-${index}`).classList.remove('hidden');
  document.getElementById(`puntosVE-input-${index}`).classList.remove('hidden');
  document.getElementById(`editarPuntos-${index}`).classList.add('hidden');
  document.getElementById(`guardarPuntos-${index}`).classList.remove('hidden');
}

// --------------------------- Gestión de FILTROS Y EXPORTACIÓN ---------------------------
function filtrarVentas() {
  const filtroTipo = document.getElementById('filtroTipo').value;
  const filtroAno = document.getElementById('filtroAno')?.value;
  const filtroMes = document.getElementById('filtroMes')?.value;
  const filtroClienta = document.getElementById('filtroClienta')?.value.toLowerCase();
  const filtroProducto = document.getElementById('filtroProducto')?.value.toLowerCase();
  const filtroFechaInicio = document.getElementById('filtroFechaInicio')?.value;
  const filtroFechaFin = document.getElementById('filtroFechaFin')?.value;
  const buscador = document.getElementById('buscadorVentas').value.toLowerCase();
  if (buscador) {
    buscarEnTiempoReal();
    return;
  }
  const ventasFiltradas = ventas.filter(venta => {
    const fechaVenta = new Date(venta.fecha);
    const anoVenta = fechaVenta.getFullYear();
    const mesVenta = `${fechaVenta.getFullYear()}-${String(fechaVenta.getMonth() + 1).padStart(2, '0')}`;
    return (
      (!filtroTipo || (filtroTipo === 'ano' && anoVenta == filtroAno) ||
       (filtroTipo === 'mes' && mesVenta === filtroMes) ||
       (filtroTipo === 'cliente' && venta.clienta.toLowerCase().includes(filtroClienta)) ||
       (filtroTipo === 'producto' && venta.producto.toLowerCase().includes(filtroProducto)) ||
       (filtroTipo === 'fecha' &&
         (!filtroFechaInicio || fechaVenta >= new Date(filtroFechaInicio)) &&
         (!filtroFechaFin || fechaVenta <= new Date(filtroFechaFin))))
    );
  });
  const tablaVentas = document.getElementById('tablaVentas');
  tablaVentas.innerHTML = '';
  if (ventasFiltradas.length === 0) {
    tablaVentas.innerHTML = '<tr><td colspan="7" class="text-center py-4">No se encontraron resultados.</td></tr>';
    return;
  }
  ventasFiltradas.forEach((venta, index) => {
    tablaVentas.innerHTML += `
      <tr>
        <td class="py-2 px-4 border">${encontrarPeriodo(venta.fecha)}</td>
        <td class="py-2 px-4 border">${venta.fecha}</td>
        <td class="py-2 px-4 border">${venta.clienta}</td>
        <td class="py-2 px-4 border">${venta.producto}</td>
        <td class="py-2 px-4 border">${venta.puntos}</td>
        <td class="py-2 px-4 border">${venta.bono || ''}</td>
        <td class="py-2 px-4 border">${venta.comentario}</td>
        <td class="py-2 px-4 border text-center">
          <button class="icon-button" onclick="editarVenta(${index})">✏️</button>
          <button class="icon-button" onclick="eliminarVenta(${index})">❌</button>
        </td>
      </tr>
    `;
  });
}

function restaurarFiltros() {
  document.getElementById('buscadorVentas').value = '';
  document.getElementById('filtroTipo').value = '';
  document.getElementById('criteriosFiltro').innerHTML = '';
  mostrarVentas();
}

function mostrarCriterio() {
  const tipoFiltro = document.getElementById('filtroTipo').value;
  const criterios = document.getElementById('criteriosFiltro');
  criterios.innerHTML = '';
  if (tipoFiltro === 'ano') {
    criterios.innerHTML = `<input id="filtroAno" type="number" placeholder="Año" class="border p-2 rounded-md w-24 text-center">`;
  } else if (tipoFiltro === 'mes') {
    criterios.innerHTML = `<input id="filtroMes" type="month" class="border p-2 rounded-md w-36 text-center">`;
  } else if (tipoFiltro === 'cliente') {
    criterios.innerHTML = `<input id="filtroClienta" type="text" placeholder="Nombre de la clienta" class="border p-2 rounded-md w-48">`;
  } else if (tipoFiltro === 'producto') {
    criterios.innerHTML = `<input id="filtroProducto" type="text" placeholder="Nombre del producto" class="border p-2 rounded-md w-48">`;
  } else if (tipoFiltro === 'fecha') {
    criterios.innerHTML = `<input id="filtroFechaInicio" type="date" class="border p-2 rounded-md w-36">
                           <input id="filtroFechaFin" type="date" class="border p-2 rounded-md w-36">`;
  }
}

function ordenarVentas(tipo) {
  ventas.sort((a, b) => {
    const fechaA = new Date(a.fecha);
    const fechaB = new Date(b.fecha);
    return tipo === 'reciente' ? fechaB - fechaA : fechaA - fechaB;
  });
  mostrarVentas();
}

function buscarEnTiempoReal() {
  const buscador = document.getElementById('buscadorVentas').value.toLowerCase();
  const filas = document.querySelectorAll('#tablaVentas tr');
  if (buscador) {
    document.getElementById('criteriosFiltro').innerHTML = '';
    document.getElementById('filtroTipo').value = '';
    filas.forEach(fila => {
      const textoFila = fila.innerText.toLowerCase();
      fila.style.display = textoFila.includes(buscador) ? '' : 'none';
    });
  } else {
    filtrarVentas();
  }
}

document.getElementById('filtrarClientas').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const select = document.getElementById('selectClientas');
  Array.from(select.options).forEach(option => {
    option.style.display = option.value.toLowerCase().includes(query) ? '' : 'none';
  });
});

document.getElementById('filtrarProductos').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const select = document.getElementById('selectProductos');
  Array.from(select.options).forEach(option => {
    option.style.display = option.value.toLowerCase().includes(query) ? '' : 'none';
  });
});

// --------------------------- GOOGLE CALENDAR ---------------------------
function initClient() {
  gapi.client.init({
    apiKey: 'AIzaSyAhpDHrwoFQdhbRjHrC3Jl4HFbmBOgSw0s',
    clientId: '309599233403-0ogbqe8p34a9o3oepqakrbkttgrl7eu8.apps.googleusercontent.com',
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
    scope: "https://www.googleapis.com/auth/calendar.events"
  }).then(function () {
    console.log("Google API client inicializado");
  }, function(error) {
    console.error("Error al inicializar la API", error);
  });
}
gapi.load('client:auth2', initClient);

function crearEventoGoogleCalendar(titulo, fechaInicio, descripcion) {
  var evento = {
    'summary': titulo,
    'description': descripcion,
    'start': {
      'dateTime': fechaInicio.toISOString(),
      'timeZone': 'America/Mexico_City'
    },
    'end': {
      'dateTime': new Date(fechaInicio.getTime() + 60*60*1000).toISOString(),
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
    console.log('Evento creado: ' + eventoCreado.htmlLink);
  });
}

// --------------------------- Dashboard e Indicadores ---------------------------
function actualizarDashboard() {
  // Indicadores clave
  document.getElementById('ventasTotales').textContent = ventas.length;
  let metaPorcentaje = Math.min((ventas.length / 100) * 100, 100);
  document.getElementById('metaAlcanzada').textContent = metaPorcentaje.toFixed(0) + '%';
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
  // Gráfico de Ventas Mensuales
  let ventasPorMes = {};
  ventas.forEach(v => {
    let fecha = new Date(v.fecha);
    let mesAnio = fecha.getFullYear() + '-' + String(fecha.getMonth() + 1).padStart(2, '0');
    ventasPorMes[mesAnio] = (ventasPorMes[mesAnio] || 0) + 1;
  });
  let etiquetasMes = Object.keys(ventasPorMes).sort();
  let datosMes = etiquetasMes.map(m => ventasPorMes[m]);
  let ctxVentas = document.getElementById('ventasMensualesChart').getContext('2d');
  if (window.ventasMensualesChartInstance) {
    window.ventasMensualesChartInstance.destroy();
  }
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
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
  // Gráfico de Productos Más Vendidos
  let etiquetasProd = Object.keys(productoFrecuencia);
  let datosProd = etiquetasProd.map(p => productoFrecuencia[p]);
  let ctxProductos = document.getElementById('productosVendidosChart').getContext('2d');
  if (window.productosVendidosChartInstance) {
    window.productosVendidosChartInstance.destroy();
  }
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
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
}

window.onload = function() {
  const hoy = new Date();
  const dia = String(hoy.getDate()).padStart(2, '0');
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const anio = hoy.getFullYear();
  const fechaActual = `${anio}-${mes}-${dia}`;
  document.getElementById('fechaVenta').value = fechaActual;
  mostrarProductos();
  mostrarClientas();
  mostrarBonos();
  mostrarVentas();
  mostrarSocios();
  mostrarVentasPorSocia();
  mostrarPeriodos();
  actualizarSelectProductos();
  actualizarSelectClientas();
  actualizarSelectBonos();
  cargarPeriodosEnSelector('selectPeriodoActual');
  cargarPeriodosEnSelector('selectPeriodo');
  actualizarDatosPeriodoActual();
  document.getElementById('selectProductos').addEventListener('change', actualizarPuntosPorProducto);
  actualizarDashboard();
};
