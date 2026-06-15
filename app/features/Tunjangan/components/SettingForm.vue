<template>
  <div class="card">
    <div class="card-body">
      <div class="row g-3">
        <!-- Tarif -->
        <div class="col-md-6">
          <label for="" class="form-label">Tarif (Rp)</label>
          <input type="number" min="0" class="form-control text-end" />
        </div>

        <!-- Berlaku Mulai -->
        <div class="col-md-6">
          <label for="" class="form-label">Berlaku Mulai</label>
          <input type="date" class="form-control" />
        </div>

        <!-- Minimum Kilometer -->
        <div class="col-md-6">
          <label for="" class="form-label">Minimum Kilometer</label>
          <input type="number" min="0" class="form-control" />
        </div>

        <!-- Maksimum Kilometer -->
        <div class="col-md-6">
          <label for="" class="form-label">Maksimum Kilometer</label>
          <input type="number" min="0" class="form-control" />
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="d-flex gap-2">
        <button class="btn btn-primary">Simpan</button>
        <button class="btn btn-outline-primary">Kembali</button>
      </div>
    </div>
  </div>
</template>

<script setup></script>
