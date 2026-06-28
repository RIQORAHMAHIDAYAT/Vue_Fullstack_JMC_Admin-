<template>
  <form @submit.prevent="handleSubmit">
    <div class="row g-3">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header"><h3 class="card-title">Data Diri</h3></div>
          <div class="card-body">
            <div class="row g-4">
              <div class="col-12">
                <div class="row align-items-center">
                  <div class="col-auto">
                    <img :src="previewFoto || '/favicon.png'" alt="" class="foto-ptofil" />
                    <label for="unggah-foto" class="form-label text-primary text-center cursor-pointer d-block">Ubah Foto</label>
                    <input id="unggah-foto" type="file" hidden accept="image/png,image/jpeg,image/jpg" @change="handleFoto" />
                  </div>
                  <div class="col">
                    <div class="mb-4">
                      <label class="form-label">NIP <span class="text-danger">*</span></label>
                      <input v-model="form.nip" type="text" class="form-control" minlength="8" required />
                      <small class="text-secondary">Minimal 8 digit angka</small>
                    </div>
                    <div>
                      <label class="form-label">Nama Lengkap <span class="text-danger">*</span></label>
                      <input v-model="form.nama_pegawai" type="text" class="form-control" required />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <label class="form-label">Email</label>
                <input v-model="form.email" type="email" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="form-label">Nomor HP</label>
                <input v-model="form.nomor_hp" type="text" class="form-control" placeholder="+62xxx" />
              </div>
              <div class="col-md-5">
                <label class="form-label">Tempat Lahir</label>
                <input v-model="form.tempat_lahir" type="text" class="form-control" />
              </div>
              <div class="col-md-5">
                <label class="form-label">Tanggal Lahir</label>
                <input v-model="form.tanggal_lahir" type="date" class="form-control" @change="hitungUsia" />
              </div>
              <div class="col-md-2">
                <label class="form-label">Usia</label>
                <input v-model="form.usia" type="number" min="0" class="form-control" readonly />
              </div>
              <div class="col-md-4">
                <label class="form-label">Jenis Kelamin</label>
                <div>
                  <label class="form-check form-check-inline">
                    <input v-model="form.jenis_kelamin" class="form-check-input" type="radio" value="Laki-laki" />
                    <span class="form-check-label">Laki-laki</span>
                  </label>
                  <label class="form-check form-check-inline">
                    <input v-model="form.jenis_kelamin" class="form-check-input" type="radio" value="Perempuan" />
                    <span class="form-check-label">Perempuan</span>
                  </label>
                </div>
              </div>
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <label class="form-label">Pendidikan</label>
                    <table class="table table-borderless align-middle">
                      <thead>
                        <tr>
                          <th class="py-0">Jenjang</th>
                          <th class="py-0">Nama Sekolah / PT</th>
                          <th class="py-0">Tahun Lulus</th>
                          <th class="py-0"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(p, i) in form.pendidikan" :key="i">
                          <td><input v-model="p.tingkat_pendidikan" type="text" class="form-control" placeholder="SD/SMP/SMA/S1" /></td>
                          <td><input v-model="p.nama_sekolah" type="text" class="form-control" /></td>
                          <td><input v-model="p.tahun_lulus" type="number" class="form-control" style="width: 100px" /></td>
                          <td><IconXboxXFilled class="text-red cursor-pointer" @click="hapusPendidikan(i)" /></td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="text-center">
                      <button type="button" class="btn btn-primary" @click="tambahPendidikan">TAMBAH DATA</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <label class="form-label">Alamat Lengkap</label>
                <textarea v-model="form.alamat_lengkap" class="form-control" rows="3"></textarea>
              </div>
              <div class="col-md-4" style="position: relative;">
                <label class="form-label">Kecamatan</label>
                <input
                  ref="kecamatanInput"
                  v-model="kecamatanSearch"
                  type="text"
                  class="form-control"
                  placeholder="Ketik minimal 3 karakter"
                  @input="onKecamatanSearch"
                  @blur="onKecamatanBlur"
                  @focus="onKecamatanFocus"
                />
                <ul
                  v-if="kecamatanSuggestions.length > 0 && kecamatanDropdownOpen"
                  class="list-group position-absolute w-100"
                  style="z-index: 1000; max-height: 200px; overflow-y: auto;"
                >
                  <li
                    v-for="w in kecamatanSuggestions"
                    :key="w.id"
                    class="list-group-item list-group-item-action"
                    style="cursor: pointer;"
                    @mousedown.prevent="pilihKecamatan(w)"
                  >
                    {{ w.kecamatan }} - {{ w.kabupaten }}, {{ w.provinsi }}
                  </li>
                </ul>
              </div>
              <div class="col-md-4">
                <label class="form-label">Kabupaten</label>
                <input v-model="form.kabupaten" type="text" class="form-control" readonly />
              </div>
              <div class="col-md-4">
                <label class="form-label">Provinsi</label>
                <input v-model="form.provinsi" type="text" class="form-control" readonly />
              </div>
              <div class="col-md-6">
                <label class="form-label">Status Pernikahan</label>
                <div>
                  <label class="form-check form-check-inline">
                    <input v-model="form.status_kawin" class="form-check-input" type="radio" value="tidak kawin" />
                    <span class="form-check-label">Belum Menikah</span>
                  </label>
                  <label class="form-check form-check-inline">
                    <input v-model="form.status_kawin" class="form-check-input" type="radio" value="kawin" />
                    <span class="form-check-label">Menikah</span>
                  </label>
                </div>
              </div>
              <div class="col-md-6">
                <label class="form-label">Jumlah Anak</label>
                <input v-model="form.jumlah_anak" type="number" min="0" class="form-control" />
              </div>
              <div class="col-md-4">
                <label class="form-label">Jarak Rumah-Kantor (km)</label>
                <input v-model="form.jarak_rumah_kantor" type="number" min="0" step="0.5" class="form-control" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header"><h3 class="card-title">Data Kepegawaian</h3></div>
          <div class="card-body">
            <div class="row g-4">
              <div class="col-12">
                <label class="form-label">Tanggal Masuk</label>
                <input v-model="form.tanggal_masuk" type="date" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="form-label">Jabatan</label>
                <select v-model="form.id_jabatan" class="form-select">
                  <option value="">Pilih jabatan</option>
                  <option v-for="j in jabatanList" :key="j.id" :value="j.id">{{ j.nama }}</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label">Departemen</label>
                <select v-model="form.id_departemen" class="form-select">
                  <option value="">Pilih departemen</option>
                  <option v-for="d in departemenList" :key="d.id" :value="d.id">{{ d.nama }}</option>
                </select>
              </div>
              <div class="col-md-4">
                <label class="form-label">Status</label>
                <label class="form-check form-switch form-switch-3">
                  <input v-model="form.statusAktif" class="form-check-input" type="checkbox" />
                  <span class="form-check-label">{{ form.statusAktif ? 'Aktif' : 'Nonaktif' }}</span>
                </label>
              </div>
              <div class="col-md-4">
                <label class="form-label">Jenis Kontrak</label>
                <select v-model="form.jenis_kontrak" class="form-select">
                  <option value="PKWT">PKWT (Kontrak)</option>
                  <option value="PKWTT">PKWTT (Tetap)</option>
                  <option value="Magang">Magang</option>
                </select>
              </div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <div class="d-flex gap-2 ms-auto">
              <button type="submit" class="btn btn-primary" :disabled="submitting">{{ submitting ? 'Menyimpan...' : 'Simpan' }}</button>
              <button type="button" class="btn btn-outline-primary" @click="goBack()">Kembali</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
  </form>
