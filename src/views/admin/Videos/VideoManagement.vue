<!-- src/views/admin/Videos/VideoManagement.vue -->
<template>
  <div class="space-y-6">
    <page-breadcrumb :pageTitle="currentPageTitle" />
    
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
        {{ currentPageTitle }}
      </h1>
    </div>

    <component-card title="Quản lý Highlight Videos">
      <video-table @add="openCreateModal" @edit="handleEdit" />
    </component-card>

    <VideoModal
      :show="showModal"
      :video="selectedVideo"
      @close="showModal = false"
      @submit="handleVideoSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import VideoTable from '@/components/videos/VideoTable.vue'
import VideoModal from '@/components/videos/VideoModal.vue'
import type { IHighlightVideo } from '@/types/highlight-video'

const currentPageTitle = ref('Quản Lý Video Nổi Bật')
const showModal = ref(false)
const selectedVideo = ref<IHighlightVideo | null>(null)

const openCreateModal = () => {
  selectedVideo.value = null
  showModal.value = true
}

const handleEdit = (video: IHighlightVideo) => {
  selectedVideo.value = { ...video }
  showModal.value = true
}

const handleVideoSubmit = (data: IHighlightVideo) => {
  console.log('Video submitted successfully:', data)
}
</script>
