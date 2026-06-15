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
                </div>

                <div class="col">
                  <!-- NIP -->
                  <div class="datagrid-item mb-4">
                    <div class="datagrid-title">NIP</div>
                    <div class="datagrid-content">0025</div>
                  </div>

                  <!-- Nama Lengkap -->
                  <div class="datagrid-item">
                    <div class="datagrid-title">Nama Lengkap</div>
                    <div class="datagrid-content">Ahmad Hendarto</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Email -->
            <div class="col-md-6">
              <div class="datagrid-item">
                <div class="datagrid-title">Email</div>
                <div class="datagrid-content">Ahmad@email.com</div>
              </div>
            </div>

            <!-- No HP -->
            <div class="col-md-6">
              <div class="datagrid-item">
                <div class="datagrid-title">Nomor HP</div>
                <div class="datagrid-content">+6292415611611</div>
              </div>
            </div>

            <!-- Tempat Lahir -->
            <div class="col-md-6">
              <div class="datagrid-item">
                <div class="datagrid-title">Tempat Lahir</div>
                <div class="datagrid-content">Yogyakarta</div>
              </div>
            </div>

            <!-- Tanggal Lahir -->
            <div class="col-md-6">
              <div class="datagrid-item">
                <div class="datagrid-title">Tanggal Lahir</div>
                <div class="datagrid-content">24 Juni 1992</div>
              </div>
            </div>

            <!-- Usia -->
            <div class="col-md-6">
              <div class="datagrid-item">
                <div class="datagrid-title">Usia</div>
                <div class="datagrid-content">33 tahun</div>
              </div>
            </div>

            <!-- Pendidikan -->
            <div class="col-md-6">
              <div class="datagrid-item">
                <div class="datagrid-title">Pendidikan</div>
                <div class="datagrid-content">
                  S1 / Universitas Gadjah Mada / 2012
                </div>
                <div class="datagrid-content">SMA / SMA Negeri 1 / 2008</div>
              </div>
            </div>

            <!-- Alamat Lengkap -->
            <div class="col-12">
              <div class="datagrid-item">
                <div class="datagrid-title">Alamat Lengkap</div>
                <div class="datagrid-content">
                  Jl. Prapanca No. 6A, Kasihan, Bantul
                </div>
              </div>
            </div>

            <!-- Kecamatan -->
            <div class="col-md-4">
              <div class="datagrid-item">
                <div class="datagrid-title">Kecamatan</div>
                <div class="datagrid-content">Kasihan</div>
              </div>
            </div>

            <!-- Kabupaten -->
            <div class="col-md-4">
              <div class="datagrid-item">
                <div class="datagrid-title">Kabupaten</div>
                <div class="datagrid-content">Bantul</div>
              </div>
            </div>

            <!-- Provinsi -->
            <div class="col-md-4">
              <div class="datagrid-item">
                <div class="datagrid-title">Provinsi</div>
                <div class="datagrid-content">D.I. Yogyakarta</div>
              </div>
            </div>

            <!-- Status Pernikahan -->
            <div class="col-md-6">
              <div class="datagrid-item">
                <div class="datagrid-title">Status Pernikahan</div>
                <div class="datagrid-content">Belum Menikah</div>
              </div>
            </div>

            <!-- Jumlah Anak -->
            <div class="col-md-6">
              <div class="datagrid-item">
                <div class="datagrid-title">Jumlah Anak</div>
                <div class="datagrid-content">0</div>
              </div>
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
              <div class="datagrid-item">
                <div class="datagrid-title">Tanggal Masuk</div>
                <div class="datagrid-content">24 Juni 2025</div>
              </div>
            </div>

            <!-- Jabatan -->
            <div class="col-md-6">
              <div class="datagrid-item">
                <div class="datagrid-title">Jabatan</div>
                <div class="datagrid-content">Manager</div>
              </div>
            </div>

            <!-- Departemen -->
            <div class="col-md-6">
              <div class="datagrid-item">
                <div class="datagrid-title">Departemen</div>
                <div class="datagrid-content">Produksi</div>
              </div>
            </div>

            <!-- Status -->
            <div class="col-md-6">
              <div class="datagrid-item">
                <div class="datagrid-title">Status</div>
                <div class="datagrid-content">Aktif</div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer d-flex">
          <div class="ms-auto">
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
definePageMeta({
  title: "Detail Pegawai",
});

useSeoMeta({
  title: "Detail Pegawai",
});

const { goBack } = useGoBack();
</script>

<style scoped>
.foto-ptofil {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
