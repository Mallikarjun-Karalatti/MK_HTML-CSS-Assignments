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
  document.getElementById('message').innerHTML = ''; // clear old message

  const numCards = +document.getElementById('numCards').value;
  const category = document.getElementById('category').value;
  const generation = document.getElementById('generation').value;

  try {
    const [genPokemon, typePokemon] = await Promise.all([
      fetchGenerationPokemon(generation),
      fetchTypePokemon(category)
    ]);

    const filtered = genPokemon.filter(name =>
      typePokemon.includes(name)
    );

    if (filtered.length === 0) {
      document.getElementById('message').innerHTML =
        `<div class="message error">No Pokémon found for Generation ${generation} of ${category} type.</div>`;
      return;
    }

    const selected = filtered
      .sort(() => 0.5 - Math.random())
      .slice(0, numCards);

    // Show info if fewer than requested
    if (selected.length < numCards) {
      document.getElementById('message').innerHTML =
        `<div class="message info">
           Only ${selected.length} cards available for Generation ${generation} of ${category} type.
         </div>`;
    }

    const pokemonData = await Promise.all(
      selected.map(fetchPokemon)
    );

    pokemonData.forEach(pokeData => {
      cardsDiv.appendChild(createPokemonCard(pokeData));
    });

  } catch (err) {
    console.error(err);
    document.getElementById('message').innerHTML =
      '<div class="message error">Error fetching Pokémon data.</div>';
  }
});
