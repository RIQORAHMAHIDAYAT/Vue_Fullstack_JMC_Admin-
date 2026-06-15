<template>
  <PegawaiForm />
</template>

<script setup>
definePageMeta({
  title: "Tambah Pegawai",
});

useSeoMeta({
  title: "Tambah Pegawai",
});

import PegawaiForm from "~/features/DataPegawai/components/PegawaiForm.vue";
</script>
