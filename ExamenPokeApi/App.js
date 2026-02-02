const pokemon = document.getElementById("inputSearch");
const search = document.getElementById("search");
const mainContainer = document.getElementById("mainContainer");

search.addEventListener("click", async () => {
    const pokeId = pokemon.value;

    if(pokeId === "") {
        mainContainer.innerHTML = "";
        const divAlert = document.createElement("div");
        divAlert.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="https://images.wikidexcdn.net/mwuploads/wikidex/thumb/2/2e/latest/20171012163310/RotomDex_USUL.png/280px-RotomDex_USUL.png" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">¡ERROR!</h5>
                <p class="card-text">Pokemon no encontrado</p>
            </div>
        </div>
        `;
        mainContainer.classList.remove("mainContainer");
        mainContainer.classList.add("mainContainerActive");
        mainContainer.appendChild(divAlert);
    }else{
        mainContainer.innerHTML = "";
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
        if(!response.ok){
            mainContainer.innerHTML = "";
            const divAlertError = document.createElement("div");
            divAlertError.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="https://images.wikidexcdn.net/mwuploads/wikidex/thumb/2/2e/latest/20171012163310/RotomDex_USUL.png/280px-RotomDex_USUL.png" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">¡ERROR!</h5>
                    <p class="card-text">Ocurrió un error al buscar el Pokémon</p>
                </div>
            </div>
            `;
            mainContainer.classList.remove("mainContainer");
            mainContainer.classList.add("mainContainerActive");
            mainContainer.appendChild(divAlertError);
        }else{
            const data = await response.json();
            console.log(data);
            const datosUrl = data.species.url;

            const responseInfo =await fetch(`${datosUrl}`);
            const dataInfo = await responseInfo.json();
            console.log(dataInfo);

            const divContent = document.createElement("div");

            const PokeInfo = dataInfo.flavor_text_entries.find(entry => entry.language.name === "es")?.flavor_text;
            divContent.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${data.sprites.front_default}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">#${data.id} ${data.name}</h5>
                    <p class="card-text">${PokeInfo}</p>
                </div>
            </div>
            `;

            mainContainer.classList.remove("mainContainer");
            mainContainer.classList.add("mainContainerActive");
            mainContainer.appendChild(divContent);
        }
    }
});