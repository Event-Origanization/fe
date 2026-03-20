<template>
  <div class="space-y-6">
    <page-breadcrumb :pageTitle="currentPageTitle" />
    
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
        {{ currentPageTitle }}
      </h1>
    </div>

    <component-card :title="$t('CONTACT_MESSAGE_ADMIN.TITLE')">
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
              @keyup.enter="fetchContactMessages"
            />
          </div>
          
          <div class="flex items-center gap-3 w-full md:w-auto">
            <select
              v-model="filterStatus"
              class="block w-full md:w-40 px-3 py-2 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
            >
              <option value="all">{{ $t('COMMON.ALL') }}</option>
              <option value="read">{{ $t('CONTACT_MESSAGE_ADMIN.STATUS.READ') }}</option>
              <option value="unread">{{ $t('CONTACT_MESSAGE_ADMIN.STATUS.UNREAD') }}</option>
            </select>
          </div>
        </div>

        <!-- Table -->
        <BaseTable
          :columns="columns"
          :items="contactMessageStore.contactMessages"
          :loading="contactMessageStore.loading"
          :empty-text="$t('CONTACT_MESSAGE_ADMIN.EMPTY')"
        >
          <!-- Custom Cell: Sender -->
          <template #cell(name)="{ value }">
            <span class="font-medium text-gray-900 dark:text-white">{{ value }}</span>
          </template>

          <!-- Custom Cell: Contact Info -->
          <template #cell(contactInfo)="{ item: msg }">
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ msg.email }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ msg.phone }}</p>
          </template>

          <!-- Custom Cell: Message -->
          <template #cell(message)="{ value }">
            <p class="text-sm text-gray-600 dark:text-gray-300 truncate max-w-xs" :title="value">{{ value }}</p>
          </template>

          <!-- Custom Cell: Date -->
          <template #cell(createdAt)="{ value }">
            <span class="text-sm text-gray-500">{{ formatDate(value) }}</span>
          </template>

          <!-- Custom Cell: Status -->
          <template #cell(isRead)="{ item: msg }">
            <button 
              @click="toggleReadStatus(msg)"
              :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors',
                msg.isRead 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
              ]"
            >
              <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="msg.isRead ? 'bg-green-600' : 'bg-yellow-600'"></span>
              {{ msg.isRead ? $t('CONTACT_MESSAGE_ADMIN.STATUS.READ') : $t('CONTACT_MESSAGE_ADMIN.STATUS.UNREAD') }}
            </button>
          </template>

          <!-- Custom Cell: Actions -->
          <template #cell(actions)="{ item: msg }">
            <div class="flex items-center justify-end gap-2">
              <button 
                @click="confirmDelete(msg)"
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
            <div v-if="contactMessageStore.totalPages > 1" class="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/30 px-4 py-3 sm:px-6">
              <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-700 dark:text-gray-300">
                    Tổng cộng <span class="font-medium">{{ contactMessageStore.total }}</span> tin nhắn
                  </p>
                </div>
                <div>
                  <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <button
                      @click="changePage(contactMessageStore.currentPage - 1)"
                      :disabled="contactMessageStore.currentPage === 1"
                      class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                    >
                      <span class="sr-only">Previous</span>
                      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <button
                      v-for="page in contactMessageStore.totalPages"
                      :key="page"
                      @click="changePage(page)"
                      :class="[
                        page === contactMessageStore.currentPage
                          ? 'relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                          : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0'
                      ]"
                    >
                      {{ page }}
                    </button>
                    <button
                      @click="changePage(contactMessageStore.currentPage + 1)"
                      :disabled="contactMessageStore.currentPage === contactMessageStore.totalPages"
                      class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                    >
                      <span class="sr-only">Next</span>
                      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </template>
        </BaseTable>
      </div>
    </component-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import { useContactMessageStore } from '@/store/contactMessage.store'
import { useToast } from '@/composables/useToast'
import type { IContactMessage } from '@/types/contactMessage'
import BaseTable, { type ITableColumn } from '@/components/common/BaseTable.vue'

const { t } = useI18n()
const currentPageTitle = computed(() => t('CONTACT_MESSAGE_ADMIN.TITLE'))
const contactMessageStore = useContactMessageStore()
const { toastSuccess, toastError } = useToast()

const columns: ITableColumn[] = [
  { key: 'name', label: t('CONTACT_MESSAGE_ADMIN.TABLE.SENDER') },
  { key: 'contactInfo', label: t('CONTACT_MESSAGE_ADMIN.TABLE.CONTACT') },
  { key: 'message', label: t('CONTACT_MESSAGE_ADMIN.TABLE.MESSAGE') },
  { key: 'createdAt', label: t('CONTACT_MESSAGE_ADMIN.TABLE.DATE') },
  { key: 'isRead', label: t('COMMON.STATUS') },
  { key: 'actions', label: t('COMMON.ACTIONS'), align: 'right' }
]

const searchQuery = ref('')
const filterStatus = ref('all')

const fetchContactMessages = () => {
  const isRead = filterStatus.value === 'all' ? undefined : filterStatus.value === 'read'
  contactMessageStore.fetchContactMessages({
    search: searchQuery.value,
    isRead: isRead
  })
}

onMounted(() => {
  fetchContactMessages()
})

watch([filterStatus], () => {
  fetchContactMessages()
})

const changePage = (page: number) => {
  const isRead = filterStatus.value === 'all' ? undefined : filterStatus.value === 'read'
  contactMessageStore.fetchContactMessages({
    page,
    search: searchQuery.value,
    isRead: isRead
  })
}

const toggleReadStatus = async (msg: IContactMessage) => {
  try {
    await contactMessageStore.markAsRead(msg.id, !msg.isRead)
    toastSuccess(t('COMMON.SUCCESS'))
  } catch {
    toastError(contactMessageStore.error || t('COMMON.ERROR'))
  }
}

const confirmDelete = async (msg: IContactMessage) => {
  if (confirm(`${t('COMMON.CONFIRM')}?`)) {
    try {
      await contactMessageStore.deleteContactMessage(msg.id)
      toastSuccess(t('COMMON.SUCCESS'))
    } catch {
      toastError(contactMessageStore.error || t('COMMON.ERROR'))
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
