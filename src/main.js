const API_URL = 'https://rickandmortyapi.com/api/character/';
const characterList = document.getElementById('character-list');
const inputBusqueda = document.getElementById('casilla-busqueda');

function crearTarjeta(personaje) {
  return `
    <div class="card">
      <img src="${personaje.image}" alt="${personaje.name}" />
      <h3>${personaje.name}</h3>
      <p>${personaje.species}</p>
    </div>
  `;
}

function mostrarPersonajes(personajes) {
  if (!personajes.length) {
    characterList.innerHTML = `<p>No se encontraron personajes 😥</p>`;
    return;
  }

  characterList.innerHTML = personajes.map(crearTarjeta).join('');
}

function mostrarError(mensaje) {
  characterList.innerHTML = `<p style="color:red;">${mensaje}</p>`;
}

async function buscarPersonajes(nombre = '') {
  try {
    const respuesta = await fetch(`${API_URL}?name=${nombre}`);
    if (!respuesta.ok) throw new Error('Personaje no encontrado');
    const data = await respuesta.json();
    mostrarPersonajes(data.results);
  } catch (error) {
    mostrarError(error.message);
  }
}

inputBusqueda.addEventListener('input', (e) => {
  const nombre = e.target.value.trim();
  buscarPersonajes(nombre);
});

buscarPersonajes();

