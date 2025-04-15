const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = function (offset = 0, limit = 5) {    
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonsDetails) => pokemonsDetails)

}

// Função para buscar os dados do Pokémon na API
async function fetchPokemonData(pokeId) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Erro ao buscar os dados do Pokémon");
      }
      const pokemon = await response.json();
      return pokemon;
    } catch (error) {
      console.error("Erro ao buscar os dados do Pokémon:", error);
      return null;
    }
  }