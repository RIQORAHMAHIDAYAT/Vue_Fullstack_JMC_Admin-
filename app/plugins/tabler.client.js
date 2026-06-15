// plugins/tabler.client.js
// Inisialisasi @tabler/core dan jalankan custom scripts setiap navigasi

import '@tabler/core/dist/js/tabler.min.js'
import { initCustomScripts } from '~/assets/js/tabler.custom.js'

export default defineNuxtPlugin((nuxtApp) => {
  // Jalankan saat pertama kali load
  nuxtApp.hook('app:mounted', () => {
    initCustomScripts()
  })

  // Jalankan ulang setiap selesai navigasi (SPA)
  nuxtApp.hook('page:finish', () => {
    // Sedikit delay agar DOM sudah ter-render sempurna
    setTimeout(() => {
      initCustomScripts()
    }, 50)
  })
})
