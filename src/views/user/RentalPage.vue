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
          {{ $t('NAV.RENTAL') }}
        </h1>
        <div class="flex items-center justify-center gap-2 text-sm md:text-base font-medium text-gray-300 uppercase tracking-widest" data-aos="fade-up" data-aos-delay="100">
          <router-link to="/" class="hover:text-red-500 transition-colors">{{ $t('COMMON.BREADCRUMB_HOME') }}</router-link>
          <span class="text-gray-600">-</span>
          <span class="text-red-500 font-bold drop-shadow-[0_0_5px_rgba(220,38,38,0.6)]">{{ $t('NAV.RENTAL') }}</span>
        </div>
      </div>
      
      <!-- Bottom Red Glow Line -->
      <div class="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50 shadow-[0_0_10px_rgba(220,38,38,1)]"></div>
    </section>

    <!-- MAIN CONTENT -->
    <main class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- TRÁI: DANH SÁCH HẠNG MỤC -->
        <div class="lg:col-span-8 flex flex-col gap-6" data-aos="fade-right">
          <div class="mb-4">
            <h2 class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 uppercase tracking-widest text-[#cfcfcf]">
              {{ $t('PRODUCT_ADMIN.FIELDS.TYPE') }}
            </h2>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
            <!-- Loading -->
            <div v-if="productStore.loading" class="col-span-3 flex justify-center items-center w-full h-[50vh]">
              <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
            <!-- Sản phẩm / Hạng mục -->
            <div v-for="(item, idx) in productStore.rentalProducts" :key="item.id" @click="goToProduct(item.slug)" class="group flex flex-col cursor-pointer bg-white/[0.02] border border-white/5 rounded-lg overflow-hidden hover:border-red-500/50 hover:bg-white/[0.05] hover:shadow-[0_5px_20px_rgba(220,38,38,0.15)] transition-all duration-300" data-aos="zoom-in" :data-aos-delay="idx * 50">
              <div class="w-full aspect-[4/3] bg-white/10 relative overflow-hidden flex items-center justify-center">
                <img :src="item.images && item.images[0] ? item.images[0] : 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400'" :alt="getName(item)" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 drop-shadow-lg" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div class="p-4 w-full text-center border-t border-white/5 flex items-center justify-center min-h-[70px]">
                <h3 class="font-bold text-sm md:text-base text-gray-200 group-hover:text-red-400 transition-colors line-clamp-2">
                  {{ getName(item) }}
                </h3>
              </div>
            </div>
          </div>
          
          <!-- Pagination -->
          <div v-if="productStore.rentalTotalPages > 1" class="flex justify-center mt-12 gap-2" data-aos="fade-up">
            <button 
              v-for="p in productStore.rentalTotalPages" 
              :key="p"
              @click="changePage(p)"
              class="w-10 h-10 flex items-center justify-center rounded-lg border transition-all duration-300 font-bold"
              :class="productStore.rentalCurrentPage === p 
                ? 'border-red-600 bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]' 
                : 'border-white/10 text-gray-400 hover:border-red-500/50 hover:text-white bg-white/5'"
            >
              {{ p }}
            </button>
          </div>
        </div>

        <!-- PHẢI: TIN TỨC SỰ KIỆN -->
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
      
      <!-- QUY TRÌNH THUÊ THIẾT BỊ (NEW SECTION) -->
      <section class="mt-28 mb-12" data-aos="fade-up">
        <div class="text-center mb-16">
          <h2 class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-gray-400 uppercase tracking-widest mb-4">
            {{ $t('NAV.RENTAL') }} @ 5P EVENT
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto">{{ $t('HOME.ABOUT_SNIPPET.DESC') }}</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <!-- Đường line nối (chỉ hiện trên màn hình lớn) -->
          <div class="hidden lg:block absolute top-[40px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-40 z-0"></div>
          
          <div v-for="(step, i) in translatedSteps" :key="i" class="relative z-10 flex flex-col items-center text-center group" data-aos="zoom-in" :data-aos-delay="i * 100">
            <div class="w-20 h-20 rounded-full bg-[#050510] border-2 border-red-600 flex items-center justify-center text-2xl mb-6 shadow-[0_0_15px_rgba(220,38,38,0.5)] group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300">
              <i :class="['pi text-red-500 group-hover:text-white transition-colors', step.icon]"></i>
            </div>
            <div class="bg-white/5 border border-white/10 p-5 rounded-lg w-full flex-1 hover:border-red-500/50 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300">
              <div class="text-red-500 font-bold mb-2 text-sm tracking-widest text-uppercase">STEP {{ i + 1 }}</div>
              <h3 class="font-bold text-white mb-2 uppercase text-sm tracking-wide">{{ step.title }}</h3>
              <p class="text-xs text-gray-400 leading-relaxed">{{ step.desc }}</p>
            </div>
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
    productType: PAGE_KEYS.RENTAL, 
    limit: 12, 
    page 
  })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  await Promise.all([
    productStore.fetchPublicProducts({ 
      productType: PAGE_KEYS.RENTAL, 
      limit: 12, 
      page: 1 
    }),
    postStore.fetchRecentNews(50)
  ])
  AOS.init()
  AOS.refresh()
})

const translatedSteps = computed(() => [
  { icon: 'pi-comments', title: t('RENTAL.STEPS.STEP1_TITLE'), desc: t('RENTAL.STEPS.STEP1_DESC') },
  { icon: 'pi-file-edit', title: t('RENTAL.STEPS.STEP2_TITLE'), desc: t('RENTAL.STEPS.STEP2_DESC') },
  { icon: 'pi-truck', title: t('RENTAL.STEPS.STEP3_TITLE'), desc: t('RENTAL.STEPS.STEP3_DESC') },
  { icon: 'pi-star-fill', title: t('RENTAL.STEPS.STEP4_TITLE'), desc: t('RENTAL.STEPS.STEP4_DESC') }
])
</script>
