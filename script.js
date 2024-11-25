// Elementos a utilizar
const NumeroPokemon = document.querySelector(".Numero_Pokemon");
const NombrePokemon = document.querySelector(".Nombre_Pokemon");
const ImagenPokemon = document.querySelector(".Imagen_Pokemon");
const form = document.querySelector("form");
const input = document.querySelector(".input_search");
const buttonAnt = document.querySelector(".btn-Ant");
const buttonSig = document.querySelector(".btn-Sig");

//Para hacer que el Pokémon con ID número 1 siempre se muestre primero
let BuscarPokemon = 1;

// Conectamos con la API de pokemon
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (APIResponse.status == 200) {
    const data = await APIResponse.json();
    return data;
  }
};

// Visualizamos a los pokemon
// Visualizamos a los pokemon
const renderPokemon = async (pokemon) => {
  // Mostramos el nombre antes de buscar
  NombrePokemon.innerHTML = "Cargando...";
  NumeroPokemon.innerHTML = "";

  const data = await fetchPokemon(pokemon);

  // Conectamos los elementos con el código superior
  if (data) {
    // Tomar solo la parte del nombre antes del guion, si existe
    const nombreLimpio = data.name.split("-")[0];
    NombrePokemon.innerHTML = nombreLimpio;
    NumeroPokemon.innerHTML = data.id;
    ImagenPokemon.style.display = "block";
    ImagenPokemon.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
    input.value = "";
    BuscarPokemon = data.id;
  } else {
    ImagenPokemon.style.display = "none";
    NombrePokemon.innerHTML = "No funciona";
    NumeroPokemon.innerHTML = "";
  }
};


// Para que la barra de búsqueda pueda buscar el nombre o el ID
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const pokemon = input.value.toLowerCase();

  if (isNaN(pokemon) || (pokemon >= 1 && pokemon <= 649)) {
    renderPokemon(pokemon);
  } else {
    NombrePokemon.innerHTML = "Fuera de rango (1-649)";
    NumeroPokemon.innerHTML = "";
    ImagenPokemon.style.display = "none";
  }
});

// Botón anterior
buttonAnt.addEventListener("click", () => {
  if (BuscarPokemon > 1) {
    BuscarPokemon -= 1;
  } else {
    BuscarPokemon = 649; // Si estás en el primer Pokémon, ir al último.
  }
  renderPokemon(BuscarPokemon);
});

buttonSig.addEventListener("click", () => {
  if (BuscarPokemon < 649) {
    BuscarPokemon += 1;
  } else {
    BuscarPokemon = 1; // Si estás en el último Pokémon, ir al primero.
  }
  renderPokemon(BuscarPokemon);
});

// Hacer aparecer el primer Pokémon
renderPokemon(BuscarPokemon);
