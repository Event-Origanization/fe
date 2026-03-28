<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div :class="['flex flex-col gap-6 px-4 py-8 sm:px-6', centered ? 'items-center' : '']">
    <!-- Main Pagination Area -->
    <div class="flex items-center gap-2">
      <!-- Previous button -->
      <button
        @click="$emit('page-change', currentPage - 1)"
        :disabled="currentPage <= 1"
        class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:border-brand-600 hover:text-brand-600 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group"
        title="Trang trước"
      >
        <i class="pi pi-chevron-left text-xs group-hover:-translate-x-0.5 transition-transform"></i>
      </button>

      <!-- Page numbers -->
      <div class="flex items-center gap-1 sm:gap-2">
        <template v-for="(page, index) in visiblePages" :key="index">
          <button
            v-if="page !== '...'"
            @click="$emit('page-change', Number(page))"
            :class="[
              'w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300',
              page === currentPage
                ? 'bg-brand-600 text-white shadow-[0_8px_20px_rgba(220,38,38,0.25)] scale-110 z-10'
                : 'bg-white border border-gray-100 text-gray-500 hover:border-brand-300 hover:text-brand-600'
            ]"
          >
            {{ page }}
          </button>
          <span
            v-else
            class="w-10 h-10 flex items-center justify-center text-gray-400 font-bold"
          >
            ...
          </span>
        </template>
      </div>

      <!-- Next button -->
      <button
        @click="$emit('page-change', currentPage + 1)"
        :disabled="currentPage >= totalPages"
        class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:border-brand-600 hover:text-brand-600 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group"
        title="Trang sau"
      >
        <i class="pi pi-chevron-right text-xs group-hover:translate-x-0.5 transition-transform"></i>
      </button>
    </div>

    <!-- Extra Info & Limit (Optional) -->
    <div v-if="!hideInfo || !hideLimit" class="flex flex-col sm:flex-row items-center gap-4 w-full justify-between border-t border-gray-100 pt-6">
      <div v-if="!hideInfo">
        <p class="text-sm text-gray-500 font-medium italic">
          Hiển thị <span class="text-gray-900 font-bold">{{ startItem }}-{{ endItem }}</span> trong tổng số <span class="text-gray-900 font-bold">{{ totalItems }}</span> bài viết
        </p>
      </div>

      <div v-if="!hideLimit" class="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
        <label class="text-xs font-bold text-gray-500 uppercase tracking-wider">Số lượng hiển thị:</label>
        <select
          v-model="selectedLimit"
          @change="onLimitChange"
          class="bg-transparent border-none outline-none text-sm font-bold text-brand-600 cursor-pointer"
        >
          <option v-for="limit in LIMIT_OPTIONS" :key="limit" :value="limit">{{ limit }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LIMIT_OPTIONS } from '@/constants'
import { computed, ref, watch } from 'vue'

interface Props {
  currentPage: number
  totalPages: number
  totalItems: number
  limit: number
  hideInfo?: boolean
  hideLimit?: boolean
  centered?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  limit: 10,
  hideInfo: false,
  hideLimit: false,
  centered: true
})

const emit = defineEmits<{
  'page-change': [page: number]
  'limit-change': [limit: number]
}>()

const selectedLimit = ref(props.limit)

const startItem = computed(() => {
  if (props.totalItems === 0) return 0
  return (props.currentPage - 1) * props.limit + 1
})

const endItem = computed(() => {
  if (props.totalItems === 0) return 0
  return Math.min(props.currentPage * props.limit, props.totalItems)
})

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const total = props.totalPages
  const current = props.currentPage

  // Logic for small screens (mobile)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640
  const maxVisible = isMobile ? 3 : 5

  if (total <= maxVisible + 2) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Elegant sliding window logic
    pages.push(1)

    if (current > (maxVisible === 3 ? 2 : 3)) {
      pages.push('...')
    }

    let start = Math.max(2, current - (maxVisible === 3 ? 0 : 1))
    let end = Math.min(total - 1, current + (maxVisible === 3 ? 0 : 1))

    // Handle edge cases near start/end
    if (current <= (maxVisible === 3 ? 2 : 3)) {
      end = maxVisible
    } else if (current >= total - (maxVisible === 3 ? 1 : 2)) {
      start = total - (maxVisible - 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (current < total - (maxVisible === 3 ? 1 : 2)) {
      pages.push('...')
    }

    if (total > 1) {
      pages.push(total)
    }
  }

  return pages
})

const onLimitChange = () => {
  emit('limit-change', selectedLimit.value)
}

watch(() => props.limit, (newLimit) => {
  selectedLimit.value = newLimit
})
</script>
