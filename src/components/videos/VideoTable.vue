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
          placeholder="Tìm kiếm video..."
          class="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all shadow-sm"
        />
      </div>
      
      <div class="flex items-center gap-3 w-full md:w-auto">
        <select
          v-model="filterStatus"
          class="block w-full md:w-40 px-3 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all shadow-sm"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="active">Đang hoạt động</option>
          <option value="inactive">Đã ẩn</option>
        </select>
        
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
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] shadow-sm">
      <div class="max-w-full overflow-x-auto custom-scrollbar">
        <table class="min-w-full">
          <thead>
            <tr class="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <th class="px-5 py-4 text-left font-semibold text-gray-600 dark:text-gray-300">Video</th>
              <th class="px-5 py-4 text-left font-semibold text-gray-600 dark:text-gray-300">Thứ tự</th>
              <th class="px-5 py-4 text-left font-semibold text-gray-600 dark:text-gray-300">Trạng thái</th>
              <th class="px-5 py-4 text-right font-semibold text-gray-600 dark:text-gray-300">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
            <tr
              v-for="video in videoStore.videos"
              :key="video.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
            >
              <td class="px-5 py-4">
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
              </td>
              <td class="px-5 py-4">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">#{{ video.orderIndex }}</span>
              </td>
              <td class="px-5 py-4">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    video.isActive 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  ]"
                >
                  <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="video.isActive ? 'bg-green-600' : 'bg-yellow-600'"></span>
                  {{ video.isActive ? 'Hoạt động' : 'Đã ẩn' }}
                </span>
              </td>
              <td class="px-5 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button 
                    @click="$emit('edit', video)"
                    class="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" 
                    title="Chỉnh sửa"
                  >
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    @click="confirmDelete(video)"
                    class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" 
                    title="Xóa"
                  >
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="videoStore.videos.length === 0">
              <td colspan="4" class="px-5 py-10 text-center text-gray-500 dark:text-gray-400">
                <svg class="h-10 w-10 mx-auto mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 00-2 2H6a2 2 0 00-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                Không tìm thấy video nào
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useVideoStore } from '@/store/highlight-video.store'
import type { IHighlightVideo } from '@/types/highlight-video'
import { useToast } from '@/composables/useToast'

defineEmits<{
  (e: 'add'): void
  (e: 'edit', video: IHighlightVideo): void
}>()

const videoStore = useVideoStore()
const { toastSuccess, toastError } = useToast()

const searchQuery = ref('')
const filterStatus = ref('all')

onMounted(() => {
  fetchVideos()
})

const fetchVideos = () => {
  const isActive = filterStatus.value === 'all' ? undefined : filterStatus.value === 'active'
  videoStore.fetchVideos({
    search: searchQuery.value,
    isActive: isActive
  })
}

// Watch for search and filter changes
watch([searchQuery, filterStatus], () => {
  fetchVideos()
})

const confirmDelete = async (video: IHighlightVideo) => {
  if (confirm(`Bạn có chắc muốn xóa video "${video.title_vi}"?`)) {
    try {
      await videoStore.deleteVideo(video.id)
      toastSuccess('Đã xóa video thành công')
    } catch {
      toastError(videoStore.error || 'Lỗi khi xóa video')
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
