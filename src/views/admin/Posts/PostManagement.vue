<!-- src/views/admin/Posts/PostManagement.vue -->
<template>
  <div class="space-y-6">
    <page-breadcrumb :pageTitle="currentPageTitle" />
    
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
        {{ currentPageTitle }}
      </h1>
    </div>

    <component-card title="Danh sách bài viết 5P Event">
      <post-table @add="openCreateModal" @edit="handleEdit" />
    </component-card>

    <PostModal
      :show="showModal"
      :post="selectedPost"
      @close="showModal = false"
      @submit="handlePostSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PostTable from '@/components/posts/PostTable.vue'
import PostModal from '@/components/posts/PostModal.vue'
import type { IPost } from '@/types/post'

const currentPageTitle = ref('Quản Lý Bài Viết')
const showModal = ref(false)
const selectedPost = ref<IPost | null>(null)

const openCreateModal = () => {
  selectedPost.value = null
  showModal.value = true
}

const handleEdit = (post: IPost) => {
  selectedPost.value = { ...post }
  showModal.value = true
}

const handlePostSubmit = (data: IPost) => {
  console.log('Post submitted successfully:', data)
}
</script>
