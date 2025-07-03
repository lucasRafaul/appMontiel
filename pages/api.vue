<script setup>
const { data: pokemones, error } = await useFetch("https://pokeapi.co/api/v2/pokemon")

</script>

<template>
  <h1>BIENVENIDO A LA PAGINA DE LAS APIs</h1>
  <div>
    <ul>
      <li v-for="pokemon in pokemones.results" :key="pokemon.id">
        {{ pokemon.name }} - {{ pokemon.url }} 
        
      </li>
    </ul>
    
    <p v-if="error">Error: {{ error.message }}</p>
  </div>
  <NuxtLink to="/">
        ir a index
    </NuxtLink>
</template>