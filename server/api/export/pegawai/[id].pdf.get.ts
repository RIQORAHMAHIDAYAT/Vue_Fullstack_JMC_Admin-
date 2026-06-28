import { defineEventHandler, getRouterParam, setHeader, createError } from "h3"
import pool from "../../../utils/db"
import pdfmake from "pdfmake"

export default defineEventHandler(async (event) => {
  const path = event.path || ""
  const id = getRouterParam(event, "id") || path.match(/\/(\d+)\.pdf$/)?.[1]

  const [pegawai] = await pool.query(
    `SELECT p.*, mj.nama as jabatan, md.nama as departemen,
            wk.kecamatan, wk.kabupaten, wk.provinsi
     FROM pegawai p
     LEFT JOIN master_data mj ON p.id_jabatan = mj.id
     LEFT JOIN master_data md ON p.id_departemen = md.id
     LEFT JOIN master_wilayah wk ON p.id_kecamatan = wk.id
     WHERE p.id = ?`,
    [id],
  )

  const rows = pegawai as any[]
  if (rows.length === 0) {
    throw createError({ statusCode: 404, message: "Pegawai tidak ditemukan" })
  }

  const p = rows[0]

  const [pendidikan] = await pool.query(
    "SELECT tingkat_pendidikan, nama_sekolah, tahun_lulus FROM pegawai_pendidikan WHERE id_pegawai = ? ORDER BY tahun_lulus DESC",
    [id],
  )

  const pendList = (pendidikan as any[]).map(
    (pd: any) => `${pd.tingkat_pendidikan || "-"} / ${pd.nama_sekolah || "-"} / ${pd.tahun_lulus || "-"}`,
  )

  const docDef: any = {
    content: [
      { text: "Detail Pegawai", style: "header" },
      { text: "\n\n" },
      { text: `NIP: ${p.nip || "-"}` },
      { text: `Nama: ${p.nama_pegawai || "-"}` },
      { text: `Email: ${p.email || "-"}` },
      { text: `No HP: ${p.nomor_hp || "-"}` },
      { text: `Tempat Lahir: ${p.tempat_lahir || "-"}` },
      { text: `Tanggal Lahir: ${p.tanggal_lahir ? new Date(p.tanggal_lahir).toLocaleDateString("id-ID") : "-"}` },
      { text: `Usia: ${p.usia || "-"} tahun` },
      { text: `Jenis Kelamin: ${p.jenis_kelamin || "-"}` },
      { text: `Status Kawin: ${p.status_kawin || "-"}` },
      { text: `Jumlah Anak: ${p.jumlah_anak || 0}` },
      { text: `Alamat: ${p.alamat_lengkap || "-"}, ${p.kecamatan || "-"}, ${p.kabupaten || "-"}, ${p.provinsi || "-"}` },
      { text: `Jarak Rumah-Kantor: ${p.jarak_rumah_kantor || "-"} km` },
      { text: "\nData Kepegawaian:\n" },
      { text: `Tanggal Masuk: ${p.tanggal_masuk ? new Date(p.tanggal_masuk).toLocaleDateString("id-ID") : "-"}` },
      { text: `Jabatan: ${p.jabatan || "-"}` },
      { text: `Departemen: ${p.departemen || "-"}` },
      { text: `Status: ${p.status || "-"}` },
      { text: "\nPendidikan:\n" },
      ...(pendList.length > 0 ? pendList.map((t: string) => ({ text: `- ${t}` })) : [{ text: "-" }]),
    ],
    styles: {
      header: { fontSize: 16, bold: true },
    },
  }

  pdfmake.fonts = {
    Roboto: {
      normal: "node_modules/pdfmake/fonts/Roboto/Roboto-Regular.ttf",
      bold: "node_modules/pdfmake/fonts/Roboto/Roboto-Medium.ttf",
    },
  }

  const doc = pdfmake.createPdf(docDef)
  const pdfBuffer = await doc.getBuffer()

  setHeader(event, "Content-Type", "application/pdf")
  setHeader(event, "Content-Disposition", `attachment; filename=pegawai-${p.nip || id}.pdf`)
  return pdfBuffer
})
