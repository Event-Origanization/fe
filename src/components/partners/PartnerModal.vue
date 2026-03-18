<!-- src/components/partners/PartnerModal.vue -->
<template>
  <BaseModal
    :show="show"
    :title="isEdit ? $t('PARTNERS_ADMIN.EDIT') : $t('PARTNERS_ADMIN.ADD_NEW')"
    maxWidth="600px"
    @close="$emit('close')"
  >
    <div class="space-y-6">
      <!-- Name -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {{ $t('PARTNERS_ADMIN.FIELDS.NAME') }} *
        </label>
        <input
          v-model="form.name"
          type="text"
          :placeholder="$t('PARTNERS_ADMIN.PLACEHOLDERS.NAME')"
          class="block w-full px-4 py-2 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all font-medium"
        />
      </div>

      <!-- Logo Upload -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {{ $t('PARTNERS_ADMIN.FIELDS.LOGO') }}
        </label>
        <div class="flex items-center space-x-6">
          <div 
            @click="triggerFileUpload"
            class="w-48 h-20 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-red-500 dark:hover:border-red-500 transition-all relative group bg-gray-50 dark:bg-gray-800/50 shadow-inner"
          >
            <template v-if="form.logo">
              <img :src="form.logo" class="max-w-full max-h-full object-contain p-2" />
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
          
          <div v-if="form.logo" class="flex flex-col gap-2">
            <button 
              type="button"
              @click="removeLogo"
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

      <!-- Order & Status -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ $t('PARTNERS_ADMIN.FIELDS.ORDER') }}
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
      <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <button
          @click="handleSubmit"
          :disabled="partnerStore.loading"
          class="inline-flex justify-center items-center rounded-lg px-6 py-2 bg-red-500 text-white font-semibold hover:bg-red-600 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i v-if="partnerStore.loading" class="pi pi-spin pi-spinner mr-2"></i>
          {{ isEdit ? $t('COMMON.UPDATE') : $t('COMMON.CREATE') }}
        </button>
        <button
          @click="$emit('close')"
          class="inline-flex justify-center items-center rounded-lg px-6 py-2 border border-gray-300 bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
        >
          {{ $t('COMMON.CANCEL') }}
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseModal from '../common/BaseModal.vue'
import { usePartnerStore } from '@/store/partner.store'
import type { IPartner, PartnerCreationAttributes } from '@/types/partner'
import { useToast } from '@/composables/useToast'

const props = defineProps({
  show: Boolean,
  partner: {
    type: Object as () => IPartner | null,
    default: null
  }
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', data: IPartner): void
}>()

const { t } = useI18n()
const isEdit = ref(false)
const partnerStore = usePartnerStore()
const { toastSuccess, toastError, toastWarn } = useToast()

const initialForm: PartnerCreationAttributes = {
  name: '',
  logo: '',
  orderIndex: 0,
  isActive: true,
}

const form = reactive({ ...initialForm })

const resetForm = () => {
  Object.assign(form, initialForm)
  if (fileInput.value) fileInput.value.value = ''
}

watch(() => props.show, (newVal) => {
  if (newVal) {
    if (props.partner) {
      isEdit.value = true
      Object.assign(form, props.partner)
    } else {
      isEdit.value = false
      resetForm()
    }
  } else {
    // Delay reset to avoid flicker during closing animation
    setTimeout(resetForm, 300)
  }
})

// Remove the separate watch for props.partner as it's handled in props.show


const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    const { checkFileSize, fileToDataURL } = await import('@/utils/file')
    if (!checkFileSize(file, 2)) {
      toastWarn(t('COMMON.SIZE_HINT'))
      return
    }
    try {
      const base64 = await fileToDataURL(file)
      form.logo = base64
    } catch (error) {
      console.error('Lỗi khi đọc file:', error)
      toastError(t('COMMON.ERROR'))
    }
  }
}

const removeLogo = () => {
  form.logo = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const handleSubmit = async () => {
  if (!form.name) {
    toastError(t('PARTNERS_ADMIN.PLACEHOLDERS.NAME'))
    return
  }

  try {
    let result
    if (isEdit.value && props.partner?.id) {
      result = await partnerStore.updatePartner(props.partner.id, { ...form })
    } else {
      result = await partnerStore.createPartner({ ...form })
    }

    toastSuccess(t('COMMON.SUCCESS'))
    emit('submit', result.data)
    emit('close')
  } catch (error) {
    console.error('Error submitting partner:', error)
    toastError(partnerStore.error || t('COMMON.ERROR'))
  }
}
</script>
