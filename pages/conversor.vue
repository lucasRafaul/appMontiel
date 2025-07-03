<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
    <h1 class="text-3xl md:text-5xl font-bold mb-8 text-center">
      Convertidor de Divisas
    </h1>
    <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Cantidad</label>
        <input v-model.number="amount"
               type="number"
               class="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div class="flex space-x-2">
        <div class="flex-1">
          <label class="block text-sm font-medium mb-1">De</label>
          <select v-model="fromCurrency"
                  class="w-full border border-gray-300 rounded p-2">
            <option v-for="c in currencies" :key="c" :value="c">
              {{ c }}
            </option>
          </select>
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium mb-1">A</label>
          <select v-model="toCurrency"
                  class="w-full border border-gray-300 rounded p-2">
            <option v-for="c in currencies" :key="c" :value="c">
              {{ c }}
            </option>
          </select>
        </div>
      </div>
      <button @click="convert"
              class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        Convertir
      </button>
      <div v-if="result"
           class="mt-4 text-center text-lg font-semibold text-gray-700">
        Resultado: {{ result }} {{ toCurrency }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getValores } from "@/services/obtenerValores.vue";

const appId = "ddc3aaa5ca164cbdb23ce409cfaec692";
const rates = ref({});
const currencies = ref([]);
const amount = ref(1);
const fromCurrency = ref("USD");
const toCurrency = ref("EUR");
const result = ref("");

onMounted(async () => {
  const data = await getValores(appId);
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
</script>