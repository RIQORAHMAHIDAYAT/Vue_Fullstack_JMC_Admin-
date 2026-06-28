<template>
  <header class="navbar navbar-expand-lg d-print-none sticky-top" id="navbar">
    <div class="container-xl justify-content">
      <button
        class="sidebar-toggler d-none d-lg-block"
        type="button"
        @click="toggleSidebar()"
      >
        <span class="sidebar-icon"></span>
      </button>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebar-menu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-nav flex-row order-md-last ms-md-auto">
        <button
          @click="toggleTheme()"
          class="nav-link px-0 btn-toggle-theme hide-theme-dark"
          title="Enable dark mode"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
          </svg>
        </button>
        <button
          @click="toggleTheme()"
          class="nav-link px-0 btn-toggle-theme hide-theme-light"
          title="Enable light mode"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
            <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path>
          </svg>
        </button>

        <div class="nav-item dropdown">
          <a
            href="#"
            class="nav-link d-flex lh-1 text-reset p-0 dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <span class="bg-primary text-white avatar rounded-circle">
              {{ initials }}
            </span>
            <div class="d-none d-xl-block ps-2">
              <div class="fw-bold">{{ user?.nama || "User" }}</div>
              <div class="mt-1 small text-primary">{{ user?.role || "" }}</div>
            </div>
          </a>
          <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <NuxtLink to="/profile" class="dropdown-item">
              Profil Saya
            </NuxtLink>
            <div class="dropdown-divider"></div>
            <a href="javascript:;" class="dropdown-item text-danger" @click="handleLogout">
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const { toggleTheme } = useTheme()
const { toggleSidebar } = useSidebar()
const { user, logout } = useAuth()
const router = useRouter()

const initials = computed(() => {
  const name = user.value?.nama || "U"
  return name.charAt(0).toUpperCase()
})

async function handleLogout() {
  await logout()
  router.push("/login")
}
</script>
