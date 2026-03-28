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
              @keyup.enter="fetchContactMessages(1)"
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
            <Pagination
              v-if="contactMessageStore.totalPages > 1 || contactMessageStore.total > 10"
              :current-page="contactMessageStore.currentPage"
              :total-pages="contactMessageStore.totalPages"
              :total-items="contactMessageStore.total"
              :limit="limit"
              @page-change="changePage"
              @limit-change="changeLimit"
            />
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
import Pagination from '@/components/common/Pagination.vue'

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
const limit = ref(10)

const fetchContactMessages = (page = 1) => {
  const isRead = filterStatus.value === 'all' ? undefined : filterStatus.value === 'read'
  contactMessageStore.fetchContactMessages({
    page,
    limit: limit.value,
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
  fetchContactMessages(page)
}

const changeLimit = (newLimit: number) => {
  limit.value = newLimit
  fetchContactMessages(1)
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
