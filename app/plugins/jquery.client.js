// plugins/jquery.client.js
// jQuery tersedia secara global, dibutuhkan oleh beberapa komponen Tabler

import jQuery from 'jquery'

export default defineNuxtPlugin(() => {
  if (typeof window !== 'undefined') {
    window.$ = jQuery
    window.jQuery = jQuery
  }
})
