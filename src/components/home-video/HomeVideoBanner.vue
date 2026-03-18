<!-- src/components/home-video/HomeVideoBanner.vue -->
<template>
  <div v-if="activeVideo" class="w-full mx-auto relative group" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="400">
    <!-- Cyberpunk glowing frame -->
    <div
      class="absolute -inset-[3px] bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 rounded-sm blur-[2px] opacity-75 group-hover:opacity-100 group-hover:blur-[6px] transition-all duration-1000 [clip-path:polygon(5%_0%,95%_0%,100%_5%,100%_95%,95%_100%,5%_100%,0%_95%,0%_5%)]"
    ></div>

    <div
      class="relative w-full aspect-video bg-[#0a0a0a] [clip-path:polygon(5%_0%,95%_0%,100%_5%,100%_95%,95%_100%,5%_100%,0%_95%,0%_5%)] flex items-center justify-center overflow-hidden border-2 border-transparent"
    >
      <template v-if="isVideoType">
        <iframe
          v-if="isYoutube"
          class="absolute inset-0 w-full h-full"
          :src="embedUrl"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <video
          v-else
          class="absolute inset-0 w-full h-full object-cover"
          autoplay
          muted
          loop
          :poster="activeVideo.thumbnail || ''"
        >
          <source :src="activeVideo.url" type="video/mp4" />
        </video>
      </template>
      <template v-else>
         <img
          :src="activeVideo.thumbnail || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop'"
          class="absolute w-full h-full object-cover opacity-60 mix-blend-screen scale-105 group-hover:scale-100 transition-transform duration-[3s]"
          alt="Banner"
        />
        <div class="relative z-10 flex flex-col items-center">
          <div
            class="w-32 h-32 md:w-48 md:h-48 rounded-full border border-blue-400/50 flex items-center justify-center p-2 backdrop-blur-sm shadow-[0_0_30px_rgba(59,130,246,0.3)] inset-0 animate-[spin_10s_linear_infinite]"
          >
            <div
              class="w-full h-full rounded-full border border-red-500/50 border-t-red-500 border-l-transparent border-b-transparent border-r-transparent animate-[spin_5s_linear_infinite_reverse]"
            ></div>
          </div>
          <h2
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl md:text-4xl font-black tracking-[0.2em] text-white mix-blend-overlay opacity-90 text-center px-4"
          >
            {{ localizedTitle }}
          </h2>
        </div>
      </template>

      <div
        class="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent z-10"
      ></div>
    </div>

    <!-- Bottom cyber decor borders -->
    <div
      class="absolute -bottom-8 left-0 flex gap-4 w-1/3 h-6 [clip-path:polygon(0_0,100%_0,90%_100%,0_100%)] bg-pink-600/80"
    ></div>
    <div
      class="absolute -bottom-8 right-0 flex gap-4 w-1/3 h-6 [clip-path:polygon(0_0,100%_0,100%_100%,10%_100%)] bg-pink-600/80"
    ></div>
  </div>
  
  <!-- Default placeholder if no video -->
  <div v-else class="w-full max-w-6xl mx-auto relative group" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="400">
      <div
        class="absolute -inset-[3px] bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 rounded-sm blur-[2px] opacity-75 transition-all duration-1000 [clip-path:polygon(5%_0%,95%_0%,100%_5%,100%_95%,95%_100%,5%_100%,0%_95%,0%_5%)]"
      ></div>
      <div class="relative w-full aspect-video bg-[#0a0a0a] [clip-path:polygon(5%_0%,95%_0%,100%_5%,100%_95%,95%_100%,5%_100%,0%_95%,0%_5%)] flex items-center justify-center overflow-hidden border-2 border-transparent">
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
          class="absolute w-full h-full object-cover opacity-60 mix-blend-screen scale-105"
          alt="Stage Welcome"
        />
        <div class="relative z-10 flex flex-col items-center">
          <div
            class="w-32 h-32 md:w-48 md:h-48 rounded-full border border-blue-400/50 flex items-center justify-center p-2 backdrop-blur-sm shadow-[0_0_30px_rgba(59,130,246,0.3)] inset-0 animate-[spin_10s_linear_infinite]"
          >
            <div
              class="w-full h-full rounded-full border border-red-500/50 border-t-red-500 border-l-transparent border-b-transparent border-r-transparent animate-[spin_5s_linear_infinite_reverse]"
            ></div>
          </div>
          <h2
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl md:text-5xl font-black tracking-[0.2em] text-white mix-blend-overlay opacity-90"
          >
            WELCOME
          </h2>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useHomeVideoStore } from '@/store/homeVideo'
import { useI18n } from 'vue-i18n'

const homeVideoStore = useHomeVideoStore()
const { locale } = useI18n()

onMounted(async () => {
  await homeVideoStore.fetchVideos({ isActive: true, limit: 1 })
})

const activeVideo = computed(() => {
  return homeVideoStore.videos.length > 0 ? homeVideoStore.videos[0] : null
})

const localizedTitle = computed(() => {
  if (!activeVideo.value) return ''
  const lang = locale.value
  if (lang === 'en') return activeVideo.value.title_en || activeVideo.value.title_vi
  if (lang === 'zh') return activeVideo.value.title_zh || activeVideo.value.title_vi
  return activeVideo.value.title_vi
})

const isVideoType = computed(() => {
  if (!activeVideo.value) return false
  const url = activeVideo.value.url.toLowerCase()
  return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('.mp4') || url.includes('vimeo.com')
})

const isYoutube = computed(() => {
  if (!activeVideo.value) return false
  return activeVideo.value.url.includes('youtube.com') || activeVideo.value.url.includes('youtu.be')
})

const embedUrl = computed(() => {
  if (!activeVideo.value || !isYoutube.value) return ''
  let videoId = ''
  if (activeVideo.value.url.includes('v=')) {
    videoId = activeVideo.value.url.split('v=')[1].split('&')[0]
  } else if (activeVideo.value.url.includes('youtu.be/')) {
    videoId = activeVideo.value.url.split('youtu.be/')[1].split('?')[0]
  }
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&playlist=${videoId}`
})
</script>
