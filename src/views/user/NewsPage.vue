<template>
  <div class="w-full bg-white text-gray-900 font-outfit pb-20">
    <!-- PAGE BANNER -->
    <section class="relative pt-32 pb-20 flex flex-col items-center justify-center text-center border-b border-gray-100 overflow-hidden bg-[#f8fafc]">
      <div class="absolute inset-0 z-0">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-brand-50 blur-[100px] rounded-full pointer-events-none"></div>
      </div>
      
      <div class="relative z-10 w-full max-w-7xl mx-auto px-4">
        <h1 class="text-4xl md:text-6xl font-black uppercase text-gray-900 mb-4 tracking-tighter" data-aos="fade-down">
          {{ $t('NEWS_PAGE.HERO_TITLE') }}
        </h1>
        <div class="flex items-center justify-center gap-2 text-sm md:text-base font-bold text-gray-400 uppercase tracking-widest" data-aos="fade-up" data-aos-delay="100">
          <router-link to="/" class="hover:text-brand-600 transition-colors">{{ $t('COMMON.BREADCRUMB_HOME') }}</router-link>
          <span class="text-gray-300">-</span>
          <span class="text-brand-600">{{ $t('NEWS_PAGE.BREADCRUMB_ACTIVE') }}</span>
        </div>
      </div>
    </section>

    <!-- MAIN CONTENT -->
    <main class="container mx-auto px-4 py-20">
      
      <!-- LATEST NEWS (TIN NỔI BẬT) -->
      <section class="mb-24" v-if="postStore.recentNews.length > 0">
        <div class="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-4" data-aos="fade-right">
          <div>
            <h4 class="text-brand-600 font-bold uppercase tracking-widest text-sm mb-2">{{ $t('NEWS_PAGE.SECTION_SUBTITLE') }}</h4>
            <h2 class="text-3xl font-black text-gray-900 uppercase tracking-widest">
              {{ $t('NEWS_PAGE.SECTION_TITLE') }}
            </h2>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- Main Big Post -->
          <div class="lg:col-span-7 group cursor-pointer" @click="goToPost(postStore.recentNews[0].slug)" data-aos="fade-up">
            <div class="w-full aspect-[4/3] rounded-[30px] overflow-hidden relative shadow-lg hover:shadow-[0_24px_60px_rgba(220,38,38,0.15)] mb-6 transition-shadow duration-500">
              <img :src="postStore.recentNews[0].media || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000'" :alt="getTitle(postStore.recentNews[0])" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div class="absolute top-6 left-6 bg-brand-600 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-md">{{ $t('NEWS_PAGE.TAG_HOT') }}</div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div class="flex items-center gap-3 text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
              <i class="pi pi-calendar text-brand-600"></i>
              {{ formatDate(postStore.recentNews[0].createdAt, locale) }}
            </div>
            <h3 class="text-3xl font-black text-gray-900 group-hover:text-brand-600 transition-colors duration-300 mb-4 leading-tight line-clamp-2 uppercase">
              {{ getTitle(postStore.recentNews[0]) }}
            </h3>
            <p class="text-gray-600 text-base line-clamp-3">{{ $t('NEWS_PAGE.HOT_NEWS_DESC') }}</p>
          </div>

          <!-- 2 Smaller Featured Posts -->
          <div class="lg:col-span-5 flex flex-col gap-8">
            <div v-for="(post, i) in postStore.recentNews.slice(1, 4)" :key="post.id" @click="goToPost(post.slug)" class="group cursor-pointer flex gap-4 md:gap-6 items-center bg-white border border-gray-100 p-4 rounded-[24px] shadow-sm hover:shadow-[0_12px_40px_rgba(220,38,38,0.1)] hover:border-brand-200 hover:-translate-y-1 transition-all duration-400" data-aos="fade-left" :data-aos-delay="i * 100 + 100">
               <div class="w-1/3 aspect-square rounded-[16px] overflow-hidden flex-shrink-0 relative">
                 <img :src="post.media || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=400'" :alt="getTitle(post)" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                 <div class="absolute inset-0 bg-brand-600/0 group-hover:bg-brand-600/15 transition-all duration-400"></div>
               </div>
               <div class="flex flex-col py-2 flex-1">
                 <div class="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                   <i class="pi pi-clock text-brand-400"></i>
                   {{ formatDate(post.createdAt, locale) }}
                 </div>
                 <h4 class="text-sm sm:text-base md:text-lg font-black text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-3 leading-tight uppercase">
                   {{ getTitle(post) }}
                 </h4>
               </div>
            </div>
            
            <!-- <div class="mt-auto bg-brand-50 rounded-[24px] p-6 border border-brand-100 text-center flex flex-col items-center justify-center">
               <i class="pi pi-envelope text-4xl text-brand-500 mb-4 opacity-70"></i>
               <h3 class="font-black text-lg text-gray-900 uppercase mb-2">{{ $t('NEWS_PAGE.NEWSLETTER_TITLE') }}</h3>
               <p class="text-xs text-gray-600 mb-4">{{ $t('NEWS_PAGE.NEWSLETTER_DESC') }}</p>
               <div class="flex w-full bg-white rounded-full p-1 border border-brand-200 shadow-sm">
                 <input type="email" :placeholder="$t('NEWS_PAGE.NEWSLETTER_PLACEHOLDER')" class="flex-1 bg-transparent border-none outline-none text-sm px-4 text-gray-900" />
                 <button class="bg-brand-600 hover:bg-brand-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                   <i class="pi pi-arrow-right text-sm"></i>
                 </button>
               </div>
            </div> -->
          </div>
        </div>
      </section>

      <!-- ALL NEWS GRID & SIDEBAR -->
      <section>
        <div class="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4" data-aos="fade-up">
           <h2 class="text-2xl font-black text-gray-900 uppercase tracking-widest flex items-center gap-3">
             <i class="pi pi-list text-brand-600"></i>
             <template v-if="currentSearch">
               {{ $t('NEWS_PAGE.SEARCH_RESULTS') }} <span class="text-brand-600">"{{ currentSearch }}"</span>
             </template>
             <template v-else>
               {{ $t('NEWS_PAGE.OTHER_POSTS') }}
             </template>
           </h2>
           <button v-if="currentSearch" @click="clearSearch" class="text-xs font-bold text-gray-400 hover:text-brand-600 uppercase tracking-widest transition-colors flex items-center gap-1 group">
             <i class="pi pi-times transition-transform group-hover:rotate-90"></i> {{ $t('NEWS_PAGE.CANCEL_SEARCH') }}
           </button>
        </div>

        <div class="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          
          <!-- LEFT SIDE: Sidebar (Mục lục) -->
          <div class="w-full lg:w-1/3 xl:w-1/4 sticky top-28 flex-shrink-0" data-aos="fade-right">
             <ExpandableSidebar :title="$t('NEWS_PAGE.TOC_TITLE')">
                <li v-for="post in postStore.recentNews" :key="post.id">
                  <a 
                    href="javascript:void(0)" 
                    class="text-[#4581e6] font-bold text-[14px] leading-relaxed hover:text-[#18449c] transition-colors block py-1 uppercase"
                    @click="goToPost(post.slug)"
                  >
                    {{ getTitle(post) }}
                  </a>
                </li>
                <li v-if="postStore.recentNews.length === 0" class="text-gray-400 text-sm italic py-2">
                  {{ $t('NEWS_PAGE.UPDATING') }}
                </li>
             </ExpandableSidebar>
          </div>

          <!-- RIGHT SIDE: Grid -->
          <div class="w-full lg:w-2/3 xl:w-3/4">
             <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <div v-if="postStore.loading" class="col-span-full flex justify-center items-center py-20">
                 <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
               </div>
               
               <template v-else-if="postStore.posts.length > 0">
                 <div v-for="(post, idx) in postStore.posts" :key="post.id" @click="goToPost(post.slug)" class="bg-white rounded-[30px] p-6 shadow-sm border border-gray-100 group cursor-pointer hover:shadow-[0_20px_50px_rgba(220,38,38,0.1)] hover:-translate-y-2 hover:border-brand-200 transition-all duration-500 flex flex-col" data-aos="fade-up" :data-aos-delay="idx % 3 * 100">
                    <div class="w-full aspect-video rounded-[20px] overflow-hidden relative mb-6">
                       <img :src="post.media || `https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600`" :alt="getTitle(post)" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur text-gray-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">{{ $t('NEWS_PAGE.TAG_EVENT') }}</div>
                       <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    <div class="flex items-center justify-between mb-3">
                       <p class="text-[11px] text-gray-500 font-bold tracking-widest uppercase flex items-center gap-2">
                         <i class="pi pi-calendar text-brand-600"></i> {{ formatDate(post.createdAt, locale) }}
                       </p>
                    </div>
                    
                    <h3 class="font-black text-xl text-gray-900 mb-3 leading-tight group-hover:text-brand-600 transition-colors duration-300 line-clamp-2 uppercase">{{ getTitle(post) }}</h3>
                    <p class="text-sm text-gray-500 line-clamp-3 mb-6 block flex-1">{{ $t('NEWS_PAGE.POST_DESC_PLACEHOLDER') }}</p>
                    
                    <div class="border-t border-gray-100 pt-4 mt-auto">
                      <span class="text-xs font-black text-brand-600 uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                        {{ $t('NEWS_PAGE.READ_MORE') }} <i class="pi pi-arrow-right transition-transform group-hover:translate-x-1"></i>
                      </span>
                    </div>
                 </div>
               </template>
               <div v-else class="col-span-full py-20 bg-gray-50 rounded-[40px] text-center" data-aos="fade-up">
                  <div class="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-6">
                     <i class="pi pi-search text-3xl text-gray-300"></i>
                  </div>
                  <h3 class="text-xl font-black text-gray-900 uppercase mb-2">{{ $t('NEWS_PAGE.NO_RESULTS_TITLE') }}</h3>
                  <p class="text-gray-500">{{ $t('NEWS_PAGE.NO_RESULTS_DESC') }}</p>
               </div>
             </div>
             
             <!-- Pagination -->
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
               data-aos="fade-up"
             />
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AOS from 'aos'
import Pagination from '@/components/common/Pagination.vue'
import ExpandableSidebar from '@/components/common/ExpandableSidebar.vue'
import { usePostStore } from '@/store/post.store'
import { formatDate } from '@/utils/common'
import type { IPost } from '@/types/post'
import { ROUTE_NAMES } from '@/router'

defineOptions({
  name: 'NewsPage',
})

const postStore = usePostStore()
const { locale } = useI18n()
const router = useRouter()
const route = useRoute()

const currentSearch = computed(() => route.query.q as string || '')

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

const changePage = async (page: number) => {
  await postStore.fetchPosts({ 
    page, 
    limit: 9,
    search: currentSearch.value 
  })
}

const clearSearch = () => {
  router.push({ name: ROUTE_NAMES.NEWS })
}

const fetchAllData = async () => {
  await Promise.all([
    postStore.fetchRecentNews(10),
    postStore.fetchPosts({ 
      limit: 9, 
      page: 1,
      search: currentSearch.value
    })
  ])
}

onMounted(async () => {
  await fetchAllData()
  AOS.init()
  AOS.refresh()
})

watch(() => route.query.q, async () => {
  await fetchAllData()
  AOS.refresh()
})

// TOC State removed since ExpandableSidebar handles it internally
</script>
