<!-- src/components/partners/PartnerTable.vue -->
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
          :placeholder="$t('PARTNERS_ADMIN.PLACEHOLDERS.NAME')"
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
          {{ $t('PARTNERS_ADMIN.ADD_NEW') }}
        </button>
      </div>
    </div>

    <!-- Table -->
    <BaseTable
      :columns="columns"
      :items="partnerStore.partners"
      :loading="partnerStore.loading"
    >
      <!-- Custom Cell: Logo -->
      <template #cell(logo)="{ item: partner }">
        <div class="flex justify-center">
          <div class="h-12 w-28 rounded-lg border border-gray-200 dark:border-gray-700 flex-shrink-0 overflow-hidden flex items-center justify-center p-2 logo-checkerboard shadow-sm group-hover:shadow-md transition-shadow">
            <img v-if="partner.logo" :src="partner.logo" class="max-w-full max-h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300" />
            <span v-else class="text-[10px] text-gray-400 uppercase font-bold tracking-tighter opacity-50">Partner Logo</span>
          </div>
        </div>
      </template>

      <!-- Custom Cell: Name -->
      <template #cell(name)="{ value }">
        <span class="font-medium text-gray-900 dark:text-white">{{ value }}</span>
      </template>

      <!-- Custom Cell: Order Index -->
      <template #cell(orderIndex)="{ value }">
        <span class="text-sm font-medium text-gray-600 dark:text-gray-400">#{{ value }}</span>
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
      <template #cell(actions)="{ item: partner }">
        <div class="flex items-center justify-end gap-2">
          <button 
            @click="$emit('edit', partner)"
            class="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors shadow-sm" 
            :title="$t('COMMON.EDIT')"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button 
            @click="confirmDelete(partner)"
            class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors shadow-sm" 
            :title="$t('COMMON.DELETE')"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </template>

      <!-- Pagination Footer -->
      <template #footer>
        <Pagination
          v-if="partnerStore.totalPages > 1 || partnerStore.total > 10"
          :current-page="partnerStore.currentPage"
          :total-pages="partnerStore.totalPages"
          :total-items="partnerStore.total"
          :limit="limit"
          @page-change="changePage"
          @limit-change="changeLimit"
        />
      </template>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePartnerStore } from '@/store/partner.store'
import type { IPartner } from '@/types/partner'
import { useToast } from '@/composables/useToast'
import BaseTable, { type ITableColumn } from '@/components/common/BaseTable.vue'
import Pagination from '@/components/common/Pagination.vue'

defineEmits<{
  (e: 'add'): void
  (e: 'edit', partner: IPartner): void
}>()

const { t } = useI18n()
const partnerStore = usePartnerStore()
const { toastSuccess, toastError } = useToast()

const columns: ITableColumn[] = [
  { key: 'logo', label: t('PARTNERS_ADMIN.TABLE.LOGO'), align: 'center' },
  { key: 'name', label: t('PARTNERS_ADMIN.TABLE.NAME') },
  { key: 'orderIndex', label: t('PARTNERS_ADMIN.TABLE.ORDER'), align: 'center' },
  { key: 'isActive', label: t('PARTNERS_ADMIN.TABLE.STATUS'), align: 'center' },
  { key: 'actions', label: t('COMMON.ACTIONS'), align: 'right' }
]

const searchQuery = ref('')
const filterStatus = ref('all')
const limit = ref(10)

const fetchPartners = (page = 1) => {
  const isActive = filterStatus.value === 'all' ? undefined : filterStatus.value === 'active'
  partnerStore.fetchPartners({
    page,
    limit: limit.value,
    search: searchQuery.value,
    isActive: isActive,
    sortBy: 'orderIndex',
    sortOrder: 'ASC'
  })
}

const changePage = (page: number) => {
  fetchPartners(page)
}

const changeLimit = (newLimit: number) => {
  limit.value = newLimit
  fetchPartners(1)
}

onMounted(() => {
  fetchPartners()
})

// Watch for search and filter changes
watch([searchQuery, filterStatus], () => {
  fetchPartners(1)
})

const confirmDelete = async (partner: IPartner) => {
  if (confirm(`${t('COMMON.CONFIRM')}?`)) {
    try {
      await partnerStore.deletePartner(partner.id)
      toastSuccess(t('COMMON.SUCCESS'))
    } catch {
      toastError(partnerStore.error || t('COMMON.ERROR'))
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

.logo-checkerboard {
  background-image: conic-gradient(#f9fafb 90deg, #ffffff 0 180deg, #f9fafb 0 270deg, #ffffff 0);
  background-size: 12px 12px;
}

.dark .logo-checkerboard {
  background-image: conic-gradient(#1e293b 90deg, #0f172a 0 180deg, #1e293b 0 270deg, #0f172a 0);
}
</style>
