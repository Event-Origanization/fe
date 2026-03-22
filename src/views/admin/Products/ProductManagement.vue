<!-- src/views/admin/Products/ProductManagement.vue -->
<template>
  <div class="space-y-6 pb-20">
    <page-breadcrumb :pageTitle="currentPageTitle" />
    
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
        {{ currentPageTitle }}
      </h1>
    </div>

    <component-card :title="$t('PRODUCT_ADMIN.SUBTITLE')">
      <product-table @add="openCreate" @edit="handleEdit" />
    </component-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import ProductTable from '@/components/products/ProductTable.vue'
import type { IProduct } from '@/types/product'

const { t } = useI18n()
const router = useRouter()
const currentPageTitle = computed(() => t('PRODUCT_ADMIN.TITLE'))

const openCreate = () => {
  router.push({ name: 'ProductCreate' })
}

const handleEdit = (product: IProduct) => {
  router.push({ 
    name: 'ProductEdit', 
    params: { id: product.id } 
  })
}
</script>
