const query = window.location.search;
const urlP = new URLSearchParams(query);
const evol = urlP.get("evolucao");

if (evol) {

    document.title = `Página do Pokémon ${evol}`;
    const evolToLowerCase = evol.toLowerCase();
    const h2 = document.querySelector(`.info`);
    const div = document.querySelector(`.img`);
    h2.textContent = `Informações sobre ${evol}`

    const img = fetch(`https://pokeapi.co/api/v2/pokemon/${evolToLowerCase}`);

    img.then((obj) => obj.json())
        .then((data) => {
            const sprites = Object.values(data.sprites);
            const images = sprites.filter((data) => typeof data === "string");
            const img2 = document.createElement("img");
            img2.src = images[0];
            div.appendChild(img2);

            let cont = 0;
            img2.addEventListener("click", () => {
                cont++;
                if (cont === images.length) {
                    cont = 0;
                }
                img2.src = images[cont];
            })
        })
}