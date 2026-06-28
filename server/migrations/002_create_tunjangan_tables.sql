CREATE TABLE IF NOT EXISTS `tunjangan_setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `base_fare` decimal(15,2) NOT NULL,
  `berlaku_mulai` date DEFAULT NULL,
  `min_km` tinyint(2) DEFAULT 5,
  `max_km` tinyint(2) DEFAULT 25,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `tunjangan_transport` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_pegawai` int(11) NOT NULL,
  `bulan` tinyint(2) NOT NULL,
  `tahun` smallint(4) NOT NULL,
  `km` decimal(5,1) DEFAULT NULL,
  `hari_kerja` tinyint(2) DEFAULT NULL,
  `nominal` decimal(15,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_pegawai` (`id_pegawai`),
  KEY `bulan_tahun` (`bulan`,`tahun`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `pegawai_absensi` (
  `id_pegawai` int(11) NOT NULL,
  `bulan` tinyint(2) NOT NULL,
  `tahun` smallint(4) NOT NULL,
  `hari_kerja` tinyint(2) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_pegawai`,`bulan`,`tahun`),
  KEY `bulan_tahun` (`bulan`,`tahun`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
