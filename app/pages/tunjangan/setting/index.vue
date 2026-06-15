<template>
  <div class="row">
    <div class="col-md-6">
      <SettingFrom />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: "Setting Tunjangan Transport",
});

useSeoMeta({
  title: "Setting Tunjangan Transport",
});

import SettingFrom from "~/features/Tunjangan/components/SettingForm.vue";
</script>
