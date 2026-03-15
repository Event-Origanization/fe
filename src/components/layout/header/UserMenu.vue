<template>
  <loading-home :is-loading="authStore.loading" />

  <div class="relative" ref="dropdownRef">
    <button
      v-if="authStore.isAuthenticated"
      class="flex items-center text-gray-700 dark:text-gray-400"
      :class="isHome ? 'text-white' : ''"
      @click.prevent="toggleDropdown"
    >
      <span class="mr-3 overflow-hidden rounded-full h-11 w-11 border border-gray-200">
        <img v-if="user?.image" :src="user?.image" alt="User" />
        <span
          v-else
          class="w-full h-full bg-gradient-to-br from-red-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold"
        >
          {{ user?.email[0].toUpperCase() }}
        </span>
      </span>

      <span class="block mr-1 font-medium text-theme-sm" :class="isHome ? 'text-white' : ''">{{
        user?.username
      }}</span>

      <ChevronDownIcon :class="{ 'rotate-180': dropdownOpen }" />
    </button>

    <router-link v-else to="/signin" class="btn btn-primary text-sm"> Sign In </router-link>

    <!-- Dropdown Start -->
    <div
      v-if="dropdownOpen"
      class="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
    >
      <div>
        <span class="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
          {{ user?.username }}
        </span>
        <span class="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
          {{ user?.email }}
        </span>
      </div>

      <ul class="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
        <li v-for="item in menuItems" :key="item.href">
          <router-link
            :to="item.href"
            class="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          >
            <!-- SVG icon would go here -->
            <component
              :is="item.icon"
              class="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"
            />
            {{ item.text }}
          </router-link>
        </li>
        <li>
          <button
            @click="openPasswordModal"
            class="flex items-center w-full gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          >
            <svg class="w-5 h-5 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            {{ $t('AUTH.CHANGE_PASSWORD') }}
          </button>
        </li>
      </ul>
      <button
        @click="signOut"
        class="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
      >
        <LogoutIcon
          class="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"
        />
        Đăng xuất
      </button>
    </div>
    <!-- Dropdown End -->
  </div>

  <!-- Password Change Popup (Top-Middle) -->
  <Teleport to="body">
    <transition name="slide-down">
      <div v-if="passwordModalOpen" class="fixed inset-0 z-[999] flex justify-center items-start pt-[10vh] px-4">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" @click="closePasswordModal"></div>
        
        <!-- Popup Content -->
        <div class="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden transform transition-all">
          <div class="px-6 py-4 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center">
            <h3 class="text-lg font-bold text-gray-800 dark:text-white">
              {{ $t('AUTH.CHANGE_PASSWORD') }}
            </h3>
            <button @click="closePasswordModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="handlePasswordChange" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {{ $t('AUTH.CURRENT_PASSWORD') }}
              </label>
              <div class="relative">
                <input
                  :type="showCurrentPassword ? 'text' : 'password'"
                  v-model="passwordForm.currentPassword"
                  class="w-full pl-4 pr-11 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                  required
                  :disabled="userStore.loading"
                />
                <button 
                  type="button"
                  @click="showCurrentPassword = !showCurrentPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <svg v-if="!showCurrentPassword" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88L1 1m11.939 12.065c-1.282 1.282-2.47 2.022-3.939 2.022-4.478 0-8.268-2.943-9.543-7a9.965 9.965 0 011.563-3.029m5.858.908l1.341 1.341m0 0l3-3m0 0L23 23" />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {{ $t('AUTH.NEW_PASSWORD') }}
              </label>
              <div class="relative">
                <input
                  :type="showNewPassword ? 'text' : 'password'"
                  v-model="passwordForm.newPassword"
                  class="w-full pl-4 pr-11 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                  required
                  :disabled="userStore.loading"
                />
                <button 
                  type="button"
                  @click="showNewPassword = !showNewPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <svg v-if="!showNewPassword" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88L1 1m11.939 12.065c-1.282 1.282-2.47 2.022-3.939 2.022-4.478 0-8.268-2.943-9.543-7a9.965 9.965 0 011.563-3.029m5.858.908l1.341 1.341m0 0l3-3m0 0L23 23" />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {{ $t('AUTH.CONFIRM_PASSWORD') }}
              </label>
              <div class="relative">
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  v-model="passwordForm.confirmPassword"
                  class="w-full pl-4 pr-11 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                  required
                  :disabled="userStore.loading"
                />
                <button 
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <svg v-if="!showConfirmPassword" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88L1 1m11.939 12.065c-1.282 1.282-2.47 2.022-3.939 2.022-4.478 0-8.268-2.943-9.543-7a9.965 9.965 0 011.563-3.029m5.858.908l1.341 1.341m0 0l3-3m0 0L23 23" />
                  </svg>
                </button>
              </div>
            </div>
            
            <p v-if="passwordError" class="text-sm text-red-500 font-medium bg-red-50 dark:bg-red-500/10 p-3 rounded-lg flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              {{ passwordError }}
            </p>

            <div class="flex flex-col gap-3 pt-4">
              <button
                type="submit"
                class="w-full py-2.5 px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
                :disabled="userStore.loading"
              >
                <svg v-if="userStore.loading" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ userStore.loading ? $t('CONFIG_ADMIN.SAVING') : $t('COMMON.SAVE') }}</span>
              </button>
              <button
                type="button"
                @click="closePasswordModal"
                class="w-full py-2.5 px-4 border border-gray-300 bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-xl transition-all"
                :disabled="userStore.loading"
              >
                {{ $t('COMMON.CANCEL') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ChevronDownIcon, LogoutIcon, SendIcon } from '@/icons/index'
import { RouterLink, useRoute } from 'vue-router'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useUserStore } from '@/store/user.store'
import { useI18n } from 'vue-i18n'
import LoadingHome from '@/components/common/LoadingHome.vue'
import { useToast } from '@/composables/useToast'

const route = useRoute()

const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const authStore = useAuthStore()
const userStore = useUserStore()
const { t } = useI18n()
const { toastSuccess } = useToast()

const user = computed(() => authStore.user)

const isHome = computed(() => route.path === '/')

const menuItems = [{ href: '/administrators', icon: SendIcon, text: 'Quản trị' }]

const passwordModalOpen = ref(false)
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})
const passwordError = ref('')

const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

const openPasswordModal = () => {
  passwordModalOpen.value = true
  closeDropdown()
}

const closePasswordModal = () => {
  passwordModalOpen.value = false
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  }
  passwordError.value = ''
  showCurrentPassword.value = false
  showNewPassword.value = false
  showConfirmPassword.value = false
}

const handlePasswordChange = async () => {
  if (!passwordForm.value.currentPassword || !passwordForm.value.newPassword || !passwordForm.value.confirmPassword) {
    passwordError.value = t('AUTH.REQUIRED_FIELDS')
    return
  }

  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    passwordError.value = t('AUTH.PASSWORD_MISMATCH')
    return
  }

  const result = await userStore.changePassword({
    currentPassword: passwordForm.value.currentPassword,
    newPassword: passwordForm.value.newPassword,
  })

  if (result) {
    toastSuccess(t('AUTH.PASSWORD_CHANGE_SUCCESS'))
    closePasswordModal()
  } else {
    passwordError.value = userStore.error || t('COMMON.ERROR')
  }
}

const signOut = async () => {
  await authStore.logout() // Gọi logout từ store
  closeDropdown()
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => {
  if (authStore.isAuthenticated === false) {
    authStore.getMe()
  }
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
}

.slide-down-enter-from .relative,
.slide-down-leave-to .relative {
  transform: translateY(-40px) scale(0.95);
}
</style>
