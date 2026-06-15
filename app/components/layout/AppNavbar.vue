<template>
  <div class="sticky-top" id="navbar">
    <header class="navbar navbar-expand-md d-none d-lg-flex d-print-none">
      <div class="container-xl">
        <!-- Sidebar Toggler -->
        <button
          class="navbar-toggler sidebar-toggler"
          type="button"
          @click="toggleSidebar"
          aria-label="Toggle sidebar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Search (opsional) -->
        <div class="navbar-nav flex-row order-md-last">
          <!-- Dark Mode Toggle -->
          <div class="nav-item d-none d-md-flex me-3">
            <div class="btn-list">
              <button
                class="btn btn-toggle-theme btn-icon"
                :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
                @click="toggleTheme"
              >
                <i v-if="isDark" class="ti ti-sun"></i>
                <i v-else class="ti ti-moon"></i>
              </button>
            </div>
          </div>

          <!-- Notification -->
          <div class="nav-item dropdown me-2">
            <a
              href="#"
              class="nav-link px-0"
              data-bs-toggle="dropdown"
              tabindex="-1"
              aria-label="Show notifications"
            >
              <i class="ti ti-bell icon"></i>
              <span class="badge bg-red"></span>
            </a>
            <div
              class="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card"
            >
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Notifikasi</h3>
                </div>
                <div class="list-group list-group-flush list-group-hoverable">
                  <div class="list-group-item">
                    <div class="row align-items-center">
                      <div class="col-auto">
                        <span
                          class="status-dot status-dot-animated bg-red d-block"
                        ></span>
                      </div>
                      <div class="col text-truncate">
                        <p class="text-body d-block mb-0">
                          Belum ada notifikasi.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- User Profile Dropdown -->
          <div class="nav-item dropdown">
            <a
              href="#"
              class="nav-link d-flex lh-1 text-reset p-0"
              data-bs-toggle="dropdown"
              aria-label="Open user menu"
            >
              <span class="avatar avatar-sm">
                <i class="ti ti-user" style="font-size: 1.25rem"></i>
              </span>
              <div class="d-none d-xl-block ps-2">
                <div>Administrator</div>
                <div class="mt-1 small text-secondary">admin@example.com</div>
              </div>
            </a>
            <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <a href="#" class="dropdown-item">
                <i class="ti ti-user me-2"></i>Profil
              </a>
              <a href="#" class="dropdown-item">
                <i class="ti ti-settings me-2"></i>Pengaturan
              </a>
              <div class="dropdown-divider"></div>
              <NuxtLink to="/auth/login" class="dropdown-item text-danger">
                <i class="ti ti-logout me-2"></i>Keluar
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { useSidebar } from "@/composables/useSidebar";

const { isDark, toggleTheme } = useTheme();
const { toggleSidebar } = useSidebar();
</script>
