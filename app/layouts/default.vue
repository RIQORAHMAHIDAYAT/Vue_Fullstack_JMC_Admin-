<template>
  <div class="page">
    <Sidebar />
    <Header />

    <!-- Content -->
    <div class="page-wrapper">
      <!-- Page Content -->
      <div class="page-body">
        <div class="container-xl">
          <!-- Breadcrumb -->
          <div
            class="page-header d-print-none mb-3"
            v-if="pageTitle || $slots.header"
          >
            <div class="row align-items-center">
              <div class="col-auto">
                <AppBreadcrumb />
                <h2 class="page-title">
                  {{ pageTitle }}
                </h2>
              </div>
              <div class="col-auto ms-auto d-print-none" v-if="$slots.actions">
                <slot name="actions" />
              </div>
            </div>
          </div>

          <!-- Slot konten halaman -->
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/layout/Sidebar.vue";
import Header from "@/components/layout/Header.vue";
import AppBreadcrumb from "@/components/layout/AppBreadcrumb.vue";

const { initTheme } = useTheme();
const route = useRoute();

const pageTitle = computed(() => route.meta?.title || "");

onMounted(() => {
  initTheme();
});
</script>
