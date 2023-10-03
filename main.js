const pokemonImagen = document.querySelector(".imagen");
const pokemonParaAtrapar = document.querySelector(".pokemon-para-atrapa");
const pokemonNombre = document.querySelector(".nombre");
const pokemonNumero = document.querySelector(".numero");

const buttonPrev = document.querySelector(".previo");
const buttonNext = document.querySelector(".siguiente");

const buttonAtrapar = document.querySelector(".btn-atrapar");

const form = document.querySelector(".form");
const input = document.querySelector(".input");

let numerodePokemon = Math.floor(Math.random() * 631);

const pokemonStorage = localStorage.getItem("lista");
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
  document.querySelector(".pokeball").style.display = "none";
  buttonAtrapar.style.display = "block";

  if (mypokemon) {
    pokemonNombre.innerHTML = mypokemon.name;
    pokemonImagen.style.display = "block";
    pokemonNumero.innerHTML = mypokemon.id;
    pokemonImagen.src =
      mypokemon["sprites"]["versions"]["generation-v"]["black-white"][
        "animated"
      ]["front_default"];
    pokemonParaAtrapar.src =
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

buttonAtrapar.addEventListener("click", () => {
  var storage = localStorage.getItem("lista");
  buttonAtrapar.style.display = "none";
  document.querySelector(".pokeball").style.display = "block";
  var img = pokemonImagen.src; // ==> llamo a la imagen del pokemon
  var nombre = pokemonNombre.innerHTML; // ==> llamo al Nombre del pokemon
  // let lista = []; // ==> Declaro una Array sin nada
  let lista = storage ? JSON.parse(storage) : []; // operador ternario
  let myObj = new Object(); // ==> { }
  myObj["nombre"] = nombre; // ==> { 'nombre' : valor }
  myObj["src"] = img; // ==> { 'nombre' : valor , src : valor }
  lista.push(myObj); // ==> la agrego a la lista myObj ==> [ { 'nombre' : valor , src : valor } ]
  localStorage.setItem("lista", JSON.stringify(lista)); // ===> no tiene retorno

  cargaDeLista(JSON.stringify(lista));
});

const cargaDeLista = (storage) => {
  if (storage) {
    let lista = storage ? JSON.parse(storage) : [];
    let ol = document.querySelector("#listapokemon");
    // document.getElementByID('listapokemon');

    ol.innerHTML = ""; // =======> dejar el elemento UL sin nada
    lista.forEach((elemento) => {
      // [array].forEach(<elemento> => { bloque })
      let img = document.createElement("img"); // ====> creo la imagen
      img.className = "imagen-en-lista"; //===========> le doy una clase a la imagen
      img.src = elemento.src; //======================> le asigno una src (url)

      let span = document.createElement("span"); //===> creo el elemento span
      span.className = "badge rounded-pill"; //=======> le asigno una clase al span

      span.appendChild(img); //========================> le inserto la image al span

      let div = document.createElement("div"); //===== > crear elemento DIV
      div.className = "ms-2 me-auto";
      div.innerHTML = elemento.nombre;

      let li = document.createElement("li");
      li.className =
        "list-group-item d-flex justify-content-between align-items-start";

      li.appendChild(div);
      li.appendChild(span);

      ol.appendChild(li);
    });
  }
};

function clearStage() {
  let ol = document.getElementById("listapokemon");
  ol.innerHTML = "";
  localStorage.removeItem("lista");
}

cargaDeLista(pokemonStorage);
cargaDePokemon(numerodePokemon);
