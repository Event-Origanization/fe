<template>
  <div class="w-full bg-white text-gray-900 font-outfit pb-20 overflow-hidden">

    <!-- VIDEO SỰ KIỆN -->
    <section class="pt-24 pb-16 container mx-auto px-4 relative overflow-visible">

      <!-- Title block -->
      <div class="mb-10 text-center lg:text-left relative z-20" data-aos="fade-down">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4">{{ $t('EVENT_VIDEOS_PAGE.TITLE') }}</h1>
        <p class="text-gray-500 text-base max-w-lg mx-auto lg:mx-0 leading-relaxed">
          {{ $t('EVENT_VIDEOS_PAGE.SUBTITLE') }}
        </p>
      </div>

      <!-- ===== 5-VIDEO CREATIVE LAYOUT (DESKTOP) ===== -->
      <div class="hidden lg:block relative w-full h-[1800px] mt-16" data-aos="fade-up" data-aos-duration="1000">
        
        <!-- DECORATIVE ELEMENTS -->
        <!-- 1. Red Circle with Arrow -->
        <!-- 5. Gray Circular Lines (Center Right) -->
        <div class="absolute top-[52%] right-[10%] w-[450px] h-[450px] border-[3px] border-gray-100 rounded-full z-0 pointer-events-none opacity-80"></div>
        <div class="absolute top-[48%] right-[5%] w-[600px] h-[600px] border-[2px] border-gray-50 rounded-full z-0 pointer-events-none opacity-80"></div>

        <!-- VIDEOS -->
        <!-- Video 1: Top Right (Verticalish) -->
        <div v-if="featuredVideos[0]" class="absolute top-0 right-[15%] w-[28%] aspect-[3/4] z-10 creative-video-card" data-aos="fade-left" data-aos-delay="200" @click="openVideo(featuredVideos[0])">
          <img 
            :src="getDisplayThumbnail(featuredVideos[0], 0)" 
            @error="(e) => handleImgError(e, 0)"
            class="w-full h-full object-cover rounded-[30px]" 
            alt="Video 1" 
          />
          <div class="video-hover-overlay rounded-[30px]">
            <div class="play-btn"><i class="pi pi-play"></i></div>
          </div>
        </div>

        <!-- Video 2: Middle Left (Horizontal) -->
        <div v-if="featuredVideos[1]" class="absolute top-[20%] left-[2%] w-[45%] aspect-[16/10] z-20 creative-video-card" data-aos="fade-right" data-aos-delay="300" @click="openVideo(featuredVideos[1])">
          <img 
            :src="getDisplayThumbnail(featuredVideos[1], 1)" 
            @error="(e) => handleImgError(e, 1)"
            class="w-full h-full object-cover rounded-[24px]" 
            alt="Video 2" 
          />
          <div class="video-hover-overlay rounded-[24px]">
            <div class="play-btn"><i class="pi pi-play"></i></div>
          </div>
        </div>

        <!-- Video 3: Middle Right (Horizontal) -->
        <div v-if="featuredVideos[2]" class="absolute top-[42%] right-[2%] w-[42%] aspect-[16/10] z-20 creative-video-card" data-aos="fade-left" data-aos-delay="400" @click="openVideo(featuredVideos[2])">
          <img 
            :src="getDisplayThumbnail(featuredVideos[2], 2)" 
            @error="(e) => handleImgError(e, 2)"
            class="w-full h-full object-cover rounded-[24px]" 
            alt="Video 3" 
          />
          <div class="video-hover-overlay rounded-[24px]">
            <div class="play-btn"><i class="pi pi-play"></i></div>
          </div>
        </div>

        <!-- Video 4: Bottom Left (Horizontal) -->
        <div v-if="featuredVideos[3]" class="absolute top-[62%] left-[8%] w-[40%] aspect-[16/10] z-10 creative-video-card" data-aos="fade-up-right" data-aos-delay="500" @click="openVideo(featuredVideos[3])">
          <img 
            :src="getDisplayThumbnail(featuredVideos[3], 3)" 
            @error="(e) => handleImgError(e, 3)"
            class="w-full h-full object-cover rounded-[24px]" 
            alt="Video 4" 
          />
          <div class="video-hover-overlay rounded-[24px]">
            <div class="play-btn"><i class="pi pi-play"></i></div>
          </div>
        </div>

        <!-- Video 5: Bottom Right (Horizontal) -->
        <div v-if="featuredVideos[4]" class="absolute top-[82%] right-[10%] w-[44%] aspect-[16/10] z-30 creative-video-card" data-aos="fade-up-left" data-aos-delay="600" @click="openVideo(featuredVideos[4])">
          <img 
            :src="getDisplayThumbnail(featuredVideos[4], 4)" 
            @error="(e) => handleImgError(e, 4)"
            class="w-full h-full object-cover rounded-[24px]" 
            alt="Video 5" 
          />
          <div class="video-hover-overlay rounded-[24px]">
            <div class="play-btn"><i class="pi pi-play"></i></div>
          </div>
        </div>
      </div>

      <!-- ===== MOBILE VIDEO LAYOUT ===== -->
      <div class="lg:hidden flex flex-col gap-8 mt-10">
         <div
           v-for="(post, idx) in featuredVideos"
           :key="'mob-' + idx"
           class="relative w-full aspect-video rounded-2xl overflow-hidden group shadow-xl"
           data-aos="fade-up"
           @click="openVideo(post)"
         >
           <img
             :src="getDisplayThumbnail(post, idx)"
             @error="(e) => handleImgError(e, idx)"
             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
             alt="Video"
           />
           <div class="video-hover-overlay">
             <div class="play-btn"><i class="pi pi-play"></i></div>
           </div>
         </div>
      </div>
    </section>

    <!-- ===== XEM THÊM VIDEO (Bottom Section Background Colored) ===== -->
    <section id="more-videos-section" class="py-24 relative bg-[#ecedf4] rounded-t-[50px] md:rounded-t-[80px]">
      <div class="max-w-7xl mx-auto px-4 relative z-10">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(post, idx) in moreVideos"
            :key="post.id || idx"
            @click="openVideo(post)"
            class="video-card-mini group"
            data-aos="fade-up"
            :data-aos-delay="(idx % 4) * 50"
          >
            <!-- Thumbnail Box -->
            <div class="p-4 pb-0 flex-shrink-0">
               <div class="aspect-video rounded-[16px] overflow-hidden relative shadow-inner">
                 <img
                   :src="getDisplayThumbnail(post, idx + 5)"
                   @error="(e) => handleImgError(e, idx + 5)"
                   :alt="getTitle(post)"
                   class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                 />
                 <div class="absolute top-3 left-3 flex gap-2">
                   <span class="bg-white/95 text-brand-700 text-[10px] font-black uppercase px-2 py-1 rounded-md shadow-sm opacity-90 group-hover:opacity-100 transition-opacity"><i class="pi pi-file-o mr-1"></i> {{ $t('EVENTS_PAGE.TAG_ARTICLE') }}</span>
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
            <div class="px-5 pb-6 flex flex-col flex-grow">
              <h3 class="font-black text-base text-gray-900 leading-tight line-clamp-2 group-hover:text-brand-600 transition-colors duration-300">
                {{ getTitle(post) || $t('EVENTS_PAGE.DEFAULT_VIDEO_TITLE') }}
              </h3>
              <div class="flex items-center justify-between mt-auto pt-3">
                <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  {{ formatDate(post.createdAt, locale) }}
                </span>
                <i class="pi pi-arrow-right text-brand-600 text-xs transform group-hover:translate-x-1 transition-transform"></i>
              </div>
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
          :limit="12"
          hide-info
          hide-limit
          @page-change="changeVideoPage"
          class="mt-16"
        />
      </div>
    </section>

    <!-- KHÁCH HÀNG CỦA CHÚNG TÔI -->
    <ClientsSection />

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
                :src="getDisplayThumbnail(activeVideo, 0)"
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
                v-if="'slug' in activeVideo && activeVideo.slug"
                class="mt-4 px-6 py-2 bg-brand-600 text-white font-bold rounded-full text-sm hover:bg-brand-500 hover:scale-105 transition-all outline-none"
                @click="goToPost(activeVideo.slug); closeVideo()"
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
import { useVideoStore } from '@/store/highlight-video.store'
import Pagination from '@/components/common/Pagination.vue'
import ClientsSection from '@/components/common/ClientsSection.vue'
import { formatDate } from '@/utils/common'
import type { IPost } from '@/types/post'
import { ROUTE_NAMES } from '@/router'
import type { IHighlightVideo } from '@/types/highlight-video'

