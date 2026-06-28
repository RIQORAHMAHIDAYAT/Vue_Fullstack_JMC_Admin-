export default defineNuxtRouteMiddleware(async (to) => {
  // 1. Ambil cookie token yang dibuat oleh server saat login
  const tokenCookie = useCookie("auth_session")

  // Jika user mengakses halaman login (case-insensitive), biarkan lewat
  const pathLower = to.path.toLowerCase()
  if (pathLower === "/login" || pathLower.startsWith("/auth") || pathLower.startsWith("/(auth)")) {
    if (tokenCookie.value) {
      return navigateTo("/")
    }
    return
  }

  // 2. Mengambil composable secara dinamis
  // @ts-ignore
  const { setToken } = useApi()
  // @ts-ignore
  const { checkAuth } = useAuth()

  // Jika cookie token tidak ada, langsung arahkan ke login
  if (!tokenCookie.value) {
    return navigateTo("/login")
  }

  // Sinkronisasikan token dari cookie ke dalam state useApi
  setToken(tokenCookie.value)
  console.log("🔄 JWT synced from cookie:", tokenCookie.value)

  // 3. Validasi ulang ke server apakah token masih aktif/valid
  const authenticated = await checkAuth()
  if (!authenticated) {
    // Jika token kedaluwarsa atau tidak valid, hapus cookie dan arahkan ke login
    tokenCookie.value = null
    return navigateTo("/login")
  }
})
