export function toggleProductos() {
    const contenedor = document.getElementById("productosContainer");
    if (contenedor) {
      contenedor.classList.toggle("hidden");
    }
  }
  
  export function agregarProducto() {
    alert("Producto agregado (demo)");
  }
  