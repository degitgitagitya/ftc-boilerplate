const URL = 'https://pokeapi.co/api/v2/'

const ASSETS_URL = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'

const pokemonListElement = document.querySelector('#pokemon-list')

const searchPokemonElement = document.querySelector('#search-pokemon-input')

const searchPokemonButtonElement = document.querySelector(
    '#search-pokemon-button'
)

let pokemonList = null

let filteredPokemonList = null

const pokemonCard = (name, imageUrl) => {
    return `
        <div
            class="rounded-md shadow-md w-full p-4 bg-white flex flex-col items-center gap-2"
        >
            <img
                src="${imageUrl}"
                alt="${name}"
                class="w-48 h-48 object-contain"
            />
            <h3 class="text-xl font-semibold">${name}</h3>
        </div>
    `
}

const renderPokemonList = () => {
    if (!filteredPokemonList) return

    pokemonListElement.innerHTML = filteredPokemonList
        .map((pokemon, index) =>
            pokemonCard(
                pokemon.name,
                `${ASSETS_URL}${('00' + (index + 1)).slice(-3)}.png`
            )
        )
        .join('')
}

const fetchPokemonList = () => {
    fetch(
        `${URL}pokemon?${new URLSearchParams({
            limit: 100,
            offset: 0,
        })}`
    )
        .then((response) => response.json())
        .then((data) => {
            pokemonList = data.results
            filteredPokemonList = data.results
            renderPokemonList()
        })
}

const searchPokemonList = () => {
    filteredPokemonList = pokemonList.filter((pokemon) =>
        pokemon.name.includes(searchPokemonElement.value)
    )
    renderPokemonList()
}

searchPokemonElement.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchPokemonList()
    }
})
searchPokemonButtonElement.addEventListener('click', searchPokemonList)

fetchPokemonList()
