<!-- src/views/admin/Posts/PostEditorPage.vue -->
<template>
  <div class="space-y-6 pb-20">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div class="flex items-center gap-4">
        <button 
          @click="goBack" 
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          :title="$t('COMMON.BACK')"
        >
          <i class="pi pi-arrow-left text-xl"></i>
        </button>
        <div>
          <h1 class="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            {{ isEdit ? $t('POSTS_ADMIN.EDIT') : $t('POSTS_ADMIN.ADD_NEW') }}
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ isEdit ? $t('POSTS_ADMIN.EDIT_SUBTITLE') || 'Chỉnh sửa nội dung bài viết và tối ưu SEO' : $t('POSTS_ADMIN.ADD_SUBTITLE') || 'Tạo bài viết mới với nội dung chất lượng' }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-3 w-full md:w-auto">
        <button
          @click="goBack"
          class="flex-1 md:flex-none px-6 py-2 border border-gray-300 bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-medium"
        >
          {{ $t('COMMON.CANCEL') }}
        </button>
        <button
          @click="handleSubmit"
          :disabled="postStore.loading"
          class="flex-1 md:flex-none px-8 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl hover:from-red-600 hover:to-orange-600 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <i v-if="postStore.loading" class="pi pi-spin pi-spinner"></i>
          <i v-else class="pi pi-save"></i>
          <template v-if="isEdit && form.status === 'PUBLISHED'">{{ $t('COMMON.UPDATE') }}</template>
          <template v-else-if="!isEdit && form.status === 'PUBLISHED'">{{ $t('POSTS_ADMIN.STATUS.INIT_PUBLISH') }}</template>
          <template v-else-if="isEdit">{{ $t('COMMON.SAVE') }}</template>
          <template v-else>{{ $t('POSTS_ADMIN.STATUS.DRAFT') }}</template>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Title & Slug -->
        <div class="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('POSTS_ADMIN.FIELDS.TITLE') }} *
            </label>
            <input
              v-model="form.title_vi"
              type="text"
              @input="handleTitleInput"
              :placeholder="$t('POSTS_ADMIN.PLACEHOLDERS.TITLE')"
              class="block w-full px-4 py-3 text-lg font-semibold border border-gray-200 rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ $t('POSTS_ADMIN.FIELDS.SLUG') }} *
            </label>
            <div class="flex items-center gap-2">
              <span class="text-gray-400 text-sm hidden sm:inline">/post/</span>
              <input
                v-model="form.slug"
                type="text"
                class="block flex-1 px-4 py-2 text-sm border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all outline-none"
                :placeholder="$t('POSTS_ADMIN.PLACEHOLDERS.SLUG')"
              />
            </div>
          </div>
        </div>

        <!-- Editor Section -->
        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div class="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/20">
            <h2 class="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <i class="pi pi-pencil text-red-500"></i>
              {{ $t('POSTS_ADMIN.FIELDS.CONTENT') }} *
            </h2>
            <div class="text-xs text-gray-500 italic">
              {{ $t('COMMON.AUTO_TRANSLATE_HINT') }}
            </div>
          </div>
          <div class="p-0">
            <!-- Increased minHeight to 600px and disabled autoResize for internal scrolling -->
            <Editor v-model="form.content_vi" minHeight="700px" :autoResize="false" />
          </div>
        </div>

        <!-- SEO Result Detail (Visible in mobile if needed, or just keep it below) -->
        <Transition name="fade">
          <div v-if="seoResult || form.seoScore" class="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
             <div class="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                <i class="pi pi-chart-bar text-indigo-500 text-xl"></i>
                <h3 class="font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider text-sm">{{ $t('POSTS_ADMIN.LABEL.SEO_DETAIL') || 'Chi tiết đánh giá SEO' }}</h3>
             </div>
             
             <div class="space-y-6">
                <!-- Analysis -->
                <div v-if="seoResult?.analysis || form.seoAnalysis" class="space-y-3">
                  <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <i class="pi pi-search text-gray-400"></i>
                    {{ $t('POSTS_ADMIN.LABEL.SEO_ANALYSIS') || 'Phân tích tổng quan' }}
                  </h4>
                  <div class="text-sm text-gray-700 dark:text-gray-200 leading-relaxed italic border-l-4 border-gray-200 dark:border-gray-700 pl-4 py-1 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg">
                    {{ seoResult?.analysis || form.seoAnalysis }}
                  </div>
                </div>

                <!-- Suggestions -->
                <div v-if="seoResult?.suggestions || form.seoSuggestions" class="space-y-3">
                  <h4 class="text-xs font-bold text-purple-500 uppercase tracking-widest flex items-center gap-2">
                    <i class="pi pi-sparkles"></i>
                    {{ $t('POSTS_ADMIN.LABEL.SEO_SUGGESTIONS') || 'Gợi ý hành động' }}
                  </h4>
                  <div 
                    class="text-sm text-gray-600 dark:text-gray-300 prose dark:prose-invert prose-sm max-w-none bg-indigo-50/30 dark:bg-indigo-900/10 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/30"
                    v-html="seoResult?.suggestions || form.seoSuggestions"
                  ></div>
                </div>
             </div>
          </div>
        </Transition>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Publishing Stats -->
        <div class="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
          <h3 class="font-bold text-gray-800 dark:text-gray-200 border-b dark:border-gray-800 pb-3 flex items-center gap-2">
            <i class="pi pi-cog text-blue-500"></i>
            {{ $t('POSTS_ADMIN.LABEL.PUBLISHING') || 'Cài đặt đăng bài' }}
          </h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-2">
                {{ $t('POSTS_ADMIN.FIELDS.STATUS') }}
              </label>
              <select
                v-model="form.status"
                class="block w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all shadow-sm outline-none"
              >
                <option value="DRAFT">{{ $t('POSTS_ADMIN.STATUS.DRAFT') }}</option>
                <option value="PUBLISHED">{{ $t('POSTS_ADMIN.STATUS.PUBLISH') }}</option>
                <option value="SCHEDULED">{{ $t('POSTS_ADMIN.STATUS.SCHEDULED') }}</option>
              </select>
            </div>

            <div v-if="form.status === 'SCHEDULED'">
              <label class="block text-xs font-bold text-gray-400 uppercase mb-2">
                {{ $t('POSTS_ADMIN.FIELDS.PUBLISH_AT') || 'Thời gian đăng bài' }}
              </label>
              <input
                v-model="form.publishAt"
                type="datetime-local"
                class="block w-full px-4 py-2.5 border border-gray-200 rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all outline-none bg-gray-50"
              />
            </div>

            <div class="pt-2">
              <button
                type="button"
                @click="handleScoreSeo"
                :disabled="aiLoading"
                class="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50"
              >
                <i v-if="aiLoading" class="pi pi-spin pi-spinner mr-2"></i>
                <i v-else class="pi pi-bolt mr-2 text-yellow-300"></i>
                {{ $t('POSTS_ADMIN.ACTIONS.SCORE_SEO') || 'Chấm điểm SEO (AI)' }}
              </button>
            </div>
          </div>
        </div>

        <!-- SEO Score Card -->
        <div v-if="seoResult || form.seoScore" class="bg-gradient-to-br from-gray-900 to-indigo-900 p-6 rounded-2xl shadow-xl text-white space-y-4 relative overflow-hidden">
          <div class="absolute -right-4 -top-4 opacity-10">
            <i class="pi pi-bolt text-8xl"></i>
          </div>
          <div class="relative z-10 flex flex-col items-center justify-center space-y-3">
              <span class="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">SEO Efficiency Score</span>
              <div 
                class="w-24 h-24 rounded-full border-[6px] flex items-center justify-center text-4xl font-black shadow-2xl bg-white/5"
                :class="[
                  (seoResult?.score || form.seoScore || 0) >= 80 ? 'border-green-400 text-green-400 shadow-green-500/20' :
                  (seoResult?.score || form.seoScore || 0) >= 50 ? 'border-yellow-400 text-yellow-400 shadow-yellow-500/20' :
                  'border-red-400 text-red-400 shadow-red-500/20'
                ]"
              >
                {{ seoResult?.score || form.seoScore || 0 }}
              </div>
              <div class="flex flex-col items-center">
                <span 
                  class="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest bg-white/10"
                  :class="[
                    (seoResult?.score || form.seoScore || 0) >= 80 ? 'text-green-300' :
                    (seoResult?.score || form.seoScore || 0) >= 50 ? 'text-yellow-300' :
                    'text-red-300'
                  ]"
                >
                  {{ (seoResult?.score || form.seoScore || 0) >= 80 ? 'Excellent' : (seoResult?.score || form.seoScore || 0) >= 50 ? 'Good Progress' : 'Needs Optimization' }}
                </span>
              </div>
          </div>
        </div>

        <!-- Thumbnail Upload -->
        <div class="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">
          <h3 class="font-bold text-gray-800 dark:text-gray-200 border-b dark:border-gray-800 pb-3 flex items-center gap-2">
            <i class="pi pi-image text-emerald-500"></i>
            {{ $t('POSTS_ADMIN.FIELDS.IMAGE') }}
          </h3>
          
          <div class="space-y-4">
            <div 
              @click="triggerFileUpload"
              class="w-full h-48 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-red-500 dark:hover:border-red-500 transition-all relative group bg-gray-50 dark:bg-gray-800/50 shadow-inner"
            >
              <template v-if="form.media">
                <img :src="form.media" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <i class="pi pi-camera text-white text-3xl"></i>
                </div>
              </template>
              <template v-else>
                <div class="flex flex-col items-center text-gray-400 group-hover:text-red-500 transition-colors">
                  <i class="pi pi-upload text-4xl mb-3"></i>
                  <span class="text-xs font-bold uppercase tracking-widest">{{ $t('COMMON.UPLOAD') }}</span>
                </div>
              </template>
            </div>
            
            <div v-if="form.media" class="flex flex-col gap-2">
              <button 
                type="button"
                @click="removeMainImage"
                class="w-full px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors flex items-center justify-center gap-2 border border-red-100 dark:border-red-900/40"
              >
                <i class="pi pi-trash"></i>
                {{ $t('COMMON.DELETE') }}
              </button>
            </div>

            <div class="space-y-2 p-3 bg-gray-50 dark:bg-gray-800/30 rounded-xl">
              <p class="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <i class="pi pi-info-circle text-blue-400"></i>
                {{ $t('COMMON.FORMAT_HINT') }} (JPG, PNG, WebP)
              </p>
              <p class="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <i class="pi pi-info-circle text-blue-400"></i>
                {{ $t('COMMON.SIZE_HINT') }} (Max 2MB)
              </p>
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Editor from '@/components/common/Editor.vue'
import { slugify } from '@/utils/string'
import { checkFileSize } from '@/utils/file'
import { hasFieldChanged } from '@/utils/diff'
import { usePostStore } from '@/store/post.store'
import type { IPost, PostCreationAttributes, SeoScoreResult } from '@/types/post'
import { useToast } from '@/composables/useToast'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const postStore = usePostStore()
const { toastSuccess, toastError, toastWarn, toastInfo } = useToast()

