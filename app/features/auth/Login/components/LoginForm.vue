<template>
  <form @submit.prevent="handleLogin">
    <div class="mb-2">
      <input
        v-model="form.username"
        type="text"
        class="form-control py-3 border-0 bg-light text-dark"
        placeholder="Username / Email / No. HP"
        required
      />
    </div>

    <div class="mb-2" style="position: relative;">
      <input
        v-model="form.password"
        :type="showPassword ? 'text' : 'password'"
        class="form-control py-3 border-0 bg-light text-dark pe-5"
        placeholder="Password"
        required
      />
      <span
        class="position-absolute end-0 top-50 translate-middle-y me-3"
        style="cursor: pointer; z-index: 5;"
        @click="showPassword = !showPassword"
      >
        <IconEye v-if="!showPassword" :stroke="1.5" size="20" />
        <IconEyeOff v-else :stroke="1.5" size="20" />
      </span>
    </div>

    <div class="mb-2">
      <label class="form-check">
        <input v-model="form.remember" type="checkbox" class="form-check-input" />
        <span class="form-check-label">Remember Me</span>
      </label>
    </div>

    <div class="mb-3">
      <div id="captcha-google"></div>
      <div v-if="!googleCaptchaReady"
        class="d-flex align-items-center gap-3 p-3 rounded border"
        :class="captchaChecked ? 'border-success' : 'border-secondary'"
        style="background:#f9f9f9;cursor:pointer;user-select:none"
        @click="captchaChecked = !captchaChecked"
      >
        <div
          class="d-flex align-items-center justify-content-center rounded"
          :class="captchaChecked ? 'bg-success' : 'bg-white border'"
          style="width:28px;height:28px;border:2px solid #c1c1c1;"
        >
          <span v-if="captchaChecked" class="text-white fw-bold" style="font-size:16px">✓</span>
        </div>
        <span class="fw-semibold" style="color:#333;font-size:14px">Saya bukan robot</span>
        <div class="ms-auto text-center" style="line-height:1.1">
          <small class="text-muted fw-bold" style="font-size:10px;letter-spacing:1px">reCAPTCHA</small>
          <br><small class="text-muted" style="font-size:9px">Privasi • Persyaratan</small>
        </div>
      </div>
    </div>

    <div class="d-grid mt-4">
      <button class="btn btn-primary text-uppercase shadow py-3" type="submit" :disabled="loading">
        {{ loading ? "Memproses..." : "Masuk" }}
      </button>
    </div>

    <div v-if="error" class="alert alert-danger mt-3 mb-0">{{ error }}</div>
  </form>
</template>

<script setup>
import { IconEye, IconEyeOff } from "@tabler/icons-vue"
const config = useRuntimeConfig()
const { login } = useAuth()
const router = useRouter()
const tokenCookie = useCookie("auth_session", { maxAge: 60 * 60 * 8, path: "/" })

const siteKey = config.public.recaptchaSiteKey
const loading = ref(false)
const error = ref("")
const googleCaptchaReady = ref(false)
const captchaChecked = ref(false)
const showPassword = ref(false)

const form = reactive({
  username: "",
  password: "",
  remember: false,
})

onMounted(() => {
  const el = document.getElementById("captcha-google")
  if (!el || !siteKey) return

  const script = document.createElement("script")
  script.src = "https://www.google.com/recaptcha/api.js?render=explicit"
  script.async = true
  script.defer = true
  script.onload = () => {
    let retries = 0
    const check = setInterval(() => {
      if (window.grecaptcha) {
        clearInterval(check)
        try {
          window.grecaptcha.ready(() => {
            window.grecaptcha.render(el, { sitekey: siteKey })
            googleCaptchaReady.value = true
          })
        } catch (e) {
          // render failed
        }
      }
      retries++
      if (retries > 15) {
        clearInterval(check)
      }
    }, 400)
  }
  document.head.appendChild(script)
})

function getRecaptchaToken() {
  if (!window.grecaptcha) return null
  return window.grecaptcha.getResponse()
}

async function handleLogin() {
  loading.value = true
  error.value = ""

  try {
    let res
    if (googleCaptchaReady.value) {
      const recaptchaToken = getRecaptchaToken()
      if (!recaptchaToken) {
        error.value = "Harap verifikasi captcha terlebih dahulu"
        loading.value = false
        return
      }
      res = await login(form.username, form.password, form.remember, recaptchaToken)
    } else {
      if (!captchaChecked.value) {
        error.value = "Harap centang verifikasi 'Saya bukan robot'"
        loading.value = false
        return
      }
      res = await login(form.username, form.password, form.remember)
    }

    // Set cookie di client agar middleware langsung bisa membacanya
    if (res?.token) {
      tokenCookie.value = res.token
    }

    await router.push("/")
  } catch (err) {
    error.value = err.message || "Login gagal"
  }

  loading.value = false
}
</script>