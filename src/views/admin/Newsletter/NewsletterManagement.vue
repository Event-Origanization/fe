<!-- src/views/admin/Newsletter/NewsletterManagement.vue -->
<template>
  <div class="space-y-6">
    <page-breadcrumb :pageTitle="currentPageTitle" />
    
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
        {{ currentPageTitle }}
      </h1>
    </div>

    <component-card :title="$t('NEWSLETTER_ADMIN.TITLE')">
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
              class="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
              @keyup.enter="fetchSubscribers"
            />
          </div>
          
          <div class="flex items-center gap-3 w-full md:w-auto">
            <select
              v-model="filterStatus"
              class="block w-full md:w-40 px-3 py-2 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
            >
              <option value="all">{{ $t('COMMON.ALL') }}</option>
              <option value="active">{{ $t('COMMON.ACTIVE') }}</option>
              <option value="inactive">{{ $t('COMMON.INACTIVE') }}</option>
            </select>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] shadow-sm">
          <div class="max-w-full overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                  <th class="px-5 py-4 text-left font-semibold text-gray-600 dark:text-gray-300">{{ $t('NEWSLETTER_ADMIN.TABLE.EMAIL') }}</th>
                  <th class="px-5 py-4 text-left font-semibold text-gray-600 dark:text-gray-300">{{ $t('NEWSLETTER_ADMIN.TABLE.DATE') }}</th>
                  <th class="px-5 py-4 text-left font-semibold text-gray-600 dark:text-gray-300">{{ $t('COMMON.STATUS') }}</th>
                  <th class="px-5 py-4 text-right font-semibold text-gray-600 dark:text-gray-300">{{ $t('COMMON.ACTIONS') }}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                <tr
                  v-for="sub in newsletterStore.subscribers"
                  :key="sub.id"
                  class="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                >
                  <td class="px-5 py-4">
                    <span class="font-medium text-gray-900 dark:text-white">{{ sub.email }}</span>
                  </td>
                  <td class="px-5 py-4">
                    <span class="text-sm text-gray-500">{{ formatDate(sub.createdAt) }}</span>
                  </td>
                  <td class="px-5 py-4">
                    <button 
                      @click="toggleStatus(sub)"
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors',
                        sub.isActive 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      ]"
                    >
                      <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="sub.isActive ? 'bg-green-600' : 'bg-red-600'"></span>
                      {{ sub.isActive ? $t('COMMON.ACTIVE') : $t('COMMON.INACTIVE') }}
                    </button>
                  </td>
                  <td class="px-5 py-4 text-right">
                    <button 
                      @click="confirmDelete(sub)"
                      class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" 
                      :title="$t('COMMON.DELETE')"
                    >
                      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr v-if="newsletterStore.subscribers.length === 0">
                  <td colspan="4" class="px-5 py-10 text-center text-gray-500">
                    {{ $t('NEWSLETTER_ADMIN.EMPTY') }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Pagination can be added here if needed -->
        </div>
      </div>
    </component-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import { useNewsletterStore } from '@/store/newsletter'
import { useToast } from '@/composables/useToast'
import type { INewsletterSubscriber } from '@/types/newsletter-subscriber'

const { t } = useI18n()
const currentPageTitle = computed(() => t('NEWSLETTER_ADMIN.TITLE'))
const newsletterStore = useNewsletterStore()
const { toastSuccess, toastError } = useToast()

const searchQuery = ref('')
const filterStatus = ref('all')

const fetchSubscribers = () => {
  const isActive = filterStatus.value === 'all' ? undefined : filterStatus.value === 'active'
  newsletterStore.fetchSubscribers({
    search: searchQuery.value,
    isActive: isActive
  })
}

onMounted(() => {
  fetchSubscribers()
})

watch([filterStatus], () => {
  fetchSubscribers()
})

const toggleStatus = async (sub: INewsletterSubscriber) => {
  try {
    await newsletterStore.updateSubscriber(sub.id, { isActive: !sub.isActive })
    toastSuccess(t('COMMON.SUCCESS'))
  } catch {
    toastError(newsletterStore.error || t('COMMON.ERROR'))
  }
}

const confirmDelete = async (sub: INewsletterSubscriber) => {
  if (confirm(`${t('COMMON.CONFIRM')}?`)) {
    try {
      await newsletterStore.deleteSubscriber(sub.id)
      toastSuccess(t('COMMON.SUCCESS'))
    } catch {
      toastError(newsletterStore.error || t('COMMON.ERROR'))
    }
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
