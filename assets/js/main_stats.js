// -- Conversão da API para HTML --
// Função para converter os dados do Pokémon para HTML
function convertPokeToHtml(pokemon) {
    const stats = {};
    pokemon.stats.forEach(stat => {
        stats[stat.stat.name] = stat.base_stat;
    });

    const tipoPokemon = pokemon.types[0].type.name.toLowerCase();
    document.body.classList.add(tipoPokemon);

    return `
        <div class="pokemon">
            <span class="name">${pokemon.name}</span>
            <span class="number">#${pokemon.id}</span>
        </div>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type.type.name}">${type.type.name}</li>`).join('')}
            </ol>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg">
        </div>

        <div class="stats">
            <p class="statsTitle">Base Stats</p>

            <ol class="statsDetail">
                <li>HP  ------------------------------------  ${stats.hp}</li>
                <li>Attack  -------------------------------  ${stats.attack}</li>
                <li>Defense  -----------------------------  ${stats.defense}</li>
                <li>Special Attack  ---------------------  ${stats["special-attack"]}</li>
                <li>Special Defense  -------------------  ${stats["special-defense"]}</li>
                <li>Speed  --------------------------------  ${stats.speed}</li>
            </ol>
        </div>`;
}

// Função para carregar e exibir os dados do Pokémon
async function loadPokemonData(pokeId) {
    const pokemon = await fetchPokemonData(pokeId); // Busca os dados do Pokémon
    if (pokemon) {
        const pokemonInfos = document.getElementById('pokemonStats');
        pokemonInfos.innerHTML = convertPokeToHtml(pokemon); // Exibe os dados no HTML
    }
}

// Função para obter o ID da URL
function getPokemonIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id"); // Retorna o valor do parâmetro "id"
}

// Chama a função de carregar os dados
document.addEventListener("DOMContentLoaded", () => {
    const pokemonId = getPokemonIdFromUrl();
    if (pokemonId) {
        loadPokemonData(pokemonId); // Carrega os detalhes do Pokémon certo
    }
});