</template>

<script setup>
import { IconXboxXFilled } from "@tabler/icons-vue"

const props = defineProps(["id"])
const { get, post, put } = useApi()
const { goBack } = useGoBack()
const router = useRouter()

const submitting = ref(false)
const error = ref("")
const previewFoto = ref("")
const fotoFile = ref(null)

const kecamatanInput = ref(null)
const kecamatanSearch = ref("")
const kecamatanSuggestions = ref([])
const kecamatanDropdownOpen = ref(false)
let kecamatanDebounce = null
const selectedKecamatan = ref(null)

const jabatanList = ref([])
const departemenList = ref([])
const wilayahList = ref([])
const wilayahMap = ref({})

const form = reactive({
  nip: "",
  nama_pegawai: "",
  email: "",
  nomor_hp: "",
  tempat_lahir: "",
  tanggal_lahir: "",
  usia: null,
  jenis_kelamin: "",
  alamat_lengkap: "",
  id_kecamatan: "",
  kabupaten: "",
  provinsi: "",
  jarak_rumah_kantor: null,
  status_kawin: "",
  jumlah_anak: 0,
  tanggal_masuk: "",
  id_jabatan: "",
  id_departemen: "",
  statusAktif: true,
  jenis_kontrak: "PKWTT",
  pendidikan: [],
})

function hitungUsia() {
  if (!form.tanggal_lahir) { form.usia = null; return }
  const birth = new Date(form.tanggal_lahir)
  const today = new Date()
  form.usia = today.getFullYear() - birth.getFullYear() - (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0)
}

function tambahPendidikan() {
  form.pendidikan.push({ tingkat_pendidikan: "", nama_sekolah: "", tahun_lulus: "" })
}

function hapusPendidikan(idx) {
  form.pendidikan.splice(idx, 1)
}

async function handleFoto(e) {
  const target = e.target
  if (!target.files?.length) return
  const file = target.files[0]
  const ext = file.name.split(".").pop()?.toLowerCase()
  if (!["png", "jpg", "jpeg"].includes(ext || "")) {
    error.value = "Format harus PNG/JPEG/JPG"
    return
  }
  previewFoto.value = URL.createObjectURL(file)
  fotoFile.value = file
}