const isEdit = computed(() => !!route.params.id)
const aiLoading = ref(false)
const seoResult = ref<SeoScoreResult | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)

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

const form = reactive<PostCreationAttributes>({ ...initialForm })
const originalPost = ref<IPost | null>(null)

onMounted(async () => {
  if (isEdit.value) {
    const id = Number(route.params.id)
    try {
      const result = await postStore.fetchPostById(id)
      if (result) {
        originalPost.value = result
        Object.assign(form, result)
      }
    } catch (error) {
      console.error('Error fetching post:', error)
      toastError(t('POSTS_ADMIN.ERRORS.FETCH_FAILED') || t('COMMON.ERROR'))
      router.push({ name: 'PostManagement' })
    }
  }
})

const goBack = () => {
  router.push({ name: 'PostManagement' })
}

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
    selectedFile.value = file
    // Create a local blob URL for preview
    form.media = URL.createObjectURL(file)
  }
}

const removeMainImage = () => {
  form.media = ''
  selectedFile.value = null
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
    const dataToSend = { ...form }
    // If we have a selected file, pass it as 'image' field for FormData conversion
    if (selectedFile.value) {
      (dataToSend as Record<string, unknown>).image = selectedFile.value
    }

    if (isEdit.value && originalPost.value?.id) {
      const payload: Record<string, unknown> = { ...dataToSend }
      
      // Check for changes to re-translate if needed
      payload.translateTitle = hasFieldChanged(originalPost.value, form, 'title_vi')
      payload.translateContent = hasFieldChanged(originalPost.value, form, 'content_vi')
      
      await postStore.updatePost(originalPost.value.id, payload)
      toastSuccess(t('COMMON.SUCCESS'))
    } else {
      await postStore.createPost({ 
        ...dataToSend, 
        translateTitle: true, 
        translateContent: true 
      })
      toastSuccess(t('COMMON.SUCCESS'))
    }

    goBack()
  } catch (error) {
    console.error('Error submitting post:', error)
    toastError(postStore.error || t('COMMON.ERROR'))
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom shadow for premium look */
.shadow-premium {
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
}
</style>
