// index.js
import {
  fetchGenerationPokemon,
  fetchTypePokemon,
  fetchPokemon
} from './api.js';

import { createPokemonCard } from './card.js';

const form = document.getElementById('pokemonForm');
const cardsDiv = document.getElementById('cards');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  document.body.classList.remove('centered');
  cardsDiv.innerHTML = '';

  const numCards = +document.getElementById('numCards').value;
  const category = document.getElementById('category').value;
  const generation = document.getElementById('generation').value;

  try {
    // Fetch generation + type Pokémon in parallel
    const [genPokemon, typePokemon] = await Promise.all([
      fetchGenerationPokemon(generation),
      fetchTypePokemon(category)
    ]);

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

    // Fetch Pokémon details in parallel
    const pokemonData = await Promise.all(
      selected.map(fetchPokemon)
    );

    pokemonData.forEach(pokeData => {
      cardsDiv.appendChild(
        createPokemonCard(pokeData)
      );
    });

  } catch (err) {
    console.error(err);
    cardsDiv.innerHTML =
      '<p>Error fetching Pokémon data.</p>';
  }
});
