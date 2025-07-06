<template>
  <div class="glass-modal glass-strong">
    <div class="p-4 bg-transparent rounded-2xl">
      <h2 class="text-2xl font-bold mb-4 text-matte-dark">💱 Convertidor de Divisas</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1 text-matte-dark">Cantidad</label>
          <input v-model.number="amount"
                 type="number"
                 class="w-full border border-gray-300 rounded p-2 text-matte-dark bg-transparent" />
        </div>
        <div class="flex space-x-2">
          <div class="flex-1">
            <label class="block text-sm font-medium mb-1 text-matte-dark">De</label>
            <select v-model="fromCurrency" class="w-full border border-gray-300 rounded p-2 text-matte-dark bg-transparent">
              <option v-for="c in currencies" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
          <div class="flex justify-center">
            <button @click="invertir" class="hover:bg-gray300 px-4 py-2 rounded transition mt-5">
             ↔️
            </button>
          </div>
          <div class="flex-1">
            <label class="block text-sm font-medium mb-1 text-matte-dark">A</label>
            <select v-model="toCurrency" class="w-full border border-gray-300 rounded p-2 text-matte-dark bg-transparent">
              <option v-for="c in currencies" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
        </div>
        <button @click="convert"
                class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Convertir
        </button>
        <div v-if="result" class="text-center text-lg font-semibold text-matte-dark">
          Resultado: {{ result }} {{ toCurrency }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const appId = 'ddc3aaa5ca164cbdb23ce409cfaec692';
const rates = ref({});
const currencies = ref([]);
const amount = ref(1);
const fromCurrency = ref('USD');
const toCurrency = ref('EUR');
const thirdCurrency = ref("");
const result = ref('');

onMounted(async () => {
  const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${appId}`);
  const data = await response.json();
  rates.value = data.rates;
  currencies.value = Object.keys(data.rates);
});

function convert() {
  if (rates.value[fromCurrency.value] && rates.value[toCurrency.value]) {
    const usdAmount = amount.value / rates.value[fromCurrency.value];
    const converted = usdAmount * rates.value[toCurrency.value];
    result.value = converted.toFixed(2);
  }
}

function invertir(){
  thirdCurrency.value = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = thirdCurrency.value;
  if(result.value != ""){
  convert();
  }
}
</script>

<style scoped>
.text-matte-dark {
  color: #23272f;
}
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
}
@keyframes glassIn {
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}
</style>
