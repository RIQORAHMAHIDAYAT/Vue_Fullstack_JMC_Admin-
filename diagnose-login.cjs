/**
 * Script Diagnostik Login
 * Jalankan: node diagnose-login.cjs
 * Untuk mengecek apakah masalah ada di database, koneksi, atau konfigurasi
 */

const mysql = require('mysql2/promise');
const http = require('http');
require('fs');

// Baca .env manual (tanpa dotenv)
const fs = require('fs');
const envContent = fs.readFileSync('.env', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...vals] = line.trim().split('=');
  if (key && !key.startsWith('#')) env[key] = vals.join('=');
});

const DB_HOST = env.DB_HOST || 'localhost';
const DB_PORT = parseInt(env.DB_PORT || '3306');
const DB_USER = env.DB_USER || 'root';
const DB_PASS = env.DB_PASS || '';
const DB_NAME = env.DB_NAME || 'kepegawaian_db';

console.log('\n=== DIAGNOSTIK LOGIN APLIKASI ===\n');
console.log('📋 Konfigurasi Database:');
console.log(`   Host : ${DB_HOST}:${DB_PORT}`);
console.log(`   User : ${DB_USER}`);
console.log(`   DB   : ${DB_NAME}`);
console.log(`   Pass : ${DB_PASS ? '***ada***' : '(kosong)'}`);
console.log('');

async function diagnose() {
  let pool;
  
  // 1. Test koneksi database
  console.log('🔌 [1] Mengecek koneksi database...');
  try {
    pool = mysql.createPool({
      host: DB_HOST, port: DB_PORT, user: DB_USER,
      password: DB_PASS, database: DB_NAME, connectionLimit: 3,
    });
    await pool.query('SELECT 1');
    console.log('   ✅ Koneksi database berhasil!\n');
  } catch (err) {
    console.error(`   ❌ GAGAL koneksi database: ${err.message}\n`);
    console.error('   ➡  Pastikan MySQL berjalan dan konfigurasi .env sudah benar');
    return;
  }

  // 2. Cek tabel user ada
  console.log('📊 [2] Mengecek struktur tabel...');
  try {
    const [tables] = await pool.query(
      `SELECT TABLE_NAME FROM information_schema.TABLES 
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME IN ('user','pegawai','user_role','role_permission')`,
      [DB_NAME]
    );
    const tableNames = tables.map(t => t.TABLE_NAME);
    const required = ['user', 'pegawai', 'user_role', 'role_permission'];
    required.forEach(t => {
      const ok = tableNames.includes(t);
      console.log(`   ${ok ? '✅' : '❌'} Tabel '${t}': ${ok ? 'ADA' : 'TIDAK ADA'}`);
    });
    console.log('');

    if (!tableNames.includes('user')) {
      console.error('   ❌ Tabel "user" tidak ditemukan! Jalankan SQL migrations dulu.');
      return;
    }
  } catch (err) {
    console.error(`   ❌ Error cek tabel: ${err.message}\n`);
  }

  // 3. Cek kolom tabel user
  console.log('🔎 [3] Mengecek kolom tabel user...');
  try {
    const [cols] = await pool.query(
      `SHOW COLUMNS FROM user`
    );
    const colNames = cols.map(c => c.Field);
    console.log(`   Kolom ditemukan: ${colNames.join(', ')}`);
    const required = ['id', 'username', 'email', 'password_hash', 'disabled', 'id_role', 'id_pegawai'];
    required.forEach(c => {
      const ok = colNames.includes(c);
      console.log(`   ${ok ? '✅' : '❌'} Kolom '${c}': ${ok ? 'ADA' : 'TIDAK ADA'}`);
    });
    console.log('');
  } catch (err) {
    console.error(`   ❌ Error cek kolom: ${err.message}\n`);
  }

  // 4. Cek data user di database
  console.log('👤 [4] Mengecek data user di database...');
  try {
    const [users] = await pool.query(
      `SELECT u.id, u.username, u.email, u.disabled, u.id_role, 
              LEFT(u.password_hash, 7) as hash_prefix,
              LENGTH(u.password_hash) as hash_length,
              ur.nama_role
       FROM user u
       LEFT JOIN user_role ur ON u.id_role = ur.id
       LIMIT 10`
    );
    
    if (users.length === 0) {
      console.log('   ⚠️  TIDAK ADA DATA USER di tabel "user"!');
      console.log('   ➡  Anda perlu insert user ke database terlebih dahulu.');
    } else {
      console.log(`   Ditemukan ${users.length} user:\n`);
      users.forEach((u, i) => {
        console.log(`   [${i+1}] username: ${u.username || '(null)'}`);
        console.log(`        email   : ${u.email || '(null)'}`);
        console.log(`        role    : ${u.nama_role || '(null)'} (id_role=${u.id_role})`);
        console.log(`        disabled: ${u.disabled}`);
        console.log(`        hash    : ${u.hash_prefix}... (panjang: ${u.hash_length})`);
        const isValidBcrypt = u.hash_prefix === '$2b$10$' || u.hash_prefix === '$2a$10$' || u.hash_prefix?.startsWith('$2');
        console.log(`        bcrypt? : ${isValidBcrypt ? '✅ Ya (format benar)' : '❌ BUKAN bcrypt! Password belum di-hash!'}`);
        console.log('');
      });
    }
  } catch (err) {
    console.error(`   ❌ Error query user: ${err.message}\n`);
  }

  // 5. Cek role_permission ada datanya
  console.log('🔑 [5] Mengecek data role_permission...');
  try {
    const [perms] = await pool.query('SELECT COUNT(*) as total FROM role_permission');
    const total = perms[0].total;
    console.log(`   ${total > 0 ? '✅' : '⚠️'} role_permission: ${total} baris\n`);
  } catch (err) {
    console.error(`   ❌ Error: ${err.message}\n`);
  }

  // 6. Test login via API HTTP
  console.log('🌐 [6] Test login via HTTP API (port 3000)...');
  const testUser = { username: 'admin', password: 'admin123' };
  const postData = JSON.stringify(testUser);
  
  await new Promise((resolve) => {
    const req = http.request({
      hostname: 'localhost', port: 3000,
      path: '/api/auth/login', method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(postData) }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`   Status HTTP: ${res.statusCode}`);
        try {
          const json = JSON.parse(data);
          if (res.statusCode === 200) {
            console.log(`   ✅ Login BERHASIL dengan user '${testUser.username}'`);
            console.log(`   Token: ${json.token?.substring(0, 30)}...`);
          } else {
            console.log(`   ❌ Login GAGAL: ${json.message || data}`);
            if (json.message === 'Pengguna tidak ditemukan') {
              console.log('   ➡  User tidak ada di database atau "disabled = 1"');
            } else if (json.message === 'Password salah') {
              console.log('   ➡  Password tidak cocok. Pastikan password di-hash dengan bcrypt');
            }
          }
        } catch {
          console.log(`   Response: ${data.substring(0, 200)}`);
        }
        resolve();
      });
    });
    req.on('error', (e) => {
      console.log(`   ⚠️  Tidak bisa connect ke port 3000: ${e.message}`);
      console.log('   ➡  Pastikan server Nuxt sudah berjalan (npm run dev)');
      resolve();
    });
    req.write(postData);
    req.end();
  });

  console.log('\n=== SELESAI DIAGNOSTIK ===\n');
  await pool.end();
}

diagnose().catch(err => {
  console.error('Error tidak terduga:', err.message);
  process.exit(1);
});
