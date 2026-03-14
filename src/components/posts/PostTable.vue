<!-- src/components/posts/PostTable.vue -->
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
          placeholder="Tìm kiếm bài viết..."
          class="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all shadow-sm"
        />
      </div>
      
      <div class="flex items-center gap-3 w-full md:w-auto">
        <select
          v-model="filterStatus"
          class="block w-full md:w-40 px-3 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all shadow-sm"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="PUBLISHED">Đã xuất bản</option>
          <option value="DRAFT">Bản nháp</option>
          <option value="SCHEDULED">Lên lịch</option>
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
              <th class="px-5 py-4 text-left font-semibold text-gray-600 dark:text-gray-300">Bài viết</th>
              <th class="px-5 py-4 text-left font-semibold text-gray-600 dark:text-gray-300">Trạng thái</th>
              <th class="px-5 py-4 text-left font-semibold text-gray-600 dark:text-gray-300">Điểm SEO</th>
              <th class="px-5 py-4 text-right font-semibold text-gray-600 dark:text-gray-300">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
            <tr
              v-for="post in filteredPosts"
              :key="post.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
            >
              <td class="px-5 py-4">
                <div class="flex items-center gap-4">
                  <div class="h-12 w-16 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-700">
                    <img v-if="post.media" :src="post.media" :alt="post.title_vi" class="h-full w-full object-cover" />
                    <div v-else class="h-full w-full flex items-center justify-center text-gray-400">
                       <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                       </svg>
                    </div>
                  </div>
                  <div>
                    <p class="font-bold text-gray-900 dark:text-white">{{ post.title_vi }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{{ post.slug }}</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-4">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    post.status === 'PUBLISHED'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : post.status === 'SCHEDULED' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  ]"
                >
                  <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="post.status === 'PUBLISHED' ? 'bg-green-600' : post.status === 'SCHEDULED' ? 'bg-blue-600' : 'bg-yellow-600'"></span>
                  {{ post.status === 'PUBLISHED' ? 'Đã xuất bản' : post.status === 'SCHEDULED' ? 'Lên lịch' : 'Bản nháp' }}
                </span>
              </td>
              <td class="px-5 py-4">
                <span v-if="typeof post.seoScore === 'number'" class="font-semibold" :class="post.seoScore > 80 ? 'text-green-500' : (post.seoScore > 50 ? 'text-yellow-500' : 'text-red-500')">
                  {{ post.seoScore }}/100
                </span>
                <span v-else class="text-gray-400 italic">Chưa tính</span>
              </td>
              <td class="px-5 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button 
                    @click="$emit('edit', post)"
                    class="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" 
                    title="Chỉnh sửa"
                  >
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    @click="confirmDelete(post)"
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
            <tr v-if="filteredPosts.length === 0">
              <td colspan="4" class="px-5 py-10 text-center text-gray-500 dark:text-gray-400">
                <svg class="h-10 w-10 mx-auto mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 00-2 2H6a2 2 0 00-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                Không tìm thấy bài viết nào
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { usePostStore } from '@/store/post.store'
import type { IPost } from '@/types/post'
import { useToast } from '@/composables/useToast'

defineEmits<{
  (e: 'add'): void
  (e: 'edit', post: IPost): void
}>()

const postStore = usePostStore()
const { toastSuccess, toastError } = useToast()

const searchQuery = ref('')
const filterStatus = ref('all')

const filteredPosts = computed(() => postStore.posts)

onMounted(() => {
  fetchPosts()
})

const fetchPosts = () => {
  const status = filterStatus.value === 'all' ? undefined : filterStatus.value
  postStore.fetchPosts({
    search: searchQuery.value,
    status: status
  })
}

// Watch for search and filter changes
watch([searchQuery, filterStatus], () => {
  fetchPosts()
})

const confirmDelete = async (post: IPost) => {
  if (confirm(`Bạn có chắc muốn xóa bài viết "${post.title_vi}"?`)) {
    try {
      await postStore.deletePost(post.id)
      toastSuccess('Đã xóa bài viết thành công')
    } catch {
      toastError(postStore.error || 'Lỗi khi xóa bài viết')
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
