/*
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const evolucao = urlParams.get("evolucao");


if (evolucao) {

  document.title = `Página do ${evolucao}`;

  const h2 = document.querySelector(`.info-pokemon`);
  const div = document.querySelector(`.img-pokemon`);

  const nameToLowerCase = evolucao.toLowerCase();

  const image = fetch(`https://pokeapi.co/api/v2/pokemon/${nameToLowerCase}`);
  

  image
    .then((response) => response.json())
    .then((data) => {
      const img = document.createElement("img");
      img.src = data.sprites.front_default;
      div.appendChild(img);
    });

  h2.textContent = `Informações sobre ${evolucao}`;
}

*/

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const evolucao = urlParams.get("evolucao");

if (evolucao) {
  document.title = `Página do ${evolucao}`;

  const h2 = document.querySelector(`.info-pokemon`);
  h2.textContent = `Informações sobre ${evolucao}`;

  const div = document.querySelector(`.img-pokemon`);
  const nameToLowerCase = evolucao.toLowerCase();
  const image = fetch(`https://pokeapi.co/api/v2/pokemon/${nameToLowerCase}`);

  image
    .then((response) => response.json())
    .then((data) => {
      const sprites = Object.values(data.sprites);
      const images = sprites.filter((sprite) => typeof sprite === "string");
      const img = document.createElement("img");
      img.src = images[0];
      div.appendChild(img);

      let index = 0;
      img.addEventListener("click", () => {
        index++;
        if (index === images.length) {
          index = 0;
        }
        img.src = images[index];
      });
    });
}

// Função para obter a data atual 
function getCurrentDate() {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hora = date.getHours();
  const minutos = date.getMinutes();
  return `${day}/${month}/${year} ${hora}:${minutos}`;
}

// Função para incrementar o contador de visitas e salvar no localStorage
function incrementVisits() {
  let visits = localStorage.getItem('visits');
  if (!visits) {
    visits = 1;
  } else {
    visits = parseInt(visits) + 1;
  }
  localStorage.setItem('visits', visits);
  localStorage.setItem('lastVisitDate', getCurrentDate());
}

// Função para exibir o contador de visitas e a última data de acesso
function displayVisitInfo() {
  const p = document.querySelector(`.contador-visita`);
  const visits = localStorage.getItem('visits') || 0;
  const lastVisitDate = localStorage.getItem('lastVisitDate') || 'Nunca acessado antes';
 
  p.textContent = `Esta página foi visitada ${visits} vezes. A última visita foi: ${lastVisitDate}`;
}







// Chama funções
incrementVisits();
displayVisitInfo();



