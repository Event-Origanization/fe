// src/composables/useGlobalLoading.ts
import { computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useUserStore } from '@/store/user.store'

export function useGlobalLoading() {
  const authStore = useAuthStore()
  const userStore = useUserStore()

  // Combine loading từ tất cả stores
  const isGlobalLoading = computed(() => {
    return (
      authStore.loading ||
      userStore.loading
    )
  })

  return {
    isGlobalLoading
  }
}
