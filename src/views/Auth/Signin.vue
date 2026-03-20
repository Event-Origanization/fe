<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="signin-page">
    <!-- Animated background -->
    <div class="bg-layer">
      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>
      <div class="glow glow-3"></div>
      <div class="grid-overlay"></div>
    </div>

    <!-- Floating particles -->
    <div class="particles">
      <span v-for="i in 20" :key="i" class="particle" :style="particleStyle(i)"></span>
    </div>

    <div class="signin-container">
      <!-- Left panel — brand story -->
      <div class="brand-panel" data-aos="fade-right" data-aos-duration="900">
        <router-link to="/" class="back-home">
          <i class="pi pi-arrow-left"></i>
          <span>Về trang chủ</span>
        </router-link>

        <div class="brand-content">
          <div class="brand-logo">
            <div class="logo-ring"></div>
            <i class="pi pi-bolt logo-icon"></i>
          </div>
          <h1 class="brand-title">5P <span class="brand-accent">Event</span></h1>
          <p class="brand-tagline">Chào mừng trở lại.<br />Đăng nhập để tiếp tục.</p>

          <div class="brand-stats">
            <div class="stat">
              <span class="stat-num">500+</span>
              <span class="stat-label">Sự kiện</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-num">10K+</span>
              <span class="stat-label">Khách hàng</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-num">99%</span>
              <span class="stat-label">Hài lòng</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Right panel — form -->
      <div class="form-panel" data-aos="fade-left" data-aos-duration="900" data-aos-delay="100">
        <div class="form-card">
          <div class="form-header">
            <h2 class="form-title">Đăng nhập</h2>
            <p class="form-subtitle">Nhập thông tin tài khoản của bạn</p>
          </div>

          <form @submit.prevent="handleSubmit" class="form-body">
            <!-- Email -->
            <div class="field-group">
              <label class="field-label">
                <i class="pi pi-envelope"></i> Email <span class="required">*</span>
              </label>
              <div class="field-input-wrap" :class="{ 'has-error': emailError }">
                <input
                  v-model="email"
                  type="email"
                  id="email"
                  placeholder="email@domain.com"
                  class="field-input"
                  autocomplete="email"
                  @blur="validateEmail"
                  @input="emailError = ''"
                />
              </div>
              <transition name="err-fade">
                <p v-if="emailError" class="field-error">
                  <i class="pi pi-exclamation-circle"></i> {{ emailError }}
                </p>
              </transition>
            </div>

            <!-- Password -->
            <div class="field-group">
              <label class="field-label">
                <i class="pi pi-lock"></i> Mật khẩu <span class="required">*</span>
              </label>
              <div class="field-input-wrap" :class="{ 'has-error': passwordError }">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  placeholder="••••••••"
                  class="field-input"
                  autocomplete="current-password"
                  @blur="validatePassword"
                  @input="passwordError = ''"
                />
                <button type="button" class="eye-btn" @click="showPassword = !showPassword">
                  <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
                </button>
              </div>
              <transition name="err-fade">
                <p v-if="passwordError" class="field-error">
                  <i class="pi pi-exclamation-circle"></i> {{ passwordError }}
                </p>
              </transition>
            </div>

            <!-- Remember me -->
            <div class="remember-row">
              <label class="remember-label">
                <input v-model="keepLoggedIn" type="checkbox" class="remember-check" />
                <span class="remember-box"></span>
                <span>Ghi nhớ đăng nhập</span>
              </label>
            </div>

            <!-- General error -->
            <transition name="err-fade">
              <div v-if="generalError" class="general-error">
                <i class="pi pi-times-circle"></i>
                <span>{{ generalError }}</span>
              </div>
            </transition>

            <!-- Verify account CTA -->
            <div v-if="isAccountNotActivated" class="verify-cta">
              <router-link :to="{ path: '/verify-otp', query: { email: email.trim(), check: 'signin' } }" class="verify-btn">
                <i class="pi pi-shield"></i> Xác thực tài khoản ngay
              </router-link>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              class="submit-btn"
              :disabled="isLoading || !isFormValid"
            >
              <span v-if="!isLoading" class="btn-content">
                <i class="pi pi-sign-in"></i> Đăng nhập
              </span>
              <span v-else class="btn-loading">
                <svg class="spin-icon" viewBox="0 0 24 24" fill="none">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Đang đăng nhập...
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useToast } from '@/composables/useToast'
import { validateEmail as utilValidateEmail, validatePassword as utilValidatePassword } from '@/utils/validation'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const keepLoggedIn = ref(false)
const isLoading = ref(false)
const isAccountNotActivated = ref(false)

