<template>
  <NuxtLayout name="default">
    <template #actions>
      <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#modal-add"
      >
        <IconPlus stroke="{3}" size="20" />Tambah
      </button>
    </template>
    <div class="card">
      <div class="card-header">
        <div class="d-flex gap-2 ms-auto">
          <!-- Filter Role -->
          <select name="" id="" class="form-select">
            <template v-for="(item, index) in roleOptions" :key="index">
              <option :value="item.value">{{ item.label }}</option>
            </template>
          </select>

          <!-- Search -->
          <div class="input-group">
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
              <th width="15">Action</th>
              <th>Nama Pengguna</th>
              <th>Username</th>
              <th>Jabatan</th>
              <th>Departemen</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in manajemenUser" :key="item.id">
            <tr>
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-nowrap">
                <div class="d-flex">
                  <!-- Aksi Edit -->
                  <a
                    href="#"
                    class="text-dark"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-add"
                  >
                    <span
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title="Edit"
                    >
                      <IconPencil stroke="{1}" size="20" />
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
              <td>{{ item.nama }}</td>
              <td>{{ item.username }}</td>
              <td>{{ item.jabatan }}</td>
              <td>{{ item.departemen }}</td>
              <td>{{ item.role }}</td>
              <td>{{ item.isActive ? "Aktif" : "Tidak Aktif" }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer d-flex align-items-center">
        <ul class="pagination ms-auto m-0">
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item active">
            <a class="page-link" href="#">2</a>
          </li>
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

      <!-- Modal Tambah/Edit User -->
      <div class="modal modal-blur fade" id="modal-add">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Form Manajemen User</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <!-- NAMA -->
              <div class="mb-3">
                <label class="form-label">Nama Lengkap</label>
                <input type="text" class="form-control" />
              </div>

              <!-- USERNAME -->
              <div class="mb-3">
                <label class="form-label">Username</label>
                <input type="text" class="form-control" />
              </div>

              <!-- JABATAN -->
              <div class="mb-3">
                <label class="form-label">Jabatan</label>
                <select name="" id="" class="form-select">
                  <option value="" selected disabled>
                    Pilih terlebih dahulu
                  </option>
                  <option value="">Programmer</option>
                  <option value="">System Analist</option>
                  <option value="">Akuntan</option>
                  <option value="">Manager Produksi</option>
                </select>
              </div>

              <!-- DEPARTEMEN -->
              <div class="mb-3">
                <label class="form-label">Departemen</label>
                <select name="" id="" class="form-select">
                  <option value="" selected disabled>
                    Pilih terlebih dahulu
                  </option>
                  <option value="">Produksi</option>
                  <option value="">Finance</option>
                  <option value="">Direksi</option>
                </select>
              </div>

              <!-- ROLE -->
              <div class="mb-3">
                <label class="form-label">Role</label>
                <select name="" id="" class="form-select">
                  <option value="" selected disabled>
                    Pilih terlebih dahulu
                  </option>
                  <option value="">Admin</option>
                  <option value="">Member</option>
                </select>
              </div>

              <!-- PASSWORD -->
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" class="form-control mb-1" />
                <button class="btn btn-primary">Generate Password</button>
              </div>

              <!-- STATUS -->
              <div>
                <label class="form-label">Status</label>
                <label class="form-check">
                  <input class="form-check-input" type="checkbox" />
                  <span class="form-check-label">Aktif</span>
                </label>
              </div>
            </div>
            <div class="modal-footer">
              <div class="d-flex gap-2 ms-auto">
                <button type="button" class="btn" data-bs-dismiss="modal">
                  Kembali
                </button>
                <button type="button" class="btn btn-primary">
                  <i class="ti ti-check me-1"></i> Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
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

<script setup>
definePageMeta({
  title: "Manajemen User",
  layout: false,
});

useSeoMeta({
  title: "Manajemen User",
});

import { IconPencil, IconPlus, IconSearch, IconTrash } from "@tabler/icons-vue";
import { manajemenUser } from "~/data/manajemen-user.js";

const roleOptions = [
  {
    label: "Semua Role",
    value: "",
  },
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Super Admin",
    value: "super admin",
  },
];
</script>
