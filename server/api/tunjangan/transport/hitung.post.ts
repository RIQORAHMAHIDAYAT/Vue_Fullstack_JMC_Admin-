import { defineEventHandler, readBody, createError } from "h3";
import pool from "../../../utils/db";
import { logActivity } from "../../../utils/activity";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const auth = event.context.auth;

  const bulan = body.bulan || new Date().getMonth() + 1;
  const tahun = body.tahun || new Date().getFullYear();

  // Ambil setting tunjangan
  const [settingRows] = await pool.query(
    "SELECT * FROM tunjangan_setting ORDER BY id DESC LIMIT 1",
  );

  const settings = settingRows as any[];

  if (settings.length === 0) {
    throw createError({
      statusCode: 400,
      message: "Setting tunjangan belum dikonfigurasi",
    });
  }

  const setting = settings[0];
  const baseFare = Number(setting.base_fare);
  const minKm = Number(setting.min_km || 5);
  const maxKm = Number(setting.max_km || 25);

  // Ambil pegawai yang memenuhi syarat
  const [pegawaiRows] = await pool.query(
    `SELECT
        p.id,
        p.nama_pegawai,
        p.jarak_rumah_kantor,
        COALESCE(pa.hari_kerja, 22) AS hari_kerja
     FROM pegawai p
     LEFT JOIN pegawai_absensi pa
       ON p.id = pa.id_pegawai
      AND pa.bulan = ?
      AND pa.tahun = ?
     WHERE p.status = 'Aktif'
       AND p.jenis_kontrak = 'PKWTT'
       AND p.jarak_rumah_kantor IS NOT NULL
       AND p.jarak_rumah_kantor >= ?
       AND p.jarak_rumah_kantor <= ?`,
    [bulan, tahun, minKm, maxKm],
  );

  const pegawai = pegawaiRows as any[];

  if (pegawai.length === 0) {
    return {
      success: true,
      message: "Tidak ada pegawai tetap yang memenuhi kriteria tunjangan",
    };
  }

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // Hapus data tunjangan bulan & tahun yang sama
    await conn.execute(
      "DELETE FROM tunjangan_transport WHERE bulan = ? AND tahun = ?",
      [bulan, tahun],
    );

    let inserted = 0;

    for (const p of pegawai) {
      const hariKerja = Number(p.hari_kerja);

      // Minimal hadir 19 hari
      if (hariKerja < 19) continue;

      const km = Number(p.jarak_rumah_kantor);

      // Pembulatan jarak
      const kmRounded =
        km - Math.floor(km) >= 0.5 ? Math.ceil(km) : Math.floor(km);

      // Hitung nominal tunjangan
      const nominal = baseFare * kmRounded * hariKerja;

      await conn.execute(
        `INSERT INTO tunjangan_transport
          (id_pegawai, bulan, tahun, km, hari_kerja, nominal)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [p.id, bulan, tahun, kmRounded, hariKerja, nominal],
      );

      inserted++;
    }

    await conn.commit();

    await logActivity(
      event,
      "Hitung Tunjangan",
      `Menghitung tunjangan transport bulan ${bulan}/${tahun} untuk ${inserted} pegawai tetap`,
      auth?.id,
    );

    return {
      success: true,
      message: `Tunjangan berhasil dihitung untuk ${inserted} pegawai tetap`,
    };
  } catch (err) {
    await conn.rollback();

    throw createError({
      statusCode: 500,
      message: "Gagal menghitung tunjangan",
    });
  } finally {
    conn.release();
  }
});
