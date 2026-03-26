<template>
  <div class="w-full bg-white text-gray-900 font-outfit pb-20 overflow-hidden">

    <!-- VIDEO SỰ KIỆN -->
    <section class="pt-24 pb-16 container mx-auto px-4 relative overflow-visible">

      <!-- Title block -->
      <div class="mb-10 text-center lg:text-left relative z-20" data-aos="fade-down">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4">VIDEO SỰ KIỆN</h1>
        <p class="text-gray-500 text-base max-w-lg mx-auto lg:mx-0 leading-relaxed">
          Highlights of videos, podcasts and news covering the latest research from M21's labs.
        </p>
      </div>

      <!-- ===== 5-VIDEO CREATIVE LAYOUT (DESKTOP) ===== -->
      <div class="hidden lg:block relative w-full h-[1800px] mt-16" data-aos="fade-up" data-aos-duration="1000">
        
        <!-- DECORATIVE ELEMENTS -->
        <!-- 1. Yellow Circle with Arrow -->
        <div class="absolute top-[8%] -left-[10%] w-[500px] h-[500px] bg-[#fdf047] rounded-full z-0 opacity-80 mix-blend-multiply flex items-center justify-center animate-pulse-slow">
            <i class="pi pi-arrow-up-right text-[150px] text-[#7885b9] absolute top-[40%] left-[45%] font-light transform hover:translate-x-4 hover:-translate-y-4 transition-transform duration-500"></i>
        </div>

        <!-- 2. Purple Blob Top Right -->
        <div class="absolute top-[2%] right-[5%] w-[450px] h-[500px] bg-[#a8aecc] rounded-[60px] z-0 opacity-70 rotate-6 mix-blend-multiply"></div>

        <!-- 3. Yellow Dots (Top Right) -->
        <div class="absolute top-[32%] right-[5%] w-[180px] h-[180px] z-0 opacity-80" style="background-image: radial-gradient(#fdf047 3px, transparent 3px); background-size: 20px 20px;"></div>

        <!-- 4. Yellow Dots (Bottom Left) -->
        <div class="absolute bottom-[28%] left-[8%] w-[200px] h-[200px] z-0 opacity-80" style="background-image: radial-gradient(#fdf047 3px, transparent 3px); background-size: 20px 20px;"></div>

        <!-- 5. Gray Circular Lines (Center Right) -->
        <div class="absolute top-[52%] right-[10%] w-[450px] h-[450px] border-[3px] border-gray-100 rounded-full z-0 pointer-events-none opacity-80"></div>
        <div class="absolute top-[48%] right-[5%] w-[600px] h-[600px] border-[2px] border-gray-50 rounded-full z-0 pointer-events-none opacity-80"></div>

        <!-- VIDEOS -->
        <!-- Video 1: Top Right (Verticalish) -->
        <div class="absolute top-0 right-[15%] w-[28%] aspect-[3/4] z-10 creative-video-card" data-aos="fade-left" data-aos-delay="200" @click="openVideo(featuredVideos[0])">
          <img :src="featuredVideos[0]?.media || defImg(0)" class="w-full h-full object-cover rounded-[30px]" alt="Video 1" />
          <div class="video-hover-overlay rounded-[30px]">
            <div class="play-btn"><i class="pi pi-play"></i></div>
          </div>
        </div>

        <!-- Video 2: Middle Left (Horizontal) -->
        <div class="absolute top-[20%] left-[2%] w-[45%] aspect-[16/10] z-20 creative-video-card" data-aos="fade-right" data-aos-delay="300" @click="openVideo(featuredVideos[1])">
          <img :src="featuredVideos[1]?.media || defImg(1)" class="w-full h-full object-cover rounded-[24px]" alt="Video 2" />
          <div class="video-hover-overlay rounded-[24px]">
            <div class="play-btn"><i class="pi pi-play"></i></div>
          </div>
        </div>

        <!-- Video 3: Middle Right (Horizontal) -->
        <div class="absolute top-[42%] right-[2%] w-[42%] aspect-[16/10] z-20 creative-video-card" data-aos="fade-left" data-aos-delay="400" @click="openVideo(featuredVideos[2])">
          <img :src="featuredVideos[2]?.media || defImg(2)" class="w-full h-full object-cover rounded-[24px]" alt="Video 3" />
          <div class="video-hover-overlay rounded-[24px]">
            <div class="play-btn"><i class="pi pi-play"></i></div>
          </div>
        </div>

        <!-- Video 4: Bottom Left (Horizontal) -->
        <div class="absolute top-[62%] left-[8%] w-[40%] aspect-[16/10] z-10 creative-video-card" data-aos="fade-up-right" data-aos-delay="500" @click="openVideo(featuredVideos[3])">
          <img :src="featuredVideos[3]?.media || defImg(3)" class="w-full h-full object-cover rounded-[24px]" alt="Video 4" />
          <div class="video-hover-overlay rounded-[24px]">
            <div class="play-btn"><i class="pi pi-play"></i></div>
          </div>
        </div>

        <!-- Video 5: Bottom Right (Horizontal) -->
        <div class="absolute top-[82%] right-[10%] w-[44%] aspect-[16/10] z-30 creative-video-card" data-aos="fade-up-left" data-aos-delay="600" @click="openVideo(featuredVideos[4])">
          <img :src="featuredVideos[4]?.media || defImg(4)" class="w-full h-full object-cover rounded-[24px]" alt="Video 5" />
          <div class="video-hover-overlay rounded-[24px]">
            <div class="play-btn"><i class="pi pi-play"></i></div>
          </div>
        </div>
      </div>

      <!-- ===== MOBILE VIDEO LAYOUT ===== -->
      <div class="lg:hidden flex flex-col gap-8 mt-10">
         <div 
            v-for="(post, idx) in featuredVideos" 
            :key="'mob-'+idx"
            class="relative w-full aspect-video rounded-2xl overflow-hidden group shadow-xl"
            data-aos="fade-up"
            @click="openVideo(post)"
         >
            <img :src="post?.media || defImg(idx)" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Video" />
            <div class="video-hover-overlay">
              <div class="play-btn"><i class="pi pi-play"></i></div>
            </div>
         </div>
      </div>
    </section>

    <!-- ===== XEM THÊM VIDEO (Bottom Section Background Colored) ===== -->
    <section class="py-24 relative bg-[#ecedf4] rounded-t-[50px] md:rounded-t-[80px]">
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
                   :src="post.media || defImg(idx + 5)"
                   :alt="getTitle(post)"
                   class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                 />
                 <div class="absolute top-3 left-3 flex gap-2">
                   <span class="bg-white/95 text-brand-700 text-[10px] font-black uppercase px-2 py-1 rounded-md shadow-sm opacity-90 group-hover:opacity-100 transition-opacity"><i class="pi pi-file-o mr-1"></i> Article</span>
                   <span class="bg-white/95 text-brand-700 text-[10px] font-black uppercase px-2 py-1 rounded-md shadow-sm opacity-90 group-hover:opacity-100 transition-opacity"><i class="pi pi-comment mr-1"></i> Interview</span>
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
                {{ getTitle(post) || 'Video sự kiện' }}
              </h3>
              <p class="text-[12px] text-gray-400 font-bold mt-auto pt-4 uppercase tracking-widest">
                {{ formatDate(post.createdAt, locale) }}
              </p>
            </div>
          </div>
        </div>

        <div v-if="moreVideos.length === 0" class="text-center py-10 text-gray-400 font-medium">
          Chưa có thêm video sự kiện nào.
        </div>
      </div>
    </section>

    <!-- KHÁCH HÀNG CỦA CHÚNG TÔI -->
    <section class="py-24 container mx-auto px-4 bg-white">
      <div class="bg-[#8b92b6] rounded-[40px] px-4 md:px-8 py-16 relative overflow-hidden text-center max-w-5xl mx-auto shadow-xl border border-gray-100" data-aos="zoom-in">
         <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_rgba(220,38,38,0.8)]"></div>
         
         <div class="inline-block bg-white text-brand-600 font-black uppercase tracking-widest px-8 md:px-12 py-4 rounded-full shadow-lg mb-8 -mt-24 border border-gray-100 text-lg md:text-xl transform hover:-translate-y-1 transition-transform">
           KHÁCH HÀNG CỦA CHÚNG TÔI
         </div>
         
         <p class="text-yellow-300 font-bold mb-12 text-sm md:text-base tracking-wide flex items-center justify-center gap-4">
           <span>Our clients include:</span>
           <span class="text-white/80 italic font-normal">Update text sau</span>
         </p>
         
         <!-- Logos Grid (4 rows, 6 cols) -->
         <div class="grid grid-cols-3 md:grid-cols-6 gap-y-10 gap-x-4 items-center justify-items-center opacity-80">
            <template v-for="row in 4" :key="'row'+row">
              <div v-for="col in 6" :key="'logo'+row+col" class="w-full flex justify-center hover:opacity-100 hover:scale-110 hover:brightness-150 transition-all cursor-pointer">
                <!-- Using generic placeholders since no specific logos provided -->
                <span class="font-black text-white/60 tracking-wider text-sm md:text-lg uppercase">Brand {{row}}-{{col}}</span>
              </div>
            </template>
         </div>
      </div>
    </section>

    <!-- HÌNH ẢNH SỰ KIỆN -->
    <section class="py-16 bg-[#f8fafc] border-t border-gray-100">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-widest mb-4" data-aos="fade-up">HÌNH ẢNH SỰ KIỆN</h2>
        <p class="text-gray-500 md:text-lg max-w-2xl mx-auto mb-16 font-medium" data-aos="fade-up" data-aos-delay="100">Cập nhật những hình ảnh mới nhất từ các sự kiện nổi bật của 5P Event.</p>
        
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
                <div class="absolute top-4 left-4 bg-brand-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider">Gallery</div>
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
        
        <!-- Pagination -->
        <div v-if="postStore.totalPages > 1" class="flex justify-center mt-16 gap-2" data-aos="fade-up">
          <button 
            v-for="p in postStore.totalPages" 
            :key="p"
            @click="changePage(p)"
            class="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 text-sm font-bold"
            :class="postStore.currentPage === p ? 'bg-brand-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-brand-600'"
          >
            {{ p }}
          </button>
        </div>
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
                :src="activeVideo.media || defImg(0)"
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
                class="mt-4 px-6 py-2 bg-brand-600 text-white font-bold rounded-full text-sm hover:bg-brand-500 hover:scale-105 transition-all outline-none"
                @click="goToPost(activeVideo.slug); closeVideo()"
              >
                Xem bài viết đầy đủ
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
import { formatDate } from '@/utils/common'
import type { IPost } from '@/types/post'
import { ROUTE_NAMES } from '@/router'

