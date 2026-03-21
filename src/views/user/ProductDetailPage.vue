<template>
  <div class="pt-[90px] min-h-screen bg-[#0a0a14] text-white overflow-hidden">
    <div v-if="productStore.loading" class="flex justify-center items-center h-[50vh]">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
    </div>
    
    <template v-else-if="productStore.currentProduct">
      <!-- Product Hero Section -->
      <div class="container mx-auto px-6 py-12 lg:py-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          <!-- Left: Image Gallery -->
          <div class="space-y-6" data-aos="fade-right">
            <div class="aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 group cursor-zoom-in">
              <img 
                :src="activeImage || 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800'" 
                :alt="getName(productStore.currentProduct)"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            
            <div v-if="productStore.currentProduct.images && productStore.currentProduct.images.length > 1" class="grid grid-cols-4 gap-4">
              <div 
                v-for="(img, idx) in productStore.currentProduct.images" 
                :key="idx"
                @click="activeImage = img"
                class="aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-300"
                :class="activeImage === img ? 'border-red-600' : 'border-transparent opacity-60 hover:opacity-100'"
              >
                <img :src="img" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <!-- Right: Product Info -->
          <div class="flex flex-col" data-aos="fade-left">
            <div class="mb-8">
              <span class="inline-block px-3 py-1 bg-red-600/10 border border-red-600/20 text-red-500 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                {{ productStore.currentProduct.productType }}
              </span>
              <h1 class="text-3xl md:text-5xl font-black uppercase mb-4 leading-tight tracking-tight">
                {{ getName(productStore.currentProduct) }}
              </h1>
              <div class="h-1 w-20 bg-red-600"></div>
            </div>

            <div class="mb-8 p-6 bg-white/5 rounded-2xl border border-white/5">
              <p class="text-sm text-gray-400 uppercase tracking-widest mb-1">{{ $t('PRODUCT_ADMIN.FIELDS.PRICE') }}</p>
              <div class="text-3xl md:text-4xl font-black text-red-500">
                {{ obfuscateCurrency(productStore.currentProduct.price) }}
              </div>
            </div>

            <!-- Short Detail placeholder or features -->
            <div class="flex-1 space-y-6 mb-10 text-gray-300 leading-relaxed font-light italic border-l-2 border-red-600/30 pl-6">
                {{ $t('HOME.SLOGAN.DESC') }}
            </div>

            <div class="flex flex-wrap gap-4">
              <a :href="configStore.getConfigValue('SOCIAL', 'SOCIAL_ZALO', '#')" target="_blank" class="flex-1 min-w-[200px] px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-center font-black rounded-xl transition-all uppercase tracking-widest shadow-lg shadow-red-600/20 group">
                {{ $t('COMMON.CONTACT_NOW') }}
                <span class="inline-block transition-transform group-hover:translate-x-2 ml-2">→</span>
              </a>
              <button @click="$router.back()" class="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-black rounded-xl border border-white/10 transition-all uppercase tracking-widest">
                {{ $t('COMMON.CANCEL') }}
              </button>
            </div>
          </div>
        </div>

        <!-- Tabs / Detail Content -->
        <div class="mt-20 pt-12 border-t border-white/10" data-aos="fade-up">
          <div class="flex gap-8 mb-10 overflow-x-auto pb-4 border-b border-white/5">
            <button class="text-lg font-bold uppercase tracking-widest text-red-500 border-b-2 border-red-500 pb-2">
              {{ $t('PRODUCT_ADMIN.FIELDS.CONTENT') }}
            </button>
          </div>
          <div class="prose prose-invert prose-lg max-w-none" v-html="getContent(productStore.currentProduct)"></div>
        </div>

        <!-- Related Products Placeholder -->
        <div class="mt-20">
          <h2 class="text-2xl font-black uppercase tracking-widest mb-10 text-center">{{ $t('PRODUCT.RELATED') }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 opacity-50 italic text-center py-10 border border-dashed border-white/10 rounded-2xl">
            {{ $t('PRODUCT.COMING_SOON') }}
          </div>
        </div>
      </div>
    </template>
    
    <div v-else class="flex flex-col justify-center items-center h-[70vh] text-gray-400 gap-6">
      <div class="text-6xl text-white/5 font-black">{{ $t('COMMON.404') }}</div>
      <p>{{ $t('PRODUCT.NOT_FOUND') }}</p>
      <button @click="$router.push('/')" class="px-6 py-2 bg-red-600 text-white rounded-lg uppercase text-sm font-bold">{{ $t('COMMON.GO_HOME') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
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
  if (result && result.images && result.images.length > 0) {
    activeImage.value = result.images[0]
  }
  window.scrollTo(0, 0)
}

onMounted(() => {
  AOS.refresh()
  const slug = route.params.slug as string
  if (slug) {
    loadProduct(slug)
  }
})

watch(() => route.params.slug, (newSlug) => {
  if (newSlug) {
    loadProduct(newSlug as string)
  }
})
</script>

<style scoped>
.prose :deep(img) {
  border-radius: 1rem;
  margin: 3rem auto;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}

.prose :deep(h2), .prose :deep(h3) {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #ef4444; /* red-500 */
  margin-top: 3rem;
}
</style>
