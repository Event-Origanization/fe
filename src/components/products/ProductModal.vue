<!-- src/components/products/ProductModal.vue -->
<template>
  <BaseModal
    :show="show"
    :title="isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'"
    maxWidth="70%"
    @close="$emit('close')"
  >
    <div class="space-y-6">
      <!-- Name & Slug -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tên sản phẩm *
          </label>
          <input
            v-model="form.name_vi"
            type="text"
            @input="handleNameInput"
            placeholder="Nhập tên sản phẩm..."
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
            placeholder="ví-du-slug-san-pham"
          />
        </div>
      </div>

      <!-- Price & Status -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Giá bán (VND) *
          </label>
          <div class="relative">
            <input
              v-model.number="form.price"
              type="number"
              class="block w-full pl-4 pr-12 py-2 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all"
            />
            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">VND</span>
          </div>
        </div>
        <div class="flex items-end pb-2">
          <label class="flex items-center cursor-pointer">
            <input type="checkbox" v-model="form.isActive" class="sr-only peer" />
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Kích hoạt sản phẩm
            </span>
          </label>
        </div>
      </div>

      <!-- Content Editor -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nội dung chi tiết *
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
        class="w-full inline-flex justify-center items-center rounded-lg px-6 py-2 bg-red-500 text-white font-semibold hover:bg-red-600 transition-all shadow-md active:scale-95 sm:w-auto"
      >
        {{ isEdit ? 'Cập nhật' : 'Tạo mới' }}
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

const props = defineProps({
  show: Boolean,
  product: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'submit'])

const isEdit = ref(false)

const initialForm = {
  name_vi: '',
  slug: '',
  content_vi: '',
  price: 0,
  isActive: true,
  images: [],
  variants: []
}

const form = reactive({ ...initialForm })

watch(() => props.product, (newVal) => {
  if (newVal) {
    isEdit.value = true
    Object.assign(form, newVal)
  } else {
    isEdit.value = false
    Object.assign(form, initialForm)
  }
}, { immediate: true })

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // Normalize to decomposite accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove markers
    .replace(/[đĐ]/g, 'd')
    .replace(/([^0-9a-z-\s])/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const handleNameInput = () => {
  if (!isEdit.value) {
    form.slug = slugify(form.name_vi)
  }
}

const handleSubmit = () => {
  console.log('Product Data Committed:', JSON.parse(JSON.stringify(form)))
  emit('submit', { ...form })
  emit('close')
}
</script>
