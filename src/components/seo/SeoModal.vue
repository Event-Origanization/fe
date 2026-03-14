<!-- src/components/seo/SeoModal.vue -->
<template>
  <div v-if="show" class="fixed inset-0 z-[100] overflow-y-auto">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

    <div class="flex min-h-screen items-center justify-center p-4">
      <div 
        class="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-8 text-left shadow-2xl transition-all border border-gray-100 dark:border-gray-800"
        @click.stop
      >
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Chỉnh sửa SEO: {{ meta?.pageKey }}
          </h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 gap-6">
            <!-- VI -->
            <div class="space-y-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700">
              <h4 class="font-bold text-red-600 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-red-600"></span>
                Tiếng Việt (VI)
              </h4>
              <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Meta Title</label>
                <input
                  v-model="formData.title_vi"
                  type="text"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
                
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Meta Description</label>
                <textarea
                  v-model="formData.description_vi"
                  rows="3"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>
            </div>

            <!-- EN -->
            <div class="space-y-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700">
              <h4 class="font-bold text-blue-600 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-blue-600"></span>
                Tiếng Anh (EN)
              </h4>
              <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Meta Title</label>
                <input
                  v-model="formData.title_en"
                  type="text"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
                
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Meta Description</label>
                <textarea
                  v-model="formData.description_en"
                  rows="3"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>
            </div>

             <!-- ZH -->
             <div class="space-y-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700">
              <h4 class="font-bold text-yellow-600 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-yellow-600"></span>
                Tiếng Trung (ZH)
              </h4>
              <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Meta Title</label>
                <input
                  v-model="formData.title_zh"
                  type="text"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
                
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Meta Description</label>
                <textarea
                  v-model="formData.description_zh"
                  rows="3"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-4 pt-6 mt-6 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              @click="$emit('close')"
              class="px-6 py-2.5 rounded-xl font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              Hủy
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-8 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-blue-500/30 active:scale-95 disabled:opacity-50 transition-all flex items-center"
            >
              <svg v-if="loading" class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ISeoMeta, SeoMetaUpdatePayload } from '@/types/seo'

const props = defineProps<{
  show: boolean
  meta: ISeoMeta | null
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', data: SeoMetaUpdatePayload): void
}>()

const formData = ref<SeoMetaUpdatePayload>({
  title_vi: '',
  title_en: '',
  title_zh: '',
  description_vi: '',
  description_en: '',
  description_zh: '',
})

watch(() => props.meta, (newVal) => {
  if (newVal) {
    formData.value = {
      title_vi: newVal.title_vi || '',
      title_en: newVal.title_en || '',
      title_zh: newVal.title_zh || '',
      description_vi: newVal.description_vi || '',
      description_en: newVal.description_en || '',
      description_zh: newVal.description_zh || '',
    }
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', formData.value)
}
</script>
