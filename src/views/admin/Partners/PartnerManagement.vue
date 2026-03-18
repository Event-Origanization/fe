<!-- src/views/admin/Partners/PartnerManagement.vue -->
<template>
  <div class="space-y-6">
    <page-breadcrumb :pageTitle="currentPageTitle" />
    
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
        {{ currentPageTitle }}
      </h1>
    </div>

    <component-card :title="$t('PARTNERS_ADMIN.SUBTITLE')">
      <partner-table @add="openCreateModal" @edit="handleEdit" />
    </component-card>

    <PartnerModal
      :show="showModal"
      :partner="selectedPartner"
      @close="showModal = false"
      @submit="handlePartnerSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PartnerTable from '@/components/partners/PartnerTable.vue'
import PartnerModal from '@/components/partners/PartnerModal.vue'
import type { IPartner } from '@/types/partner'

const { t } = useI18n()
const currentPageTitle = computed(() => t('PARTNERS_ADMIN.TITLE'))
const showModal = ref(false)
const selectedPartner = ref<IPartner | null>(null)

const openCreateModal = () => {
  selectedPartner.value = null
  showModal.value = true
}

const handleEdit = (partner: IPartner) => {
  selectedPartner.value = { ...partner }
  showModal.value = true
}

const handlePartnerSubmit = (data: IPartner) => {
  console.log('Partner submitted successfully:', data)
}
</script>