defineOptions({ name: 'EventsPage' })

const postStore = usePostStore()
const { locale } = useI18n()
const router = useRouter()

// ── Video modal ──────────────────────────────────────────────────
const activeVideo = ref<IPost | null>(null)

const activeVideoUrl = computed(() => {
  const media = activeVideo.value?.media || ''
  const ytMatch = media.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`
  const vimeoMatch = media.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`
  if (media.includes('youtube.com/embed') || media.includes('player.vimeo.com')) return media
  return '' 
})

const openVideo = (post: IPost | undefined) => {
  if (!post) return
  activeVideo.value = post
  document.body.style.overflow = 'hidden'
}

const closeVideo = () => {
  activeVideo.value = null
  document.body.style.overflow = ''
}

// ── Data helpers ─────────────────────────────────────────────────
const featuredVideos = computed(() => postStore.recentNews.slice(0, 5))
const moreVideos     = computed(() => postStore.recentNews.slice(5))

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

const getTitle = (post: IPost | undefined) => {
  if (!post) return ''
  const key = `title_${locale.value}` as keyof IPost
  return (post[key] as string) || post.title_vi || ''
}

const goToPost = (slug: string) => {
  if (slug) router.push({ name: ROUTE_NAMES.POST_DETAIL, params: { slug } })
}

const changePage = (p: number) => {
  postStore.fetchPosts({ page: p, limit: 9 })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  await postStore.fetchRecentNews(20)
  await postStore.fetchPosts({ limit: 9, page: 1 })
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
