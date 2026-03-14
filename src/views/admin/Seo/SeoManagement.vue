<!-- src/views/admin/Seo/SeoManagement.vue -->
<template>
  <div class="space-y-6">
    <page-breadcrumb :pageTitle="currentPageTitle" />
    
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
        {{ currentPageTitle }}
      </h1>
    </div>

    <component-card title="Cấu hình SEO Meta cho các trang của 5P Event">
      <seo-table :metas="seoStore.seoMetas" @edit="openEditModal" />
    </component-card>

    <SeoModal
      :show="showModal"
      :meta="selectedMeta"
      :loading="seoStore.isLoading"
      @close="showModal = false"
      @submit="handleSeoSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import SeoTable from '@/components/seo/SeoTable.vue'
import SeoModal from '@/components/seo/SeoModal.vue'
import { useSeoStore } from '@/store/seo'
import type { ISeoMeta, SeoMetaUpdatePayload } from '@/types/seo'
import { useToast } from '@/composables/useToast'

const currentPageTitle = ref('Quản Lý SEO Meta')
const seoStore = useSeoStore()
const { toastSuccess, toastError } = useToast()

const showModal = ref(false)
const selectedMeta = ref<ISeoMeta | null>(null)

onMounted(async () => {
  if (seoStore.seoMetas.length === 0) {
    await seoStore.fetchAllSeoMeta()
  }
})

const openEditModal = (meta: ISeoMeta) => {
  selectedMeta.value = meta
  showModal.value = true
}

const handleSeoSubmit = async (data: SeoMetaUpdatePayload) => {
  if (!selectedMeta.value) return

  try {
    await seoStore.updateSeoMeta(selectedMeta.value.pageKey, data)
    toastSuccess('Cập nhật SEO Meta thành công')
    showModal.value = false
  } catch {
    toastError(seoStore.error || 'Không thể cập nhật SEO Meta')
  }
}
</script>
