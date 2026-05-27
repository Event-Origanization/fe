<template>
  <div class="w-full bg-white text-gray-900 font-outfit pb-20 overflow-hidden">
    
    <!-- HÌNH ẢNH SỰ KIỆN -->
    <section id="gallery-section" class="pt-24 pb-16 bg-[#f8fafc]">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4" data-aos="fade-down">{{ $t('EVENT_IMAGES_PAGE.TITLE') }}</h1>
        <p class="text-gray-500 md:text-lg max-w-2xl mx-auto mb-16 font-medium" data-aos="fade-up" data-aos-delay="100">{{ $t('EVENT_IMAGES_PAGE.SUBTITLE') }}</p>
        
        <div v-if="postStore.loading" class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
        </div>
        <div v-else-if="postStore.posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
           <div 
             v-for="(post, idx) in postStore.posts" 
             :key="post.id" 
             @click="goToPost(post.slug)" 
             class="bg-white rounded-[30px] p-6 shadow-sm border border-gray-100 group cursor-pointer flex flex-col hover:shadow-[0_20px_50px_rgba(220,38,38,0.1)] hover:-translate-y-2 hover:border-brand-200 transition-all duration-500" 
             data-aos="fade-up" 
             :data-aos-delay="idx % 3 * 100"
           >
             <div class="w-full aspect-[4/3] rounded-[20px] overflow-hidden mb-6 relative">
                <img 
                  :src="post.media || defImg(idx + 10)" 
                  @error="(e) => handleImgError(e, idx + 10)"
                  :alt="getTitle(post)" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div class="absolute top-4 left-4 bg-brand-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider">{{ $t('EVENTS_PAGE.TAG_GALLERY') }}</div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             </div>
             
             <h3 class="font-black text-xl text-gray-900 mb-3 leading-tight group-hover:text-brand-600 transition-colors duration-300 line-clamp-2 uppercase">{{ getTitle(post) }}</h3>
             
             <div class="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                <p class="text-[11px] text-gray-400 font-bold tracking-widest uppercase flex items-center gap-2">
                  <i class="pi pi-calendar"></i> {{ formatDate(post.publishAt || post.createdAt, locale) }}
                </p>
                <div class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-brand-600 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300">
                  <i class="pi pi-arrow-right text-xs"></i>
                </div>
             </div>
           </div>
        </div>
        <div v-else class="py-20 bg-gray-50 rounded-[40px] text-center" data-aos="fade-up">
           <i class="pi pi-images text-5xl text-gray-300 mb-4"></i>
           <p class="text-gray-500 italic">{{ $t('COMMON.EMPTY_DATA') }}</p>
        </div>
        
        <!-- Pagination for Gallery -->
        <Pagination
          v-if="postStore.totalPages > 1"
          :current-page="postStore.currentPage"
          :total-pages="postStore.totalPages"
          :total-items="postStore.total"
          :limit="9"
          hide-info
          hide-limit
          @page-change="changePage"
          class="mt-16"
        />
      </div>
    </section>

    <!-- KHÁCH HÀNG CỦA CHÚNG TÔI -->
    <ClientsSection />

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AOS from 'aos'
import { usePostStore } from '@/store/post.store'
import Pagination from '@/components/common/Pagination.vue'
import ClientsSection from '@/components/common/ClientsSection.vue'
import { formatDate } from '@/utils/common'
import type { IPost } from '@/types/post'
import { ROUTE_NAMES } from '@/router'

defineOptions({ name: 'EventImagesPage' })

const postStore = usePostStore()
const { locale } = useI18n()
const router = useRouter()

const placeholders = [
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200',
  'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1200',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1200',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200',
  'https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1200',
  'https://images.unsplash.com/photo-1469371843873-ff89f1a1ad60?q=80&w=1200',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1200',
]
const defImg = (i: number) => placeholders[i % placeholders.length]

const handleImgError = (e: Event, i: number) => {
  const target = e.target as HTMLImageElement
  target.src = defImg(i)
}

const getTitle = (item: IPost) => {
  if (!item) return ''
  const key = `title_${locale.value}` as 'title_vi' | 'title_en' | 'title_zh'
  return (item[key] as string) || item.title_vi || ''
}

const goToPost = (slug: string) => {
  if (slug) router.push({ name: ROUTE_NAMES.POST_DETAIL, params: { slug } })
}

const changePage = async (p: number) => {
  await postStore.fetchPosts({ page: p, limit: 9, displayLocation: 'EVENT_IMAGE' })
  const gallerySection = document.getElementById('gallery-section')
  if (gallerySection) {
    gallerySection.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(async () => {
  await postStore.fetchPosts({ limit: 9, page: 1, displayLocation: 'EVENT_IMAGE' })
  AOS.init()
  AOS.refresh()
})
</script>
