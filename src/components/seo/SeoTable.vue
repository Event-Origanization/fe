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
          placeholder="Tìm kiếm trang..."
          class="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 transition-all shadow-sm"
        />
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] shadow-sm">
      <div class="max-w-full overflow-x-auto custom-scrollbar">
        <table class="min-w-full">
          <thead>
            <tr class="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <th class="px-5 py-4 text-left font-semibold text-gray-600 dark:text-gray-300">Trang (Key)</th>
              <th class="px-5 py-4 text-left font-semibold text-gray-600 dark:text-gray-300">Đường dẫn</th>
              <th class="px-5 py-4 text-left font-semibold text-gray-600 dark:text-gray-300">Tiêu đề (VI)</th>
              <th class="px-5 py-4 text-right font-semibold text-gray-600 dark:text-gray-300">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
            <tr
              v-for="meta in filteredMetas"
              :key="meta.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
            >
              <td class="px-5 py-4">
                <p class="font-bold text-gray-900 dark:text-white">{{ meta.pageKey }}</p>
              </td>
              <td class="px-5 py-4">
                <span class="text-sm font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{{ meta.path }}</span>
              </td>
              <td class="px-5 py-4">
                <p class="text-sm text-gray-700 dark:text-gray-300 line-clamp-1">{{ meta.title_vi }}</p>
              </td>
              <td class="px-5 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button 
                    @click="$emit('edit', meta)"
                    class="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" 
                    title="Chỉnh sửa"
                  >
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredMetas.length === 0">
              <td colspan="4" class="px-5 py-10 text-center text-gray-500 dark:text-gray-400">
                <svg class="h-10 w-10 mx-auto mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Không tìm thấy thông tin SEO nào
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ISeoMeta } from '@/types/seo'

const props = defineProps<{
  metas: ISeoMeta[]
}>()

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
