const mysql = require('mysql2/promise');

async function run() {
  const pool = mysql.createPool({ host: '127.0.0.1', user: 'root', database: 'kepegawaian_db' });
  try {
    // Hapus semua data lama (bersihkan duplikat)
    await pool.query('DELETE FROM role_permission');
    console.log('Cleared role_permission');

    // SUPERADMIN (id_role = 1)
    // - Kelola Role: R (read all)
    // - Kelola User: CRUD kecuali hapus diri sendiri
    // - My Profile: RO, UO (read own, update own)
    // - Dashboard: R
    // - Modul Pegawai: - (tidak ada akses)
    // - Modul Tunjangan Transport: - (tidak ada akses)
    // - Setting Tunjangan Transport: - (tidak ada akses)
    // - Modul Log: R (read all)
    const superadminData = [
      [1, 'kelola_role',                1, 0, 'All', '',    ''   ],
      [1, 'kelola_user',                1, 1, 'All', 'All', 'All'],
      [1, 'my_profile',                 1, 0, 'Own', 'Own', ''   ],
      [1, 'dashboard',                  1, 0, 'All', '',    ''   ],
      [1, 'modul_pegawai',              0, 0, 'No',  '',    ''   ],
      [1, 'modul_tunjangan_transport',  0, 0, 'No',  '',    ''   ],
      [1, 'setting_tunjangan_transport',0, 0, 'No',  '',    ''   ],
      [1, 'modul_log',                  1, 0, 'All', '',    ''   ],
    ];

    // MANAGER HRD (id_role = 2)
    // - Kelola Role: - (tidak ada akses)
    // - Kelola User: - (tidak ada akses)
    // - My Profile: RO, UO (read own, update own)
    // - Dashboard: R, Sesuai Role
    // - Modul Pegawai: R (read all)
    // - Modul Tunjangan Transport: RO (read own)
    // - Setting Tunjangan Transport: - (tidak ada akses)
    // - Modul Log: - (tidak ada akses)
    const managerData = [
      [2, 'kelola_role',                0, 0, 'No',  '',    ''   ],
      [2, 'kelola_user',                0, 0, 'No',  '',    ''   ],
      [2, 'my_profile',                 1, 0, 'Own', 'Own', ''   ],
      [2, 'dashboard',                  1, 0, 'All', '',    ''   ],
      [2, 'modul_pegawai',              1, 0, 'All', '',    ''   ],
      [2, 'modul_tunjangan_transport',  1, 0, 'Own', '',    ''   ],
      [2, 'setting_tunjangan_transport',0, 0, 'No',  '',    ''   ],
      [2, 'modul_log',                  0, 0, 'No',  '',    ''   ],
    ];

    // ADMIN HRD (id_role = 3)
    // - Kelola Role: - (tidak ada akses)
    // - Kelola User: - (tidak ada akses)
    // - My Profile: RO, UO (read own, update own)
    // - Dashboard: Sesuai Role
    // - Modul Pegawai: CRUD kecuali hapus pegawai superadmin
    // - Modul Tunjangan Transport: RO (read own)
    // - Setting Tunjangan Transport: CRUD
    // - Modul Log: - (tidak ada akses)
    const adminData = [
      [3, 'kelola_role',                0, 0, 'No',  '',    ''   ],
      [3, 'kelola_user',                0, 0, 'No',  '',    ''   ],
      [3, 'my_profile',                 1, 0, 'Own', 'Own', ''   ],
      [3, 'dashboard',                  1, 0, 'All', '',    ''   ],
      [3, 'modul_pegawai',              1, 1, 'All', 'All', 'All'],
      [3, 'modul_tunjangan_transport',  1, 0, 'Own', '',    ''   ],
      [3, 'setting_tunjangan_transport',1, 1, 'All', 'All', 'All'],
      [3, 'modul_log',                  0, 0, 'No',  '',    ''   ],
    ];

    const allData = [...superadminData, ...managerData, ...adminData];
    for (const row of allData) {
      await pool.query(
        'INSERT INTO role_permission (id_role, modul_fitur, akses, `create`, `read`, `update`, `delete`) VALUES (?, ?, ?, ?, ?, ?, ?)',
        row
      );
    }

    console.log('Inserted', allData.length, 'rows successfully');

    const [check] = await pool.query('SELECT COUNT(*) as total FROM role_permission');
    console.log('Total rows now:', check[0].total);

    const [verify] = await pool.query('SELECT id_role, modul_fitur, akses, `read`, `create`, `update`, `delete` FROM role_permission ORDER BY id_role, modul_fitur');
    console.log('\nVerifikasi data:');
    console.log(JSON.stringify(verify, null, 2));

  } catch(e) {
    console.error('ERROR:', e.message);
  }
  process.exit(0);
}
run();
