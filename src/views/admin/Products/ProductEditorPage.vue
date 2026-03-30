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

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Left Column: Information -->
      <div class="lg:col-span-7 space-y-6">
        <!-- Basic Info -->
        <div class="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
          <h3 class="font-bold text-gray-800 dark:text-gray-200 border-b dark:border-gray-800 pb-3 flex items-center gap-2">
            <i class="pi pi-info-circle text-red-500"></i>
            Thông tin cơ bản
          </h3>
          
          <div class="space-y-4">
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
        </div>

        <!-- Pricing & Category -->
        <div class="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
          <h3 class="font-bold text-gray-800 dark:text-gray-200 border-b dark:border-gray-800 pb-3 flex items-center gap-2">
            <i class="pi pi-tag text-blue-500"></i>
            Giá cả & Phân loại
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>

          <!-- Status -->
          <div class="pt-4 border-t dark:border-gray-800 flex items-center justify-between">
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

      <!-- Right Column: Images -->
      <div class="lg:col-span-5 space-y-6">
        <div class="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 h-full flex flex-col">
          <div class="flex justify-between items-center border-b dark:border-gray-800 pb-3 mb-6">
            <h3 class="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <i class="pi pi-image text-emerald-500"></i>
              Thư viện ảnh sản phẩm
            </h3>
            <span class="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-gray-500 font-bold">
              {{ form.images?.length || 0 }} ảnh
            </span>
          </div>
          
          <div class="flex-1 space-y-6">
            <!-- Upload Area -->
            <div 
              @click="triggerFileUpload"
              class="w-full aspect-[16/6] border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-red-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all group"
            >
              <div class="flex flex-col items-center text-gray-400 group-hover:text-red-500 transition-colors">
                <i class="pi pi-cloud-upload text-4xl mb-2"></i>
                <span class="text-xs font-bold uppercase tracking-widest">{{ $t('COMMON.UPLOAD') }}</span>
              </div>
            </div>
            
            <!-- Image Grid -->
            <div 
              v-if="form.images && form.images.length > 0" 
              class="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              <div 
                v-for="(img, idx) in form.images" 
                :key="idx" 
                class="relative group aspect-square rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <img :src="img" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    type="button"
                    @click.stop="removeImage(idx)"
                    class="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all"
                  >
                    <i class="pi pi-trash"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div 
              v-else 
              class="h-64 flex flex-col items-center justify-center text-gray-400 p-8 text-center border border-gray-50 dark:border-gray-800 rounded-2xl bg-gray-50/30"
            >
              <i class="pi pi-images text-5xl mb-4 opacity-20"></i>
              <p class="text-sm font-medium">Chưa có ảnh nào được chọn.<br>Nhấn để tải lên ảnh cho sản phẩm.</p>
            </div>

            <!-- Hints -->
            <div class="pt-6 border-t dark:border-gray-800 mt-auto">
              <div class="space-y-2">
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
          </div>

          <input 
            ref="fileInput"
            type="file" 
            multiple
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
import { slugify } from '@/utils/string'
import { checkFileSize } from '@/utils/file'
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
  price: 0,
  isActive: true,
  productType: 'RENTAL',
  images: []
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
const selectedFiles = ref<File[]>([])

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (!files || files.length === 0) return

  const imageFiles = Array.from(files)
  
  for (const file of imageFiles) {
    if (!checkFileSize(file, 2)) {
      toastWarn(`Ảnh ${file.name} vượt quá 2MB`)
      continue
    }
    selectedFiles.value.push(file)
    form.images?.push(URL.createObjectURL(file))
  }
  
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const removeImage = (index: number) => {
  if (form.images) {
    // If it's an object URL (i.e. newly uploaded file), remove from selectedFiles
    const url = form.images[index]
    if (url.startsWith('blob:')) {
      // Note: Comparing object URLs doesn't work directly since they change, 
      // but assuming the order of selectedFiles matches the blob blobs at the end of form.images
      const newImagesCount = form.images.filter(i => i.startsWith('blob:')).length
      const startIdx = form.images.length - newImagesCount
      if (index >= startIdx) {
        selectedFiles.value.splice(index - startIdx, 1)
      }
    }
    
    form.images.splice(index, 1)
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
    
    // Assign array of existing images + newly selected files to images array in form data builder
    // The backend uses images field
    const imagesToKeep = dataToSend.images?.filter(url => !url.startsWith('blob:')) || []
    
    // In FormData builder, objectToFormData will receive `images` as array.
    // If we put Files in there directly, `objectToFormData` maps them directly.
    // But since `backend` now expects `images` for files and strings...
    const finalImages: (string | File)[] = [...imagesToKeep, ...selectedFiles.value]
    
    ;(dataToSend as Record<string, unknown>).images = finalImages.length ? finalImages : []

    if (isEdit.value && productId.value) {
      const payload: Record<string, unknown> = { ...dataToSend }
      
      if (originalProduct.value) {
        payload.translateName = hasFieldChanged(originalProduct.value, form, 'name_vi')
      }
      
      await productStore.updateProduct(productId.value, payload)
      toastSuccess('Cập nhật sản phẩm thành công')
    } else {
      await productStore.createProduct({ 
        ...dataToSend, 
        translateName: true
      })
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
