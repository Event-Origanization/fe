<template>
  <div class="min-h-screen bg-white text-gray-900 overflow-hidden">
    <!-- LOADING STATE -->
    <div v-if="productStore.loading" class="flex justify-center items-center h-screen">
      <div class="flex flex-col items-center gap-6">
        <div
          class="w-16 h-16 border-4 border-gray-100 border-t-brand-600 rounded-full animate-spin"
        ></div>
        <p class="text-gray-400 font-medium uppercase tracking-widest text-xs">Loading...</p>
      </div>
    </div>

    <template v-else-if="productStore.currentProduct">
      <!-- HERO SECTION: Parallax-style split layout -->
      <section class="max-w-[1440px] mx-auto px-6 lg:px-20 pt-16 pb-24">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <!-- LEFT: Image Gallery -->
          <div class="lg:col-span-6 space-y-4" data-aos="fade-right" data-aos-duration="1000">
            <!-- Main image -->
            <div
              class="relative group overflow-hidden rounded-[40px] bg-gray-50 border border-gray-100 cursor-zoom-in shadow-2xl"
            >
              <img
                :src="
                  activeImage ||
                  'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800'
                "
                :alt="getName(productStore.currentProduct)"
                class="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <!-- Product type badge (overlaid) -->
              <div
                class="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest text-brand-600 shadow-lg"
              >
                {{ productStore.currentProduct.productType }}
              </div>
            </div>

            <!-- Thumbnail grid -->
            <div
              v-if="
                productStore.currentProduct.images && productStore.currentProduct.images.length > 1
              "
              class="grid grid-cols-4 gap-3"
            >
              <div
                v-for="(img, idx) in productStore.currentProduct.images"
                :key="idx"
                @click="activeImage = img"
                class="aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2"
                :class="
                  activeImage === img
                    ? 'border-brand-600 shadow-lg shadow-brand-600/20 scale-95'
                    : 'border-transparent opacity-60 hover:opacity-100 hover:scale-95'
                "
              >
                <img :src="img" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <!-- RIGHT: Product Info -->
          <div
            class="lg:col-span-6 flex flex-col gap-8 pt-6"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <!-- Tag & Title -->
            <div>
              <span class="text-brand-600 text-xs font-black uppercase tracking-[0.4em] mb-4 block">
                {{ productStore.currentProduct.productType }}
              </span>
              <h1
                class="text-4xl md:text-5xl xl:text-[3.5rem] font-black uppercase leading-tight tracking-tight text-gray-900 mb-6"
              >
                {{ getName(productStore.currentProduct) }}
              </h1>
              <div class="flex items-center gap-4">
                <div class="h-1 w-16 bg-brand-600 rounded-full"></div>
                <div class="h-1 w-8 bg-gray-200 rounded-full"></div>
              </div>
            </div>

            <!-- Price Card -->
            <div
              class="bg-gray-50 rounded-[30px] p-8 border border-gray-100 group hover:border-brand-200 transition-colors"
            >
              <p class="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-3">
                {{ $t('PRODUCT_ADMIN.FIELDS.PRICE') }}
              </p>
              <div
                class="text-4xl md:text-5xl font-black text-gray-900 group-hover:text-brand-600 transition-colors"
              >
                {{ obfuscateCurrency(productStore.currentProduct.price) }}
              </div>
            </div>

            <!-- Quote / short description -->
            <div class="border-l-4 border-brand-600 pl-6">
              <p class="text-gray-500 leading-relaxed font-medium italic text-lg">
                {{ $t('HOME.SLOGAN.DESC') }}
              </p>
            </div>

            <!-- Features (decorative) -->
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="(feat, i) in features"
                :key="i"
                class="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-brand-200 hover:bg-brand-50/30 transition-all"
              >
                <div
                  class="w-8 h-8 rounded-full bg-brand-600/10 flex items-center justify-center shrink-0"
                >
                  <i :class="['pi text-brand-600 text-sm', feat.icon]"></i>
                </div>
                <span class="text-sm font-bold text-gray-700">{{ feat.text }}</span>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-wrap gap-4 pt-4">
              <a
                :href="configStore.getConfigValue('SOCIAL', 'SOCIAL_ZALO', '#')"
                target="_blank"
                class="flex-1 min-w-[200px] flex items-center justify-center gap-3 px-8 py-5 bg-brand-600 hover:bg-black text-white text-center font-black rounded-2xl transition-all uppercase tracking-widest shadow-xl shadow-brand-600/20 hover:shadow-black/20 hover:-translate-y-1 active:translate-y-0 group"
              >
                {{ $t('COMMON.CONTACT_NOW') }}
                <i class="pi pi-arrow-right transition-transform group-hover:translate-x-1"></i>
              </a>
              <button
                @click="$router.back()"
                class="px-8 py-5 bg-gray-900 hover:bg-gray-800 text-white font-black rounded-2xl border border-transparent transition-all uppercase tracking-widest hover:-translate-y-1 active:translate-y-0 group"
              >
                <i class="pi pi-arrow-left transition-transform group-hover:-translate-x-1"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- DETAIL CONTENT SECTION -->
      <section class="bg-gray-50 py-20" data-aos="fade-up">
        <div class="max-w-4xl mx-auto px-6">
          <!-- Section heading -->
          <div class="flex items-center gap-6 mb-12">
            <h2
              class="text-3xl font-black uppercase tracking-tight text-gray-900 whitespace-nowrap"
            >
              {{ $t('PRODUCT_ADMIN.FIELDS.CONTENT') }}
            </h2>
            <div class="h-px flex-1 bg-gray-200"></div>
          </div>

          <div
            class="bg-white rounded-[40px] p-10 lg:p-16 shadow-sm border border-gray-100 prose prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-h2:text-2xl prose-h2:text-brand-600 prose-h3:text-xl prose-h3:text-gray-800 prose-p:text-gray-600 prose-p:leading-relaxed prose-img:rounded-3xl prose-img:shadow-xl prose-img:my-10 prose-a:text-brand-600 prose-a:font-bold prose-strong:text-gray-900"
            v-html="getContent(productStore.currentProduct)"
          ></div>
        </div>
      </section>

      <!-- RELATED / COMING SOON PLACEHOLDER -->
      <section class="max-w-[1440px] mx-auto px-6 lg:px-20 py-24" data-aos="fade-up">
        <div class="flex items-center gap-6 mb-12">
          <h2 class="text-3xl font-black uppercase tracking-tight whitespace-nowrap">
            {{ $t('PRODUCT.RELATED') }}
          </h2>
          <div class="h-px flex-1 bg-gray-100"></div>
        </div>
        <div
          class="flex flex-col items-center justify-center py-20 rounded-[40px] border-2 border-dashed border-gray-200 bg-gray-50 gap-6"
        >
          <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <i class="pi pi-clock text-2xl text-gray-300"></i>
          </div>
          <p class="text-gray-400 font-bold uppercase tracking-widest text-sm">
            {{ $t('PRODUCT.COMING_SOON') }}
          </p>
        </div>
      </section>
    </template>

    <!-- 404 STATE -->
    <div v-else class="flex flex-col justify-center items-center h-screen gap-8">
      <div class="text-[120px] font-black text-gray-50 leading-none select-none">404</div>
      <p class="text-gray-400 font-bold uppercase tracking-widest text-sm">
        {{ $t('PRODUCT.NOT_FOUND') }}
      </p>
      <button
        @click="$router.push('/')"
        class="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-full uppercase text-sm font-black tracking-widest transition-all"
      >
        {{ $t('COMMON.GO_HOME') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/store/product.store'
import { useI18n } from 'vue-i18n'
import AOS from 'aos'
import type { IProduct } from '@/types/product'
import { obfuscateCurrency } from '@/utils/common'
import { useConfigStore } from '@/store/config'

const route = useRoute()
const productStore = useProductStore()
const configStore = useConfigStore()
const { locale } = useI18n()

const activeImage = ref('')
const readProgress = ref(0)

const updateProgress = () => {
  const el = document.documentElement
  const scrollTop = el.scrollTop || document.body.scrollTop
  const scrollHeight = el.scrollHeight - el.clientHeight
  readProgress.value = scrollHeight > 0 ? Math.min(100, (scrollTop / scrollHeight) * 100) : 0
}

const features = [
  { icon: 'pi-check-circle', text: 'Chất lượng đảm bảo' },
  { icon: 'pi-shield', text: 'Cam kết bảo hành' },
  { icon: 'pi-truck', text: 'Giao hàng tận nơi' },
  { icon: 'pi-star', text: 'Dịch vụ chuyên nghiệp' },
]

const getName = (product: IProduct) => {
  if (!product) return ''
  const key = `name_${locale.value}` as keyof IProduct
  return (product[key] as string) || product.name_vi || ''
}

const getContent = (product: IProduct) => {
  if (!product) return ''
  const key = `content_${locale.value}` as keyof IProduct
  return (product[key] as string) || product.content_vi || ''
}

const loadProduct = async (slug: string) => {
  const result = await productStore.fetchProductBySlug(slug)
  if (result?.images && result.images.length > 0) {
    activeImage.value = result.images[0]
  }
  window.scrollTo(0, 0)
}

onMounted(() => {
  AOS.init({ duration: 900, once: true })
  const slug = route.params.slug as string
  if (slug) loadProduct(slug)
  window.addEventListener('scroll', updateProgress, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})

watch(
  () => route.params.slug,
  (newSlug) => {
    if (newSlug) loadProduct(newSlug as string)
  },
)
</script>

<style scoped>
.prose :deep(img) {
  border-radius: 1.5rem;
  margin: 3rem auto;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
}

.prose :deep(h2),
.prose :deep(h3) {
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #dc2626;
  margin-top: 2.5rem;
}
</style>
