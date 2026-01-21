// api.js

const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Normalize Pokémon names so generation + type data match
 */
export function normalizeName(name) {
  return name.toLowerCase().replace(/[^a-z0-9-]/g, '');
}

/**
 * Fetch Pokémon names for a generation
 */
export async function fetchGenerationPokemon(generation) {
  const res = await fetch(`${BASE_URL}/generation/${generation}`);
  if (!res.ok) throw new Error('Failed to fetch generation');

  const data = await res.json();
  return data.pokemon_species.map(p =>
    normalizeName(p.name)
  );
}

/**
 * Fetch Pokémon names for a type
 */
export async function fetchTypePokemon(type) {
  const res = await fetch(`${BASE_URL}/type/${type}`);
  if (!res.ok) throw new Error('Failed to fetch type');

  const data = await res.json();
  return data.pokemon.map(p =>
    normalizeName(p.pokemon.name)
  );
}

/**
 * Fetch full Pokémon data
 */
export async function fetchPokemon(name) {
  const res = await fetch(`${BASE_URL}/pokemon/${name}`);
  if (!res.ok) throw new Error('Failed to fetch Pokémon');

  return res.json();
}
