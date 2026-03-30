<!-- src/components/highlights/HighlightTable.vue -->
<template>
  <div class="space-y-4">
    <!-- Filters & Search -->
    <div class="flex flex-col md:flex-row justify-end items-start md:items-center gap-4 mb-6">
      <div class="flex items-center gap-3 w-full md:w-auto">
        <button
          @click="$emit('add')"
          class="flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all shadow-lg active:scale-95"
        >
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Thêm mới
        </button>
      </div>
    </div>

    <!-- Table -->
    <BaseTable
      :columns="columns"
      :items="highlightStore.highlights"
      :loading="highlightStore.loading"
    >
      <!-- Custom Cell: Title -->
      <template #cell(title_vi)="{ value }">
        <span class="font-bold text-gray-800 dark:text-white truncate max-w-xs block">{{ value }}</span>
      </template>

      <!-- Custom Cell: Content -->
      <template #cell(content_vi)="{ value }">
        <span class="text-gray-600 dark:text-gray-400 line-clamp-1 italic">{{ value }}</span>
      </template>

      <!-- Custom Cell: Order Index -->
      <template #cell(orderIndex)="{ value }">
        <span class="text-sm font-medium text-gray-600 dark:text-gray-400">#{{ value }}</span>
      </template>

      <!-- Custom Cell: Actions -->
      <template #cell(actions)="{ item: highlight }">
        <div class="flex items-center justify-end gap-2">
          <button 
            @click="$emit('edit', highlight)"
            class="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors shadow-sm" 
            title="Sửa"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button 
            @click="confirmDelete(highlight)"
            class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors shadow-sm" 
            title="Xóa"
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
          v-if="highlightStore.pagination.totalPages > 1 || highlightStore.pagination.total > 10"
          :current-page="highlightStore.pagination.page"
          :total-pages="highlightStore.pagination.totalPages"
          :total-items="highlightStore.pagination.total"
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
import { useHighlightStore } from '@/store/highlight'
import type { IHighlight } from '@/types/highlight'
import { useToast } from '@/composables/useToast'
import BaseTable, { type ITableColumn } from '@/components/common/BaseTable.vue'
import Pagination from '@/components/common/Pagination.vue'

defineEmits<{
  (e: 'add'): void
  (e: 'edit', highlight: IHighlight): void
}>()

const highlightStore = useHighlightStore()
const { toastSuccess, toastError } = useToast()

const columns: ITableColumn[] = [
  { key: 'orderIndex', label: 'STT', align: 'center', class: 'w-20' },
  { key: 'title_vi', label: 'Tiêu đề (VI)' },
  { key: 'content_vi', label: 'Mô tả (VI)' },
  { key: 'actions', label: 'Thao tác', align: 'right' }
]

const limit = ref(10)

const fetchHighlights = (page = 1) => {
  highlightStore.fetchAdminHighlights({
    page,
    limit: limit.value,
    sortBy: 'orderIndex',
    sortOrder: 'ASC'
  })
}

const changePage = (page: number) => {
  fetchHighlights(page)
}

const changeLimit = (newLimit: number) => {
  limit.value = newLimit
  fetchHighlights(1)
}

onMounted(() => {
  fetchHighlights()
})

const confirmDelete = async (highlight: IHighlight) => {
  if (confirm(`Bạn có chắc chắn muốn xóa mục này không?`)) {
    try {
      const success = await highlightStore.deleteHighlight(highlight.id)
      if (success) {
        toastSuccess('Xóa thành công')
        fetchHighlights(highlightStore.pagination.page)
      } else {
        toastError('Xóa thất bại')
      }
    } catch {
      toastError('Lỗi hệ thống')
    }
  }
}
</script>
