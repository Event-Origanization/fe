<template>
  <div class="w-full bg-[#050510] min-h-screen text-white">
    <!-- PAGE BANNER -->
    <section class="relative pt-32 pb-20 flex flex-col items-center justify-center text-center border-b border-red-900/30 overflow-hidden">
      <!-- Background Effects -->
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-b from-red-900/40 via-[#050510]/80 to-[#050510]"></div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-red-600/20 blur-[100px] rounded-full pointer-events-none"></div>
      </div>
      
      <div class="relative z-10 w-full max-w-7xl mx-auto px-4">
        <h1 class="text-4xl md:text-6xl font-black uppercase text-white mb-4 tracking-widest drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]" data-aos="fade-down">
          {{ $t('NAV.EVENTS') }}
        </h1>
        <div class="flex items-center justify-center gap-2 text-sm md:text-base font-medium text-gray-300 uppercase tracking-widest" data-aos="fade-up" data-aos-delay="100">
          <router-link to="/" class="hover:text-red-500 transition-colors">{{ $t('COMMON.BREADCRUMB_HOME') }}</router-link>
          <span class="text-gray-600">-</span>
          <span class="text-red-500 font-bold drop-shadow-[0_0_5px_rgba(220,38,38,0.6)]">{{ $t('NAV.EVENTS') }}</span>
        </div>
      </div>
      
      <!-- Bottom Red Glow Line -->
      <div class="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50 shadow-[0_0_10px_rgba(220,38,38,1)]"></div>
    </section>

    <!-- MAIN CONTENT -->
    <main class="container mx-auto px-4 py-16">
      
      <!-- RECENT NEWS SECTION (TIN GẦN ĐÂY) -->
      <section class="mb-24">
        <div class="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
          <h2 class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 uppercase tracking-widest" data-aos="fade-right">
            {{ $t('POST.RECENT') }}
          </h2>
          <div class="flex items-center gap-2 cursor-pointer group" data-aos="fade-left">
            <span class="text-sm font-bold uppercase text-gray-400 group-hover:text-white transition-colors">{{ $t('COMMON.NEWS') }}</span>
            <div class="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-red-600 transition-all text-gray-400 group-hover:text-white">
              <i class="pi pi-angle-right text-xs"></i>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Left: Big Images -->
          <div class="lg:col-span-7 flex flex-col gap-4" data-aos="fade-up">
            <!-- Loading -->
            <div v-if="postStore.loading" class="col-span-3 flex justify-center items-center w-full h-[50vh]">
              <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
            <!-- Top large image -->
            <div v-if="postStore.recentNews[0]" @click="goToPost(postStore.recentNews[0].slug)" class="w-full aspect-video rounded overflow-hidden relative group cursor-pointer border border-white/5 hover:border-red-500/30 transition-all">
              <img :src="postStore.recentNews[0].media" :alt="getTitle(postStore.recentNews[0])" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div class="absolute inset-10 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                  <h3 class="text-white font-black text-xl lg:text-3xl uppercase leading-tight group-hover:text-red-500 transition-colors line-clamp-2">
                    {{ getTitle(postStore.recentNews[0]) }}
                  </h3>
              </div>
            </div>
            <!-- Bottom 2 halves -->
            <div class="grid grid-cols-2 gap-4">
              <div v-if="postStore.recentNews[1]" @click="goToPost(postStore.recentNews[1].slug)" class="w-full aspect-[4/3] rounded overflow-hidden relative group cursor-pointer border border-white/5 hover:border-red-500/30 transition-all">
                <img :src="postStore.recentNews[1].media" :alt="getTitle(postStore.recentNews[1])" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 origin-center" />
                <div class="absolute top-2 left-2 bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded">{{ $t('COMMON.HOT') }}</div>
                 <div class="absolute inset-0 bg-black/40 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <h4 class="text-white font-bold text-xs uppercase line-clamp-2">{{ getTitle(postStore.recentNews[1]) }}</h4>
                 </div>
              </div>
              <div v-if="postStore.recentNews[2]" @click="goToPost(postStore.recentNews[2].slug)" class="w-full aspect-[4/3] rounded overflow-hidden relative group cursor-pointer border border-white/5 hover:border-red-500/30 transition-all">
                <img :src="postStore.recentNews[2].media" :alt="getTitle(postStore.recentNews[2])" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 origin-center" />
                <div class="absolute top-2 left-2 bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded">{{ $t('COMMON.HOT') }}</div>
                <div class="absolute inset-0 bg-black/40 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <h4 class="text-white font-bold text-xs uppercase line-clamp-2">{{ getTitle(postStore.recentNews[2]) }}</h4>
                 </div>
              </div>
            </div>
          </div>

          <!-- Right: Scrollable News List -->
          <ScrollableNewsList 
            class="lg:col-span-5" 
            data-aos="fade-left" 
            data-aos-delay="200"
          />
        </div>
      </section>

      <!-- LIBRARY SECTION (KHO THƯ VIỆN) -->
      <section class="mb-16">
        <div class="text-center mb-10" data-aos="fade-up">
          <h2 class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-gray-400 uppercase tracking-widest mb-6">
            {{ $t('POST.LIBRARY') }}
          </h2>
          
          <div class="flex justify-center gap-2">
            <button 
              @click="activeTab = 'images'" 
              class="px-6 py-2 border rounded font-bold text-xs uppercase tracking-widest transition-all duration-300"
              :class="activeTab === 'images' ? 'border-red-600 bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.5)]' : 'border-white/20 text-gray-400 hover:border-white/50 hover:text-white'"
            >
              {{ $t('POST.TAB_IMAGES') }}
            </button>
            <button 
              @click="activeTab = 'videos'" 
              class="px-6 py-2 border rounded font-bold text-xs uppercase tracking-widest transition-all duration-300"
              :class="activeTab === 'videos' ? 'border-red-600 bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.5)]' : 'border-white/20 text-gray-400 hover:border-white/50 hover:text-white'"
            >
              {{ $t('POST.TAB_VIDEOS') }}
            </button>
          </div>
        </div>

        <!-- Grid Images -->
        <div v-if="activeTab === 'images'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-in">
          <div v-for="post in postStore.posts" :key="post.id" @click="goToPost(post.slug)" class="group relative rounded-lg overflow-hidden aspect-[4/3] bg-white/5 border border-white/5 hover:border-red-500/30 cursor-pointer">
            <img :src="post.media || `https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800`" :alt="getTitle(post)" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
              <span class="text-red-500 text-xs font-bold tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 uppercase">{{ $t('POST.FEATURED_EVENT') }}</span>
              <h3 class="text-white font-bold leading-tight transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 line-clamp-2 uppercase">
                {{ getTitle(post) }}
              </h3>
              <div class="text-gray-400 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">{{ formatDate(post.createdAt, locale) }}</div>
            </div>
            <!-- Top left mark -->
            <div class="absolute top-0 left-0 w-10 h-10 bg-red-600 [clip-path:polygon(0_0,100%_0,0_100%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>

        <!-- Grid Videos -->
        <div v-if="activeTab === 'videos'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-in">
          <div v-for="i in 6" :key="'vid'+i" class="group relative rounded-lg overflow-hidden aspect-video bg-white/5 border border-white/5 hover:border-red-500/30 cursor-pointer">
            <img :src="`https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800`" alt="Gallery Video" class="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-60 transition-all duration-700" />
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-14 h-14 rounded-full bg-red-600/80 text-white flex items-center justify-center pl-1 group-hover:scale-110 shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-transform">
                <i class="pi pi-play text-xl"></i>
              </div>
            </div>
            <div class="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
              <h3 class="text-white font-bold text-sm line-clamp-1">HIGHLIGHT VIDEO SỰ KIỆN YEU FESTIVAL</h3>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="activeTab === 'images' && postStore.totalPages > 1" class="flex justify-center mt-12 gap-2" data-aos="fade-up">
          <button 
            v-for="p in postStore.totalPages" 
            :key="p"
            @click="changePage(p)"
            class="w-8 h-8 flex items-center justify-center rounded border transition-colors text-sm font-medium"
            :class="postStore.currentPage === p ? 'border-red-600 bg-red-600 text-white' : 'border-white/20 text-gray-400 hover:border-white/50 hover:text-white'"
          >
            {{ p }}
          </button>
          <button 
             v-if="postStore.currentPage < postStore.totalPages"
             @click="changePage(postStore.currentPage + 1)"
             class="w-8 h-8 flex items-center justify-center rounded border border-white/20 text-gray-400 hover:border-white/50 hover:text-white transition-colors text-sm"
          >
            <i class="pi pi-angle-right text-xs"></i>
          </button>
        </div>

      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AOS from 'aos'
import ScrollableNewsList from '@/components/ScrollableNewsList.vue'
import { usePostStore } from '@/store/post.store'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { formatDate } from '@/utils/common'
import type { IPost } from '@/types/post'
import { ROUTE_NAMES } from '@/router'

const postStore = usePostStore()
const { locale } = useI18n()
const router = useRouter()
const activeTab = ref<'images' | 'videos'>('images')

const goToPost = (slug: string) => {
  if (slug) {
    router.push({ name: ROUTE_NAMES.POST_DETAIL, params: { slug } })
  }
}

const getTitle = (post: IPost) => {
  if (!post) return ''
  const key = `title_${locale.value}` as keyof IPost
  return (post[key] as string) || post.title_vi || ''
}

const changePage = (p: number) => {
  postStore.fetchPosts({ page: p, limit: 6 })
}

onMounted(async () => {
  AOS.refresh()
  await postStore.fetchRecentNews(50)
  await postStore.fetchPosts({ limit: 6, page: 1 })
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(220, 38, 38, 0.5); /* red-600 with opacity */
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(220, 38, 38, 0.8);
}
</style>
