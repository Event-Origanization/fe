<!-- src/views/admin/Posts/PostManagement.vue -->
<template>
  <div class="space-y-6">
    <page-breadcrumb :pageTitle="currentPageTitle" />
    
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
        {{ currentPageTitle }}
      </h1>
    </div>

    <component-card :title="$t('POSTS_ADMIN.SUBTITLE')">
      <post-table @add="openCreateModal" @edit="handleEdit" />
    </component-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PostTable from '@/components/posts/PostTable.vue'
import type { IPost } from '@/types/post'

const { t } = useI18n()
const router = useRouter()
const currentPageTitle = computed(() => t('POSTS_ADMIN.TITLE'))

const openCreateModal = () => {
  router.push({ name: 'PostCreate' })
}

const handleEdit = (post: IPost) => {
  router.push({ name: 'PostEdit', params: { id: post.id } })
}

const handlePostSubmit = (data: IPost) => {
  console.log('Post submitted successfully:', data)
}
</script>
