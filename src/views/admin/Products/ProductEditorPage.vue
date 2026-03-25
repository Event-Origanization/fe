<template>
  <div class="space-y-6 pb-20 p-4 md:p-8">
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
          <h1 class="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent uppercase">
            {{ isEdit ? $t('PRODUCT_ADMIN.EDIT') : $t('PRODUCT_ADMIN.ADD_NEW') }}
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ isEdit ? $t('PRODUCT_ADMIN.EDIT_SUBTITLE') || 'Chỉnh sửa nội dung sản phẩm và tối ưu hiển thị' : $t('PRODUCT_ADMIN.ADD_SUBTITLE') || 'Thêm sản phẩm mới vào danh mục' }}
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
          :disabled="productStore.loading"
          class="flex-1 md:flex-none px-8 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl hover:from-red-600 hover:to-orange-600 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <i v-if="productStore.loading" class="pi pi-spin pi-spinner"></i>
          <i v-else class="pi pi-save"></i>
          {{ isEdit ? $t('COMMON.UPDATE') : $t('COMMON.CREATE') }}
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
              {{ $t('PRODUCT_ADMIN.FIELDS.NAME') }} *
            </label>
            <input
              v-model="form.name_vi"
              type="text"
              @input="handleNameInput"
              :placeholder="$t('PRODUCT_ADMIN.PLACEHOLDERS.NAME')"
              class="block w-full px-4 py-3 text-lg font-semibold border border-gray-200 rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all outline-none shadow-sm"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ $t('PRODUCT_ADMIN.FIELDS.SLUG') }} *
            </label>
            <div class="flex items-center gap-2">
              <span class="text-gray-400 text-sm hidden sm:inline">/product/</span>
              <input
                v-model="form.slug"
                type="text"
                class="block flex-1 px-4 py-2 text-sm border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all outline-none"
                placeholder="slug-san-pham"
              />
            </div>
          </div>
        </div>

        <!-- Editor Section -->
        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div class="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/20">
            <h2 class="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <i class="pi pi-pencil text-red-500"></i>
              {{ $t('PRODUCT_ADMIN.FIELDS.CONTENT') }} *
            </h2>
            <div class="text-xs text-gray-500 italic font-medium">
              {{ $t('COMMON.AUTO_TRANSLATE_HINT') }}
            </div>
          </div>
          <div class="p-0">
            <Editor v-model="form.content_vi" minHeight="700px" :autoResize="false" />
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Classification -->
        <div class="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
          <h3 class="font-bold text-gray-800 dark:text-gray-200 border-b dark:border-gray-800 pb-3 flex items-center gap-2">
            <i class="pi pi-cog text-blue-500"></i>
            Phân loại & Giá cả
          </h3>
          
          <div class="space-y-4">
            <!-- Price -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                {{ $t('PRODUCT_ADMIN.FIELDS.PRICE') }} (VNĐ)
              </label>
              <div class="relative">
                <input
                  v-model.number="form.price"
                  type="number"
                  min="0"
                  class="block w-full px-4 py-2.5 pr-12 border border-gray-200 rounded-xl bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all font-bold text-lg outline-none"
                  placeholder="0"
                />
                <div class="absolute right-4 top-1/2 -translate-y-1/2 font-black text-gray-400">₫</div>
              </div>
            </div>

            <!-- Type -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                {{ $t('PRODUCT_ADMIN.FIELDS.TYPE') }}
              </label>
              <select
                v-model="form.productType"
                class="block w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all outline-none shadow-sm cursor-pointer font-medium"
              >
                <option :value="PAGE_KEYS.SOUND_LIGHT">Âm thanh ánh sáng</option>
                <option :value="PAGE_KEYS.RENTAL">Cho thuê thiết bị</option>
              </select>
            </div>

            <!-- Status -->
            <div class="pt-2 border-t dark:border-gray-800 flex items-center justify-between">
              <div>
                <span class="block text-sm font-bold text-gray-700 dark:text-gray-300">{{ $t('COMMON.STATUS') }}</span>
                <span class="text-xs text-gray-500 italic font-medium">{{ form.isActive ? 'Đang hiển thị' : 'Tạm ẩn' }}</span>
              </div>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="form.isActive" class="sr-only peer" />
                <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-900 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r peer-checked:from-red-500 peer-checked:to-orange-500 shadow-sm"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Image Upload -->
        <div class="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">
          <h3 class="font-bold text-gray-800 dark:text-gray-200 border-b dark:border-gray-800 pb-3 flex items-center gap-2">
            <i class="pi pi-image text-emerald-500"></i>
            {{ $t('PRODUCT_ADMIN.FIELDS.IMAGE') }}
          </h3>
          
          <div class="space-y-4">
            <div 
              @click="triggerFileUpload"
              class="w-full aspect-square border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-red-500 dark:hover:border-red-500 transition-all relative group bg-gray-50 dark:bg-gray-800/50 shadow-inner"
            >
              <template v-if="form.images && form.images.length > 0">
                <img :src="form.images[0]" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
            
            <div v-if="form.images && form.images.length > 0" class="flex flex-col gap-2">
              <button 
                type="button"
                @click.stop="removeMainImage"
                class="w-full px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors flex items-center justify-center gap-2 border border-red-100 dark:border-red-900/40"
              >
                <i class="pi pi-trash"></i>
                {{ $t('COMMON.DELETE') }}
              </button>
            </div>

            <div class="space-y-1 p-3 bg-gray-50 dark:bg-gray-800/30 rounded-xl">
              <p class="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <i class="pi pi-info-circle text-blue-400"></i>
                {{ $t('COMMON.FORMAT_HINT') }}
              </p>
              <p class="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-2 font-medium">
                <i class="pi pi-info-circle text-blue-400"></i>
                {{ $t('COMMON.SIZE_HINT') }}
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
import Editor from '@/components/common/Editor.vue'
import { slugify } from '@/utils/string'
import { fileToDataURL, checkFileSize } from '@/utils/file'
import { hasFieldChanged } from '@/utils/diff'
import { useProductStore } from '@/store/product.store'
import type { IProduct, ProductCreationAttributes } from '@/types/product'
import { useToast } from '@/composables/useToast'
import { PAGE_KEYS } from '@/constants'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const { toastSuccess, toastError, toastWarn } = useToast()

