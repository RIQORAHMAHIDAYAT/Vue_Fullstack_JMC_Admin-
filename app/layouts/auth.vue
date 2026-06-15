<template>
  <div class="d-flex flex-column flex-md-row page-login" data-bs-theme="theme">
    <div
      class="login-cover bg-dark col-lg-7 d-flex align-items-end order-md-last d-none d-lg-block"
    >
      <Swiper
        :modules="[Autoplay, Pagination, Navigation]"
        :loop="true"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
        :pagination="{
          clickable: true,
        }"
        :navigation="true"
        class="swiper-login w-100 h-100"
      >
        <SwiperSlide>
          <img
            src="~/assets/images/login/work01.jpeg"
            alt="Login Cover 1"
            class="cover"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="~/assets/images/login/work02.jpeg"
            alt="Login Cover 2"
            class="cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>

    <div class="loginbox d-flex align-items-center justify-content-center col">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import "~/assets/css/login.css";
const { theme, initTheme } = useTheme();

import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

onMounted(() => {
  initTheme();
});
</script>

<style scoped>
.cover {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}
</style>
