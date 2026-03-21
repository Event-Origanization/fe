<!-- src/components/products/ProductModal.vue -->
<template>
  <BaseModal
    :show="show"
    :title="isEdit ? $t('PRODUCT_ADMIN.EDIT') : $t('PRODUCT_ADMIN.ADD_NEW')"
    maxWidth="70%"
    @close="$emit('close')"
  >
    <div class="space-y-6">
      <!-- Name & Slug -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ $t('PRODUCT_ADMIN.FIELDS.NAME') }} *
          </label>
          <input
            v-model="form.name_vi"
            type="text"
            @input="handleNameInput"
            :placeholder="$t('PRODUCT_ADMIN.PLACEHOLDERS.NAME')"
            class="block w-full px-4 py-2 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ $t('PRODUCT_ADMIN.FIELDS.SLUG') }} *
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
            {{ $t('PRODUCT_ADMIN.FIELDS.PRICE') }} (VND) *
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
              {{ $t('COMMON.ACTIVE_DISPLAY') }}
            </span>
          </label>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ $t('PRODUCT_ADMIN.FIELDS.TYPE') }} *
          </label>
          <select
            v-model="form.productType"
            class="block w-full px-4 py-2 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all"
          >
            <option :value="PAGE_KEYS.SOUND_LIGHT">Âm thanh ánh sáng</option>
            <option :value="PAGE_KEYS.RENTAL">Cho thuê thiết bị</option>
          </select>
        </div>
      </div>

      <!-- Main Image Upload -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {{ $t('PRODUCT_ADMIN.FIELDS.IMAGE') }}
        </label>
        <div class="flex items-center space-x-6">
          <div 
            @click="triggerFileUpload"
            class="w-40 h-40 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-red-500 dark:hover:border-red-500 transition-all relative group bg-gray-50 dark:bg-gray-800/50 shadow-inner"
          >
            <template v-if="form.images && form.images.length > 0">
              <img :src="form.images[0]" class="w-full h-full object-cover" />
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
          
          <div v-if="form.images && form.images.length > 0" class="flex flex-col gap-3">
            <button 
              type="button"
              @click="removeMainImage"
              class="px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors flex items-center gap-2 border border-transparent hover:border-red-200 dark:hover:border-red-800/50"
            >
              <i class="pi pi-trash"></i>
              {{ $t('COMMON.DELETE') || 'Xóa ảnh' }}
            </button>
            <div class="space-y-1">
              <p class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <i class="pi pi-info-circle text-[10px]"></i>
                {{ $t('COMMON.FORMAT_HINT') || 'Định dạng: JPG, PNG, WEBP' }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <i class="pi pi-info-circle text-[10px]"></i>
                {{ $t('COMMON.SIZE_HINT') || 'Dung lượng tối đa: 2MB' }}
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
            {{ $t('PRODUCT_ADMIN.FIELDS.CONTENT') }} *
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
        :disabled="productStore.loading"
        class="w-full inline-flex justify-center items-center rounded-lg px-6 py-2 bg-red-500 text-white font-semibold hover:bg-red-600 transition-all shadow-md active:scale-95 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <i v-if="productStore.loading" class="pi pi-spin pi-spinner mr-2"></i>
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
import BaseModal from '../common/BaseModal.vue'
import Editor from '../common/Editor.vue'
import { slugify } from '@/utils/string'
import { fileToDataURL, checkFileSize } from '@/utils/file'
import { hasFieldChanged } from '@/utils/diff'
import { useProductStore } from '@/store/product.store'
import type { IProduct, ProductCreationAttributes } from '@/types/product'
import { useToast } from '@/composables/useToast'
import { PAGE_KEYS } from '@/constants'

const props = defineProps({
  show: Boolean,
  product: {
    type: Object as () => IProduct | null,
    default: null
  }
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', data: IProduct): void
}>()

const isEdit = ref(false)
const productStore = useProductStore()
const { toastSuccess, toastError, toastWarn } = useToast()

const initialForm: ProductCreationAttributes = {
  name_vi: '',
  slug: '',
  content_vi: '',
  price: 0,
  isActive: true,
  productType: 'RENTAL',
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
      form.images = [base64]
    } catch (error) {
      console.error('Lỗi khi đọc file:', error)
      toastError('Có lỗi xảy ra khi tải ảnh lên')
    }
  }
}

const removeMainImage = () => {
  form.images = []
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const handleNameInput = () => {
  if (!isEdit.value) {
    form.slug = slugify(form.name_vi)
  }
}

const handleSubmit = async () => {
  try {
    let result
    if (isEdit.value && props.product?.id) {
      const payload: Partial<ProductCreationAttributes> = { ...form }
      
      // Kiểm tra xem có thay đổi nội dung không để yêu cầu dịch lại
      payload.translateName = hasFieldChanged(props.product, form, 'name_vi')
      payload.translateContent = hasFieldChanged(props.product, form, 'content_vi')
      
      result = await productStore.updateProduct(props.product.id, payload)
    } else {
      result = await productStore.createProduct({ 
        ...form, 
        translateName: true, 
        translateContent: true 
      })
    }

    toastSuccess(isEdit.value ? 'Cập nhật sản phẩm thành công' : 'Thêm sản phẩm thành công')

    emit('submit', result.data)
    emit('close')
  } catch (error) {
    console.error('Error submitting product:', error)
    toastError(productStore.error || 'Có lỗi xảy ra khi lưu sản phẩm')
  }
}
</script>