const productId = computed(() => {
  const idValue = route.params.id
  if (!idValue) return null
  const id = Number(idValue)
  return isNaN(id) ? null : id
})

const isEdit = computed(() => !!productId.value)

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
const originalProduct = ref<IProduct | null>(null)

onMounted(async () => {
  if (isEdit.value && productId.value) {
    try {
      const data = await productStore.fetchProductById(productId.value)
      if (data) {
        Object.assign(form, data)
        originalProduct.value = { ...data }
      } else {
        toastError('Không tìm thấy thông tin sản phẩm')
        router.push({ name: 'ProductManagement' })
      }
    } catch (error) {
       console.error('Error fetching product:', error)
       toastError('Lỗi khi tải dữ liệu sản phẩm')
    }
  }
})

const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)

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
    selectedFile.value = file
    // Create a local blob URL for preview
    form.images = [URL.createObjectURL(file)]
  }
}

const removeMainImage = () => {
  form.images = []
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const handleNameInput = () => {
  if (!isEdit.value) {
    form.slug = slugify(form.name_vi)
  }
}

const goBack = () => {
  router.push({ name: 'ProductManagement' })
}

const handleSubmit = async () => {
  if (!form.name_vi || !form.slug) {
    toastWarn('Vui lòng nhập đầy đủ Tên và Đường dẫn')
    return
  }

  try {
    const dataToSend = { ...form }
    // If we have a selected file, pass it as 'image' field for FormData conversion
    if (selectedFile.value) {
      (dataToSend as any).image = selectedFile.value
    }

    if (isEdit.value && productId.value) {
      const payload: any = { ...dataToSend }
      
      if (originalProduct.value) {
        payload.translateName = hasFieldChanged(originalProduct.value, form, 'name_vi')
        payload.translateContent = hasFieldChanged(originalProduct.value, form, 'content_vi')
      }
      
      await productStore.updateProduct(productId.value, payload)
      toastSuccess('Cập nhật sản phẩm thành công')
    } else {
      await productStore.createProduct({ 
        ...dataToSend, 
        translateName: true, 
        translateContent: true 
      } as any)
      toastSuccess('Thêm sản phẩm thành công')
    }

    goBack()
  } catch (error) {
    console.error('Error submitting product:', error)
    toastError(productStore.error || 'Có lỗi xảy ra khi lưu sản phẩm')
  }
}
</script>

<style scoped>
.product-editor-page {
  animation: page-appear 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

@keyframes page-appear {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
