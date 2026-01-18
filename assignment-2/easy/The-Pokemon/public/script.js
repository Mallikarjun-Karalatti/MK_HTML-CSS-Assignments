document.getElementById('pokemonForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const numCards = parseInt(document.getElementById('numCards').value);
  const category = document.getElementById('category').value;
  const generation = document.getElementById('generation').value;
  const cardsDiv = document.getElementById('cards');
  cardsDiv.innerHTML = '';

  if (!cardsDiv) {
    console.error("Missing #cards container in HTML");
    return;
  }

  try {
    // Helper to normalize names for comparison
    const normalize = name => name.toLowerCase().replace(/[^a-z0-9-]/g, '');

    // Get Pokémon list by generation
    const genRes = await fetch(`https://pokeapi.co/api/v2/generation/${generation}`);
    const genData = await genRes.json();
    const genPokemon = genData.pokemon_species.map(p => normalize(p.name));

    // Get Pokémon list by type
    const typeRes = await fetch(`https://pokeapi.co/api/v2/type/${category}`);
    const typeData = await typeRes.json();
    const typePokemon = typeData.pokemon.map(p => normalize(p.pokemon.name));

    // Intersection: Pokémon that are in both generation and type
    const filteredPokemon = genPokemon.filter(name => typePokemon.includes(name));

    console.log("Gen Pokémon:", genPokemon);
    console.log("Type Pokémon:", typePokemon);
    console.log("Filtered:", filteredPokemon);

    if (filteredPokemon.length === 0) {
      cardsDiv.innerHTML = '<p>No Pokémon found for this generation and type.</p>';
      return;
    }

    // Shuffle and limit to requested number
    const selectedPokemon = filteredPokemon
      .sort(() => 0.5 - Math.random())
      .slice(0, numCards);

    for (const name of selectedPokemon) {
      const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const pokeData = await pokeRes.json();

      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${pokeData.name}</h3>
        <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}">
        <p><strong>Height:</strong> ${pokeData.height}</p>
        <p><strong>Weight:</strong> ${pokeData.weight}</p>
        <div class="stats">
          <strong>Stats:</strong>
          <ul>
            ${pokeData.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
          </ul>
        </div>
      `;
      cardsDiv.appendChild(card);
    }
  } catch (err) {
    console.error(err);
    cardsDiv.innerHTML = '<p>Error fetching Pokémon data.</p>';
  }
});


// After appending each card
card.style.opacity = 0;
cardsDiv.appendChild(card);
setTimeout(() => {
  card.style.transition = "opacity 0.5s ease-in";
  card.style.opacity = 1;
}, 50);
