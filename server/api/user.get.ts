import { defineEventHandler, getQuery } from "h3"
import pool from "../utils/db"
import { parsePagination } from "../utils/helpers"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { page, limit, offset } = parsePagination(query)

  let where = "WHERE 1=1"
  const params: any[] = []

  if (query.search) {
    where += " AND (u.nama LIKE ? OR u.username LIKE ?)"
    const s = `%${query.search}%`
    params.push(s, s)
  }
  if (query.id_role) {
    where += " AND u.id_role = ?"
    params.push(Number(query.id_role))
  }

  const countRows = (await pool.query(`SELECT COUNT(*) as total FROM user u ${where}`, params))[0] as any[]
  const total = countRows[0].total

  const [rows] = await pool.query(
    `SELECT u.id, u.id_role, u.id_pegawai, u.username, u.nama, u.email, (u.disabled = 0) as isActive, u.last_login, u.created_at,
            ur.nama_role as role, p.nama_pegawai, mj.nama as jabatan, md.nama as departemen
     FROM user u
     LEFT JOIN user_role ur ON u.id_role = ur.id
     LEFT JOIN pegawai p ON u.id_pegawai = p.id
     LEFT JOIN master_data mj ON p.id_jabatan = mj.id
     LEFT JOIN master_data md ON p.id_departemen = md.id
     ${where}
     ORDER BY u.created_at DESC
     LIMIT ? OFFSET ?`,
    [...params, limit, offset],
  )

  return {
    success: true,
    data: rows,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  }
})
