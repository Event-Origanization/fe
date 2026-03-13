<!-- src/views/admin/Products/ProductManagement.vue -->
<template>
  <div class="space-y-6">
    <page-breadcrumb :pageTitle="currentPageTitle" />
    
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
        {{ currentPageTitle }}
      </h1>
    </div>

    <component-card title="Danh sách sản phẩm dịch vụ 5P Event">
      <product-table @add="openCreateModal" />
    </component-card>

    <ProductModal
      :show="showModal"
      :product="selectedProduct"
      @close="showModal = false"
      @submit="handleProductSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import ProductTable from '@/components/products/ProductTable.vue'
import ProductModal from '@/components/products/ProductModal.vue'

const currentPageTitle = ref('Quản Lý Sản Phẩm')
const showModal = ref(false)
const selectedProduct = ref<any>(null)

const openCreateModal = () => {
  selectedProduct.value = null
  showModal.value = true
}

const handleProductSubmit = (data: any) => {
  // In a real app, this would call an API
  // For now we just log it as requested
}
</script>
