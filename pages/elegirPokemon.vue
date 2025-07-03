<script setup>

const pokemonNombre = ref('')
const selectedPokemon = ref(null)
const error = ref(null)

const fetchPokemon = async () => {
  const nombre = pokemonNombre.value.trim().toLowerCase()
  error.value = null
  selectedPokemon.value = null

  try {

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
    if (!res.ok) throw new Error('No se encontró el Pokémon')
    const data = await res.json()

    const speciesRes = await fetch(data.species.url)
    const speciesData = await speciesRes.json()

    selectedPokemon.value = {
      name: data.nombre,
      sprite: data.sprites.other.showdown.front_shiny,
      generation: speciesData.generation.name,
    }
  } catch (err) {
    error.value = err
  }
}
</script>

<template>
  <h1>BIENVENIDO A LA PAGINA DE LAS APIs</h1>

  <div>
    <input v-model="pokemonNombre" placeholder="Escribe un nombre de Pokémon..." />
    <button @click="fetchPokemon">Buscar Pokémon</button>

    <div v-if="selectedPokemon">
      <h2>{{ selectedPokemon.name }}</h2>
      <img :src="selectedPokemon.sprite" alt="Pokemon Sprite" />
      <p>Generación: {{ selectedPokemon.generation }}</p>
    </div>

    <p v-if="error">Error: {{ error.message }}</p>
  </div>

  <NuxtLink to="/">Ir a index</NuxtLink>
</template>