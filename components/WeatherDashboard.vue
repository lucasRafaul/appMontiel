<template>
  <div class="weather-glass-modal">
    <div class="weather-title">
      <span class="main-title">Clima de Argentina</span>
    </div>
    <div class="weather-main-grid">
      <!-- Columna de estados del clima -->
      <aside class="weather-status-col">
        <div class="weather-status-card" :class="{ active: weatherType === 'sunny' }">
          <span class="weather-icon">☀️</span>
          Soleado
          <span v-if="weatherType === 'sunny'" class="check">✔️</span>
        </div>
        <div class="weather-status-card" :class="{ active: weatherType === 'cloudy' }">
          <span class="weather-icon">⛅</span>
          Nublado
          <span v-if="weatherType === 'cloudy'" class="check">✔️</span>
        </div>
        <div class="weather-status-card" :class="{ active: weatherType === 'rainy' }">
          <span class="weather-icon">🌧️</span>
          Lluvia
          <span v-if="weatherType === 'rainy'" class="check">✔️</span>
        </div>
        <div class="weather-status-card" :class="{ active: weatherType === 'storm' }">
          <span class="weather-icon">⛈️</span>
          Tormenta
          <span v-if="weatherType === 'storm'" class="check">✔️</span>
        </div>
      </aside>
      <!-- Columna de datos -->
      <section class="weather-data-col">
        <div class="mini-data-card temp">
          <div class="mini-icon">🌡️</div>
          <div>
            <div class="mini-title">Temp. actual</div>
            <div class="mini-value">
              <span v-if="clima">{{ clima.current.temperature_2m }} °C</span>
              <span v-else>Cargando...</span>
            </div>
          </div>
        </div>
        <div class="mini-data-card app-temp">
          <div class="mini-icon">🤗</div>
          <div>
            <div class="mini-title">Sensación térmica</div>
            <div class="mini-value">
              <span v-if="clima">{{ clima.current.apparent_temperature }} °C</span>
              <span v-else>Cargando...</span>
            </div>
          </div>
        </div>
        <div class="mini-data-card humidity">
          <div class="mini-icon">💧</div>
          <div>
            <div class="mini-title">Humedad</div>
            <div class="mini-value">
              <span v-if="clima">{{ clima.current.relative_humidity_2m }} %</span>
              <span v-else>Cargando...</span>
            </div>
          </div>
        </div>
        <div class="mini-data-card wind">
          <div class="mini-icon">💨</div>
          <div>
            <div class="mini-title">Viento</div>
            <div class="mini-value">
              <span v-if="clima">{{ clima.current.wind_speed_10m }} km/h</span>
              <span v-else>Cargando...</span>
            </div>
          </div>
        </div>
        <div class="mini-data-card rain">
          <div class="mini-icon">🌦️</div>
          <div>
            <div class="mini-title">Precipitación</div>
            <div class="mini-value">
              <span v-if="clima">{{ clima.current.precipitation }} mm</span>
              <span v-else>Cargando...</span>
            </div>
          </div>
        </div>
        <div class="mini-data-card day">
          <div class="mini-icon">🕒</div>
          <div>
            <div class="mini-title">¿Es de día?</div>
            <div class="mini-value">
              <span v-if="clima">{{ clima.current.is_day ? 'Sí' : 'No' }}</span>
              <span v-else>Cargando...</span>
            </div>
          </div>
        </div>
      </section>
    </div>
    <footer class="weather-footer">
      <small>
        Datos de clima provistos por
        <a href="https://open-meteo.com/" target="_blank">Open-Meteo</a>
      </small>
    </footer>
  </div>
</template>

<script setup>
// Utilizamos el método useFetch para hacer una solicitud HTTP a una API externa de clima.
const { data: clima, error } = await useFetch(
  "https://api.open-meteo.com/v1/forecast?latitude=-27.46056&longitude=-58.98389&current=is_day,temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,precipitation&timezone=auto&past_days=1"
);

