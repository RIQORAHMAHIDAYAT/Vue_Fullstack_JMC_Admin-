import { defineEventHandler, getRouterParam, createError } from "h3"
import pool from "../../utils/db"
import { logActivity } from "../../utils/activity"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  const auth = event.context.auth

  // Cegah user menghapus akun dirinya sendiri
  if (auth?.id && String(auth.id) === String(id)) {
    throw createError({ statusCode: 403, message: "Tidak dapat menghapus akun diri sendiri" })
  }

  const [existing] = await pool.query("SELECT username FROM user WHERE id = ?", [id])
  if ((existing as any[]).length === 0) {
    throw createError({ statusCode: 404, message: "User tidak ditemukan" })
  }

  await pool.execute("DELETE FROM user WHERE id = ?", [id])
  await logActivity(event, "Hapus User", `Menghapus user ID ${id}`, auth?.id)

  return { success: true, message: "User berhasil dihapus" }
})
