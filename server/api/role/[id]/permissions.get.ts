import { defineEventHandler, getRouterParam } from "h3"
import pool from "../../../utils/db"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  
  const [rows] = await pool.query(
    "SELECT id, modul_fitur, akses, `create`, `read`, `update`, `delete` FROM role_permission WHERE id_role = ?",
    [id]
  )

  return { success: true, data: rows }
})
