<!-- src/components/posts/PostModal.vue -->
<template>
  <BaseModal
    :show="show"
    :title="isEdit ? $t('POSTS_ADMIN.EDIT') : $t('POSTS_ADMIN.ADD_NEW')"
    maxWidth="70%"
    @close="$emit('close')"
  >
    <div class="space-y-6">
      <!-- Title & Slug -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ $t('POSTS_ADMIN.FIELDS.TITLE') }} *
          </label>
          <input
            v-model="form.title_vi"
            type="text"
            @input="handleTitleInput"
            :placeholder="$t('POSTS_ADMIN.PLACEHOLDERS.TITLE')"
            class="block w-full px-4 py-2 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ $t('POSTS_ADMIN.FIELDS.SLUG') }} *
          </label>
          <input
            v-model="form.slug"
            type="text"
            class="block w-full px-4 py-2 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all"
            :placeholder="$t('POSTS_ADMIN.PLACEHOLDERS.SLUG')"
          />
        </div>
      </div>

      <!-- Status Option -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ $t('POSTS_ADMIN.FIELDS.STATUS') }} *
          </label>
          <select
            v-model="form.status"
            class="block w-full px-4 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all shadow-sm"
          >
            <option value="DRAFT">{{ $t('POSTS_ADMIN.STATUS.DRAFT') }}</option>
            <option value="PUBLISHED">{{ $t('POSTS_ADMIN.STATUS.PUBLISH') }}</option>
            <option value="SCHEDULED">{{ $t('POSTS_ADMIN.STATUS.SCHEDULED') }}</option>
          </select>
        </div>
        <div v-if="form.status === 'SCHEDULED'">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ $t('POSTS_ADMIN.FIELDS.PUBLISH_AT') || 'Thời gian đăng bài' }} *
          </label>
          <input
            v-model="form.publishAt"
            type="datetime-local"
            class="block w-full px-4 py-2 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all"
          />
        </div>
        <div class="flex items-end">
          <button
            type="button"
            @click="handleScoreSeo"
            :disabled="aiLoading"
            class="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50"
          >
            <i v-if="aiLoading" class="pi pi-spin pi-spinner mr-2"></i>
            <i v-else class="pi pi-bolt mr-2 text-yellow-300"></i>
            {{ $t('POSTS_ADMIN.ACTIONS.SCORE_SEO') || 'Chấm điểm SEO (AI)' }}
          </button>
        </div>
      </div>

      <!-- SEO Score Result Card -->
      <Transition name="fade">
        <div v-if="seoResult || form.seoScore" class="bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm overflow-hidden">
          <div class="flex flex-col md:flex-row gap-8">
            <!-- Left: Score Section -->
            <div class="flex flex-col items-center justify-center space-y-3 bg-white dark:bg-gray-900/40 p-4 rounded-xl shadow-inner min-w-[140px]">
              <span class="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">SEO Score</span>
              <div 
                class="w-24 h-24 rounded-full border-[6px] flex items-center justify-center text-3xl font-black shadow-lg"
                :class="[
                  (seoResult?.score || form.seoScore || 0) >= 80 ? 'border-green-500 text-green-600 bg-green-50/50' :
                  (seoResult?.score || form.seoScore || 0) >= 50 ? 'border-yellow-500 text-yellow-600 bg-yellow-50/50' :
                  'border-red-500 text-red-600 bg-red-50/50'
                ]"
              >
                {{ seoResult?.score || form.seoScore || 0 }}
              </div>
              <span 
                class="text-xs font-semibold px-2 py-1 rounded-full uppercase"
                :class="[
                  (seoResult?.score || form.seoScore || 0) >= 80 ? 'bg-green-100 text-green-700' :
                  (seoResult?.score || form.seoScore || 0) >= 50 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                ]"
              >
                {{ (seoResult?.score || form.seoScore || 0) >= 80 ? 'Excellent' : (seoResult?.score || form.seoScore || 0) >= 50 ? 'Good' : 'Needs Improve' }}
              </span>
            </div>

            <!-- Right: Feedback Section -->
            <div class="flex-1 space-y-4">
              <!-- Analysis -->
              <div v-if="seoResult?.analysis || form.seoAnalysis" class="space-y-2">
                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <i class="pi pi-search"></i>
                  {{ $t('POSTS_ADMIN.LABEL.SEO_ANALYSIS') || 'Phân tích tổng quan' }}
                </h3>
                <div class="text-sm text-gray-700 dark:text-gray-200 leading-relaxed italic">
                  {{ seoResult?.analysis || form.seoAnalysis }}
                </div>
              </div>

              <!-- Suggestions -->
              <div v-if="seoResult?.suggestions || form.seoSuggestions" class="space-y-2 pt-2 border-t dark:border-gray-700">
                <h3 class="text-xs font-bold text-purple-500 uppercase tracking-widest flex items-center gap-2">
                  <i class="pi pi-sparkles"></i>
                  {{ $t('POSTS_ADMIN.LABEL.SEO_SUGGESTIONS') || 'Gợi ý hành động' }}
                </h3>
                <div 
                  class="text-sm text-gray-600 dark:text-gray-300 prose dark:prose-invert prose-sm max-w-none overflow-y-auto max-h-[250px] custom-scrollbar pr-2"
                  v-html="seoResult?.suggestions || form.seoSuggestions"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Main Media Upload -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {{ $t('POSTS_ADMIN.FIELDS.IMAGE') }}
        </label>
        <div class="flex items-center space-x-6">
          <div 
            @click="triggerFileUpload"
            class="w-80 h-40 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-red-500 dark:hover:border-red-500 transition-all relative group bg-gray-50 dark:bg-gray-800/50 shadow-inner"
          >
            <template v-if="form.media">
              <img :src="form.media" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <i class="pi pi-camera text-white text-2xl"></i>
              </div>
            </template>
            <template v-else>
              <div class="flex flex-col items-center text-gray-400 group-hover:text-red-500 transition-colors">
                <i class="pi pi-image text-4xl mb-2"></i>
                <span class="text-xs font-semibold uppercase tracking-wider">{{ $t('COMMON.UPLOAD') }}</span>
              </div>
            </template>
          </div>
          
          <div v-if="form.media" class="flex flex-col gap-3">
            <button 
              type="button"
              @click="removeMainImage"
              class="px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors flex items-center gap-2 border border-transparent hover:border-red-200 dark:hover:border-red-800/50"
            >
              <i class="pi pi-trash"></i>
              {{ $t('COMMON.DELETE') }}
            </button>
            <div class="space-y-1">
              <p class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <i class="pi pi-info-circle text-[10px]"></i>
                {{ $t('COMMON.FORMAT_HINT') }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <i class="pi pi-info-circle text-[10px]"></i>
                {{ $t('COMMON.SIZE_HINT') }}
              </p>
            </div>
          </div>
        </div>
        <input 
          ref="fileInput"
          type="file" 
          class="hidden" 
          accept="image/*"
          @change="handleFileUpload"
        />
      </div>


      <!-- Content Editor -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ $t('POSTS_ADMIN.FIELDS.CONTENT') }} *
          </label>
          <div class="border rounded-xl dark:border-gray-700">
            <Editor v-model="form.content_vi" minHeight="450px" />
          </div>
          <p class="mt-2 text-xs text-gray-500 italic">
            * {{ $t('COMMON.AUTO_TRANSLATE_HINT') }}
          </p>
        </div>
      </div>
    </div>

    <template #footer>
      <button
        @click="handleSubmit"
        :disabled="postStore.loading"
        class="w-full inline-flex justify-center items-center rounded-lg px-6 py-2 bg-red-500 text-white font-semibold hover:bg-red-600 transition-all shadow-md active:scale-95 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <i v-if="postStore.loading" class="pi pi-spin pi-spinner mr-2"></i>
        <template v-if="isEdit && form.status === 'PUBLISHED'">{{ $t('COMMON.UPDATE') }}</template>
        <template v-else-if="!isEdit && form.status === 'PUBLISHED'">{{ $t('POSTS_ADMIN.STATUS.INIT_PUBLISH') }}</template>
        <template v-else-if="isEdit">{{ $t('COMMON.SAVE') }}</template>
        <template v-else>{{ $t('POSTS_ADMIN.STATUS.DRAFT') }}</template>
      </button>
      <button
        @click="$emit('close')"
        class="w-full inline-flex justify-center items-center rounded-lg px-6 py-2 border border-gray-300 bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all sm:w-auto mt-2 sm:mt-0"
      >
        {{ $t('COMMON.CANCEL') }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseModal from '../common/BaseModal.vue'
import Editor from '../common/Editor.vue'
import { slugify } from '@/utils/string'
import { fileToDataURL, checkFileSize } from '@/utils/file'
import { hasFieldChanged } from '@/utils/diff'
import { usePostStore } from '@/store/post.store'
import type { IPost, PostCreationAttributes, SeoScoreResult } from '@/types/post'
import { useToast } from '@/composables/useToast'

const props = defineProps({
  show: Boolean,
  post: {
    type: Object as () => IPost | null,
    default: null
  }
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', data: IPost): void
}>()

const { t } = useI18n()
const isEdit = ref(false)
const postStore = usePostStore()
const { toastSuccess, toastError, toastWarn, toastInfo } = useToast()

const aiLoading = ref(false)
const seoResult = ref<SeoScoreResult | null>(null)

const initialForm: PostCreationAttributes = {
  title_vi: '',
  slug: '',
  content_vi: '',
  status: 'DRAFT',
  media: '',
  publishAt: null,
  seoScore: null,
  seoAnalysis: null,
  seoSuggestions: null,
}

const form = reactive({ ...initialForm })

watch(() => props.post, (newVal) => {
  if (newVal) {
    isEdit.value = true
    Object.assign(form, newVal)
  } else {
    isEdit.value = false
    Object.assign(form, initialForm)
  }
}, { immediate: true })

const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    if (!checkFileSize(file, 2)) {
      toastWarn(t('COMMON.SIZE_HINT'))
      return
    }
    try {
      const base64 = await fileToDataURL(file)
      form.media = base64
    } catch (error) {
      console.error('Lỗi khi đọc file:', error)
      toastError(t('COMMON.ERROR'))
    }
  }
}

