import { defineEventHandler, getQuery } from "h3"
import pool from "../../utils/db"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const tahun = Number(query.tahun) || new Date().getFullYear()

  const [rows] = await pool.query(
    `SELECT tt.bulan, tt.tahun,
            COUNT(DISTINCT tt.id_pegawai) as total_penerima,
            SUM(tt.nominal) as total_nominal
     FROM tunjangan_transport tt
     WHERE tt.tahun = ?
     GROUP BY tt.tahun, tt.bulan
     ORDER BY tt.bulan`,
    [tahun],
  )

  const bulanIndo = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"]

  const existingData = (rows as any[]).reduce((acc: any, r: any) => {
    acc[r.bulan] = r
    return acc
  }, {})

  const data = []
  for (let b = 1; b <= 12; b++) {
    const existing = existingData[b]
    data.push({
      id: `${tahun}-${String(b).padStart(2, "0")}`,
      bulan: `${bulanIndo[b]} ${tahun}`,
      total_penerima: existing ? Number(existing.total_penerima) : 0,
      total_nominal: existing ? Number(existing.total_nominal) : 0,
      sudah_dihitung: !!existing,
    })
  }

  return { success: true, data }
})
