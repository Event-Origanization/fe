<!-- src/components/seo/SeoModal.vue -->
<template>
  <BaseModal
    :show="show"
    :title="$t('SEO_ADMIN.EDIT_TITLE', { page: meta?.pageKey || '' })"
    maxWidth="50%"
    @close="$emit('close')"
  >
    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 gap-6">
        <!-- Page Path -->
        <div class="space-y-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
           <h4 class="font-bold text-blue-700 flex items-center gap-2">
            <i class="pi pi-link"></i>
            {{ $t('SEO_ADMIN.TABLE.PATH') }}
          </h4>
          <div class="space-y-3">
            <input
              v-model="formData.path"
              type="text"
              placeholder="/your-path"
              class="w-full px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <!-- VI -->
        <div class="space-y-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700">
          <h4 class="font-bold text-red-600 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-red-600"></span>
            {{ $t('COMMON.LANGUAGES.VI') }}
          </h4>
          <div class="space-y-3">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ $t('SEO_ADMIN.FIELDS.META_TITLE') }}</label>
            <input
              v-model="formData.title_vi"
              type="text"
              class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ $t('SEO_ADMIN.FIELDS.META_DESC') }}</label>
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
            {{ $t('COMMON.LANGUAGES.EN') }}
          </h4>
          <div class="space-y-3">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ $t('SEO_ADMIN.FIELDS.META_TITLE') }}</label>
            <input
              v-model="formData.title_en"
              type="text"
              class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ $t('SEO_ADMIN.FIELDS.META_DESC') }}</label>
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
            {{ $t('COMMON.LANGUAGES.ZH') }}
          </h4>
          <div class="space-y-3">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ $t('SEO_ADMIN.FIELDS.META_TITLE') }}</label>
            <input
              v-model="formData.title_zh"
              type="text"
              class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ $t('SEO_ADMIN.FIELDS.META_DESC') }}</label>
            <textarea
              v-model="formData.description_zh"
              rows="3"
              class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            ></textarea>
          </div>
        </div>
      </div>
    </form>

    <template #footer>
      <button
        type="button"
        @click="handleSubmit"
        :disabled="loading"
        class="w-full sm:w-auto px-8 py-2 rounded-lg font-semibold bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-red-500/30 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center"
      >
        <svg v-if="loading" class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ $t('COMMON.UPDATE') }}
      </button>
      <button
        type="button"
        @click="$emit('close')"
        class="w-full sm:w-auto px-6 py-2 rounded-lg font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border border-gray-200 dark:border-gray-700"
      >
        {{ $t('COMMON.CANCEL') }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseModal from '@/components/common/BaseModal.vue'
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
  path: '',
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
      path: newVal.path || '',
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
