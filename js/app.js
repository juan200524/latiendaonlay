// Cargar la cuadrícula de imágenes automáticamente
window.onload = function() {
  crearCuadricula(4, 5, 'https://fakestoreapi.com/products');
}

function buscar() {
  const valor = document.getElementById("pokemon").value;
  const url = "https://fakestoreapi.com/products/" + valor;

  fetch(url)
    .then(response => response.json())
    .then(data => mostrarDetallesProducto(data))
    .catch(error => console.log(error));
}

function mostrarDetallesProducto(data) {
  const detallesProducto = document.getElementById("detallesProducto");
  detallesProducto.innerHTML = "";

  const titulo = document.createElement("h2");
  titulo.textContent = data.title;

  const imagen = document.createElement("img");
  imagen.src = data.image;
  imagen.alt = data.title;
  imagen.style.width = "300px";
  imagen.style.height = "auto";

  const descripcion = document.createElement("p");
  descripcion.textContent = data.description;

  const precio = document.createElement("p");
  precio.textContent = `Precio: $${obtenerPrecioAleatorio(100000, 250000)} COP`;

  detallesProducto.appendChild(titulo);
  detallesProducto.appendChild(imagen);
  detallesProducto.appendChild(descripcion);
  detallesProducto.appendChild(precio);

  // Mostrar la sección de detalles del producto
  const cuadricula = document.getElementById("cuadricula");
  cuadricula.style.display = "none";
  detallesProducto.style.display = "block";
}

// Función para crear una cuadrícula de imágenes
function crearCuadricula(numFilas, numColumnas, apiUrl) {
  const contenedor = document.createElement('div');
  contenedor.id = "cuadricula";
  contenedor.style.display = 'grid';
  contenedor.style.gridTemplateColumns = `repeat(${numColumnas}, 1fr)`;
  contenedor.style.gap = '10px';

  fetch(apiUrl)
    .then(respuesta => respuesta.json())
    .then(datos => {
      const imagenes = datos.slice(0, numFilas * numColumnas);

      imagenes.forEach(imagen => {
        const divImagen = document.createElement('div');
        divImagen.style.textAlign = 'center';

        const img = document.createElement('img');
        img.src = imagen.image;
        img.alt = imagen.title;
        img.style.width = '200px';
        img.style.height = '200px';

        const nombreProducto = document.createElement('p');
        nombreProducto.textContent = imagen.title;

        const precioProducto = document.createElement('p');
        precioProducto.textContent = `Precio: $${obtenerPrecioAleatorio(100000, 250000)} COP`;

        divImagen.appendChild(img);
        divImagen.appendChild(nombreProducto);
        divImagen.appendChild(precioProducto);
        contenedor.appendChild(divImagen);
      });

      document.body.appendChild(contenedor);
    })
    .catch(error => console.error('Error al obtener las imágenes:', error));
}

// Función para obtener un precio aleatorio entre un rango
function obtenerPrecioAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function volverACuadricula() {
  const cuadricula = document.getElementById("cuadricula");
  const detallesProducto = document.getElementById("detallesProducto");

  cuadricula.style.display = "grid";
  detallesProducto.style.display = "none";
}