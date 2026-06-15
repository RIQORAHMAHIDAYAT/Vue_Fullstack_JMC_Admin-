<template>
  <aside
    class="navbar navbar-vertical navbar-expand-lg navbar-dark sidebar"
    data-bs-theme="dark"
  >
    <div class="container-fluid px-0 justify-content-start">
      <!-- BRAND -->
      <h1 class="navbar-brand text-white ms-3 ms-lg-0 gap-3">
        <div class="logo">
          <img src="~/assets/images/logo/logo_jmc.png" alt="Logo" height="15" />
        </div>

        <NuxtLink
          to="/"
          class="fw-bold hstack gap-3 text-decoration-none text-white"
        >
          <div style="font-size: 0.9rem">{{ config.public.appName }}</div>
        </NuxtLink>
      </h1>

      <div
        id="sidebar-menu"
        class="offcanvas offcanvas-start px-lg-3"
        tabindex="-1"
      >
        <!-- HEADER -->
        <div class="offcanvas-header">
          <div class="d-flex gap-3 align-items-center">
            <div class="image">
              <img
                src="~/assets/images/logo/logo_jmc.png"
                alt="Logo"
                height="15"
              />
            </div>

            <div class="logo-text flex-grow-1">
              <h3 class="m-0"></h3>
              <div class="fs-4 fw-bold">{{ config.public.appName }}</div>
            </div>
          </div>

          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>

        <!-- BODY -->
        <div
          class="offcanvas-body p-3 p-lg-0 flex-column flex-grow-1 overflow-auto"
        >
          <ul class="navbar-nav align-items-start pt-lg-3">
            <template v-for="item in menuItems">
              <!-- Menu dengan children (dropdown) -->
              <li
                :key="item.title"
                v-if="item.children"
                class="nav-item dropdown"
                :class="{ active: isParentActive(item) }"
              >
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  :class="{ active: isParentActive(item) }"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="false"
                  role="button"
                  aria-expanded="false"
                  @click.prevent="toggleDropdown(item.title)"
                >
                  <span class="nav-link-icon d-md-none d-lg-inline-block">
                    <component :is="item.icon" />
                  </span>
                  <span class="nav-link-title">{{ item.title }}</span>
                </a>
                <div
                  class="dropdown-menu"
                  :class="{
                    show:
                      openDropdowns.includes(item.title) ||
                      isParentActive(item),
                  }"
                >
                  <div class="dropdown-menu-columns">
                    <div class="dropdown-menu-column">
                      <NuxtLink
                        v-for="child in item.children"
                        :key="child.to"
                        :to="child.to"
                        class="dropdown-item"
                        :class="{ active: isActive(child.to) }"
                      >
                        {{ child.title }}
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </li>

              <!-- Menu biasa (tanpa children) -->
              <li v-else class="nav-item" :key="item.title">
                <NuxtLink
                  :to="item.to"
                  class="nav-link"
                  :class="{ active: isActive(item.to) }"
                >
                  <span class="nav-link-icon d-md-none d-lg-inline-block">
                    <component :is="item.icon" />
                  </span>
                  <span class="nav-link-title">{{ item.title }}</span>
                </NuxtLink>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { menuItems } from "~/data/menu.js";

const appName = "Admin";
const route = useRoute();
const config = useRuntimeConfig();

// Dropdown yang sedang terbuka
const openDropdowns = ref([]);

// Cek apakah route aktif (exact match untuk '/', startsWith untuk lainnya)
const isActive = (path) => {
  if (path === "/") return route.path === "/";
  return route.path === path || route.path.startsWith(path + "/");
};

// Cek apakah salah satu child aktif
const isParentActive = (item) => {
  if (!item.children) return false;
  return item.children.some((child) => isActive(child.to));
};

// Toggle dropdown manual
const toggleDropdown = (title) => {
  const idx = openDropdowns.value.indexOf(title);
  if (idx === -1) {
    openDropdowns.value.push(title);
  } else {
    openDropdowns.value.splice(idx, 1);
  }
};

// Otomatis buka dropdown jika ada child yang aktif
watch(
  () => route.path,
  () => {
    menuItems.forEach((item) => {
      if (item.children && isParentActive(item)) {
        if (!openDropdowns.value.includes(item.title)) {
          openDropdowns.value.push(item.title);
        }
      }
    });
  },
  { immediate: true },
);
</script>
