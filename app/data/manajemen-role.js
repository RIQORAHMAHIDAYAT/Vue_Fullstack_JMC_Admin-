export const manajemenRole = [
  {
    id: 1,
    role: "Super Admin",
    deskripsi: "full akses sistem",
  },
  {
    id: 2,
    role: "Admin",
    deskripsi: "Mengatur Sistem",
  },
  {
    id: 3,
    role: "Marketing",
    deskripsi: "Mengelola Pemasaran",
  },
  {
    id: 4,
    role: "Finance",
    deskripsi: "Mengelola Keuangan",
  },
];

export const hakAkses = [
  {
    modul: "Data Pegawai",
    canAksesMenu: true,
    canCreateMenu: true,
    read: "All",
    update: "All",
    delete: "All",
  },
  {
    modul: "Tunjangan",
    canAksesMenu: false,
    canCreateMenu: false,
    read: "No",
    update: "No",
    delete: "No",
  },
  {
    modul: "Manajemen User",
    canAksesMenu: false,
    canCreateMenu: true,
    read: "Own",
    update: "Own",
    delete: "Own",
  },
  {
    modul: "Log Aktifitas",
    canAksesMenu: true,
    canCreateMenu: true,
    read: "All",
    update: "All",
    delete: "All",
  },
];
