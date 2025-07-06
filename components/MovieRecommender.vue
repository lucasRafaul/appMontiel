<template>
  <div class="glass-modal glass-strong">
    <div class="p-4 bg-transparent rounded-2xl">
      <h2 class="text-2xl font-bold mb-4 text-matte-dark">🎬 Películas populares</h2>
      <div v-if="movies.length">
        <ul class="grid md:grid-cols-3 gap-4">
          <li v-for="movie in movies" :key="movie.id" class="bg-transparent rounded-xl p-2">
            <img
              :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path"
              :alt="movie.title"
              class="rounded mb-2 w-full"
            />
            <h3 class="font-semibold text-lg text-matte-dark">{{ movie.title }}</h3>
            <p class="text-sm text-matte-dark">{{ movie.overview.slice(0, 100) }}...</p>
          </li>
        </ul>
      </div>
      <div v-else>
        <p class="text-matte-dark">Cargando películas...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const API_KEY = 'cc71509e4590a3b774c82ac81ebfc697';
const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

const { data, pending, error } = await useFetch(url);
const movies = ref([]);

if (data.value && data.value.results) {
  movies.value = data.value.results.slice(0, 6);
}
</script>

<style scoped>
.glass-modal {
  background: rgba(35, 39, 47, 0.18);
  border-radius: 1.5rem;
  box-shadow: none;
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1.5px solid rgba(255,255,255,0.18);
  min-width: 0;
  max-width: 100%;
  animation: glassIn 0.4s cubic-bezier(.4,2,.6,1) both;
  color: #23272f;
}
.text-matte-dark {
  color: #23272f;
}
@keyframes glassIn {
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}
</style>
