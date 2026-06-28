import { defineEventHandler, getCookie, getHeader, createError } from "h3";
import jwt from "jsonwebtoken";
import process from "node:process";

export default defineEventHandler((event) => {
  const routerPath = event.node.req.url || "";

  // 1. Daftar rute API yang bebas diakses secara publik (tanpa login)
  const isPublicRoute = 
    routerPath.startsWith("/api/auth") || 
    routerPath.includes("login") || 
    routerPath.includes("captcha") || 
    routerPath.includes("recaptcha") || 
    routerPath.includes("verify");

  // Jika ini bukan rute API, atau ini adalah rute publik, biarkan lolos
  if (!routerPath.startsWith("/api") || isPublicRoute) {
    return;
  }

  // 2. Ambil token dari cookie ATAU dari header Authorization
  let token = getCookie(event, "auth_session");

  if (!token) {
    const authHeader = getHeader(event, "authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }

  // Jika token tidak ditemukan di manapun, tolak akses
  if (!token) {
    throw createError({
      statusCode: 401,
      message: "Akses ditolak. Silakan login terlebih dahulu.",
    });
  }

  try {
    // 3. Verifikasi apakah token JWT tersebut valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "rahasia_superadmin_fwdjmc");

    // 4. Simpan data user ke context (dukung kedua nama: user dan auth)
    event.context.user = decoded;
    event.context.auth = decoded;
    
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: "Sesi Anda telah berakhir. Silakan login kembali.",
    });
  }
});