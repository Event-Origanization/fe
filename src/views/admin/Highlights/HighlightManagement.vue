<!-- src/views/admin/Highlights/HighlightManagement.vue -->
<template>
  <div class="space-y-6">
    <page-breadcrumb pageTitle="Quản lý Nổi bật" />
    
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
        Quản lý Nổi bật (Highlights)
      </h1>
    </div>

    <component-card title="Danh sách các mục nổi bật trên trang chủ">
      <HighlightTable @add="openCreateModal" @edit="handleEdit" />
    </component-card>

    <HighlightModal
      :show="showModal"
      :highlight="selectedHighlight"
      @close="showModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import HighlightTable from '@/components/highlights/HighlightTable.vue'
import HighlightModal from '@/components/highlights/HighlightModal.vue'
import type { IHighlight } from '@/types/highlight'

const showModal = ref(false)
const selectedHighlight = ref<IHighlight | null>(null)

const openCreateModal = () => {
  selectedHighlight.value = null
  showModal.value = true
}

const handleEdit = (highlight: IHighlight) => {
  selectedHighlight.value = { ...highlight }
  showModal.value = true
}
</script>
