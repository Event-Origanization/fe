<!-- src/components/products/ProductTable.vue -->
<template>
  <div class="space-y-4">
    <!-- Filters & Search -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div class="relative w-full md:w-80">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="$t('COMMON.SEARCH')"
          class="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all shadow-sm"
        />
      </div>
      
      <div class="flex items-center gap-3 w-full md:w-auto">
        <select
          v-model="filterStatus"
          class="block w-full md:w-40 px-3 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all shadow-sm"
        >
          <option value="all">{{ $t('COMMON.ALL') }}</option>
          <option value="active">{{ $t('COMMON.ACTIVE') }}</option>
          <option value="inactive">{{ $t('COMMON.INACTIVE') }}</option>
        </select>
        
        <button
          @click="$emit('add')"
          class="flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all shadow-lg active:scale-95"
        >
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          {{ $t('COMMON.CREATE') }}
        </button>
      </div>
    </div>

    <!-- Table -->
    <BaseTable
      :columns="columns"
      :items="productStore.products"
      :loading="productStore.loading"
    >
      <!-- Custom Cell: Name -->
      <template #cell(name_vi)="{ item: product }">
        <div class="flex items-center gap-4">
          <div class="h-12 w-12 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-700">
            <img v-if="product.images && product.images.length > 0" :src="product.images[0]" :alt="product.name_vi" class="h-full w-full object-cover" />
            <div v-else class="h-full w-full flex items-center justify-center text-gray-400">
               <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
            </div>
          </div>
          <div>
            <p class="font-bold text-gray-900 dark:text-white">{{ product.name_vi }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{{ product.slug }}</p>
          </div>
        </div>
      </template>

      <!-- Custom Cell: Price -->
      <template #cell(price)="{ value }">
        <p class="font-semibold text-red-500 dark:text-red-400">{{ formatCurrency(value) }}</p>
      </template>

      <!-- Custom Cell: Status -->
      <template #cell(isActive)="{ value: isActive }">
        <span
          :class="[
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            isActive 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
          ]"
        >
          <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="isActive ? 'bg-green-600' : 'bg-yellow-600'"></span>
          {{ isActive ? $t('COMMON.ACTIVE') : $t('COMMON.INACTIVE') }}
        </span>
      </template>

      <!-- Custom Cell: Actions -->
      <template #cell(actions)="{ item: product }">
        <div class="flex items-center justify-end gap-2">
          <button 
            @click="$emit('edit', product)"
            class="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" 
            :title="$t('COMMON.EDIT')"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button 
            @click="confirmDelete(product)"
            class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" 
            :title="$t('COMMON.DELETE')"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </template>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProductStore } from '@/store/product.store'
import type { IProduct } from '@/types/product'
import { useToast } from '@/composables/useToast'
import { formatCurrency } from '@/utils/common'
import BaseTable, { type ITableColumn } from '@/components/common/BaseTable.vue'

const { t } = useI18n()

const columns: ITableColumn[] = [
  { key: 'name_vi', label: t('PRODUCT_ADMIN.TABLE.NAME') },
  { key: 'price', label: t('PRODUCT_ADMIN.TABLE.PRICE') },
  { key: 'isActive', label: t('PRODUCT_ADMIN.TABLE.STATUS') },
  { key: 'actions', label: t('PRODUCT_ADMIN.TABLE.ACTIONS'), align: 'right' }
]

defineEmits<{
  (e: 'add'): void
  (e: 'edit', product: IProduct): void
}>()

const productStore = useProductStore()
const { toastSuccess, toastError } = useToast()

const searchQuery = ref('')
const filterStatus = ref('all')

onMounted(() => {
  fetchProducts()
})

const fetchProducts = () => {
  const isActive = filterStatus.value === 'all' ? undefined : filterStatus.value === 'active'
  productStore.fetchProducts({
    search: searchQuery.value,
    isActive: isActive
  })
}

// Watch for search and filter changes
watch([searchQuery, filterStatus], () => {
  fetchProducts()
})

const confirmDelete = async (product: IProduct) => {
  if (confirm(`Bạn có chắc muốn xóa sản phẩm "${product.name_vi}"?`)) {
    try {
      await productStore.deleteProduct(product.id)
      toastSuccess('Đã xóa sản phẩm thành công')
    } catch {
      toastError(productStore.error || 'Lỗi khi xóa sản phẩm')
    }
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 3px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #334155;
}
</style>
