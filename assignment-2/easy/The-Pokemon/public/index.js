// main.js
import { createPokemonCard } from './card.js';


const form = document.getElementById('pokemonForm');
const cardsDiv = document.getElementById('cards');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Switch layout state
  document.body.classList.remove('centered');

  cardsDiv.innerHTML = '';

  const numCards = +document.getElementById('numCards').value;
  const category = document.getElementById('category').value;
  const generation = document.getElementById('generation').value;

  try {
    const normalize = name =>
      name.toLowerCase().replace(/[^a-z0-9-]/g, '');

    // Fetch generation Pokémon
    const genRes = await fetch(
      `https://pokeapi.co/api/v2/generation/${generation}`
    );
    const genData = await genRes.json();
    const genPokemon = genData.pokemon_species.map(p =>
      normalize(p.name)
    );

    // Fetch type Pokémon
    const typeRes = await fetch(
      `https://pokeapi.co/api/v2/type/${category}`
    );
    const typeData = await typeRes.json();
    const typePokemon = typeData.pokemon.map(p =>
      normalize(p.pokemon.name)
    );

    // Intersection
    const filtered = genPokemon.filter(name =>
      typePokemon.includes(name)
    );

    if (filtered.length === 0) {
      cardsDiv.innerHTML =
        '<p>No Pokémon found for this selection.</p>';
      return;
    }

    const selected = filtered
      .sort(() => 0.5 - Math.random())
      .slice(0, numCards);

    for (const name of selected) {
      const pokeRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      const pokeData = await pokeRes.json();

      const card = createPokemonCard(pokeData);
      cardsDiv.appendChild(card);
    }
  } catch (err) {
    console.error(err);
    cardsDiv.innerHTML = '<p>Error fetching Pokémon data.</p>';
  }
});
