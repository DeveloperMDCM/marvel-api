// Copyright - MOISES-CANARIA 2023 

const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");
let validarUrl;
window.onload = () => {
    if(formulario != undefined) {

        formulario.addEventListener("submit", validarFormulario);
    }
};

function validarFormulario(e) {
  e.preventDefault(); // Previene actualizar la pagina
  obtenerVengadores(); // Llama la funcion y imprime los resultados
}


export default async function obtenerVengadores() {
  // Funcion para fetch a la api digimon Asy
  let queryString = window.location.search;
//   console.log(queryString.split('?')[1].split('=')[0]);
  const moi = queryString !== '' ? queryString.split('?')[1].split('=')[0]: '' ;
  validarUrl = moi;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get('comics') || urlParams.get('series') || urlParams.get('events') || urlParams.get('stories') // filtro por parametros de la URL
  const apikey = "d8b02dc109d7a677a61793797397e470";
  const ts = "1000";
  const hash = "15aa89127ec7f5cc41b3362aa8c68a9b";
  const url = "http://gateway.marvel.com/v1/public/characters?ts=" + ts +"&apikey=" +apikey +"&hash=" +hash;
  const comics = `http://gateway.marvel.com/v1/public/characters/${product}/comics?ts=${ts}&apikey=${apikey}&hash=${hash}`;
  const series = `http://gateway.marvel.com/v1/public/characters/${product}/series?ts=${ts}&apikey=${apikey}&hash=${hash}`;
  const events = `http://gateway.marvel.com/v1/public/characters/${product}/events?ts=${ts}&apikey=${apikey}&hash=${hash}`;
  const stories = `http://gateway.marvel.com/v1/public/characters/${product}/stories?ts=${ts}&apikey=${apikey}&hash=${hash}`;
  let response; // Espera que carguen la respuesta
  if(validarUrl === '') {
   response = await fetch(url)
  } else if(validarUrl === 'comics') {
   response = await fetch(comics)
  
  } else if(validarUrl === 'series') {
   response = await fetch(series)

  } else if(validarUrl === 'events') {
   response = await fetch(events)
  } 
    else if(validarUrl === 'stories') {
    response = await fetch(stories)
   }
  // Aqui puedes mostrar un spinner que espera que termimen de cargar los datos
  const datos = await response.json(); // Espera que finalice la respuesta
  console.log(datos.data.results);
  mostrarVengadores(datos.data.results); // llamada la funcion para imprimir los resultados
}

function mostrarVengadores(vengadores) {
  // funcion para mostrar los datos
  // Iterar sobre el arreglo de vengadores para construir el HTML en el DOM
  console.log(validarUrl, 'DESDE MOSTRSTR');
  vengadores.forEach((vengadores, i) => {
    // Ciclo para recorrer los resultados

    const { id, name, description, thumbnail, title, urls, type } = vengadores; // object destructuring para extraer los datos
    // Inner html para imprimir el resultado en el HTML
    if(validarUrl === '') {
        resultado.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4>
            <div class="fondo bg-black">
            <p class="font-bold text-center bg-black text-white"> ${name} </p>
            <p class="font-bold text-center bg-black text-white"> ${id} </p>
            <img class="w-full h-48" src="${thumbnail.path}.${thumbnail.extension}" >
            <div class="p-4 bg-gray-400">
            <details>
            <summary class="p-1 bg-sky-600 rounded font-bold text-center">Descripcion</summary>
            ${description === "" ? "Sin descripcion" : description}
            </details>
                <a class=" sm:text-sm block w-full bg-red-800 hover:bg-lime-500 text-white uppercase font-bold text-center rounded mt-5 p-1"  href="/marvel-api/html/series.html?series=${id}" target="_blank" rel="noopener noreferrer">Ver series</a>
                <a class=" sm:text-sm block w-full bg-blue-800 hover:bg-lime-500 text-white uppercase font-bold text-center rounded mt-5 p-1"  href="/marvel-api/html/comics.html?comics=${id}" target="_blank" rel="noopener noreferrer">Ver Comics</a>
                <a class=" sm:text-sm block w-full bg-black hover:bg-lime-500 text-white uppercase font-bold text-center rounded mt-5 p-1"  href="/marvel-api/html/events.html?events=${id}" target="_blank" rel="noopener noreferrer">Ver Eventos</a>
                <a class=" sm:text-sm block w-full bg-yellow-800 hover:bg-lime-500 text-white uppercase font-bold text-center rounded mt-5 p-1"  href="/marvel-api/html/stories.html?stories=${id}" target="_blank" rel="noopener noreferrer">Ver Stories</a>
            </div>
            </div>
            </div>
            
            `;
    }else if(validarUrl !== '') {
        resultado.innerHTML += `
        <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4>
        <div class="fondo bg-black">
        <p class="font-bold text-center bg-black text-white"> ${title} </p>
        <p class="font-bold text-center bg-black text-white"> ${id} </p>
        <img class="w-full h-48 bg-gray-500" src="${thumbnail === null ? '' : thumbnail.path }${thumbnail === null ? '/recursos/imagen/no.png': '.' + thumbnail.extension }" >
        <div class="p-4 bg-gray-400 break-words">
        <details>
        <a class=" sm:text-sm block w-full bg-sky-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1"  href="${urls ===  undefined || urls === null ? '' : urls[0].url}" target="_blank" rel="noopener noreferrer">Abrir url</a>
       
        <summary class="p-1 bg-sky-600 rounded font-bold text-center ">URL</summary>
       ${urls === undefined ? '' : ''}
        </details>
        <h1 class="font-bold text-center text-white p-2 mt-2">${type === '' || type === undefined ? '' : 'Tipo: ' + type } </h1>
        </div>
        </div>
        </div>
        
        `;
    }
  });
}