// Detectar el tipo de clima para el fondo
import { computed } from 'vue';
const weatherType = computed(() => {
  if (!clima.value) return '';
  const temp = clima.value.current.temperature_2m;
  const rain = clima.value.current.precipitation;
  if (rain > 5) return 'storm';
  if (rain > 0) return 'rainy';
  if (temp >= 25) return 'sunny';
  if (temp < 25 && temp > 10) return 'cloudy';
  return 'cloudy';
});
</script>

<style scoped>
/* Glassmorphism effect for the main container */
.weather-glass-modal {
  border-radius: 1.5rem;
  padding: 2rem;
  margin: auto;
  max-width: 100%;
  min-width: 0;
  background: rgba(35, 39, 47, 0.18);
  box-shadow: none;
  backdrop-filter: blur(32px) saturate(180%);
  -webkit-backdrop-filter: blur(32px) saturate(180%);
  border: 1.5px solid rgba(255,255,255,0.18);
  animation: glassIn 0.4s cubic-bezier(.4,2,.6,1) both;
  color: #23272f;
}
@keyframes glassIn {
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}
/* ...rest of your weather component styles (copy from your previous CSS for .weather-title, .weather-main-grid, etc.) ... */
.weather-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 2.1rem;
  font-weight: bold;
  color: #1976d2;
  margin-bottom: 18px;
  text-shadow: 0 2px 12px #fff8, 0 1px 0 #fff;
  letter-spacing: 1px;
}
.weather-title .emoji {
  font-size: 2.2rem;
  filter: drop-shadow(0 2px 4px #fff8);
}
.weather-title .main-title {
  font-family: 'Segoe UI', Arial, sans-serif;
  font-size: 2.1rem;
  font-weight: bold;
  color: #1976d2;
  margin: 0 6px;
}
.weather-main-grid {
  display: flex;
  gap: 32px;
  max-width: 800px;
  width: 100%;
  margin: 20px 0 0 0;
}
.weather-status-col {
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 170px;
}
.weather-status-card {
  background: rgba(35, 39, 47, 0.13);
  border-radius: 12px;
  box-shadow: none;
  padding: 18px 14px;
  color: #23272f;
  font-weight: 500;
  font-size: 1.08rem;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: border 0.2s, background 0.2s, box-shadow 0.2s;
  position: relative;
}
.weather-status-card.active {
  border: 2px solid #1976d2;
  background: rgba(35, 39, 47, 0.18);
  box-shadow: none;
}
.check {
  margin-left: 6px;
  font-size: 1.2rem;
}
.weather-data-col {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 16px;
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;
}
.mini-data-card {
  min-width: 150px;
  flex: 1 1 150px;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(25, 118, 210, 0.18);
  padding: 14px 12px;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  border-left: 8px solid #1976d2;
  transition: box-shadow 0.2s, border-color 0.2s;
}
.mini-data-card.temp { border-left-color: #42a5f5; background: rgba(35, 39, 47, 0.13); }
.mini-data-card.app-temp { border-left-color: #00bcd4; background: rgba(35, 39, 47, 0.13); }
.mini-data-card.humidity { border-left-color: #1976d2; background: rgba(35, 39, 47, 0.13); }
.mini-data-card.rain { border-left-color: #0288d1; background: rgba(35, 39, 47, 0.13); }
.mini-data-card.visibility { border-left-color: #1565c0; background: rgba(35, 39, 47, 0.13); }
.mini-data-card.wind { border-left-color: #1976d2; background: rgba(35, 39, 47, 0.13); }
.mini-data-card.day { border-left-color: #ffd54f; background: rgba(35, 39, 47, 0.13); }
.mini-icon {
  font-size: 1.7rem;
}
.mini-title {
  font-size: 1.02rem;
  font-weight: 600;
  color: #1976d2;
}
.mini-value {
  font-size: 1.08rem;
  color: #333;
}
.weather-footer {
  text-align: center;
  margin-top: 32px;
  color: #888;
  font-size: 0.95rem;
}
.weather-footer a {
  color: #1976d2;
  text-decoration: none;
}
.weather-footer a:hover {
  text-decoration: underline;
}
</style>
