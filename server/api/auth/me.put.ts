import { defineEventHandler, readBody, createError } from "h3"
import bcrypt from "bcrypt"
import pool from "../../utils/db"
import { logActivity } from "../../utils/activity"

export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  if (!auth) {
    throw createError({ statusCode: 401, message: "Unauthorized" })
  }

  const body = await readBody(event)

  const updates: string[] = []
  const params: any[] = []

  if (body.nama !== undefined) {
    if (typeof body.nama !== "string" || !body.nama.trim()) {
      throw createError({ statusCode: 400, message: "Nama tidak boleh kosong" })
    }
    updates.push("nama=?")
    params.push(body.nama.trim())
  }

  if (body.email !== undefined) {
    if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      throw createError({ statusCode: 400, message: "Format email tidak valid" })
    }
    updates.push("email=?")
    params.push(body.email || null)
  }

  if (body.password) {
    if (body.password.length < 8) {
      throw createError({ statusCode: 400, message: "Password minimal 8 karakter" })
    }
    if (/\s/.test(body.password)) {
      throw createError({ statusCode: 400, message: "Password tidak boleh mengandung spasi" })
    }
    if (!/[A-Z]/.test(body.password)) {
      throw createError({ statusCode: 400, message: "Password harus mengandung huruf besar" })
    }
    if (!/[a-z]/.test(body.password)) {
      throw createError({ statusCode: 400, message: "Password harus mengandung huruf kecil" })
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(body.password)) {
      throw createError({ statusCode: 400, message: "Password harus mengandung karakter khusus" })
    }
    const hash = await bcrypt.hash(body.password, 10)
    updates.push("password_hash=?")
    params.push(hash)
  }

  if (updates.length === 0) {
    throw createError({ statusCode: 400, message: "Tidak ada data yang diubah" })
  }

  params.push(auth.id)
  await pool.execute(`UPDATE user SET ${updates.join(", ")} WHERE id=?`, params)

  await logActivity(event, "Update Profil", `User ${auth.nama} mengupdate profil`, auth.id)

  return { success: true, message: "Profil berhasil diperbarui" }
})
