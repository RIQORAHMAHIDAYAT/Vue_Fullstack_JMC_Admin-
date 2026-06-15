<template>
  <div class="card">
    <div class="card-header">
      <div class="d-flex gap-2 ms-auto">
        <!-- Filter Role -->
        <select name="" id="" class="form-select" style="width: 180px">
          <option value="">Semua Role</option>
          <option value="">Super Admin</option>
          <option value="">Admin</option>
          <option value="">Marketing</option>
          <option value="">Finance</option>
        </select>

        <!-- Search -->
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Cari Data ..." />
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
            <th>Role</th>
            <th>Deskripsi</th>
            <th class="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in manajemenRole" :key="item.id">
          <tr>
            <td class="text-center">{{ index + 1 }}</td>
            <td>{{ item.role }}</td>
            <td>{{ item.deskripsi }}</td>
            <td class="text-center">
              <NuxtLink
                :to="`role/hak-akses/${item.id}`"
                class="btn btn-sm btn-primary"
                >Hak Akses
              </NuxtLink>
            </td>
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
  </div>
</template>

<script setup>
definePageMeta({
  title: "Manajemen Role",
});

useSeoMeta({
  title: "Manajemen Role",
});

import { IconSearch } from "@tabler/icons-vue";
import { manajemenRole } from "~/data/manajemen-role.js";
</script>
