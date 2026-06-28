import { defineEventHandler, getCookie, createError } from "h3";
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

  // 2. Ambil token dari cookie 'auth_session' untuk rute yang dilindungi
  const token = getCookie(event, "auth_session");

  // Jika token tidak ada di cookie, langsung tolak aksesnya
  if (!token) {
    throw createError({
      statusCode: 401,
      message: "Akses ditolak. Silakan login terlebih dahulu.",
    });
  }

  try {
    // 3. Verifikasi apakah token JWT tersebut valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "rahasia_superadmin_fwdjmc");

    // 4. Simpan data user hasil decode ke dalam context event
    event.context.user = decoded;
    
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: "Sesi Anda telah berakhir. Silakan login kembali.",
    });
  }
});