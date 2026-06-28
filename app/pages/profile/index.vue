<script setup>
definePageMeta({ title: "Profil Saya", middleware: "auth" })
useSeoMeta({ title: "Profil Saya" })

import { IconEye, IconEyeOff, IconCheck, IconX } from "@tabler/icons-vue"

const { get, put } = useApi()
const { goBack } = useGoBack()
const { user } = useAuth()

const loading = ref(true)
const saving = ref(false)
const editing = ref(false)
const message = ref("")
const showPassword = ref(false)

const form = reactive({
  nama: "",
  email: "",
  password: "",
})

const profile = ref(null)

async function fetchProfile() {
  try {
    const res = await get("/auth/me")
    profile.value = res.data
    form.nama = res.data.nama || ""
    form.email = res.data.email || ""
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

function generatePassword() {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const lower = "abcdefghijklmnopqrstuvwxyz"
  const digits = "0123456789"
  const special = "!@#$%&*"
  const all = upper + lower + digits + special
  let pwd = ""
  pwd += upper.charAt(Math.floor(Math.random() * upper.length))
  pwd += lower.charAt(Math.floor(Math.random() * lower.length))
  pwd += digits.charAt(Math.floor(Math.random() * digits.length))
  pwd += special.charAt(Math.floor(Math.random() * special.length))
  for (let i = 0; i < 6; i++) pwd += all.charAt(Math.floor(Math.random() * all.length))
  pwd = pwd.split("").sort(() => Math.random() - 0.5).join("")
  form.password = pwd
}

const passwordErrors = computed(() => {
  const errs = []
  if (!form.password) return errs
  if (form.password.length < 8) errs.push("Minimal 8 karakter")
  if (/\s/.test(form.password)) errs.push("Tidak boleh spasi")
  if (!/[A-Z]/.test(form.password)) errs.push("Harus ada huruf besar")
  if (!/[a-z]/.test(form.password)) errs.push("Harus ada huruf kecil")
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(form.password)) errs.push("Harus ada karakter khusus")
  return errs
})

async function handleSave() {
  const payload = {}
  if (form.nama !== profile.value?.nama) payload.nama = form.nama
  if (form.email !== profile.value?.email) payload.email = form.email
  if (form.password) payload.password = form.password

  if (Object.keys(payload).length === 0) {
    message.value = "Tidak ada data yang diubah"
    return
  }

  saving.value = true
  message.value = ""
  try {
    await put("/auth/me", payload)
    message.value = "Profil berhasil diperbarui"
    form.password = ""
    await fetchProfile()
    editing.value = false
  } catch (err) {
    message.value = err.message || "Gagal menyimpan"
  } finally {
    saving.value = false
  }
}

function batal() {
  if (profile.value) {
    form.nama = profile.value.nama || ""
    form.email = profile.value.email || ""
  }
  form.password = ""
  message.value = ""
  editing.value = false
}

function formatDate(dateStr) {
  if (!dateStr) return "-"
  return new Date(dateStr).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

onMounted(fetchProfile)
</script>

<template>
  <div class="row g-3 justify-content-center">
    <div class="col-lg-8">
      <div v-if="loading" class="text-center py-5">Memuat data...</div>

      <template v-else-if="profile">
        <!-- View Mode -->
        <div v-if="!editing" class="card">
          <div class="card-header">
            <h3 class="card-title">Profil Saya</h3>
            <div class="ms-auto">
              <button class="btn btn-primary" @click="editing = true">Ubah Profil</button>
            </div>
          </div>
          <div class="card-body">
            <div class="datagrid">
              <div class="datagrid-item">
                <div class="datagrid-title">Nama</div>
                <div class="datagrid-content">{{ profile.nama || '-' }}</div>
              </div>
              <div class="datagrid-item">
                <div class="datagrid-title">Username</div>
                <div class="datagrid-content">{{ profile.username }}</div>
              </div>
              <div class="datagrid-item">
                <div class="datagrid-title">Email</div>
                <div class="datagrid-content">{{ profile.email || '-' }}</div>
              </div>
              <div class="datagrid-item">
                <div class="datagrid-title">Role</div>
                <div class="datagrid-content">{{ profile.role }}</div>
              </div>
              <div class="datagrid-item">
                <div class="datagrid-title">Terakhir Login</div>
                <div class="datagrid-content">{{ formatDate(profile.last_login) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit Mode -->
        <div v-else class="card">
          <div class="card-header">
            <h3 class="card-title">Ubah Profil</h3>
          </div>
          <div class="card-body">
            <div v-if="message" class="alert" :class="message.includes('berhasil') ? 'alert-success' : 'alert-danger'">
              {{ message }}
              <button type="button" class="btn-close" @click="message = ''"></button>
            </div>

            <div class="mb-3">
              <label class="form-label">Nama</label>
              <input v-model="form.nama" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input v-model="form.email" type="email" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">Username</label>
              <input :value="profile.username" type="text" class="form-control" disabled />
              <small class="text-secondary">Username tidak dapat diubah</small>
            </div>
            <hr />
            <div class="mb-3">
              <label class="form-label">Password Baru <small class="text-secondary">(kosongkan jika tidak ingin ganti)</small></label>
              <div class="input-group">
                <input v-model="form.password" :type="showPassword ? 'text' : 'password'" class="form-control" />
                <button type="button" class="btn btn-outline-secondary" @click="showPassword = !showPassword">
                  <IconEye v-if="!showPassword" :stroke="1.5" size="20" />
                  <IconEyeOff v-else :stroke="1.5" size="20" />
                </button>
                <button type="button" class="btn btn-primary" @click="generatePassword">Generate</button>
              </div>
              <ul v-if="passwordErrors.length" class="mt-2 mb-0 small text-danger">
                <li v-for="e in passwordErrors" :key="e">{{ e }}</li>
              </ul>
            </div>
          </div>
          <div class="card-footer d-flex gap-2">
            <button class="btn btn-primary" @click="handleSave" :disabled="saving">
              {{ saving ? "Menyimpan..." : "Simpan" }}
            </button>
            <button class="btn btn-outline-secondary" @click="batal">Batal</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
