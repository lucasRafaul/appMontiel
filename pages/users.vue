<template>
  <div>
    <h1>Lista de Usuarios variable JSON local</h1>
    <ul>
      <li v-for="user in localUsers" :key="user.id">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
  </div>
  <NuxtLink to="/">
        ir a index
  </NuxtLink>
</template>

<script setup>
// 1. Mostrar datos desde una variable JSON en la misma página
const localUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com" },
];
</script>
