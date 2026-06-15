<template>
  <nav aria-label="breadcrumb" v-if="crumbs.length > 1">
    <ol class="breadcrumb">
      <li
        v-for="(crumb, i) in crumbs"
        :key="i"
        class="breadcrumb-item"
        :class="{ active: i === crumbs.length - 1 }">
        <NuxtLink v-if="i < crumbs.length - 1" :to="crumb.to">{{ crumb.label }}</NuxtLink>
        <span v-else>{{ crumb.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
const route = useRoute()

// Mapping path ke label yang lebih manusiawi
const pathLabels = {
  '': 'Home',
  'pegawai': 'Data Pegawai',
  'tunjangan': 'Tunjangan',
  'setting': 'Setting Tunjangan Transport',
  'transport': 'Tunjangan Transport',
  'user': 'Manajemen User',
  'role': 'Manajemen Role',
  'manage': 'Manajemen User',
  'log': 'Log Aktifitas',
}

const crumbs = computed(() => {
  const parts = route.path.split('/').filter(Boolean)
  const result = [{ label: 'Home', to: '/' }]

  let accumulated = ''
  parts.forEach((part) => {
    accumulated += '/' + part
    result.push({
      label: pathLabels[part] || part.charAt(0).toUpperCase() + part.slice(1),
      to: accumulated,
    })
  })

  return result
})
</script>
