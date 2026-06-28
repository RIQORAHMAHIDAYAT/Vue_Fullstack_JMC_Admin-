<template>
  <div>
    <div class="mb-3">
      <NuxtLink to="/user/role" class="btn btn-secondary">
        <IconArrowLeft stroke="2" size="18" class="me-2" /> Kembali
      </NuxtLink>
    </div>
    
    <div class="card mb-4">
      <div class="card-header">
        <h3 class="card-title">Detail Role</h3>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Nama Role</label>
            <input type="text" class="form-control" :value="roleData?.nama_role" disabled />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Deskripsi</label>
            <textarea class="form-control" rows="3" disabled :value="`Ringkasan hak akses untuk role ${roleData?.nama_role || ''}`"></textarea>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Tabel Hak Akses</h3>
      </div>
      <div class="table-responsive card-body p-0">
        <table class="table table-vcenter">
          <thead>
            <tr>
              <th>Modul/Fitur</th>
              <th class="text-center">Akses</th>
              <th class="text-center">Create</th>
              <th class="text-center">Read</th>
              <th class="text-center">Update</th>
              <th class="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading"><td colspan="6" class="text-center py-4">Memuat data...</td></tr>
            <tr v-for="item in permissions" :key="item.id">
              <td>{{ item.modul_fitur }}</td>
              <td class="text-center">
                <IconCheck v-if="item.akses" stroke="3" size="20" class="text-success" />
                <IconX v-else stroke="3" size="20" class="text-danger" />
              </td>
              <td class="text-center">
                <IconCheck v-if="item.create" stroke="3" size="20" class="text-success" />
                <IconX v-else stroke="3" size="20" class="text-danger" />
              </td>
              <td class="text-center">{{ item.read || '-' }}</td>
              <td class="text-center">{{ item.update || '-' }}</td>
              <td class="text-center">{{ item.delete || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ title: "Detail Hak Akses", middleware: "auth" })
useSeoMeta({ title: "Detail Hak Akses" })
import { IconArrowLeft, IconCheck, IconX } from "@tabler/icons-vue"

const route = useRoute()
const { get } = useApi()

const roleData = ref(null)
const permissions = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const resRole = await get(`/role`)
    roleData.value = resRole.data.find(r => String(r.id) === String(route.params.id))
    
    // Asumsi endpoint log log sudah return permission juga atau kita panggil manual
    // Di sini kita fetch ulang list db nya. Karena di test ini hanya frontend dummy, 
    // jika API untuk detail role permission belum ada, kita pakai ini.
    // Jika ada error karena endpointnya belum dibuat di server, kita buat sekarang.
    const resPerm = await get(`/role/${route.params.id}/permissions`)
    permissions.value = resPerm.data
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>
