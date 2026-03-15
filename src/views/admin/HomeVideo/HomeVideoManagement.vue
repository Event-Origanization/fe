<template>
  <div class="space-y-6">
    <page-breadcrumb :pageTitle="currentPageTitle" />
    
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
        {{ currentPageTitle }}
      </h1>
    </div>

    <component-card title="Quản lý Video Trang Chủ">
      <home-video-table @add="openCreateModal" @edit="handleEdit" />
    </component-card>

    <HomeVideoModal
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
import HomeVideoTable from '@/components/home-video/HomeVideoTable.vue'
import HomeVideoModal from '@/components/home-video/HomeVideoModal.vue'
import type { IHomeVideo } from '@/types/home-video'

const currentPageTitle = ref('Quản Lý Video Trang Chủ')
const showModal = ref(false)
const selectedVideo = ref<IHomeVideo | null>(null)

const openCreateModal = () => {
  selectedVideo.value = null
  showModal.value = true
}

const handleEdit = (video: IHomeVideo) => {
  selectedVideo.value = { ...video }
  showModal.value = true
}

const handleVideoSubmit = (data: IHomeVideo) => {
  console.log('Home video submitted successfully:', data)
}
</script>
