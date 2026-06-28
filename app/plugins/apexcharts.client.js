// plugins/apexcharts.client.js
// Registrasi vue3-apexcharts sebagai komponen global
// Cukup gunakan .use() saja — sudah otomatis mendaftarkan komponen 'apexchart' secara global

import VueApexCharts from 'vue3-apexcharts'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueApexCharts)
})
