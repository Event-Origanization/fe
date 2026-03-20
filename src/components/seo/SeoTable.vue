<!-- src/components/seo/SeoTable.vue -->
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
    </div>

    <!-- Table -->
    <BaseTable
      :columns="columns"
      :items="filteredMetas"
      :loading="loading"
    >
      <!-- Custom Cell: Page -->
      <template #cell(pageKey)="{ value }">
        <p class="font-bold text-gray-900 dark:text-white">{{ value }}</p>
      </template>

      <!-- Custom Cell: Path -->
      <template #cell(path)="{ value }">
        <span class="text-sm font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{{ value }}</span>
      </template>

      <!-- Custom Cell: Title -->
      <template #cell(title_vi)="{ value }">
        <p class="text-sm text-gray-700 dark:text-gray-300 line-clamp-1">{{ value }}</p>
      </template>

      <!-- Custom Cell: Actions -->
      <template #cell(actions)="{ item: meta }">
        <div class="flex items-center justify-end gap-2">
          <button 
            @click="$emit('edit', meta)"
            class="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" 
            :title="$t('COMMON.EDIT')"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
      </template>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ISeoMeta } from '@/types/seo'
import BaseTable, { type ITableColumn } from '@/components/common/BaseTable.vue'

const { t } = useI18n()

const props = defineProps<{
  metas: ISeoMeta[]
  loading?: boolean
}>()

const columns: ITableColumn[] = [
  { key: 'pageKey', label: t('SEO_ADMIN.TABLE.PAGE') },
  { key: 'path', label: t('SEO_ADMIN.TABLE.PATH') },
  { key: 'title_vi', label: t('SEO_ADMIN.TABLE.TITLE') },
  { key: 'actions', label: t('COMMON.ACTIONS'), align: 'right' }
]

defineEmits<{
  (e: 'edit', meta: ISeoMeta): void
}>()

const searchQuery = ref('')

const filteredMetas = computed(() => {
  return props.metas.filter(meta => {
    return meta.pageKey.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
           meta.path.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
           meta.title_vi.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})
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
