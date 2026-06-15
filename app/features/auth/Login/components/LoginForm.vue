<template>
  <form @submit.prevent="">
    <!-- Username -->
    <div class="mb-2">
      <input
        type="text"
        class="form-control py-3 border-0 bg-light text-dark"
        placeholder="Username"
        name="username"
        required
      />
    </div>

    <!-- Password -->
    <div class="mb-2">
      <input
        type="password"
        class="form-control py-3 border-0 bg-light text-dark"
        name="password"
        placeholder="Password"
        required
      />
    </div>

    <div class="mb-2">
      <label class="form-check">
        <input type="checkbox" class="form-check-input" />
        <span class="form-check-label">Remember Me</span>
      </label>
    </div>

    <div class="mb-2">
      <div
        class="g-recaptcha"
        :data-sitekey="siteKey"
        data-callback="recaptchaCallback"
      ></div>
    </div>

    <!-- Submit -->
    <div class="d-grid mt-4">
      <button class="btn btn-primary text-uppercase shadow py-3" type="submit">
        Masuk
      </button>
    </div>
  </form>
</template>

<script setup>
const config = useRuntimeConfig();

const siteKey = config.public.recaptchaSiteKey;
</script>