async function onKecamatanSearch() {
  if (kecamatanDebounce) clearTimeout(kecamatanDebounce)
  const val = kecamatanSearch.value.trim()
  if (val.length < 3) {
    kecamatanSuggestions.value = []
    kecamatanDropdownOpen.value = false
    return
  }
  kecamatanDebounce = setTimeout(async () => {
    try {
      const res = await get(`/master/wilayah?search=${encodeURIComponent(val)}`)
      kecamatanSuggestions.value = res.data || []
      kecamatanDropdownOpen.value = kecamatanSuggestions.value.length > 0
    } catch {
      kecamatanSuggestions.value = []
    }
  }, 300)
}

function onKecamatanFocus() {
  if (kecamatanSuggestions.value.length > 0) {
    kecamatanDropdownOpen.value = true
  }
}

function onKecamatanBlur() {
  setTimeout(() => { kecamatanDropdownOpen.value = false }, 200)
}

function pilihKecamatan(w) {
  selectedKecamatan.value = w
  kecamatanSearch.value = w.kecamatan
  form.id_kecamatan = w.id
  form.kabupaten = w.kabupaten || ""
  form.provinsi = w.provinsi || ""
  kecamatanSuggestions.value = []
  kecamatanDropdownOpen.value = false
}

async function handleSubmit() {
  submitting.value = true
  error.value = ""

  if (!/^\d{8,}$/.test(form.nip)) {
    error.value = "NIP minimal 8 digit angka"
    submitting.value = false
    return
  }
  if (form.nama_pegawai && !/^[a-zA-Z0-9\' ]+$/.test(form.nama_pegawai)) {
    error.value = "Nama hanya boleh huruf, angka, petik, dan spasi"
    submitting.value = false
    return
  }
  if (form.nomor_hp && !/^\+62[0-9]{6,15}$/.test(form.nomor_hp)) {
    error.value = "Nomor HP harus format internasional (+62xxx)"
    submitting.value = false
    return
  }

  try {
    let foto = null
    if (fotoFile.value) {
      const fd = new FormData()
      fd.append("file", fotoFile.value)
      const fotoRes = await post("/pegawai/upload-foto", fd)
      foto = fotoRes.data.filename
    }

    const payload = {
      ...form,
      foto_pegawai: foto,
      status: form.statusAktif ? "Aktif" : "Nonaktif",
      jenis_kontrak: form.jenis_kontrak,
      id_kecamatan: form.id_kecamatan ? Number(form.id_kecamatan) : null,
      id_jabatan: form.id_jabatan ? Number(form.id_jabatan) : null,
      id_departemen: form.id_departemen ? Number(form.id_departemen) : null,
      jumlah_anak: Number(form.jumlah_anak) || 0,
      jarak_rumah_kantor: form.jarak_rumah_kantor ? Number(form.jarak_rumah_kantor) : null,
      pendidikan: form.pendidikan.filter((p) => p.tingkat_pendidikan || p.nama_sekolah),
    }
    delete payload.statusAktif
    delete payload.kabupaten
    delete payload.provinsi

    if (props.id) {
      await put(`/pegawai/${props.id}`, payload)
    } else {
      await post("/pegawai", payload)
    }

    router.push("/pegawai")
  } catch (err) {
    error.value = err.message || "Gagal menyimpan data"
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  try {
    const [jabatan, departemen] = await Promise.all([
      get
("/master/jabatan"),
      get
("/master/departemen"),
    ])
    jabatanList.value = jabatan.data
    departemenList.value = departemen.data
  } catch {}

  if (props.id) {
    try {
      const res = await get
(`/pegawai/${props.id}`)
      const d = res.data
      Object.assign(form, {
        nip: d.nip || "",
        nama_pegawai: d.nama_pegawai || "",
        email: d.email || "",
        nomor_hp: d.nomor_hp || "",
        tempat_lahir: d.tempat_lahir || "",
        tanggal_lahir: d.tanggal_lahir ? d.tanggal_lahir.split("T")[0] : "",
        usia: d.usia,
        jenis_kelamin: d.jenis_kelamin || "",
        alamat_lengkap: d.alamat_lengkap || "",
        id_kecamatan: d.id_kecamatan || "",
        kabupaten: d.kabupaten || "",
        provinsi: d.provinsi || "",
        jarak_rumah_kantor: d.jarak_rumah_kantor,
        status_kawin: d.status_kawin || "",
        jumlah_anak: d.jumlah_anak || 0,
        tanggal_masuk: d.tanggal_masuk ? d.tanggal_masuk.split("T")[0] : "",
        id_jabatan: d.id_jabatan || "",
        id_departemen: d.id_departemen || "",
        statusAktif: d.status === "Aktif",
        jenis_kontrak: d.jenis_kontrak || "PKWTT",
        pendidikan: d.pendidikan || [],
      })
      if (d.foto_pegawai) previewFoto.value = `/images/pegawai/${d.foto_pegawai}`
      if (d.kecamatan) kecamatanSearch.value = d.kecamatan
    } catch (err) {
      error.value = err.message
    }
  }
})
</script>

<style scoped>
.foto-ptofil { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; }
.cursor-pointer { cursor: pointer; }
</style>
