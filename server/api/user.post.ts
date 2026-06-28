import { defineEventHandler, readBody, createError } from "h3"
import bcrypt from "bcrypt"
import pool from "../utils/db"
import { logActivity } from "../utils/activity"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const auth = event.context.auth

  if (!body.username || !body.password) {
    throw createError({ statusCode: 400, message: "Username dan password wajib diisi" })
  }
  if (body.username.length < 6) {
    throw createError({ statusCode: 400, message: "Username minimal 6 karakter" })
  }
  if (!/^[a-z0-9]+$/.test(body.username)) {
    throw createError({ statusCode: 400, message: "Username hanya boleh huruf kecil dan angka" })
  }

  const passwordHash = await bcrypt.hash(body.password, 10)

  try {
    const [result] = await pool.execute(
      `INSERT INTO user (id_role, id_pegawai, id_jabatan, id_departemen, username, password_hash, nama, email, disabled)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.id_role || null,
        body.id_pegawai || null,
        body.id_jabatan || null,
        body.id_departemen || null,
        body.username,
        passwordHash,
        body.nama || null,
        body.email || null,
        body.disabled ? 1 : 0,
      ],
    )

    await logActivity(event, "Tambah User", `Menambahkan user ${body.username}`, auth?.id)

    return { success: true, message: "User berhasil ditambahkan", data: { id: (result as any).insertId } }
  } catch (err: any) {
    if (err.code === "ER_DUP_ENTRY") {
      throw createError({ statusCode: 409, message: "Username sudah digunakan" })
    }
    throw err
  }
})
