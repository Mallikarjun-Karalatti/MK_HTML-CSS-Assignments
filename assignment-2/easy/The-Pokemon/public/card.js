export function createPokemonCard(pokeData) {
  const card = document.createElement('div');
  card.className = 'card';

  const officialArt = pokeData.sprites.other['official-artwork'].front_default;
  const animatedSprite = pokeData.sprites.versions['generation-v']['black-white'].animated.front_default;

  card.innerHTML = `
    <h3>${pokeData.name}</h3>
    <div class="flip-container">
      <div class="flipper">
        <div class="front">
          <img src="${officialArt}" alt="${pokeData.name}" class="official-art">
        </div>
        <div class="back">
          ${
            animatedSprite
              ? `<img src="${animatedSprite}" alt="${pokeData.name}" class="animated-sprite">`
              : `<div class="fallback-animation">
                   <div class="pokeball"></div>
                   <p class="fallback-text">No animated sprite<br>available</p>
                 </div>`
          }
        </div>
      </div>
    </div>
    <p><strong>Height:</strong> ${pokeData.height}</p>
    <p><strong>Weight:</strong> ${pokeData.weight}</p>
    <div class="stats">
      <strong>Stats:</strong>
      <ul>
        ${pokeData.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
      </ul>
    </div>
  `;

  card.querySelector('.flip-container').addEventListener('click', () => {
    card.querySelector('.flipper').classList.toggle('flipped');
  });

  return card;
}
