<template>
  <div :class="['weather-bg', weatherType]">
    <div class="weather-title">
      <span class="emoji">🇦🇷</span>
      <span class="emoji">☀️</span>
      <span class="main-title">Clima de Argentina</span>
      <span class="emoji">🌧️</span>
      <span class="emoji">⛅</span>
    </div>
    <div class="weather-main-grid">
      <!-- Columna de estados del clima -->
      <aside class="weather-status-col">
        <div
          class="weather-status-card"
          :class="{ active: weatherType === 'sunny' }"
        >
          <span class="weather-icon">☀️</span>
          Soleado
          <span v-if="weatherType === 'sunny'" class="check">✔️</span>
        </div>
        <div
          class="weather-status-card"
          :class="{ active: weatherType === 'cloudy' }"
        >
          <span class="weather-icon">⛅</span>
          Nublado
          <span v-if="weatherType === 'cloudy'" class="check">✔️</span>
        </div>
        <div
          class="weather-status-card"
          :class="{ active: weatherType === 'rainy' }"
        >
          <span class="weather-icon">🌧️</span>
          Lluvia
          <span v-if="weatherType === 'rainy'" class="check">✔️</span>
        </div>
        <div
          class="weather-status-card"
          :class="{ active: weatherType === 'storm' }"
        >
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
              <span v-if="clima">{{ clima.hourly.temperature_2m.at(-1) }} °C</span>
              <span v-else>Cargando...</span>
            </div>
          </div>
        </div>
        <div class="mini-data-card app-temp">
          <div class="mini-icon">🤗</div>
          <div>
            <div class="mini-title">Sensación térmica</div>
            <div class="mini-value">
              <span v-if="clima">{{ clima.hourly.apparent_temperature.at(-1) }} °C</span>
              <span v-else>Cargando...</span>
            </div>
          </div>
        </div>
        <div class="mini-data-card humidity">
          <div class="mini-icon">💧</div>
          <div>
            <div class="mini-title">Humedad</div>
            <div class="mini-value">
              <span v-if="clima">{{ clima.hourly.relative_humidity_2m.at(-1) }} %</span>
              <span v-else>Cargando...</span>
            </div>
          </div>
        </div>
        <div class="mini-data-card rain">
          <div class="mini-icon">🌦️</div>
          <div>
            <div class="mini-title">Precipitación</div>
            <div class="mini-value">
              <span v-if="clima">{{ clima.hourly.precipitation.at(-1) }} mm</span>
              <span v-else>Cargando...</span>
            </div>
          </div>
        </div>
        <div class="mini-data-card visibility">
          <div class="mini-icon">👁️</div>
          <div>
            <div class="mini-title">Visibilidad</div>
            <div class="mini-value">
              <span v-if="clima">{{ clima.hourly.visibility.at(-1) }} m</span>
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
  "https://api.open-meteo.com/v1/forecast?latitude=-34&longitude=-64&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,visibility&timezone=auto"
);

// Detectar el tipo de clima para el fondo
import { computed } from 'vue';
const weatherType = computed(() => {
  if (!clima.value) return '';
  const temp = clima.value.hourly.temperature_2m.at(-1);
  const rain = clima.value.hourly.precipitation.at(-1);
  if (rain > 5) return 'storm';
  if (rain > 0) return 'rainy';
  if (temp >= 25) return 'sunny';
  if (temp < 25 && temp > 10) return 'cloudy';
  return 'cloudy';
});
</script>

<style scoped>
.weather-bg {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: background 0.6s;
}
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
.weather-bg.sunny {
  background: linear-gradient(135deg, #ffe082 0%, #ffd54f 100%);
}
.weather-bg.cloudy {
  background: linear-gradient(135deg, #90caf9 0%, #b0bec5 100%);
}
.weather-bg.rainy {
  background: linear-gradient(135deg, #64b5f6 0%, #90caf9 100%);
}
.weather-bg.storm {
  background: linear-gradient(135deg, #616161 0%, #1976d2 100%);
}
.weather-main-grid {
  display: flex;
  gap: 32px;
  max-width: 700px;
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
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 18px rgba(25, 118, 210, 0.13);
  padding: 18px 14px;
  color: #1976d2;
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
  background: #bbdefb;
  box-shadow: 0 6px 24px #1976d2aa;
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
  min-width: 170px;
  flex: 1 1 170px;
  background: #e3f2fd;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(25, 118, 210, 0.13);
  padding: 14px 12px;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  border-left: 8px solid #1976d2;
  transition: box-shadow 0.2s, border-color 0.2s;
}
.mini-data-card.temp { border-left-color: #42a5f5; background: #e3f2fd; }
.mini-data-card.app-temp { border-left-color: #00bcd4; background: #e0f7fa; }
.mini-data-card.humidity { border-left-color: #1976d2; background: #e8eaf6; }
.mini-data-card.rain { border-left-color: #0288d1; background: #e1f5fe; }
.mini-data-card.visibility { border-left-color: #1565c0; background: #f3fafe; }
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
.weather-type-title {
  font-size: 1.08rem;
  font-weight: 600;
  margin-bottom: 2px;
}
.weather-type-desc {
  font-size: 0.97rem;
  color: #555;
}
.weather-icon {
  font-size: 2rem;
}
.hourly-list {
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.mini-list .hourly-item {
  font-size: 0.95rem;
  padding: 1px 0;
  border-bottom: 1px dashed #bbdefb;
}
.hourly-item {
  display: flex;
  justify-content: space-between;
}
.hourly-time {
  color: #1976d2;
  font-weight: 500;
  width: 48px;
}
.hourly-temp {
  color: #333;
  font-weight: 400;
}
.more-data {
  color: #888;
  font-size: 0.9rem;
  margin-top: 2px;
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