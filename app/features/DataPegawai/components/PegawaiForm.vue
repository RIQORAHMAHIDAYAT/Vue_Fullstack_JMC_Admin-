<template>
  <div class="row g-3">
    <div class="col-lg-6">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Data Diri</h3>
        </div>
        <div class="card-body">
          <div class="row g-4">
            <div class="col-12">
              <div class="row align-items-center">
                <!-- Foto -->
                <div class="col-auto">
                  <img
                    src="/images/pegawai/ahmad.jpg"
                    alt=""
                    class="foto-ptofil"
                  />
                  <label
                    for="unggah-foto"
                    class="form-label text-primary text-center cursor-pointer"
                    >Ubah Foto</label
                  >

                  <input id="unggah-foto" type="file" hidden />
                </div>

                <div class="col">
                  <!-- NIP -->
                  <div class="mb-4">
                    <label for="" class="form-label">NIP</label>
                    <input type="number" min="0" class="form-control" />
                  </div>

                  <!-- Nama Lengkap -->
                  <div>
                    <label for="" class="form-label">Nama Lengkap</label>
                    <input type="text" class="form-control" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Email -->
            <div class="col-md-6">
              <label for="" class="form-label">Email</label>
              <input type="email" class="form-control" />
            </div>

            <!-- No HP -->
            <div class="col-md-6">
              <label for="" class="form-label">Nomor HP</label>
              <input type="text" class="form-control" />
            </div>

            <!-- Tempat Lahir -->
            <div class="col-md-5">
              <label for="" class="form-label">Tempat Lahir</label>
              <input type="text" class="form-control" />
            </div>

            <!-- Tanggal Lahir -->
            <div class="col-md-5">
              <label for="" class="form-label">Tanggal Lahir</label>
              <input type="date" class="form-control" />
            </div>

            <!-- Usia -->
            <div class="col-md-2">
              <label for="" class="form-label">Usia</label>
              <input type="number" min="0" class="form-control" readonly />
            </div>

            <!-- Pendidikan -->
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <label for="" class="form-label">Pendidikan</label>
                  <table class="table table-borderless align-middle">
                    <thead>
                      <tr>
                        <th class="py-0">Jenjang</th>
                        <th class="py-0">Nama Sekolah / Perguruan Tinggi</th>
                        <th class="py-0">Tahun Lulus</th>
                        <th class="py-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input type="text" class="form-control" />
                        </td>
                        <td>
                          <input type="text" class="form-control" />
                        </td>
                        <td>
                          <input type="text" class="form-control" />
                        </td>
                        <td>
                          <IconXboxXFilled class="text-red cursor-pointer" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="text-center">
                    <button class="btn btn-primary">TAMBAH DATA</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Alamat Lengkap -->
            <div class="col-12">
              <label for="" class="form-label">Alamat Lengkap</label>
              <textarea name="" id="" class="form-control" rows="3"></textarea>
            </div>

            <!-- Kecamatan -->
            <div class="col-md-4">
              <label for="" class="form-label">Kecamatan</label>
              <select name="" id="" class="form-select">
                <option value="" selected disabled>Pilih kecamatan</option>
                <option value="">Danurejan</option>
                <option value="">Gedongtengen</option>
                <option value="">Gondokusuman</option>
                <option value="">Jetis</option>
              </select>
            </div>

            <!-- Kabupaten -->
            <div class="col-md-4">
              <label for="" class="form-label">Kabupaten</label>
              <select name="" id="" class="form-select">
                <option value="" selected disabled>Pilih kabupaten</option>
                <option value="">Bantul</option>
                <option value="">Sleman</option>
                <option value="">Gunung Kidul</option>
                <option value="">Kulon Progo</option>
                <option value="">Yogyakarta</option>
              </select>
            </div>

            <!-- Provinsi -->
            <div class="col-md-4">
              <label for="" class="form-label">Provinsi</label>
              <select name="" id="" class="form-select">
                <option value="" selected disabled>Pilih provinsi</option>
                <option value="">Yogyakarta</option>
                <option value="">Jawa Tengah</option>
                <option value="">Jawa Timur</option>
                <option value="">Jawa Barat</option>
                <option value="">DKI Jakarta</option>
              </select>
            </div>

            <!-- Status Pernikahan -->
            <div class="col-md-6">
              <div class="form-label">Status Pernikahan</div>
              <div>
                <label class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="radios"
                    checked=""
                  />
                  <span class="form-check-label">Belum Menikah</span>
                </label>
                <label class="form-check">
                  <input class="form-check-input" type="radio" name="radios" />
                  <span class="form-check-label">Menikah</span>
                </label>
              </div>
            </div>

            <!-- Jumlah Anak -->
            <div class="col-md-6">
              <label for="" class="form-label">Jumlah Anak</label>
              <input type="number" min="0" class="form-control" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Data Kepegawaian</h3>
        </div>
        <div class="card-body">
          <div class="row g-4">
            <!-- Tanggal Masuk -->
            <div class="col-12">
              <label for="" class="form-label">Tanggal Masuk</label>
              <input type="date" class="form-control" />
            </div>

            <!-- Jabatan -->
            <div class="col-md-6">
              <label for="" class="form-label">Jabatan</label>
              <select name="" id="" class="form-select">
                <option value="" selected disabled>Pilih jabatan</option>
                <option value="">Manager</option>
                <option value="">System Analist</option>
                <option value="">Akuntan</option>
                <option value="">Programmer</option>
              </select>
            </div>

            <!-- Departemen -->
            <div class="col-md-6">
              <label for="" class="form-label">Departemen</label>
              <select name="" id="" class="form-select">
                <option value="" selected disabled>Pilih departemen</option>
                <option value="">Produksi</option>
                <option value="">Marketing</option>
                <option value="">Finance</option>
              </select>
            </div>

            <!-- Status -->
            <div class="col-md-6">
              <label for="" class="form-label">Status</label>
              <label class="form-check form-switch form-switch-3">
                <input class="form-check-input" type="checkbox" checked="" />
                <span class="form-check-label">Aktif</span>
              </label>
            </div>
          </div>
        </div>
        <div class="card-footer d-flex">
          <div class="d-flex gap-2 ms-auto">
            <button class="btn btn-primary">Simpan</button>
            <button class="btn btn-outline-primary" @click="goBack()">
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { IconXboxXFilled } from "@tabler/icons-vue";
const { goBack } = useGoBack();
</script>

<style scoped>
.foto-ptofil {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