const removeMainImage = () => {
  form.media = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const handleTitleInput = () => {
  if (!isEdit.value) {
    form.slug = slugify(form.title_vi)
  }
}

const handleScoreSeo = async () => {
  if (!form.title_vi || !form.content_vi) {
    toastWarn(t('POSTS_ADMIN.ERRORS.REQUIRED_FOR_SEO'))
    return
  }

  aiLoading.value = true
  toastInfo(t('POSTS_ADMIN.STATUS.AI_ANALYZING'))
  
  try {
    const result = await postStore.scoreSeo({
      title: form.title_vi,
      slug: form.slug,
      content: form.content_vi
    })
    seoResult.value = result
    form.seoScore = result.score
    form.seoAnalysis = result.analysis
    form.seoSuggestions = result.suggestions
    toastSuccess(t('POSTS_ADMIN.STATUS.AI_SUCCESS'))
  } catch (error) {
    console.error('AI SEO Error:', error)
    toastError(t('COMMON.ERROR'))
  } finally {
    aiLoading.value = false
  }
}

const handleSubmit = async () => {
  try {
    let result
    if (isEdit.value && props.post?.id) {
      const payload: Partial<PostCreationAttributes> = { ...form }
      
      // Kiểm tra xem có thay đổi nội dung không để yêu cầu dịch lại
      payload.translateTitle = hasFieldChanged(props.post, form, 'title_vi')
      payload.translateContent = hasFieldChanged(props.post, form, 'content_vi')
      
      result = await postStore.updatePost(props.post.id, payload)
    } else {
      result = await postStore.createPost({ 
        ...form, 
        translateTitle: true, 
        translateContent: true 
      })
    }

    toastSuccess(isEdit.value ? t('COMMON.SUCCESS') : t('COMMON.SUCCESS'))

    emit('submit', result.data)
    emit('close')
  } catch (error) {
    console.error('Error submitting post:', error)
    toastError(postStore.error || t('COMMON.ERROR'))
  }
}
</script>
