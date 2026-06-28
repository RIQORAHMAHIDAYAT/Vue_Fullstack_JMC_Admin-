import pool from "./db"
import { createError, H3Event } from "h3"

const MODULE_MAP: Array<{ pattern: string; module: string | null }> = [
  { pattern: "auth/me", module: "my_profile" },
  { pattern: "dashboard", module: "dashboard" },
  { pattern: "activity", module: "modul_log" },
  { pattern: "master/*", module: "modul_pegawai" },
  { pattern: "pegawai/status", module: "modul_pegawai" },
  { pattern: "pegawai/upload-foto", module: "modul_pegawai" },
  { pattern: "pegawai/*", module: "modul_pegawai" },
  { pattern: "user/*/status", module: "kelola_user" },
  { pattern: "user/*", module: "kelola_user" },
  { pattern: "role/*", module: "kelola_role" },
  { pattern: "role", module: "kelola_role" },
  { pattern: "tunjangan/setting", module: "setting_tunjangan_transport" },
  { pattern: "tunjangan/transport/hitung", module: "modul_tunjangan_transport" },
  { pattern: "tunjangan/transport/*", module: "modul_tunjangan_transport" },
  { pattern: "export/*", module: "modul_pegawai" },
]

const METHOD_ACTION: Record<string, string> = {
  GET: "read",
  POST: "create",
  PUT: "update",
  PATCH: "update",
  DELETE: "delete",
}

function matchPath(apiPath: string, pattern: string): boolean {
  if (pattern.endsWith("/*")) {
    const prefix = pattern.slice(0, -2)
    return apiPath === prefix || apiPath.startsWith(prefix + "/")
  }
  const regexStr = "^" + pattern.replace(/\*/g, "\\d+") + "$"
  return new RegExp(regexStr).test(apiPath)
}

export async function checkPermission(
  roleId: number,
  path: string,
  method: string,
): Promise<{ allowed: boolean; reason?: string }> {
  const apiPath = path.replace(/^\/api\//, "")

  let moduleName: string | null | undefined = undefined
  for (const entry of MODULE_MAP) {
    if (matchPath(apiPath, entry.pattern)) {
      moduleName = entry.module
      break
    }
  }

  if (moduleName === undefined) return { allowed: true }
  if (moduleName === null) return { allowed: true }

  const action = METHOD_ACTION[method] || "read"

  const [rows] = await pool.query(
    "SELECT akses, `create`, `read`, `update`, `delete` FROM role_permission WHERE id_role = ? AND modul_fitur = ? LIMIT 1",
    [roleId, moduleName],
  )

  const perm = (rows as any[])[0]
  if (!perm) return { allowed: false, reason: "Akses tidak ditemukan" }
  if (!perm.akses) return { allowed: false, reason: "Tidak memiliki akses ke modul ini" }

  if (action === "create") {
    if (!perm.create) return { allowed: false, reason: "Tidak memiliki akses Create" }
  } else if (perm[action] === "No") {
    return { allowed: false, reason: `Tidak memiliki akses ${action.charAt(0).toUpperCase() + action.slice(1)}` }
  }

  return { allowed: true }
}

export async function enforcePermission(event: H3Event, roleId: number): Promise<void> {
  const { allowed, reason } = await checkPermission(roleId, event.path, event.method)
  if (!allowed) {
    throw createError({ statusCode: 403, message: reason || "Forbidden" })
  }
}
