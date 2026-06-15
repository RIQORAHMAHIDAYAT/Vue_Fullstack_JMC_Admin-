// plugins/apexcharts.client.js
// Registrasi vue3-apexcharts sebagai komponen global

import VueApexCharts from 'vue3-apexcharts'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueApexCharts)
  nuxtApp.vueApp.component('apexchart', VueApexCharts)
})
