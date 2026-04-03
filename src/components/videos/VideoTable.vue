<!-- src/components/videos/VideoTable.vue -->
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
          @keyup.enter="fetchVideos(1)"
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
      :items="videoStore.videos"
      :loading="videoStore.loading"
    >
      <!-- Custom Cell: Video -->
      <template #cell(title_vi)="{ item: video }">
        <div class="flex items-center gap-4">
          <div class="h-12 w-20 rounded-lg bg-gray-900 border border-gray-700 flex-shrink-0 relative overflow-hidden flex items-center justify-center group cursor-pointer" @click="$emit('edit', video)">
            <template v-if="video.thumbnail">
              <img :src="video.thumbnail" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </template>
            <template v-else>
              <span class="text-xs text-white uppercase font-bold tracking-tighter opacity-50">Highlight</span>
            </template>
            <div class="absolute inset-0 flex items-center justify-center text-red-500 bg-black/20 group-hover:bg-black/40 transition-colors">
              <svg class="h-6 w-6 transform group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <div class="flex-grow min-w-0">
            <p class="font-bold text-gray-900 dark:text-white truncate" :title="video.title_vi">{{ video.title_vi }}</p>
            <a :href="video.url" target="_blank" class="text-sm text-blue-500 hover:underline truncate block" :title="video.url">{{ video.url }}</a>
          </div>
        </div>
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
      <template #cell(actions)="{ item: video }">
        <div class="flex items-center justify-end gap-2">
          <button 
            @click="$emit('edit', video)"
            class="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" 
            :title="$t('COMMON.EDIT')"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button 
            @click="confirmDelete(video)"
            class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" 
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
          v-if="videoStore.totalPages > 1 || videoStore.total > 10"
          :current-page="videoStore.currentPage"
          :total-pages="videoStore.totalPages"
          :total-items="videoStore.total"
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
import { useVideoStore } from '@/store/highlight-video.store'
import type { IHighlightVideo } from '@/types/highlight-video'
import { useToast } from '@/composables/useToast'
import BaseTable, { type ITableColumn } from '@/components/common/BaseTable.vue'
import Pagination from '@/components/common/Pagination.vue'

defineEmits<{
  (e: 'add'): void
  (e: 'edit', video: IHighlightVideo): void
}>()

const { t } = useI18n()
const videoStore = useVideoStore()
const { toastSuccess, toastError } = useToast()

const columns: ITableColumn[] = [
  { key: 'title_vi', label: t('VIDEOS_ADMIN.TABLE.VIDEO') },
  { key: 'orderIndex', label: t('VIDEOS_ADMIN.TABLE.ORDER') },
  { key: 'isActive', label: t('COMMON.STATUS') },
  { key: 'actions', label: t('COMMON.ACTIONS'), align: 'right' }
]

const searchQuery = ref('')
const filterStatus = ref('all')
const limit = ref(10)

const fetchVideos = (page = 1) => {
  const isActive = filterStatus.value === 'all' ? undefined : filterStatus.value === 'active'
  videoStore.fetchVideos({
    page,
    limit: limit.value,
    search: searchQuery.value,
    isActive: isActive
  })
}

const changePage = (page: number) => {
  fetchVideos(page)
}

const changeLimit = (newLimit: number) => {
  limit.value = newLimit
  fetchVideos(1)
}

onMounted(() => {
  fetchVideos()
})

// Watch for search and filter changes
watch([filterStatus], () => {
  fetchVideos(1)
})

const confirmDelete = async (video: IHighlightVideo) => {
  if (confirm(`${t('COMMON.CONFIRM')}?`)) {
    try {
      await videoStore.deleteVideo(video.id)
      toastSuccess(t('COMMON.SUCCESS'))
    } catch {
      toastError(videoStore.error || t('COMMON.ERROR'))
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
