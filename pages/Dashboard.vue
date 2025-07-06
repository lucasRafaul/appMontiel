
<template>
  <div>
    <div class="background">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <main class="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 min-h-screen relative">
    <!-- Pido usuario -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[18px] md:backdrop-blur-[32px]">
      <div class="glass-modal p-8 flex flex-col items-center gap-4">
        <h2 class="text-2xl font-bold mb-2 text-matte-dark">Bienvenido</h2>
        <input v-model="usernameInput" @keyup.enter="continueToDashboard" type="text" placeholder="Ingresa tu nombre..." class="px-4 py-2 rounded-lg border border-white/30 bg-white/30 text-lg text-matte-dark focus:outline-none focus:ring-2 focus:ring-blue-400 w-64" />
        <button @click="continueToDashboard" class="mt-2 px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">Continuar</button>
      </div>
    </div>

    <!-- Modal de bienvenida -->
    <div v-if="!showModal && username" class="md:col-span-4 flex justify-center mb-6">
      <div class="glass-modal px-10 py-6 flex flex-col items-center w-full max-w-2xl">
        <div class="text-3xl font-extrabold text-matte-dark mb-1 text-center">Bienvenido {{ username }}, hoy es {{ currentDate }}</div>
      </div>
    </div>

    <!-- Clima y pokemon -->
    <section v-if="!showModal" class="md:col-span-2 flex flex-col gap-4">
      <div class="flex flex-col gap-4">
        <div class="glass-modal glass-strong">
          <WeatherDashboard />
        </div>
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1 glass-modal glass-strong no-bg">
            <CurrencyConverter />
          </div>
          <div class="flex-1 glass-modal glass-strong no-bg">
            <PokemonSearch />
          </div>
        </div>
      </div>
    </section>

    <!-- Películas -->
    <section v-if="!showModal" class="md:col-span-2 flex">
      <div class="glass-modal glass-strong w-full scale-90 md:scale-95 no-bg">
        <MovieRecommender />
      </div>
    </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import WeatherDashboard from '@/components/WeatherDashboard.vue';
import MovieRecommender from '@/components/MovieRecommender.vue';
import CurrencyConverter from '@/components/CurrencyConverter.vue';
import PokemonSearch from '@/components/PokemonSearch.vue';
import { injectDynamicBackground } from '@/utils/dynamic-bg.js';

const showModal = ref(true);
const usernameInput = ref('');
const username = ref('');

// Fecha
const currentDate = new Date().toLocaleDateString('es-AR', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});



// Función del modal para ingreso y botón continuar
function continueToDashboard() {
  if (usernameInput.value && usernameInput.value.trim().length > 0) {
    username.value = usernameInput.value.trim();
    // Forzar reactividad y render
    setTimeout(() => {
      showModal.value = false;
      window.scrollTo(0, 0);
    }, 0);
  }
}

onMounted(() => {
  injectDynamicBackground();
});
</script>

<style scoped>
@import url('@/assets/dynamic-bg.css');
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
main {
  background: transparent;
  position: relative;
  z-index: 1;
}
/* Glass box (if used elsewhere) */
.glass-box {
  background: rgba(255, 255, 255, 0.28);
  border-radius: 1rem;
  box-shadow: 0 4px 32px 0 rgba(31, 38, 135, 0.10);
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 1.5rem;
  transition: box-shadow 0.2s;
}
/* Glassmorphism base */
/* Glassmorphism base */
/* Glassmorphism base */
.glass-modal {
  background: rgba(255,255,255,0.10);
  border-radius: 1.5rem;
  box-shadow: 0 8px 40px 0 rgba(31, 38, 135, 0.08);
  backdrop-filter: blur(32px) saturate(180%);
  -webkit-backdrop-filter: blur(32px) saturate(180%);
  border: 1.5px solid rgba(255,255,255,0.10);
  min-width: 320px;
  max-width: 90vw;
  animation: glassIn 0.4s cubic-bezier(.4,2,.6,1) both;
}
/* Stronger glass effect for API cards */
.glass-strong {
  background: rgba(255,255,255,0.07) !important;
  box-shadow: 0 8px 40px 0 rgba(31, 38, 135, 0.05) !important;
  backdrop-filter: blur(44px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(44px) saturate(180%) !important;
  border: 1.5px solid rgba(255,255,255,0.08) !important;
}
/* Modern dark-matte title color */
.text-matte-dark {
  color: #23272f;
}
@keyframes glassIn {
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}
@import url('@/assets/dynamic-bg.css');
</style>
