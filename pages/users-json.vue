
<template>
  <div>
    <h1>Lista de Usuarios Archivo JSON</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
    <p v-if="error">Error: {{ error.message }}</p>
  </div>
  <NuxtLink to="/">
        ir a index
  </NuxtLink>
</template>

<script setup>
// Importar el método useFetch de Nuxt 3 para realizar una solicitud de red
const { data: users, error } = await useFetch("/users.json");
</script>
