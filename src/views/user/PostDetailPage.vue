<template>
  <div class="min-h-screen bg-white text-gray-900">
    <!-- LOADING STATE -->
    <div v-if="postStore.loading" class="flex justify-center items-center h-screen">
      <div class="flex flex-col items-center gap-6">
        <div
          class="w-16 h-16 border-4 border-gray-100 border-t-brand-600 rounded-full animate-spin"
        ></div>
        <p class="text-gray-400 font-medium uppercase tracking-widest text-xs">Loading...</p>
      </div>
    </div>

    <template v-else-if="postStore.currentPost">
      <!-- HERO BANNER: Full-bleed image with overlay -->
      <section class="relative w-full h-[60vh] md:h-[70vh]">
        <!-- Background: Featured image or gradient fallback -->
        <div class="absolute inset-0 bg-gray-900">
          <img
            v-if="postStore.currentPost.media"
            :src="postStore.currentPost.media"
            :alt="getTitle(postStore.currentPost)"
            class="w-full h-full object-cover opacity-50"
          />
          <div
            v-else
            class="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          ></div>
        </div>

        <!-- Gradient overlay from bottom -->
        <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30"></div>

        <!-- Red top accent line -->
        <div class="absolute top-0 left-0 w-full h-1 bg-brand-600"></div>

        <!-- Content overlaid on image -->
        <div class="absolute bottom-0 left-0 right-0 px-6 pb-12 max-w-4xl mx-auto">
          <!-- Category pill -->
          <div
            class="inline-flex items-center gap-2 bg-brand-600 text-white text-[11px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-5"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            <span class="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
            {{ $t('POST.LABEL') }}
          </div>
          <h1
            class="text-3xl md:text-5xl lg:text-[3.5rem] font-black leading-tight tracking-tight text-white drop-shadow-2xl"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {{ getTitle(postStore.currentPost) }}
          </h1>
          <div
            class="flex items-center gap-4 mt-5 text-white/70 text-sm font-semibold"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <span class="flex items-center gap-2">
              <i class="pi pi-calendar text-brand-400 text-xs"></i>
              {{ formatDate(postStore.currentPost.publishAt || postStore.currentPost.createdAt, locale) }}
            </span>
          </div>
        </div>
      </section>

      <!-- READING PROGRESS BAR -->
      <div
        class="fixed top-0 left-0 h-1 bg-brand-600 z-[200] transition-all duration-100"
        :style="{ width: readProgress + '%' }"
      ></div>

      <!-- MAIN CONTENT AREA -->
      <main class="max-w-[1280px] mx-auto px-6 py-16 lg:py-24">
        <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <!-- LEFT: TOC Sidebar -->
          <aside
            class="w-full lg:w-1/4 lg:sticky lg:top-28 flex-shrink-0"
            v-if="tocHeadings.length > 0"
          >
            <ExpandableSidebar :title="$t('POST.TOC_TITLE')">
              <li v-for="(heading, idx) in tocHeadings" :key="idx">
                <a
                  href="javascript:void(0)"
                  :class="[
                    'font-bold text-[14px] leading-relaxed hover:text-[#18449c] transition-colors block py-1',
                    heading.level === 'h2'
                      ? 'text-[#4581e6] uppercase'
                      : 'text-[#6b7aab] pl-3 text-[13px] normal-case',
                  ]"
                  @click="scrollToHeading(heading.id)"
                >
                  {{ heading.text }}
                </a>
              </li>
            </ExpandableSidebar>
          </aside>

          <!-- RIGHT: Article Content -->
          <div class="w-full lg:flex-1 min-w-0">
            <!-- Decorative side accent -->
            <div class="relative">
              <div
                class="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-600 via-brand-300 to-transparent rounded-full opacity-30 hidden lg:block"
              ></div>

              <div
                ref="contentRef"
                class="prose prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-h2:text-3xl prose-h2:text-brand-600 prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:text-gray-800 prose-h3:mt-8 prose-h3:mb-3 prose-p:text-gray-600 prose-p:leading-[1.9] prose-p:mb-6 prose-img:rounded-3xl prose-img:shadow-2xl prose-img:my-12 prose-a:text-brand-600 prose-a:font-bold hover:prose-a:underline prose-strong:text-gray-900 prose-strong:font-black prose-blockquote:border-l-4 prose-blockquote:border-brand-600 prose-blockquote:pl-6 prose-blockquote:not-italic prose-blockquote:text-gray-500"
                v-html="getContent(postStore.currentPost)"
                data-aos="fade-up"
              ></div>
            </div>

            <!-- Divider -->
            <div class="flex items-center gap-6 my-16">
              <div class="flex-1 h-px bg-gray-100"></div>
              <div class="w-2 h-2 bg-brand-600 rounded-full"></div>
              <div class="flex-1 h-px bg-gray-100"></div>
            </div>

            <!-- BACK BUTTON -->
            <div class="flex items-center justify-between" data-aos="fade-up">
              <button
                @click="$router.back()"
                class="group flex items-center gap-3 px-8 py-4 bg-gray-900 hover:bg-brand-600 text-white font-black rounded-2xl transition-all duration-300 uppercase tracking-widest text-sm shadow-xl hover:shadow-brand-600/30 hover:-translate-y-1 active:translate-y-0"
              >
                <i class="pi pi-arrow-left transition-transform group-hover:-translate-x-1"></i>
                {{ $t('COMMON.BACK') }}
              </button>
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-400 uppercase font-black tracking-widest"
                  >Share</span
                >
                <a
                  href="#"
                  @click.prevent="shareToFacebook"
                  class="w-9 h-9 rounded-full bg-gray-100 hover:bg-brand-600 hover:text-white text-gray-900 flex items-center justify-center transition-all"
                  ><i class="pi pi-facebook text-sm"></i
                ></a>
                <a
                  href="#"
                  @click.prevent="copyUrl"
                  class="w-9 h-9 rounded-full bg-gray-100 hover:bg-brand-600 hover:text-white text-gray-900 flex items-center justify-center transition-all"
                  ><i class="pi pi-link text-sm"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </template>

    <!-- 404 STATE -->
    <div v-else class="flex flex-col justify-center items-center h-screen gap-8">
      <div class="text-[120px] font-black text-gray-50 leading-none select-none">404</div>
      <p class="text-gray-400 font-bold uppercase tracking-widest text-sm">
        {{ $t('POST.NOT_FOUND') }}
      </p>
      <button
        @click="$router.push({ name: ROUTE_NAMES.HOME })"
        class="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-full uppercase text-sm font-black tracking-widest transition-all"
      >
        {{ $t('COMMON.GO_HOME') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { usePostStore } from '@/store/post.store'
import { useI18n } from 'vue-i18n'
import AOS from 'aos'
import type { IPost } from '@/types/post'
import { formatDate } from '@/utils/common'
import { ROUTE_NAMES } from '@/router'
import { useToast } from '@/composables/useToast'
import ExpandableSidebar from '@/components/common/ExpandableSidebar.vue'

const route = useRoute()
const postStore = usePostStore()
const { locale, t } = useI18n()
const { toastSuccess, toastError } = useToast()

const readProgress = ref(0)
const contentRef = ref<HTMLElement | null>(null)

interface TocHeading {
  id: string
  text: string
  level: 'h2' | 'h3'
}
const tocHeadings = ref<TocHeading[]>([])

const updateProgress = () => {
  const el = document.documentElement
  const scrollTop = el.scrollTop || document.body.scrollTop
  const scrollHeight = el.scrollHeight - el.clientHeight
  readProgress.value = scrollHeight > 0 ? Math.min(100, (scrollTop / scrollHeight) * 100) : 0
}

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
  await nextTick()
  extractHeadings()
}

const extractHeadings = () => {
  if (!contentRef.value) return
  const elements = contentRef.value.querySelectorAll('h2, h3')
  tocHeadings.value = Array.from(elements).map((el, idx) => {
    const id = `heading-${idx}`
    el.setAttribute('id', id)
    return {
      id,
      text: el.textContent?.trim() || '',
      level: el.tagName.toLowerCase() as 'h2' | 'h3',
    }
  })
}

const scrollToHeading = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const shareToFacebook = () => {
  const url = window.location.href
  console.log(url)
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    '_blank',
    'width=600,height=400',
  )
}

