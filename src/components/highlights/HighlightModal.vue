<!-- src/components/highlights/HighlightModal.vue -->
<template>
  <BaseModal
    :show="show"
    :title="isEdit ? 'Chỉnh sửa Nổi bật' : 'Thêm Nổi bật mới'"
    maxWidth="600px"
    @close="$emit('close')"
  >
    <div class="space-y-6">
      <!-- Title VI -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Tiêu đề (Tiếng Việt) *
        </label>
        <input
          v-model="form.title_vi"
          type="text"
          placeholder="Nhập tiêu đề tiếng Việt..."
          class="block w-full px-4 py-2 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all font-medium"
        />
        <p class="mt-1 text-xs text-gray-500 italic">* Hệ thống sẽ tự động dịch sang tiếng Anh và tiếng Trung</p>
      </div>

      <!-- Content VI -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nội dung (Tiếng Việt) *
        </label>
        <textarea
          v-model="form.content_vi"
          rows="4"
          placeholder="Nhập nội dung tiếng Việt..."
          class="block w-full px-4 py-2 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all font-medium"
        ></textarea>
      </div>

      <!-- Order Index -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Thứ tự hiển thị
        </label>
        <input
          v-model.number="form.orderIndex"
          type="number"
          class="block w-full px-4 py-2 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all"
        />
      </div>
    </div>

    <template #footer>
      <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <button
          @click="handleSubmit"
          :disabled="highlightStore.loading"
          class="inline-flex justify-center items-center rounded-lg px-6 py-2 bg-red-500 text-white font-semibold hover:bg-red-600 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i v-if="highlightStore.loading" class="pi pi-spin pi-spinner mr-2"></i>
          {{ isEdit ? 'Cập nhật' : 'Thêm mới' }}
        </button>
        <button
          @click="$emit('close')"
          class="inline-flex justify-center items-center rounded-lg px-6 py-2 border border-gray-300 bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
        >
          Hủy
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import BaseModal from '@/components/common/BaseModal.vue'
import { useHighlightStore } from '@/store/highlight'
import type { IHighlight, CreateHighlightRequest } from '@/types/highlight'
import { useToast } from '@/composables/useToast'

const props = defineProps({
  show: Boolean,
  highlight: {
    type: Object as () => IHighlight | null,
    default: null
  }
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const highlightStore = useHighlightStore()
const { toastSuccess, toastError } = useToast()
const isEdit = ref(false)

const initialForm: CreateHighlightRequest = {
  title_vi: '',
  content_vi: '',
  orderIndex: 0,
  translateTitle: true,
  translateContent: true
}

const form = reactive({ ...initialForm })

const resetForm = () => {
  Object.assign(form, initialForm)
}

watch(() => props.show, (newVal) => {
  if (newVal) {
    if (props.highlight) {
      isEdit.value = true
      Object.assign(form, props.highlight)
      // Khi edit, mặc định vẫn để translate = true nếu user thay đổi nội dung VI
      form.translateTitle = true
      form.translateContent = true
    } else {
      isEdit.value = false
      resetForm()
      form.orderIndex = highlightStore.highlights.length + 1
    }
  } else {
    setTimeout(resetForm, 300)
  }
})

const handleSubmit = async () => {
  if (!form.title_vi || !form.content_vi) {
    toastError('Vui lòng nhập đầy đủ Tiêu đề và Nội dung (VI)')
    return
  }

  try {
    let response
    if (isEdit.value && props.highlight?.id) {
      response = await highlightStore.updateHighlight(props.highlight.id, form)
    } else {
      response = await highlightStore.createHighlight(form)
    }

    if (response && !(response instanceof Error)) {
      toastSuccess('Thao tác thành công')
      emit('close')
      highlightStore.fetchAdminHighlights()
    }
  } catch (error) {
    console.error('Error submitting highlight:', error)
    toastError('Có lỗi xảy ra khi lưu dữ liệu')
  }
}
</script>
