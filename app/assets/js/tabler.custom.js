// app/assets/js/tabler.custom.js
// Custom JS untuk Tabler — dijalankan via plugin jQuery setelah navigasi

export function initCustomScripts() {
  // ─── Toggle Password ────────────────────────────────────────────────────────
  const togglePasswords = document.querySelectorAll('.toggle-password')
  togglePasswords.forEach((el) => {
    // Hapus listener lama sebelum pasang baru (hindari duplikasi saat navigasi)
    el.replaceWith(el.cloneNode(true))
  })

  document.querySelectorAll('.toggle-password').forEach((el) => {
    el.addEventListener('click', function () {
      const input = this.parentNode.previousElementSibling
      const icon = this.querySelector('.bi')
      if (input.getAttribute('type') === 'password') {
        input.setAttribute('type', 'text')
        icon?.classList.remove('bi-eye-fill')
        icon?.classList.add('bi-eye-slash-fill')
      } else {
        input.setAttribute('type', 'password')
        icon?.classList.add('bi-eye-fill')
        icon?.classList.remove('bi-eye-slash-fill')
      }
    })
  })

  // ─── Floating Navbar ────────────────────────────────────────────────────────
  const navbar = document.querySelector('#navbar')
  if (navbar) {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      navbar.classList.toggle('float', scrollTop > 0)
    }
    handleScroll()
    window.removeEventListener('scroll', window._floatNavbarHandler)
    window._floatNavbarHandler = handleScroll
    window.addEventListener('scroll', window._floatNavbarHandler)
  }

  // ─── Check All Checkbox ─────────────────────────────────────────────────────
  const checkAll = document.querySelector('.checkall')
  if (checkAll) {
    checkAll.replaceWith(checkAll.cloneNode(true))
    document.querySelector('.checkall').addEventListener('click', function () {
      const checkboxes = document.querySelectorAll('td:first-child input[type="checkbox"]')
      checkboxes.forEach((cb) => {
        if (cb !== this) cb.checked = this.checked
      })
    })
  }

  // ─── Breadcrumb Active ──────────────────────────────────────────────────────
  // Ditangani langsung di komponen AppBreadcrumb.vue
}
