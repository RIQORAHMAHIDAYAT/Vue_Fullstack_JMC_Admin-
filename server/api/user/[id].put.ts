import { defineEventHandler, readBody, getRouterParam, createError } from "h3"
import bcrypt from "bcrypt"
import pool from "../../utils/db"
import { logActivity } from "../../utils/activity"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  const body = await readBody(event)
  const auth = event.context.auth

  const [existing] = await pool.query("SELECT id FROM user WHERE id = ?", [id])
  if ((existing as any[]).length === 0) {
    throw createError({ statusCode: 404, message: "User tidak ditemukan" })
  }

  const updates: string[] = []
  const params: any[] = []

  if (body.id_role !== undefined) { updates.push("id_role=?"); params.push(body.id_role) }
  if (body.id_pegawai !== undefined) { updates.push("id_pegawai=?"); params.push(body.id_pegawai) }
  if (body.id_jabatan !== undefined) { updates.push("id_jabatan=?"); params.push(body.id_jabatan) }
  if (body.id_departemen !== undefined) { updates.push("id_departemen=?"); params.push(body.id_departemen) }
  if (body.username !== undefined) { updates.push("username=?"); params.push(body.username) }
  if (body.nama !== undefined) { updates.push("nama=?"); params.push(body.nama) }
  if (body.email !== undefined) { updates.push("email=?"); params.push(body.email) }
  if (body.disabled !== undefined) { updates.push("disabled=?"); params.push(body.disabled ? 1 : 0) }
  if (body.password) {
    const hash = await bcrypt.hash(body.password, 10)
    updates.push("password_hash=?")
    params.push(hash)
  }

  if (updates.length === 0) {
    throw createError({ statusCode: 400, message: "Tidak ada data yang diupdate" })
  }

  params.push(id)
  await pool.execute(`UPDATE user SET ${updates.join(", ")} WHERE id=?`, params)

  await logActivity(event, "Ubah User", `Mengubah data user ID ${id}`, auth?.id)

  return { success: true, message: "User berhasil diupdate" }
})
