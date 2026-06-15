<script setup>
definePageMeta({
  title: "Data Pegawai",
  layout: false,
});

useSeoMeta({
  title: "Data Pegawai",
});

import {
  IconPencil,
  IconPlus,
  IconSearch,
  IconTrash,
  IconFileDescription,
  IconCloudDownload,
} from "@tabler/icons-vue";
import { dataPegawai } from "~/data/data-pegawai.js";
import { formatDateID } from "~/utils/formatDate.js";
</script>

<template>
  <NuxtLayout name="default">
    <template #actions>
      <NuxtLink to="/pegawai/form" class="btn btn-primary">
        <IconPlus stroke="{3}" size="20" />Tambah
      </NuxtLink>
    </template>
    <div class="card">
      <div class="card-header">
        <div class="d-flex gap-2 ms-auto">
          <!-- Masa Kerja -->
          <div class="d-flex align-items-center gap-1">
            <span class="text-nowrap">Masa Kerja</span>
            <input type="number" class="form-control" style="width: 60px" />
            -
            <input type="number" class="form-control" style="width: 60px" />
          </div>
          <!-- Filter Jabatan -->
          <select name="" id="" class="form-select" style="width: 180px">
            <option value="">Semua Jabatan</option>
            <option value="">Programmer</option>
            <option value="">System Analyst</option>
            <option value="">Akuntan</option>
            <option value="">Manager Produksi</option>
          </select>

          <!-- Filter Kontrak -->
          <select name="" id="" class="form-select" style="width: 180px">
            <option value="">Status Kontrak</option>
            <option value="">PKWTT</option>
            <option value="">PKWT</option>
          </select>

          <!-- Search -->
          <div class="input-group" style="width: 200px">
            <input
              type="text"
              class="form-control"
              placeholder="Cari Data ..."
            />
            <button class="btn" type="button">
              <IconSearch stroke="{2}" />
            </button>
          </div>
        </div>
      </div>
      <div class="table-responsive card-body p-0">
        <table class="table table-vcenter">
          <thead>
            <tr>
              <th width="5">No</th>
              <th width="15" class="text-center">Aksi</th>
              <th>NIP</th>
              <th>Nama</th>
              <th>Jabatan</th>
              <th>Tanggal Masuk</th>
              <th>Masa Kerja</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dataPegawai" :key="item.nip">
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-nowrap">
                <div class="d-flex">
                  <!-- Aksi Edit -->
                  <NuxtLink :to="`/pegawai/form/${item.nip}`" class="text-dark">
                    <span
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title="Edit"
                    >
                      <IconPencil stroke="{1}" size="20" />
                    </span>
                  </NuxtLink>

                  <!-- Aksi Detail -->
                  <NuxtLink :to="`/pegawai/${item.nip}`" class="text-dark">
                    <span
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title="Detail"
                    >
                      <IconFileDescription stroke="{1}" size="20" />
                    </span>
                  </NuxtLink>

                  <!-- Aksi Download -->
                  <a href="#" class="text-dark">
                    <span
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title="Download"
                    >
                      <IconCloudDownload stroke="{1}" size="20" />
                    </span>
                  </a>

                  <!-- Aksi Hapus -->
                  <a
                    href="#"
                    class="text-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-hapus"
                  >
                    <span
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title="Hapus"
                    >
                      <IconTrash stroke="{1}" size="20" />
                    </span>
                  </a>
                </div>
              </td>
              <td>{{ item.nip }}</td>
              <td>{{ item.nama }}</td>
              <td>{{ item.jabatan }}</td>
              <td>{{ formatDateID(item.tanggalMasuk) }}</td>
              <td>{{ item.masaKerja }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer d-flex align-items-center">
        <ul class="pagination ms-auto m-0">
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item active"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">4</a></li>
          <li class="page-item"><a class="page-link" href="#">5</a></li>
          <li class="page-item">
            <a class="page-link" href="#">
              next
              <!-- Download SVG icon from http://tabler-icons.io/i/chevron-right -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 6l6 6l-6 6"></path>
              </svg>
            </a>
          </li>
        </ul>
      </div>

      <!-- Modal Hapus -->
      <div class="modal modal-blur fade" id="modal-hapus">
        <div
          class="modal-dialog modal-sm modal-dialog-centered"
          role="document"
        >
          <div class="modal-content">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div class="modal-status bg-danger"></div>
            <div class="modal-body text-center py-4">
              <!-- Download SVG icon from http://tabler.io/icons/icon/alert-triangle -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon mb-2 text-danger icon-lg"
              >
                <path d="M12 9v4"></path>
                <path
                  d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z"
                ></path>
                <path d="M12 16h.01"></path>
              </svg>
              <h3 class="mb-1">Hapus Data</h3>
              <div class="text-secondary">
                Apakah kamu ingin menghapus data ini ?
              </div>
            </div>
            <div class="modal-footer">
              <div class="w-100">
                <div class="row">
                  <div class="col">
                    <a href="#" class="btn btn-3 w-100" data-bs-dismiss="modal">
                      Batal
                    </a>
                  </div>
                  <div class="col">
                    <a
                      href="#"
                      class="btn btn-danger btn-4 w-100"
                      data-bs-dismiss="modal"
                    >
                      Hapus
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
