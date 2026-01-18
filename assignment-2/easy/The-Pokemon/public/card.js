// cards.js
export function createPokemonCard(pokeData) {
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
        ${pokeData.stats
          .map(
            stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`
          )
          .join('')}
      </ul>
    </div>
  `;

  return card;
}