const emailError = ref('')
const passwordError = ref('')
const generalError = ref('')

const authStore = useAuthStore()
const { toastSuccess } = useToast()

const isFormValid = computed(() =>
  email.value.trim() && password.value.trim() && !emailError.value && !passwordError.value
)

const validateEmail = () => {
  const result = utilValidateEmail(email.value)
  emailError.value = result.error || ''
  return result.isValid
}

const validatePassword = () => {
  const result = utilValidatePassword(password.value)
  passwordError.value = result.error || ''
  return result.isValid
}

const validateForm = () => validateEmail() && validatePassword()

const clearErrors = () => {
  emailError.value = ''
  passwordError.value = ''
  generalError.value = ''
  isAccountNotActivated.value = false
}

const handleSubmit = async () => {
  clearErrors()
  if (!validateForm()) return

  isLoading.value = true

  const result = await authStore.login({ email: email.value.trim(), password: password.value })

  isLoading.value = false

  if (result) {
    generalError.value = authStore.error || result
    return
  }

  toastSuccess('Đăng nhập thành công!')
}

// Random particle animation styles
const particleStyle = (_i: number) => {
  void _i
  const size = Math.random() * 3 + 1
  const x = Math.random() * 100
  const duration = Math.random() * 20 + 10
  const delay = Math.random() * 15
  const opacity = Math.random() * 0.4 + 0.1
  return {
    left: `${x}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    opacity,
  }
}
</script>

<style scoped>
/* ========== LAYOUT ========== */
.signin-page {
  position: relative;
  min-height: 100vh;
  background: #050510;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: 'Outfit', sans-serif;
}

/* ========== BACKGROUND ========== */
.bg-layer {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.25;
}
.glow-1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, #dc2626, transparent);
  top: -200px; left: -200px;
  animation: glow-pulse 8s ease-in-out infinite;
}
.glow-2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, #7f1d1d, transparent);
  bottom: -100px; right: -100px;
  animation: glow-pulse 10s ease-in-out infinite reverse;
}
.glow-3 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, #b91c1c, transparent);
  top: 40%; left: 50%;
  transform: translate(-50%, -50%);
  animation: glow-pulse 12s ease-in-out infinite 2s;
}
@keyframes glow-pulse {
  0%, 100% { opacity: 0.18; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(1.12); }
}
.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* ========== PARTICLES ========== */
.particles { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
.particle {
  position: absolute;
  bottom: -10px;
  border-radius: 50%;
  background: rgba(220, 38, 38, 0.6);
  animation: float-up linear infinite;
}
@keyframes float-up {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 0.5; }
  100% { transform: translateY(-100vh) scale(0.3); opacity: 0; }
}

/* ========== CONTAINER ========== */
.signin-container {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  width: 100%;
  max-width: 1000px;
  min-height: 600px;
  margin: 24px;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.06);
}

/* ========== BRAND PANEL ========== */
.brand-panel {
  background: linear-gradient(135deg, #0d0d1a 0%, #170505 50%, #1a0808 100%);
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  border-right: 1px solid rgba(220, 38, 38, 0.15);
  overflow: hidden;
}
.brand-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at top left, rgba(220, 38, 38, 0.12), transparent 60%);
  pointer-events: none;
}

.back-home {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255,255,255,0.4);
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s;
}
.back-home:hover { color: #dc2626; }

.brand-content { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 32px 0; }

.brand-logo {
  position: relative;
  width: 72px; height: 72px;
  margin-bottom: 24px;
}
.logo-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid rgba(220, 38, 38, 0.5);
  animation: logo-spin 8s linear infinite;
}
.logo-ring::before {
  content: '';
  position: absolute;
  top: -2px; left: 50%;
  width: 8px; height: 8px;
  background: #dc2626;
  border-radius: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 12px #dc2626;
}
@keyframes logo-spin { to { transform: rotate(360deg); } }
.logo-icon {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #dc2626;
  text-shadow: 0 0 20px rgba(220, 38, 38, 0.8);
  line-height: 72px;
  width: 72px;
  text-align: center;
}

.brand-title {
  font-size: 42px;
  font-weight: 900;
  color: white;
  letter-spacing: -1px;
  line-height: 1;
  margin-bottom: 12px;
}
.brand-accent {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-tagline {
  font-size: 15px;
  color: rgba(255,255,255,0.4);
  line-height: 1.6;
  margin-bottom: 36px;
}

.brand-stats {
  display: flex;
  align-items: center;
  gap: 20px;
}
.stat { text-align: center; }
.stat-num {
  display: block;
  font-size: 22px;
  font-weight: 800;
  color: white;
}
.stat-label {
  display: block;
  font-size: 11px;
  color: rgba(255,255,255,0.35);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 2px;
}
.stat-divider {
  width: 1px; height: 36px;
  background: rgba(255,255,255,0.1);
}

.brand-footer { color: rgba(255,255,255,0.35); font-size: 13px; }
.brand-footer .link-accent { color: #ef4444; text-decoration: none; font-weight: 600; }
.brand-footer .link-accent:hover { color: #dc2626; text-decoration: underline; }

/* ========== FORM PANEL ========== */
.form-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.form-card { width: 100%; max-width: 360px; }

.form-header { margin-bottom: 28px; }
.form-title {
  font-size: 26px;
  font-weight: 800;
  color: white;
  margin-bottom: 6px;
  letter-spacing: -0.5px;
}
.form-subtitle { font-size: 14px; color: rgba(255,255,255,0.4); }

.form-body { display: flex; flex-direction: column; gap: 18px; }

/* Fields */
.field-group { display: flex; flex-direction: column; gap: 7px; }
.field-label {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.5);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.field-label i { font-size: 12px; color: #dc2626; }
.required { color: #ef4444; }

.field-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.25s, box-shadow 0.25s;
}
.field-input-wrap:focus-within {
  border-color: rgba(220, 38, 38, 0.5);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  background: rgba(255,255,255,0.07);
}
.field-input-wrap.has-error {
  border-color: rgba(239, 68, 68, 0.6);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
.field-input {
  flex: 1;
  padding: 12px 16px;
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 14px;
  font-family: inherit;
}
.field-input::placeholder { color: rgba(255,255,255,0.2); }

.eye-btn {
  padding: 0 14px;
  background: none;
  border: none;
  color: rgba(255,255,255,0.3);
  cursor: pointer;
  font-size: 16px;
  transition: color 0.2s;
}
.eye-btn:hover { color: rgba(255,255,255,0.7); }

.field-error {
  font-size: 12px;
  color: #f97066;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Remember row */
.remember-row { display: flex; align-items: center; }
.remember-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 13px;
  color: rgba(255,255,255,0.4);
  user-select: none;
}
.remember-check { display: none; }
.remember-box {
  width: 16px; height: 16px;
  border-radius: 4px;
  border: 1.5px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.05);
  transition: all 0.2s;
  flex-shrink: 0;
  position: relative;
}
.remember-check:checked ~ .remember-box {
  background: #dc2626;
  border-color: #dc2626;
}
.remember-check:checked ~ .remember-box::after {
  content: '';
  position: absolute;
  left: 4px; top: 1px;
  width: 5px; height: 9px;
  border: 2px solid white;
  border-top: none;
  border-left: none;
  transform: rotate(45deg);
}

/* General error */
.general-error {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.3);
  border-radius: 10px;
  font-size: 13px;
  color: #fca5a5;
}

/* Verify CTA */
.verify-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #16a34a, #15803d);
  border-radius: 10px;
  color: white;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: filter 0.2s;
}
.verify-btn:hover { filter: brightness(1.1); }

/* Submit button */
.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #ef4444, #dc2626, #b91c1c);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: all 0.3s;
  box-shadow: 0 4px 20px rgba(220, 38, 38, 0.35);
  margin-top: 4px;
}
.submit-btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(220, 38, 38, 0.5);
}
.submit-btn:not(:disabled):active { transform: translateY(0); }
.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
.btn-content, .btn-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.spin-icon {
  width: 18px; height: 18px;
  animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Form footer */
.form-footer {
  margin-top: 22px;
  text-align: center;
  font-size: 13px;
  color: rgba(255,255,255,0.35);
}
.link-accent {
  color: #ef4444;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}
.link-accent:hover { color: #dc2626; }

/* ========== TRANSITIONS ========== */
.err-fade-enter-active, .err-fade-leave-active { transition: all 0.2s ease; }
.err-fade-enter-from, .err-fade-leave-to { opacity: 0; transform: translateY(-4px); }

/* ========== RESPONSIVE ========== */
@media (max-width: 768px) {
  .signin-container {
    grid-template-columns: 1fr;
    margin: 12px;
    max-width: 460px;
  }
  .brand-panel {
    display: none;
  }
  .form-panel {
    padding: 36px 24px;
  }
}
</style>
