const pokemonImagen = document.querySelector(".imagen");
const pokemonNombre = document.querySelector(".nombre");
const pokemonNumero = document.querySelector(".numero");

const buttonPrev = document.querySelector(".previo");
const buttonNext = document.querySelector(".siguiente");

const form = document.querySelector(".form");
const input = document.querySelector(".input");

let numerodePokemon = 1;
// Para consumir una API con fetch existen dos formas:

// 1) fetch then catch
// es ideal para cuando queramos anidar bloques de códigos o metodos

async function fetchPokemon(pokemon) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  fetch(url)
    .then((respuesta) => {
      return respuesta.json(); // esto requiere ejecutarse dentro de un bloque de código
    })
    .then((data) => console.log(data));
}

// 2 fetch usando try catch
const fetchPokemon2 = async (pokemon) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const respuesta = await fetch(url);
    if (respuesta.status === 200) {
      const data = await respuesta.json();
      return data;
    } else {
      console.log("error " + respuesta.status + " desede el servidor");
    }
  } catch (error) {
    console.log("error al hacer la petición " + error);
  }
};

const cargaDePokemon = async (pokemon) => {
  const mypokemon = await fetchPokemon2(pokemon);

  if (mypokemon) {
    pokemonNombre.innerHTML = mypokemon.name;
    pokemonImagen.style.display = "block";
    pokemonNumero.innerHTML = mypokemon.id;
    pokemonImagen.src =
      mypokemon["sprites"]["versions"]["generation-v"]["black-white"][
        "animated"
      ]["front_default"];
    input.value = "";
    numerodePokemon = mypokemon.id;
  } else {
    pokemonImagen.style.display = "none";
    pokemonNombre.innerHTML = "No encontrado :(";
    pokemonNumero.innerHTML = "";
  }
};

/* Para que la b´´usqueda sea por número y por nombre
usaremos addEventListener()
 sintaxis === > <elemento> + . + addEventListener(type, función () => )
  */
form.addEventListener("submit", (event) => {
  event.preventDefault();
  cargaDePokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if (numerodePokemon > 1) {
    numerodePokemon -= 1;
    cargaDePokemon(numerodePokemon);
  }
});

buttonNext.addEventListener("click", () => {
  numerodePokemon += 1;
  cargaDePokemon(numerodePokemon);
});

cargaDePokemon(numerodePokemon);
