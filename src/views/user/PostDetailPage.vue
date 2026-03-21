<template>
  <div class="pt-[90px] min-h-screen bg-[#0a0a14] text-white overflow-hidden">
    <div v-if="postStore.loading" class="flex justify-center items-center h-[50vh]">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
    </div>

    <template v-else-if="postStore.currentPost">
      <!-- Hero Banner -->
      <section class="relative pt-32 pb-20 flex flex-col items-center justify-center text-center border-b border-red-900/30 overflow-hidden" data-aos="fade-down">
        <div class="absolute inset-0 z-0">
          <div class="absolute inset-0 bg-gradient-to-b from-red-900/40 via-[#0a0a14]/80 to-[#0a0a14]"></div>
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-red-600/20 blur-[100px] rounded-full pointer-events-none"></div>
        </div>

        <div class="relative z-10 w-full max-w-4xl mx-auto px-6">
          <!-- Category badge -->
          <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-red-400 text-xs font-bold uppercase tracking-widest mb-6" data-aos="fade-up" data-aos-delay="50">
            <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            {{ $t('POST.LABEL') }}
          </div>

          <!-- Title -->
          <h1 class="text-3xl md:text-5xl lg:text-6xl font-black uppercase text-white mb-6 leading-tight tracking-tight drop-shadow-[0_0_15px_rgba(220,38,38,0.4)]" data-aos="fade-up" data-aos-delay="100">
            {{ getTitle(postStore.currentPost) }}
          </h1>

          <!-- Meta info -->
          <div class="flex items-center justify-center gap-6 text-gray-400 text-sm font-medium uppercase tracking-widest" data-aos="fade-up" data-aos-delay="150">
            <div class="flex items-center gap-2">
              <i class="pi pi-calendar text-red-500 text-xs"></i>
              <span>{{ formatDate(postStore.currentPost.createdAt, locale) }}</span>
            </div>
          </div>
        </div>

        <!-- Bottom Glow Line -->
        <div class="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
      </section>

      <!-- Content Area -->
      <main class="container mx-auto px-6 py-16 max-w-4xl">
        <div class="prose prose-invert prose-lg max-w-none" v-html="getContent(postStore.currentPost)" data-aos="fade-up"></div>

        <div class="mt-16 flex justify-center" data-aos="fade-up">
          <button
            @click="$router.back()"
            class="px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl transition-all uppercase tracking-widest text-sm shadow-lg shadow-red-600/20 group"
          >
            <span class="inline-block transition-transform group-hover:-translate-x-1 mr-2">←</span>
            {{ $t('COMMON.BACK') }}
          </button>
        </div>
      </main>
    </template>

    <div v-else class="flex flex-col justify-center items-center h-[70vh] text-gray-400 gap-6">
      <div class="text-6xl text-white/5 font-black">{{ $t('COMMON.404') }}</div>
      <p>{{ $t('POST.NOT_FOUND') }}</p>
      <button @click="$router.push('/')" class="px-6 py-2 bg-red-600 text-white rounded-lg uppercase text-sm font-bold">{{ $t('COMMON.GO_HOME') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePostStore } from '@/store/post.store'
import { useI18n } from 'vue-i18n'
import AOS from 'aos'
import type { IPost } from '@/types/post'
import { formatDate } from '@/utils/common'

const route = useRoute()
const postStore = usePostStore()
const { locale } = useI18n()

const getTitle = (post: IPost) => {
  if (!post) return ''
  const key = `title_${locale.value}` as keyof IPost
  return (post[key] as string) || post.title_vi || ''
}

const getContent = (post: IPost) => {
  if (!post) return ''
  const key = `content_${locale.value}` as keyof IPost
  return (post[key] as string) || post.content_vi || ''
}

const loadPost = async (slug: string) => {
  await postStore.fetchPostBySlug(slug)
  window.scrollTo(0, 0)
}

onMounted(() => {
  AOS.refresh()
  const slug = route.params.slug as string
  if (slug) {
    loadPost(slug)
  }
})

watch(() => route.params.slug, (newSlug) => {
  if (newSlug) {
    loadPost(newSlug as string)
  }
})
</script>

<style>
.prose img {
  border-radius: 1rem;
  max-width: 100%;
  height: auto;
  margin: 3rem auto;
  display: block;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}

.prose h2, .prose h3 {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #ef4444;
  margin-top: 3rem;
}
</style>
