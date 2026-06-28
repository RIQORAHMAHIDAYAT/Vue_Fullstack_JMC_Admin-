<template>
  <div class="card">
    <div class="card-header">
      <div class="d-flex gap-2 ms-auto">
        <select v-model="filterTahun" class="form-select" style="width: 140px">
          <option v-for="t in tahunOptions" :key="t" :value="t">{{ t }}</option>
        </select>
      </div>
    </div>
    <div class="table-responsive card-body p-0">
      <table class="table table-vcenter">
        <thead>
          <tr>
            <th width="5">No</th>
            <th>Bulan</th>
            <th class="text-center">Total Penerima</th>
            <th class="text-center">Total Tunjangan</th>
            <th class="text-center">Status</th>
            <th class="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading"><td colspan="6" class="text-center py-4">Memuat data...</td></tr>
          <tr v-for="(item, index) in data" :key="item.id" :class="{ 'table-muted': !item.sudah_dihitung }">
            <td class="text-center">{{ index + 1 }}</td>
            <td>{{ item.bulan }}</td>
            <td class="text-center">{{ item.total_penerima }}</td>
            <td class="text-end">{{ formatRupiah(item.total_nominal) }}</td>
            <td class="text-center">
              <span v-if="item.sudah_dihitung" class="badge bg-success">Selesai</span>
              <span v-else class="badge bg-secondary">Belum</span>
            </td>
            <td class="text-center">
              <NuxtLink :to="`/tunjangan/transport/detail/${item.id}`" class="btn btn-primary btn-sm">Detail</NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ title: "Tunjangan Transport", middleware: "auth" })
useSeoMeta({ title: "Tunjangan Transport" })
import { formatRupiah } from "~/utils/formatRupiah.js"
const { get } = useApi()

const data = ref([])
const loading = ref(true)
const filterTahun = ref(new Date().getFullYear())

const tahunOptions = computed(() => {
  const tahun = new Date().getFullYear()
  return [tahun, tahun - 1, tahun - 2, tahun - 3]
})

watch(filterTahun, fetchData)

async function fetchData() {
  loading.value = true
  try {
    const params = new URLSearchParams()
    params.set("tahun", String(filterTahun.value))
    const res = await get(`/tunjangan/transport?${params.toString()}`)
    data.value = res.data
  } catch {} finally { loading.value = false }
}

onMounted(fetchData)
</script>
