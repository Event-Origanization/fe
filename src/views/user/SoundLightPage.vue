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
          {{ $t('NAV.SOUND_LIGHT') }}
        </h1>
        <div class="flex items-center justify-center gap-2 text-sm md:text-base font-medium text-gray-300 uppercase tracking-widest" data-aos="fade-up" data-aos-delay="100">
          <router-link to="/" class="hover:text-red-500 transition-colors">{{ $t('COMMON.BREADCRUMB_HOME') }}</router-link>
          <span class="text-gray-600">-</span>
          <span class="text-red-500 font-bold drop-shadow-[0_0_5px_rgba(220,38,38,0.6)]">{{ $t('NAV.SOUND_LIGHT') }}</span>
        </div>
      </div>
      
      <!-- Bottom Red Glow Line -->
      <div class="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50 shadow-[0_0_10px_rgba(220,38,38,1)]"></div>
    </section>

    <!-- MAIN CONTENT -->
    <main class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- TRÁI: DANH SÁCH GÓI DỊCH VỤ -->
        <div class="lg:col-span-8 flex flex-col gap-6" data-aos="fade-right">
          <div class="mb-4">
            <h2 class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 uppercase tracking-widest">
              {{ $t('PRODUCT_ADMIN.FIELDS.TYPE') }}
            </h2>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div v-if="productStore.loading" class="col-span-3 flex justify-center items-center w-full h-[50vh]">
              <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
            <!-- Sản phẩm / Gói -->
            <div v-for="(item, idx) in productStore.soundLightProducts" :key="item.id" @click="goToProduct(item.slug)" class="group flex flex-col items-center cursor-pointer bg-white/[0.02] border border-white/5 rounded-lg overflow-hidden hover:border-red-500/50 hover:bg-white/[0.05] transition-all duration-300" data-aos="zoom-in" :data-aos-delay="idx * 50">
              <div class="w-full aspect-[4/3] bg-white/10 p-4 relative overflow-hidden flex items-center justify-center">
                <img :src="item.images && item.images[0] ? item.images[0] : 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=400'" :alt="getName(item)" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 drop-shadow-lg" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div class="p-4 w-full text-center border-t border-white/5">
                <h3 class="font-bold text-sm md:text-base text-gray-200 group-hover:text-red-400 transition-colors line-clamp-2">
                  {{ getName(item) }}
                </h3>
              </div>
            </div>
          </div>
          
          <!-- Pagination -->
          <div v-if="productStore.soundLightTotalPages > 1" class="flex justify-center mt-12 gap-2" data-aos="fade-up">
            <button 
              v-for="p in productStore.soundLightTotalPages" 
              :key="p"
              @click="changePage(p)"
              class="w-10 h-10 flex items-center justify-center rounded-lg border transition-all duration-300 font-bold"
              :class="productStore.soundLightCurrentPage === p 
                ? 'border-red-600 bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]' 
                : 'border-white/10 text-gray-400 hover:border-red-500/50 hover:text-white bg-white/5'"
            >
              {{ p }}
            </button>
          </div>
        </div>

        <ScrollableNewsList
          class="lg:col-span-4"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <template #header>
            <div class="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <h2 class="text-xl font-bold uppercase tracking-widest text-white">{{ $t('COMMON.NEWS') }}</h2>
              <div class="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 transition-all text-gray-400 hover:text-white cursor-pointer group">
                <i class="pi pi-angle-right text-xs group-hover:translate-x-0.5 transition-transform"></i>
              </div>
            </div>
          </template>
        </ScrollableNewsList>

      </div>
      
      <!-- LỢI ÍCH KHI CHỌN CHÚNG TÔI -->
      <section class="mt-28 mb-12" data-aos="fade-up">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-gray-400 uppercase tracking-widest mb-4">
            {{ $t('HOME.ABOUT_SNIPPET.TITLE') }}?
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto">{{ $t('HOME.ABOUT_SNIPPET.DESC') }}</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(benefit, i) in translatedBenefits" :key="i" class="bg-white/5 border border-white/10 p-6 rounded-lg text-center hover:-translate-y-2 hover:border-red-500/50 hover:bg-white/[0.08] hover:shadow-[0_10px_30px_rgba(220,38,38,0.15)] transition-all duration-300 group">
            <div class="w-16 h-16 mx-auto bg-gradient-to-br from-red-600 to-red-900 rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(220,38,38,0.5)] group-hover:scale-110 transition-transform">
              <i :class="['pi text-2xl text-white', benefit.icon]"></i>
            </div>
            <h3 class="font-bold text-white mb-3 tracking-wide uppercase text-sm">{{ benefit.title }}</h3>
            <p class="text-xs text-gray-400 leading-relaxed">{{ benefit.desc }}</p>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AOS from 'aos'
import ScrollableNewsList from '@/components/ScrollableNewsList.vue'
import { useProductStore } from '@/store/product.store'
import { PAGE_KEYS } from '@/constants'
import { ROUTE_NAMES } from '@/router'
import type { IProduct } from '@/types/product'

import { usePostStore } from '@/store/post.store'

const productStore = useProductStore()
const postStore = usePostStore()
const { locale, t } = useI18n()
const router = useRouter()

const getName = (product: IProduct) => {
  if (!product) return ''
  const key = `name_${locale.value}` as keyof IProduct
  return (product[key] as string) || product.name_vi || ''
}

const goToProduct = (slug: string) => {
  if (slug) router.push({ name: ROUTE_NAMES.PRODUCT_DETAIL, params: { slug } })
}

const changePage = async (page: number) => {
  await productStore.fetchPublicProducts({ 
    productType: PAGE_KEYS.SOUND_LIGHT, 
    limit: 12, 
    page 
  })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  await Promise.all([
    productStore.fetchPublicProducts({ 
      productType: PAGE_KEYS.SOUND_LIGHT, 
      limit: 12, 
      page: 1 
    }),
    postStore.fetchRecentNews(50)
  ])
  AOS.init()
  AOS.refresh()
})

const translatedBenefits = computed(() => [
  { icon: 'pi-bolt', title: t('SOUND_LIGHT.BENEFITS.BENEFIT1_TITLE'), desc: t('SOUND_LIGHT.BENEFITS.BENEFIT1_DESC') },
  { icon: 'pi-users', title: t('SOUND_LIGHT.BENEFITS.BENEFIT2_TITLE'), desc: t('SOUND_LIGHT.BENEFITS.BENEFIT2_DESC') },
  { icon: 'pi-wallet', title: t('SOUND_LIGHT.BENEFITS.BENEFIT3_TITLE'), desc: t('SOUND_LIGHT.BENEFITS.BENEFIT3_DESC') },
  { icon: 'pi-check-circle', title: t('SOUND_LIGHT.BENEFITS.BENEFIT4_TITLE'), desc: t('SOUND_LIGHT.BENEFITS.BENEFIT4_DESC') }
])
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
