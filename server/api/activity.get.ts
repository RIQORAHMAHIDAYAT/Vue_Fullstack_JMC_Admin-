import { defineEventHandler, getQuery, createError } from "h3";
import pool from "../utils/db";

export default defineEventHandler(async (event) => {
  // 1. Ambil query parameter dari frontend (page, limit, search)
  const query = getQuery(event);
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 15;
  const search = (query.search as string) || "";
  
  // Hitung offset untuk pagination SQL
  const offset = (page - 1) * limit;

  try {
    let whereClause = "WHERE 1=1";
    const queryParams: any[] = [];

    // 2. Jika ada parameter pencarian, tambahkan kondisi WHERE
    if (search) {
      whereClause += " AND (u.username LIKE ? OR a.title LIKE ? OR a.content LIKE ? OR a.ip LIKE ?)";
      const searchPattern = `%${search}%`;
      queryParams.push(searchPattern, searchPattern, searchPattern, searchPattern);
    }

    // 3. Query untuk menghitung total data (untuk keperluan pagination frontend)
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM activities a
      LEFT JOIN user u ON a.created_by = u.id
      ${whereClause}
    `;
    const [countRows]: any = await pool.query(countQuery, queryParams);
    const total = countRows[0].total;
    const totalPages = Math.ceil(total / limit);

    // 4. Query utama untuk mengambil data log aktivitas beserta nama user-nya
    const dataQuery = `
      SELECT a.*, u.username as user_name 
      FROM activities a
      LEFT JOIN user u ON a.created_by = u.id
      ${whereClause}
      ORDER BY a.created_at DESC 
      LIMIT ? OFFSET ?
    `;
    
    // Satukan parameter pencarian dengan parameter LIMIT dan OFFSET
    const finalParams = [...queryParams, limit, offset];
    const [rows]: any = await pool.query(dataQuery, finalParams);

    // 5. Kembalikan response sesuai dengan format yang diminta frontend
    return {
      success: true,
      data: rows,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: "Gagal mengambil data log aktivitas: " + error.message,
    });
  }
});