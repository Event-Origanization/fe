<template>
  <div class="w-full bg-white text-gray-900 font-outfit pb-20 overflow-hidden">

    <!-- VIDEO SỰ KIỆN -->
    <section class="pt-24 pb-16 container mx-auto px-4 relative overflow-visible">

      <!-- Title block -->
      <div class="mb-10 text-center lg:text-left relative z-20" data-aos="fade-down">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4">{{ $t('EVENTS_PAGE.TITLE') }}</h1>
        <p class="text-gray-500 text-base max-w-lg mx-auto lg:mx-0 leading-relaxed">
          {{ $t('EVENTS_PAGE.SUBTITLE') }}
        </p>
      </div>

      <!-- ===== 5-VIDEO CREATIVE LAYOUT (DESKTOP) ===== -->
      <div v-if="videoStore.currentPage === 1" class="hidden lg:block relative w-full h-[1800px] mt-16" data-aos="fade-up" data-aos-duration="1000">
        
        <!-- DECORATIVE ELEMENTS -->
        <!-- 1. Red Circle with Arrow -->
        <div class="absolute top-[8%] -left-[10%] w-[500px] h-[500px] bg-brand-500 rounded-full z-0 opacity-20 mix-blend-multiply flex items-center justify-center animate-pulse-slow">
            <i class="pi pi-arrow-up-right text-[150px] text-white absolute top-[40%] left-[45%] font-light transform hover:translate-x-4 hover:-translate-y-4 transition-transform duration-500"></i>
        </div>

        <!-- 2. Purple Blob Top Right -->
        <div class="absolute top-[2%] right-[5%] w-[450px] h-[500px] bg-[#a8aecc] rounded-[60px] z-0 opacity-70 rotate-6 mix-blend-multiply"></div>

        <!-- 3. Red Dots (Top Right) -->
        <div class="absolute top-[32%] right-[5%] w-[180px] h-[180px] z-0 opacity-40" style="background-image: radial-gradient(#dc2626 3px, transparent 3px); background-size: 20px 20px;"></div>

        <!-- 4. Red Dots (Bottom Left) -->
        <div class="absolute bottom-[28%] left-[8%] w-[200px] h-[200px] z-0 opacity-40" style="background-image: radial-gradient(#dc2626 3px, transparent 3px); background-size: 20px 20px;"></div>

        <!-- 5. Gray Circular Lines (Center Right) -->
        <div class="absolute top-[52%] right-[10%] w-[450px] h-[450px] border-[3px] border-gray-100 rounded-full z-0 pointer-events-none opacity-80"></div>
        <div class="absolute top-[48%] right-[5%] w-[600px] h-[600px] border-[2px] border-gray-50 rounded-full z-0 pointer-events-none opacity-80"></div>

        <!-- VIDEOS -->
        <!-- Video 1: Top Right (Verticalish) -->
        <div class="absolute top-0 right-[15%] w-[28%] aspect-[3/4] z-10 creative-video-card" data-aos="fade-left" data-aos-delay="200" @click="openVideo(featuredVideos[0])">
          <img :src="featuredVideos[0]?.thumbnail || featuredVideos[0]?.url || defImg(0)" class="w-full h-full object-cover rounded-[30px]" alt="Video 1" />
          <div class="video-hover-overlay rounded-[30px]">
            <div class="play-btn"><i class="pi pi-play"></i></div>
          </div>
        </div>

        <!-- Video 2: Middle Left (Horizontal) -->
        <div class="absolute top-[20%] left-[2%] w-[45%] aspect-[16/10] z-20 creative-video-card" data-aos="fade-right" data-aos-delay="300" @click="openVideo(featuredVideos[1])">
          <img :src="featuredVideos[1]?.thumbnail || featuredVideos[1]?.url || defImg(1)" class="w-full h-full object-cover rounded-[24px]" alt="Video 2" />
          <div class="video-hover-overlay rounded-[24px]">
            <div class="play-btn"><i class="pi pi-play"></i></div>
          </div>
        </div>

        <!-- Video 3: Middle Right (Horizontal) -->
        <div class="absolute top-[42%] right-[2%] w-[42%] aspect-[16/10] z-20 creative-video-card" data-aos="fade-left" data-aos-delay="400" @click="openVideo(featuredVideos[2])">
          <img :src="featuredVideos[2]?.thumbnail || featuredVideos[2]?.url || defImg(2)" class="w-full h-full object-cover rounded-[24px]" alt="Video 3" />
          <div class="video-hover-overlay rounded-[24px]">
            <div class="play-btn"><i class="pi pi-play"></i></div>
          </div>
        </div>

        <!-- Video 4: Bottom Left (Horizontal) -->
        <div class="absolute top-[62%] left-[8%] w-[40%] aspect-[16/10] z-10 creative-video-card" data-aos="fade-up-right" data-aos-delay="500" @click="openVideo(featuredVideos[3])">
          <img :src="featuredVideos[3]?.thumbnail || featuredVideos[3]?.url || defImg(3)" class="w-full h-full object-cover rounded-[24px]" alt="Video 4" />
          <div class="video-hover-overlay rounded-[24px]">
            <div class="play-btn"><i class="pi pi-play"></i></div>
          </div>
        </div>

        <!-- Video 5: Bottom Right (Horizontal) -->
        <div class="absolute top-[82%] right-[10%] w-[44%] aspect-[16/10] z-30 creative-video-card" data-aos="fade-up-left" data-aos-delay="600" @click="openVideo(featuredVideos[4])">
          <img :src="featuredVideos[4]?.thumbnail || featuredVideos[4]?.url || defImg(4)" class="w-full h-full object-cover rounded-[24px]" alt="Video 5" />
          <div class="video-hover-overlay rounded-[24px]">
            <div class="play-btn"><i class="pi pi-play"></i></div>
          </div>
        </div>
      </div>

      <!-- ===== MOBILE VIDEO LAYOUT ===== -->
      <div v-if="videoStore.currentPage === 1" class="lg:hidden flex flex-col gap-8 mt-10">
         <div 
            v-for="(post, idx) in featuredVideos" 
            :key="'mob-'+idx"
            class="relative w-full aspect-video rounded-2xl overflow-hidden group shadow-xl"
            data-aos="fade-up"
            @click="openVideo(post)"
         >
            <img :src="post?.thumbnail || post?.url || defImg(idx)" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Video" />
            <div class="video-hover-overlay">
              <div class="play-btn"><i class="pi pi-play"></i></div>
            </div>
         </div>
      </div>
    </section>

    <!-- ===== XEM THÊM VIDEO (Bottom Section Background Colored) ===== -->
    <section id="more-videos-section" class="py-24 relative bg-[#ecedf4] rounded-t-[50px] md:rounded-t-[80px]">
      <div class="container mx-auto px-4 relative z-10">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div
            v-for="(post, idx) in moreVideos"
            :key="post.id || idx"
            @click="openVideo(post)"
            class="bg-white rounded-[24px] overflow-hidden group cursor-pointer hover:-translate-y-3 transition-transform duration-500 shadow-sm hover:shadow-2xl hover:shadow-brand-500/10 flex flex-col h-full"
            data-aos="fade-up"
            :data-aos-delay="(idx % 3) * 100"
          >
            <!-- Thumbnail Box -->
            <div class="p-4 pb-0 flex-shrink-0">
               <div class="aspect-[4/3] rounded-[16px] overflow-hidden relative shadow-inner">
                 <img
                   :src="post.thumbnail || post.url || defImg(idx + 5)"
                   :alt="getTitle(post)"
                   class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                 />
                 <div class="absolute top-3 left-3 flex gap-2">
                   <span class="bg-white/95 text-brand-700 text-[10px] font-black uppercase px-2 py-1 rounded-md shadow-sm opacity-90 group-hover:opacity-100 transition-opacity"><i class="pi pi-file-o mr-1"></i> {{ $t('EVENTS_PAGE.TAG_ARTICLE') }}</span>
                   <span class="bg-white/95 text-brand-700 text-[10px] font-black uppercase px-2 py-1 rounded-md shadow-sm opacity-90 group-hover:opacity-100 transition-opacity"><i class="pi pi-comment mr-1"></i> {{ $t('EVENTS_PAGE.TAG_INTERVIEW') }}</span>
                 </div>
                 
                 <!-- Play Overlay on Card Image -->
                 <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
                    <div class="w-12 h-12 bg-brand-600 rounded-full text-white flex items-center justify-center pl-1 shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-500">
                      <i class="pi pi-play text-lg"></i>
                    </div>
                 </div>
               </div>
            </div>

            <!-- Content Info -->
            <div class="p-6 flex flex-col flex-grow">
              <h3 class="font-black text-lg md:text-xl text-gray-900 leading-tight line-clamp-2 group-hover:text-brand-600 transition-colors duration-300">
                {{ getTitle(post) || $t('EVENTS_PAGE.DEFAULT_VIDEO_TITLE') }}
              </h3>
              <p class="text-[12px] text-gray-400 font-bold mt-auto pt-4 uppercase tracking-widest">
                {{ formatDate(post.createdAt, locale) }}
              </p>
            </div>
          </div>
        </div>

        <div v-if="moreVideos.length === 0" class="text-center py-10 text-gray-400 font-medium">
          {{ $t('EVENTS_PAGE.NO_MORE_VIDEOS') }}
        </div>

        <!-- Pagination for Videos -->
        <Pagination
          v-if="videoStore.totalPages > 1"
          :current-page="videoStore.currentPage"
          :total-pages="videoStore.totalPages"
          :total-items="videoStore.total"
          :limit="11"
          hide-info
          hide-limit
          @page-change="changeVideoPage"
          class="mt-16"
        />
      </div>
    </section>

    <!-- KHÁCH HÀNG CỦA CHÚNG TÔI -->
    <section class="py-24 container mx-auto px-4 bg-white">
      <div class="bg-[#8b92b6] rounded-[40px] px-4 md:px-8 py-16 relative overflow-hidden text-center max-w-5xl mx-auto shadow-xl border border-gray-100" data-aos="zoom-in">
         <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_rgba(220,38,38,0.8)]"></div>
         
         <div class="inline-block bg-white text-brand-600 font-black uppercase tracking-widest px-8 md:px-12 py-4 rounded-full shadow-lg mb-8 -mt-24 border border-gray-100 text-lg md:text-xl transform hover:-translate-y-1 transition-transform">
           {{ $t('EVENTS_PAGE.CLIENTS_TITLE') }}
         </div>
         
         <!-- Logos Grid (4 rows, 6 cols) -->
         <!-- Logos Grid -->
         <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-12 gap-x-8 items-center justify-items-center opacity-90">
            <template v-if="partnerStore.activePartners.length > 0">
              <div v-for="partner in partnerStore.activePartners" 
                   :key="partner.id" 
                   class="w-full flex flex-col items-center justify-center hover:opacity-100 hover:scale-110 transition-all cursor-pointer group/logo"
                   :title="partner.name">
                <div class="w-full h-16 md:h-20 flex items-center justify-center mb-2">
                  <img v-if="partner.logo" 
                       :src="partner.logo" 
                       :alt="partner.name" 
                       class="max-w-full max-h-full object-contain filter invert opacity-60 group-hover/logo:opacity-100 transition-all duration-300" />
                  <span v-else class="font-black text-white/50 tracking-wider text-sm md:text-base uppercase text-center line-clamp-1 px-2 border border-white/10 py-2 rounded-lg bg-white/5">
                    {{ partner.name }}
                  </span>
                </div>
              </div>
            </template>
            <template v-else>
              <div v-for="i in 12" :key="'dummy-'+i" class="w-full flex justify-center hover:opacity-100 transition-all cursor-not-allowed">
                <span class="font-black text-white/20 tracking-wider text-xs md:text-sm uppercase italic">Partner {{ i }}</span>
              </div>
            </template>
         </div>
      </div>
    </section>

    <!-- HÌNH ẢNH SỰ KIỆN -->
    <section id="gallery-section" class="py-16 bg-[#f8fafc] border-t border-gray-100">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-widest mb-4" data-aos="fade-up">{{ $t('EVENTS_PAGE.GALLERY_TITLE') }}</h2>
        <p class="text-gray-500 md:text-lg max-w-2xl mx-auto mb-16 font-medium" data-aos="fade-up" data-aos-delay="100">{{ $t('EVENTS_PAGE.GALLERY_SUB') }}</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
           <div 
             v-for="(post, idx) in postStore.posts" 
             :key="post.id" 
             @click="goToPost(post.slug)" 
             class="bg-white rounded-[30px] p-6 shadow-sm border border-gray-100 group cursor-pointer flex flex-col hover:shadow-[0_20px_50px_rgba(220,38,38,0.1)] hover:-translate-y-2 hover:border-brand-200 transition-all duration-500" 
             data-aos="fade-up" 
             :data-aos-delay="idx % 3 * 100"
           >
             <div class="w-full aspect-[4/3] rounded-[20px] overflow-hidden mb-6 relative">
                <img :src="post.media || `https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=600`" :alt="getTitle(post)" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div class="absolute top-4 left-4 bg-brand-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider">{{ $t('EVENTS_PAGE.TAG_GALLERY') }}</div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             </div>
             
             <h3 class="font-black text-xl text-gray-900 mb-3 leading-tight group-hover:text-brand-600 transition-colors duration-300 line-clamp-2 uppercase">{{ getTitle(post) }}</h3>
             
             <div class="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                <p class="text-[11px] text-gray-400 font-bold tracking-widest uppercase flex items-center gap-2">
                  <i class="pi pi-calendar"></i> {{ formatDate(post.createdAt, locale) }}
                </p>
                <div class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-brand-600 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300">
                  <i class="pi pi-arrow-right text-xs"></i>
                </div>
             </div>
           </div>
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

    <!-- ===== VIDEO MODAL ===== -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div
          v-if="activeVideo"
          class="video-modal-backdrop"
          @click.self="closeVideo"
        >
          <div class="video-modal-box" data-aos="zoom-in">
            <button class="modal-close-btn" @click="closeVideo">
              <i class="pi pi-times text-xl"></i>
            </button>

            <div class="modal-media">
              <iframe
                v-if="activeVideoUrl"
                :src="activeVideoUrl"
                class="w-full h-full"
                frameborder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowfullscreen
              ></iframe>
              <img
                v-else
                :src="(activeVideo as any).thumbnail || (activeVideo as any).url || (activeVideo as any).media || defImg(0)"
                class="w-full h-full object-contain"
                alt="Video preview"
              />
            </div>

            <div class="modal-info">
              <h3 class="text-white font-black text-xl uppercase leading-snug line-clamp-2">
                {{ getTitle(activeVideo) || 'Video sự kiện' }}
              </h3>
              <p class="text-white/60 text-sm mt-1">{{ formatDate(activeVideo.createdAt, locale) }}</p>
              <button
                v-if="(activeVideo as any).slug"
                class="mt-4 px-6 py-2 bg-brand-600 text-white font-bold rounded-full text-sm hover:bg-brand-500 hover:scale-105 transition-all outline-none"
                @click="goToPost((activeVideo as any).slug); closeVideo()"
              >
                {{ $t('EVENTS_PAGE.VIEW_FULL') }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AOS from 'aos'
import { usePostStore } from '@/store/post.store'
import { useVideoStore } from '@/store/highlight-video.store'
import { usePartnerStore } from '@/store/partner.store'
import Pagination from '@/components/common/Pagination.vue'
import { formatDate } from '@/utils/common'
import type { IPost } from '@/types/post'
import { ROUTE_NAMES } from '@/router'

import type { IHighlightVideo } from '@/types/highlight-video'

defineOptions({ name: 'EventsPage' })

const postStore = usePostStore()
const videoStore = useVideoStore()
const partnerStore = usePartnerStore()
const { locale } = useI18n()
const router = useRouter()

// ── Video modal ──────────────────────────────────────────────────
const activeVideo = ref<IPost | IHighlightVideo | null>(null)

const activeVideoUrl = computed(() => {
  if (!activeVideo.value) return ''
  const media = (activeVideo.value as IHighlightVideo).url || (activeVideo.value as IHighlightVideo).thumbnail || ''
  const ytMatch = media.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`
  const vimeoMatch = media.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`
  if (media.includes('youtube.com/embed') || media.includes('player.vimeo.com')) return media
  return '' 
})

const openVideo = (post: IPost | IHighlightVideo | undefined) => {
  if (!post) return
  activeVideo.value = post
  document.body.style.overflow = 'hidden'
}

const closeVideo = () => {
  activeVideo.value = null
  document.body.style.overflow = ''
}

// ── Data helpers ─────────────────────────────────────────────────
const featuredVideos = computed(() => videoStore.videos.slice(0, 5))
const moreVideos     = computed(() => videoStore.currentPage === 1 ? videoStore.videos.slice(5) : videoStore.videos)

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

const getTitle = (item: IPost | IHighlightVideo) => {
  if (!item) return ''
  const key = `title_${locale.value}` as 'title_vi' | 'title_en' | 'title_zh'
  return (item[key] as string) || item.title_vi || ''
}

const goToPost = (slug: string) => {
  if (slug) router.push({ name: ROUTE_NAMES.POST_DETAIL, params: { slug } })
}

const changePage = async (p: number) => {
  await postStore.fetchPosts({ page: p, limit: 9 })
  const gallerySection = document.getElementById('gallery-section')
  if (gallerySection) {
    gallerySection.scrollIntoView({ behavior: 'smooth' })
  }
}

const changeVideoPage = async (p: number) => {
  await videoStore.fetchVideos({ page: p, limit: 11 })
  const videoSection = document.getElementById('more-videos-section')
  if (videoSection) {
    videoSection.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(async () => {
  await Promise.all([
    videoStore.fetchVideos({ limit: 11, page: 1 }),
    postStore.fetchPosts({ limit: 9, page: 1 }),
    partnerStore.fetchActivePartners()
  ])
  AOS.init()
  AOS.refresh()
})
</script>

<style scoped>
/* ============================================================
   CREATIVE VIDEO LAYOUT EFFECTS
   ============================================================ */
.creative-video-card {
  cursor: pointer;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.5s ease;
}

.creative-video-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 40px 80px rgba(0,0,0,0.3), 0 0 0 6px rgba(255, 255, 255, 0.7);
  z-index: 50 !important;
}

.video-hover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.4s ease;
}

.creative-video-card:hover .video-hover-overlay,
.group:hover > .video-hover-overlay {
  opacity: 1;
  background: rgba(0, 0, 0, 0.4);
}

.play-btn {
  width: 72px;
  height: 72px;
  background: rgba(220, 38, 38, 0.95);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  padding-left: 5px; /* optical alignment for play icon */
  transform: scale(0.5);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 0 40px rgba(220, 38, 38, 0.6);
  backdrop-filter: blur(4px);
}

.creative-video-card:hover .play-btn,
.group:hover > .video-hover-overlay .play-btn {
  transform: scale(1);
  opacity: 1;
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.8;
    transform: scale(1) rotate(0deg);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.03) rotate(1deg);
  }
}
.animate-pulse-slow {
  animation: pulse-slow 8s infinite ease-in-out;
}

/* ============================================================
   VIDEO MODAL
   ============================================================ */
.video-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.video-modal-box {
  position: relative;
  width: 100%;
  max-width: 1000px;
  background: #0f0f1a;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05);
}

.modal-close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);
}
.modal-close-btn:hover {
  background: #dc2626;
  transform: rotate(90deg) scale(1.1);
}

.modal-media {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
}

.modal-info {
  padding: 24px 32px;
  background: linear-gradient(to right, #0f0f1a, #1a1a2e);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
