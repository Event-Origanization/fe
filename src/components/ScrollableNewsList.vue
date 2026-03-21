<template>
  <div class="h-[600px] lg:h-0 lg:min-h-full flex flex-col bg-white/[0.02] border border-white/5 rounded-lg p-5" v-bind="$attrs">
    <slot name="header"></slot>
    <div class="flex-1 overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-4">
      <div v-for="(item, i) in items" :key="i" @click="goToPost(item.slug)" class="flex gap-4 group cursor-pointer border-b border-white/5 pb-4 last:border-0 hover:bg-white/[0.02] p-2 rounded transition-all">
        <div class="w-24 sm:w-28 md:w-32 aspect-video rounded overflow-hidden shrink-0 relative">
          <img :src="item.image || 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=400&ixlib=rb-4.0.3'" alt="News Thumbnail" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div class="absolute top-1 left-1 bg-red-600 w-5 h-5 flex items-center justify-center rounded-sm shadow-sm text-[10px] font-bold">5P</div>
        </div>
        <div class="flex-1">
          <h4 class="font-bold text-xs sm:text-sm text-gray-200 group-hover:text-red-500 transition-colors line-clamp-2 leading-snug mb-1">
            {{ item.title }}
          </h4>
          <p class="text-[10px] sm:text-xs text-gray-500 line-clamp-2">
            {{ item.desc }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePostStore } from '@/store/post.store'
import { useI18n } from 'vue-i18n'

export interface NewsItem {
  title: string
  desc: string
  image?: string
  slug: string
}

const postStore = usePostStore()
const { locale } = useI18n()
const router = useRouter()

const goToPost = (slug: string) => {
  if (slug) router.push({ name: 'PostDetail', params: { slug } })
}

const items = computed<NewsItem[]>(() => {
  return postStore.recentNews.slice(3).map(post => {
    const titleKey = `title_${locale.value}` as keyof typeof post
    const contentKey = `content_${locale.value}` as keyof typeof post
    const title = (post[titleKey] as string) || post.title_vi || ''
    const content = (post[contentKey] as string) || post.content_vi || ''
    return {
      title: title as string,
      desc: (content as string).replace(/<[^>]*>/g, '').substring(0, 100) + '...',
      image: post.media,
      slug: post.slug
    }
  })
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
