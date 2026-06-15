import {
  IconLayoutDashboardFilled,
  IconUserFilled,
  IconDatabaseFilled,
  IconUsers,
  IconHistory,
} from "@tabler/icons-vue";

export const menuItems = [
  {
    title: "Dashboard",
    icon: IconLayoutDashboardFilled,
    to: "/",
  },
  {
    title: "Data Pegawai",
    icon: IconUserFilled,
    to: "/pegawai",
  },
  {
    title: "Tunjangan",
    icon: IconDatabaseFilled,
    children: [
      {
        title: "Setting Tunjangan Transport",
        to: "/tunjangan/setting",
      },
      {
        title: "Tunjangan Transport",
        to: "/tunjangan/transport",
      },
    ],
  },
  {
    title: "Manajemen User",
    icon: IconUsers,
    children: [
      {
        title: "Manajemen Role",
        to: "/user/role",
      },
      {
        title: "Manajemen User",
        to: "/user/manage",
      },
    ],
  },
  {
    title: "Log Aktifitas",
    icon: IconHistory,
    to: "/log",
  },
];
