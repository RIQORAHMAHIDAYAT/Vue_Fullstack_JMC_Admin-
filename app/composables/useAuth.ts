export function useAuth() {
  const { get, post, getToken, setToken } = useApi()
  const user = useState<any>("auth-user", () => null)
  const permissions = useState<any[]>("auth-permissions", () => [])
  const isLoggedIn = useState<boolean>("auth-logged-in", () => false)

  async function checkAuth() {
    const token = getToken()
    if (!token) {
      user.value = null
      permissions.value = []
      isLoggedIn.value = false
      return false
    }

    try {
      const res = await get<any>("/auth/verify")
      user.value = res.data
      permissions.value = res.permissions || []
      isLoggedIn.value = true
      return true
    } catch {
      user.value = null
      permissions.value = []
      isLoggedIn.value = false
      setToken(null)
      return false
    }
  }

  async function login(username: string, password: string, remember: boolean = false, recaptchaToken?: string) {
    const res = await post<any>("/auth/login", { username, password, recaptchaToken })

    setToken(res.token)
    if (remember) {
      localStorage.setItem("token", res.token)
    } else {
      localStorage.removeItem("token")
    }
    const payload = JSON.parse(atob(res.token.split(".")[1]))
    console.log("✅ JWT received:", res.token)
    console.log("📦 JWT payload:", payload)
    console.log("💾 Remember Me:", remember ? "ON (token saved to localStorage)" : "OFF")
    user.value = res.user
    permissions.value = res.permissions || []
    isLoggedIn.value = true
    return res
  }

  async function logout() {
    try {
      await post("/auth/logout")
    } catch {
      // ignore
    }
    setToken(null)
    localStorage.removeItem("token")
    user.value = null
    permissions.value = []
    isLoggedIn.value = false
  }

  function hasModuleAccess(moduleName: string, action?: string): boolean {
    const perm = permissions.value.find((p: any) => p.modul_fitur === moduleName)
    if (!perm) return false
    if (!perm.akses) return false
    if (!action) return true
    if (action === "create") return !!perm.create
    if (perm[action] === "No") return false
    return true
  }

  function isSuperadmin(): boolean {
    return user.value?.role === "Superadmin"
  }

  function isManagerHrd(): boolean {
    return user.value?.role === "Manager HRD"
  }

  function isAdminHrd(): boolean {
    return user.value?.role === "Admin HRD"
  }

  return {
    user,
    permissions,
    isLoggedIn,
    checkAuth,
    login,
    logout,
    getToken,
    hasModuleAccess,
    isSuperadmin,
    isManagerHrd,
    isAdminHrd,
  }
}