defineOptions({ name: 'EventVideosPage' })

const videoStore = useVideoStore()
const { locale } = useI18n()
const router = useRouter()

// ── Video modal ──────────────────────────────────────────────────
const activeVideo = ref<IPost | IHighlightVideo | null>(null)

const activeVideoUrl = computed(() => {
  if (!activeVideo.value) return ''
  
  let media = ''
  if ('url' in activeVideo.value) {
    media = activeVideo.value.url || activeVideo.value.thumbnail || ''
  } else if ('media' in activeVideo.value) {
    media = activeVideo.value.media || ''
  }

  const ytMatch = media.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/)
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
const featuredVideos = computed(() => videoStore.featuredVideos)
const moreVideos     = computed(() => videoStore.videos)

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

const getDisplayThumbnail = (item: IPost | IHighlightVideo | null | undefined, index: number): string => {
  if (!item) return defImg(index)
  
  let thumbnail = ''
  let url = ''

  if ('thumbnail' in item) {
    thumbnail = item.thumbnail || ''
    url = item.url || ''
  }

  if (thumbnail && !thumbnail.includes('youtube.com') && !thumbnail.includes('youtu.be')) {
    return thumbnail
  }

  // Support YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/)
  if (ytMatch) {
    return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`
  }
  
  // Support Unsplash or direct image URLs
  if (url.startsWith('http') && (url.includes('unsplash.com') || url.match(/\.(jpeg|jpg|gif|png|webp)$/i))) {
    return url
  }

  return defImg(index)
}

const handleImgError = (e: Event, i: number) => {
  const target = e.target as HTMLImageElement
  // Prevent infinite loops if placeholder also fails
  if (target.dataset.triedPlaceholder) {
    target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' // Transparent 1x1
    return
  }
  target.dataset.triedPlaceholder = 'true'
  target.src = defImg(i)
}

const getTitle = (item: IPost | IHighlightVideo) => {
  if (!item) return ''
  const key = `title_${locale.value}` as 'title_vi' | 'title_en' | 'title_zh'
  return (item[key] as string) || item.title_vi || ''
}

const goToPost = (slug: string) => {
  if (slug) router.push({ name: ROUTE_NAMES.POST_DETAIL, params: { slug } })
}

const changeVideoPage = async (p: number) => {
  await videoStore.fetchVideos({ page: p, limit: 12, skip: 5 })
  const videoSection = document.getElementById('more-videos-section')
  if (videoSection) {
    videoSection.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(async () => {
  await Promise.all([
    videoStore.fetchFeaturedVideos(),
    videoStore.fetchVideos({ limit: 12, page: 1, skip: 5 })
  ])
  AOS.init()
  AOS.refresh()
})
</script>

<style scoped>
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
  padding-left: 5px;
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

.video-card-mini {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0,0,0,0.03);
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
  position: relative;
}

.video-card-mini::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 20px;
  box-shadow: 0 0 0 0 rgba(220, 38, 38, 0);
  transition: all 0.5s ease;
  pointer-events: none;
}

.video-card-mini:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  border-color: rgba(220, 38, 38, 0.1);
}

.video-card-mini:hover::after {
  box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.05);
}

.video-card-mini .play-btn-small {
  width: 44px;
  height: 44px;
  background: #dc2626;
  color: white;
  border-radius: 50%;
  position: absolute;
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
