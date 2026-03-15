<!-- src/components/videos/VideoModal.vue -->
<template>
  <BaseModal
    :show="show"
    :title="isEdit ? $t('VIDEOS_ADMIN.EDIT') : $t('VIDEOS_ADMIN.ADD_NEW')"
    maxWidth="600px"
    @close="$emit('close')"
  >
    <div class="space-y-6">
      <!-- Title -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {{ $t('VIDEOS_ADMIN.FIELDS.TITLE') }} *
        </label>
        <input
          v-model="form.title_vi"
          type="text"
          :placeholder="$t('VIDEOS_ADMIN.PLACEHOLDERS.TITLE')"
          class="block w-full px-4 py-2 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all"
        />
        <p class="mt-1 text-xs text-gray-400 italic">{{ $t('COMMON.AUTO_TRANSLATE_HINT') }}</p>
      </div>

      <!-- Thumbnail Upload -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {{ $t('VIDEOS_ADMIN.FIELDS.THUMBNAIL') }}
        </label>
        <div class="flex items-center space-x-6">
          <div 
            @click="triggerFileUpload"
            class="w-40 h-24 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-red-500 dark:hover:border-red-500 transition-all relative group bg-gray-50 dark:bg-gray-800/50 shadow-inner"
          >
            <template v-if="form.thumbnail">
              <img :src="form.thumbnail" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <i class="pi pi-camera text-white text-xl"></i>
              </div>
            </template>
            <template v-else>
              <div class="flex flex-col items-center text-gray-400 group-hover:text-red-500 transition-colors">
                <i class="pi pi-image text-2xl mb-1"></i>
                <span class="text-[10px] font-semibold uppercase tracking-wider">{{ $t('COMMON.UPLOAD') }}</span>
              </div>
            </template>
          </div>
          
          <div v-if="form.thumbnail" class="flex flex-col gap-2">
            <button 
              type="button"
              @click="removeThumbnail"
              class="px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-2 border border-transparent hover:border-red-200 dark:hover:border-red-800/50"
            >
              <i class="pi pi-trash"></i>
              {{ $t('COMMON.DELETE') }}
            </button>
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

      <!-- URL -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {{ $t('VIDEOS_ADMIN.FIELDS.URL') }} *
        </label>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <i class="pi pi-video"></i>
          </span>
          <input
            v-model="form.url"
            type="text"
            placeholder="https://www.youtube.com/watch?v=..."
            class="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all"
          />
        </div>
      </div>

      <!-- Order & Status -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ $t('VIDEOS_ADMIN.FIELDS.ORDER') }}
          </label>
          <input
            v-model.number="form.orderIndex"
            type="number"
            class="block w-full px-4 py-2 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all"
          />
        </div>
        <div class="flex items-end pb-2">
          <label class="flex items-center cursor-pointer">
            <input type="checkbox" v-model="form.isActive" class="sr-only peer" />
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {{ $t('COMMON.ACTIVE_DISPLAY') }}
            </span>
          </label>
        </div>
      </div>
    </div>

    <template #footer>
      <button
        @click="handleSubmit"
        :disabled="videoStore.loading"
        class="w-full inline-flex justify-center items-center rounded-lg px-6 py-2 bg-red-500 text-white font-semibold hover:bg-red-600 transition-all shadow-md active:scale-95 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <i v-if="videoStore.loading" class="pi pi-spin pi-spinner mr-2"></i>
        {{ isEdit ? $t('COMMON.UPDATE') : $t('COMMON.CREATE') }}
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
import { hasFieldChanged } from '@/utils/diff'
import { useVideoStore } from '@/store/highlight-video.store'
import type { IHighlightVideo, HighlightVideoCreationAttributes } from '@/types/highlight-video'
import { useToast } from '@/composables/useToast'

const props = defineProps({
  show: Boolean,
  video: {
    type: Object as () => IHighlightVideo | null,
    default: null
  }
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', data: IHighlightVideo): void
}>()

const { t } = useI18n()
const isEdit = ref(false)
const videoStore = useVideoStore()
const { toastSuccess, toastError, toastWarn } = useToast()

const initialForm: HighlightVideoCreationAttributes = {
  title_vi: '',
  url: '',
  thumbnail: '',
  orderIndex: 0,
  isActive: true,
}

const form = reactive({ ...initialForm })

watch(() => props.video, (newVal) => {
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
    import('@/utils/file').then(async ({ checkFileSize, fileToDataURL }) => {
      if (!checkFileSize(file, 2)) {
        toastWarn(t('COMMON.SIZE_HINT'))
        return
      }
      try {
        const base64 = await fileToDataURL(file)
        form.thumbnail = base64
      } catch (error) {
        console.error('Lỗi khi đọc file:', error)
        toastError(t('COMMON.ERROR'))
      }
    })
  }
}

const removeThumbnail = () => {
  form.thumbnail = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const handleSubmit = async () => {
  if (!form.title_vi || !form.url) {
      toastError('Vui lòng nhập đầy đủ thông tin bắt buộc')
      return
  }

  try {
    let result
    if (isEdit.value && props.video?.id) {
      const payload: Partial<HighlightVideoCreationAttributes> = { ...form }
      
      // Kiểm tra xem có thay đổi tiêu đề không để yêu cầu dịch lại
      payload.translateTitle = hasFieldChanged(props.video, form, 'title_vi')
      
      result = await videoStore.updateVideo(props.video.id, payload)
    } else {
      result = await videoStore.createVideo({ 
        ...form, 
        translateTitle: true 
      })
    }

    toastSuccess(t('COMMON.SUCCESS'))

    emit('submit', result.data)
    emit('close')
  } catch (error) {
    console.error('Error submitting video:', error)
    toastError(videoStore.error || t('COMMON.ERROR'))
  }
}
</script>
