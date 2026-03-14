<!-- src/components/posts/PostModal.vue -->
<template>
  <BaseModal
    :show="show"
    :title="isEdit ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'"
    maxWidth="70%"
    @close="$emit('close')"
  >
    <div class="space-y-6">
      <!-- Title & Slug -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tiêu đề bài viết *
          </label>
          <input
            v-model="form.title_vi"
            type="text"
            @input="handleTitleInput"
            placeholder="Nhập tiêu đề bài viết..."
            class="block w-full px-4 py-2 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Đường dẫn (Slug) *
          </label>
          <input
            v-model="form.slug"
            type="text"
            class="block w-full px-4 py-2 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="vi-du-slug-bai-viet"
          />
        </div>
      </div>

      <!-- Status Option -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Trạng thái *
          </label>
          <select
            v-model="form.status"
            class="block w-full px-4 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all shadow-sm"
          >
            <option value="DRAFT">Bản nháp</option>
            <option value="PUBLISHED">Xuất bản</option>
            <option value="SCHEDULED">Lên lịch</option>
          </select>
        </div>
      </div>

      <!-- Main Media Upload -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Ảnh đại diện (Media)
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
                <span class="text-xs font-semibold uppercase tracking-wider">Tải ảnh lên</span>
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
              Xóa ảnh hiện tại
            </button>
            <div class="space-y-1">
              <p class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <i class="pi pi-info-circle text-[10px]"></i>
                Định dạng: JPG, PNG, WEBP
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <i class="pi pi-info-circle text-[10px]"></i>
                Dung lượng tối đa: 2MB
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
            Nội dung bài viết *
          </label>
          <div class="border rounded-xl dark:border-gray-700">
            <Editor v-model="form.content_vi" minHeight="450px" />
          </div>
          <p class="mt-2 text-xs text-gray-500 italic">
            * Backend sẽ tự động dịch nội dung này sang Tiếng Anh và Tiếng Trung.
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
        <template v-if="isEdit && form.status === 'PUBLISHED'">Cập nhật</template>
        <template v-else-if="!isEdit && form.status === 'PUBLISHED'">Khởi tạo & Xuất bản</template>
        <template v-else-if="isEdit">Lưu cập nhật</template>
        <template v-else>Lưu bản nháp</template>
      </button>
      <button
        @click="$emit('close')"
        class="w-full inline-flex justify-center items-center rounded-lg px-6 py-2 border border-gray-300 bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all sm:w-auto mt-2 sm:mt-0"
      >
        Hủy
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import BaseModal from '../common/BaseModal.vue'
import Editor from '../common/Editor.vue'
import { slugify } from '@/utils/string'
import { fileToDataURL, checkFileSize } from '@/utils/file'
import { hasFieldChanged } from '@/utils/diff'
import { usePostStore } from '@/store/post.store'
import type { IPost, PostCreationAttributes } from '@/types/post'
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

const isEdit = ref(false)
const postStore = usePostStore()
const { toastSuccess, toastError, toastWarn } = useToast()

const initialForm: PostCreationAttributes = {
  title_vi: '',
  slug: '',
  content_vi: '',
  status: 'DRAFT',
  media: '',
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
      toastWarn('Dung lượng ảnh không được vượt quá 2MB')
      return
    }
    try {
      const base64 = await fileToDataURL(file)
      form.media = base64
    } catch (error) {
      console.error('Lỗi khi đọc file:', error)
      toastError('Có lỗi xảy ra khi tải ảnh lên')
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

    toastSuccess(isEdit.value ? 'Cập nhật bài viết thành công' : 'Thêm bài viết thành công')

    emit('submit', result.data)
    emit('close')
  } catch (error) {
    console.error('Error submitting post:', error)
    toastError(postStore.error || 'Có lỗi xảy ra khi lưu bài viết')
  }
}
</script>