const copyUrl = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    toastSuccess(t('COMMON.COPY_SUCCESS') || 'Copied to clipboard!')
  } catch {
    toastError(t('COMMON.COPY_FAILED') || 'Failed to copy URL')
  }
}

onMounted(() => {
  AOS.init({ duration: 900, once: true })
  const slug = route.params.slug as string
  if (slug) loadPost(slug)
  window.addEventListener('scroll', updateProgress, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})

watch(
  () => route.params.slug,
  (newSlug) => {
    if (newSlug) loadPost(newSlug as string)
  },
)

watch(
  () => locale.value,
  async () => {
    // Wait for Vue to update the DOM via v-html
    await nextTick()
    extractHeadings()
  }
)
</script>

<style>
.prose img {
  border-radius: 1.5rem;
  max-width: 100%;
  height: auto;
  margin: 3rem auto;
  display: block;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.12);
}

.prose h2 {
  position: relative;
  padding-left: 1rem;
}

.prose h2::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 70%;
  background: #dc2626;
  border-radius: 4px;
}

/* Fix for ul, ol in post content */
.prose ul {
  list-style-type: disc !important;
  padding-left: 1.5rem !important;
  margin-top: 1.5rem !important;
  margin-bottom: 1rem !important;
}

.prose ol {
  list-style-type: decimal !important;
  padding-left: 1.5rem !important;
  margin-top: 1.5rem !important;
  margin-bottom: 2rem !important;
}

.prose li {
  margin-bottom: 0.8rem;
}

.prose p {
  margin-bottom: 1rem !important;
  line-height: 1.5 !important;
}

.prose h2, .prose h3 {
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
}

/* Đảm bảo ảnh không bị dính chữ */
.prose img {
  margin-top: 2rem !important;
  margin-bottom: 2rem !important;
}
</style>
