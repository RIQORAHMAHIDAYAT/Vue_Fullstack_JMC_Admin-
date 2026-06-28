<script setup>
definePageMeta({ title: "Detail Tunjangan Transport", middleware: "auth" })
useSeoMeta({ title: "Detail Tunjangan Transport" })
import { formatRupiah } from "~/utils/formatRupiah.js"
const { get, post } = useApi()
const route = useRoute()

const detailData = ref(null)
const hitungLoading = ref(false)
const hitungMessage = ref("")

const sortKey = ref("")
const sortDir = ref("asc")

function sortBy(key) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === "asc" ? "desc" : "asc"
  } else {
    sortKey.value = key
    sortDir.value = "asc"
  }
}

const sortedPenerima = computed(() => {
  if (!detailData.value?.penerima) return []
  if (!sortKey.value) return detailData.value.penerima

  const arr = [...detailData.value.penerima]
  arr.sort((a, b) => {
    let valA = a[sortKey.value]
    let valB = b[sortKey.value]
    if (typeof valA === "string") {
      valA = valA.toLowerCase()
      valB = (valB || "").toLowerCase()
    }
    if (valA < valB) return sortDir.value === "asc" ? -1 : 1
    if (valA > valB) return sortDir.value === "asc" ? 1 : -1
    return 0
  })
  return arr
})

async function fetchDetail() {
  try {
    const res = await get(`/tunjangan/transport/${route.params.id}`)
    detailData.value = res.data
  } catch {
    detailData.value = null
  }
}

async function hitungTunjangan() {
  hitungLoading.value = true
  hitungMessage.value = ""
  try {
    const [tahun, bulan] = String(route.params.id).split("-")
    const res = await post("/tunjangan/transport/hitung", { tahun: Number(tahun), bulan: Number(bulan) })
    hitungMessage.value = res.message || "Berhasil"
    await fetchDetail()
  } catch (err) {
    hitungMessage.value = err.message || "Gagal menghitung tunjangan"
  } finally {
    hitungLoading.value = false
  }
}

onMounted(fetchDetail)
</script>

<template>
  <div>
    <h3 class="card-title">{{ detailData?.bulan || 'Detail Tunjangan' }}</h3>
    <div class="card">
      <div class="card-header d-flex gap-2 align-items-center">
        <button class="btn btn-primary" @click="hitungTunjangan" :disabled="hitungLoading">
          {{ hitungLoading ? 'Menghitung...' : 'Hitung Tunjangan' }}
        </button>
        <span v-if="hitungMessage" class="ms-2 small" :class="hitungMessage.includes('berhasil') ? 'text-success' : 'text-danger'">
          {{ hitungMessage }}
        </span>
      </div>
      <template v-if="detailData && detailData.penerima && detailData.penerima.length > 0">
        <div class="table-responsive card-body p-0">
          <table class="table table-vcenter">
            <thead>
              <tr>
                <th width="5">No</th>
                <th class="sortable" @click="sortBy('nama')">
                  Nama Penerima {{ sortKey === 'nama' ? (sortDir === 'asc' ? '▲' : '▼') : '' }}
                </th>
                <th class="text-center sortable" @click="sortBy('km')">
                  Kilometer {{ sortKey === 'km' ? (sortDir === 'asc' ? '▲' : '▼') : '' }}
                </th>
                <th class="text-center sortable" @click="sortBy('hari_kerja')">
                  Hari Kerja {{ sortKey === 'hari_kerja' ? (sortDir === 'asc' ? '▲' : '▼') : '' }}
                </th>
                <th class="text-center sortable" @click="sortBy('nominal')">
                  Nominal {{ sortKey === 'nominal' ? (sortDir === 'asc' ? '▲' : '▼') : '' }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in sortedPenerima" :key="item.id">
                <td class="text-center">{{ index + 1 }}</td>
                <td>{{ item.nama || '-' }}</td>
                <td class="text-center">{{ item.km }}</td>
                <td class="text-center">{{ item.hari_kerja }}</td>
                <td class="text-end">{{ formatRupiah(item.nominal) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <div v-else class="card-body text-center py-4">
        Belum ada data. Klik <strong>"Hitung Tunjangan"</strong> untuk menghitung.
      </div>
    </div>
  </div>
</template>

<style scoped>
.sortable {
  cursor: pointer;
  user-select: none;
}
.sortable:hover {
  background: rgba(0,0,0,0.03);
}
</style>
