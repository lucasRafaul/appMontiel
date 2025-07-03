<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
    <NuxtLink to="/api" >
        ir a la api
    </NuxtLink>
    <NuxtLink to="/users" >
        Ir a la api con usuarios falsos.
    </NuxtLink>
    <NuxtLink to="/users-json" >
        Ir a la api con usuarios falsos traidos de un archivo JSON
    </NuxtLink>
    <NuxtLink to="/elegirPokemon" >
        ir a la api donde puedes elegir un pokemon!
    </NuxtLink>
    <NuxtLink to="/conversor" >
        CONVERSOR DE DIVISAS
    </NuxtLink>
    
  </div>
</template>