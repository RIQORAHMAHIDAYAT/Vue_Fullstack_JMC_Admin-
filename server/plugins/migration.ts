import mysql from "mysql2/promise"
import process from "node:process"

export default defineNitroPlugin(async () => {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "",
      database: process.env.DB_NAME || "kepegawaian_db",
    })

    const [rows] = await conn.query(
      "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'pegawai' AND COLUMN_NAME = 'jenis_kontrak'",
      [process.env.DB_NAME || "kepegawaian_db"],
    )

    if ((rows as any[]).length === 0) {
      await conn.query("ALTER TABLE pegawai ADD COLUMN `jenis_kontrak` enum('PKWT','PKWTT','Magang') DEFAULT 'PKWTT' AFTER `status`")
      await conn.query("UPDATE pegawai SET jenis_kontrak = 'PKWTT' WHERE jenis_kontrak IS NULL")
      console.log("[Migration] Kolom jenis_kontrak berhasil ditambahkan")
    }

    const [sessionRows] = await conn.query(
      "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'user' AND COLUMN_NAME = 'last_session'",
      [process.env.DB_NAME || "kepegawaian_db"],
    )

    if ((sessionRows as any[]).length === 0) {
      await conn.query("ALTER TABLE user ADD COLUMN `last_session` TEXT NULL AFTER `last_login`")
      console.log("[Migration] Kolom last_session berhasil ditambahkan")
    }

    const [genderRows] = await conn.query(
      "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'pegawai' AND COLUMN_NAME = 'jenis_kelamin'",
      [process.env.DB_NAME || "kepegawaian_db"],
    )

    if ((genderRows as any[]).length === 0) {
      await conn.query("ALTER TABLE pegawai ADD COLUMN `jenis_kelamin` enum('Laki-laki','Perempuan') NULL AFTER `nama_pegawai`")
      console.log("[Migration] Kolom jenis_kelamin berhasil ditambahkan")
    }

    const [userGenderRows] = await conn.query(
      "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'user' AND COLUMN_NAME = 'gender'",
      [process.env.DB_NAME || "kepegawaian_db"],
    )

    if ((userGenderRows as any[]).length === 0) {
      await conn.query("ALTER TABLE user ADD COLUMN `gender` enum('Laki-laki','Perempuan') NULL AFTER `nama`")
      console.log("[Migration] Kolom gender di tabel user berhasil ditambahkan")
    }

    await conn.end()
  } catch (err) {
    console.error("[Migration] Gagal:", err)
  }
})
