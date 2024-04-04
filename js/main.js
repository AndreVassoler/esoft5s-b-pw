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
