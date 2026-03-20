<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] shadow-sm">
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
            <th 
              v-for="col in columns" 
              :key="col.key"
              :class="[
                'px-5 py-4 font-semibold text-gray-600 dark:text-gray-300',
                col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
                col.class
              ]"
            >
              <slot :name="`header(${col.key})`" :column="col">
                {{ col.label }}
              </slot>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
          <!-- Loading State (Spinner) -->
          <tr v-if="loading">
            <td :colspan="columns.length" class="px-5 py-20 text-center">
              <div class="flex flex-col items-center justify-center space-y-3">
                <svg class="animate-spin h-8 w-8 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ $t('COMMON.LOADING') || 'Loading...' }}</span>
              </div>
            </td>
          </tr>

          <!-- Data State -->
          <template v-else-if="items.length > 0">
            <tr
              v-for="(item, index) in items"
              :key="item.id || index"
              class="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
            >
              <td 
                v-for="col in columns" 
                :key="col.key"
                :class="[
                  'px-5 py-4',
                  col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
                  col.cellClass
                ]"
              >
                <slot :name="`cell(${col.key})`" :item="item" :value="item[col.key]">
                  <span class="text-gray-900 dark:text-white">{{ item[col.key] }}</span>
                </slot>
              </td>
            </tr>
          </template>

          <!-- Empty State -->
          <tr v-else>
            <td :colspan="columns.length" class="px-5 py-10 text-center text-gray-500 dark:text-gray-400">
              <div class="flex flex-col items-center">
                <svg class="h-10 w-10 mx-auto mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 00-2 2H6a2 2 0 00-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p>{{ emptyText || $t('COMMON.EMPTY_DATA') || 'Không có dữ liệu hiển thị' }}</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
export interface ITableColumn {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
  class?: string
  cellClass?: string
}

defineProps<{
  columns: ITableColumn[]
  items: T[]
  loading?: boolean
  emptyText?: string
}>()
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
