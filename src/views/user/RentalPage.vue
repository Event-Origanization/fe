<template>
  <div class="w-full bg-white min-h-screen text-gray-900 font-outfit pb-20">
    <!-- PAGE BANNER -->
    <section class="relative pt-32 pb-20 flex flex-col items-center justify-center text-center border-b border-gray-100 overflow-hidden bg-[#f8fafc]">
      <!-- Background Effects -->
      <div class="absolute inset-0 z-0">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-brand-50 blur-[100px] rounded-full pointer-events-none"></div>
      </div>
      
      <div class="relative z-10 w-full max-w-7xl mx-auto px-4">
        <h1 class="text-4xl md:text-6xl font-black uppercase text-gray-900 mb-4 tracking-tighter" data-aos="fade-down">
          {{ $t('RENTAL.HERO_TITLE') }}
        </h1>
        <div class="flex items-center justify-center gap-2 text-sm md:text-base font-bold text-gray-400 uppercase tracking-widest" data-aos="fade-up" data-aos-delay="100">
          <router-link to="/" class="hover:text-brand-600 transition-colors">{{ $t('COMMON.BREADCRUMB_HOME') }}</router-link>
          <span class="text-gray-300">-</span>
          <span class="text-brand-600">{{ configStore.getConfigValue('MENU', 'MENU_RENTAL_EVENT', 'CHO THUÊ THIẾT BỊ SỰ KIỆN') }}</span>
        </div>
      </div>
    </section>

    <!-- MAIN CONTENT -->
    <main class="container mx-auto px-4 py-20">
      
      <!-- DANH MỤC 1: CHO THUÊ THIẾT BỊ SỰ KIỆN 5P -->
      <section class="mb-24">
        <div class="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-4" data-aos="fade-right">
          <div>
            <h4 class="text-brand-600 font-bold uppercase tracking-widest text-sm mb-2">5P EVENT</h4>
            <h2 class="text-3xl font-black text-gray-900 uppercase tracking-widest">
              {{ configStore.getConfigValue('MENU', 'MENU_RENTAL_EVENT', 'CHO THUÊ THIẾT BỊ SỰ KIỆN') }}
            </h2>
          </div>
          <p class="text-gray-500 font-medium mt-4 md:mt-0 max-w-sm text-sm">{{ $t('RENTAL.HERO_DESC') }}</p>
        </div>

        <div class="flex flex-col lg:flex-row gap-10">
          <!-- SIDEBAR: FILTER -->
          <aside class="w-full lg:w-72 flex-shrink-0" data-aos="fade-right">
            <div class="bg-gray-50 p-8 rounded-[32px] border border-gray-100 sticky top-24">
              <h3 class="font-black text-gray-900 uppercase tracking-tighter text-xl mb-8 flex items-center gap-3">
                <i class="pi pi-filter text-brand-600"></i>
                {{ $t('PRODUCT.FILTER_TITLE') }}
              </h3>
              
              <!-- Category Filter -->
              <div class="mb-10">
                <h4 class="font-black text-xs text-gray-400 uppercase tracking-widest mb-6 px-1">{{ $t('PRODUCT.CATEGORIES') }}</h4>
                <div class="space-y-4">
                  <label v-for="cat in categories" :key="cat" class="flex items-center gap-3 cursor-pointer group">
                    <div class="relative flex items-center">
                      <input 
                        type="checkbox" 
                        :value="cat" 
                        v-model="selectedCategories"
                        @change="handleFilterChange"
                        class="peer appearance-none w-6 h-6 rounded-lg border-2 border-gray-200 checked:bg-brand-600 checked:border-brand-600 transition-all duration-300 cursor-pointer"
                      />
                      <i class="pi pi-check absolute text-white text-[10px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></i>
                    </div>
                    <span class="text-sm font-bold text-gray-600 group-hover:text-brand-600 transition-colors duration-300 uppercase tracking-wide">
                      {{ $t(`PRODUCT_CATEGORIES.${cat}`) }}
                    </span>
                  </label>
                </div>
              </div>

              <!-- Sort Order -->
              <div>
                <h4 class="font-black text-xs text-gray-400 uppercase tracking-widest mb-4 px-1">{{ $t('PRODUCT.SORT_BY') }}</h4>
                <div class="relative">
                  <select 
                    v-model="sortOption" 
                    @change="handleFilterChange"
                    class="w-full bg-white border-2 border-gray-100 rounded-2xl px-5 py-4 text-sm font-black text-gray-900 focus:outline-none focus:border-brand-600 transition-all appearance-none cursor-pointer"
                  >
                    <option value="newest">{{ $t('PRODUCT.NEWEST') }}</option>
                    <option value="price_asc">{{ $t('PRODUCT.PRICE_ASC') }}</option>
                    <option value="price_desc">{{ $t('PRODUCT.PRICE_DESC') }}</option>
                  </select>
                  <i class="pi pi-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                </div>
              </div>
            </div>
          </aside>

          <!-- CONTENT: PRODUCT GRID -->
          <div class="flex-1">
            <div v-if="productStore.loading" class="flex justify-center items-center py-40">
              <div class="flex flex-col items-center gap-4">
                <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-600"></div>
                <span class="font-bold text-gray-400 uppercase tracking-widest text-xs">{{ $t('COMMON.LOADING') }}</span>
              </div>
            </div>

            <div v-else-if="productStore.rentalProducts.length === 0" class="flex flex-col items-center justify-center py-40 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200" data-aos="zoom-in">
              <i class="pi pi-box text-6xl text-gray-200 mb-6"></i>
              <h3 class="text-xl font-black text-gray-400 uppercase tracking-widest">{{ $t('COMMON.EMPTY_DATA') }}</h3>
            </div>

            <template v-else>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Sản phẩm Hạng mục 1 -->
                <div v-for="(item, idx) in productStore.rentalProducts" :key="item.id" @click="goToProduct(item.slug)" class="group flex flex-col cursor-pointer bg-white border border-gray-100 shadow-sm rounded-[32px] overflow-hidden hover:border-brand-200 hover:shadow-[0_24px_60px_rgba(220,38,38,0.12)] hover:-translate-y-3 transition-all duration-500" data-aos="fade-up" :data-aos-delay="idx % 3 * 100">
                  <div class="w-full aspect-[4/3] bg-gray-50 relative overflow-hidden flex items-center justify-center">
                    <img :src="item.images && item.images[0] ? item.images[0] : 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400'" :alt="getName(item)" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div class="absolute inset-0 bg-brand-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                      <span class="bg-white text-brand-600 text-xs font-black uppercase tracking-widest px-6 py-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 scale-90 group-hover:scale-100">{{ $t('COMMON.DETAIL_ARROW') }}</span>
                    </div>
                  </div>
                  <div class="p-8 w-full text-center flex flex-col items-center justify-center min-h-[120px]">
                    <h3 class="font-black text-lg text-gray-900 group-hover:text-brand-600 transition-colors duration-300 line-clamp-2 uppercase leading-tight tracking-tight">
                      {{ getName(item) }}
                    </h3>
                  </div>
                </div>
              </div>
              
              <!-- Pagination Hạng mục 1 -->
              <Pagination
                v-if="productStore.rentalTotalPages > 1"
                :current-page="productStore.rentalCurrentPage"
                :total-pages="productStore.rentalTotalPages"
                :total-items="0"
                :limit="12"
                hide-info
                hide-limit
                @page-change="changeRentalPage"
                class="mt-16"
                data-aos="fade-up"
              />
            </template>
          </div>
        </div>
      </section>


      
      <!-- QUY TRÌNH THUÊ THIẾT BỊ -->
      <section class="mt-32 pt-20 border-t border-gray-100" data-aos="fade-up">
        <div class="text-center mb-16">
          <h4 class="text-brand-600 font-bold uppercase tracking-widest text-sm mb-2">{{ $t('RENTAL.PROCESS_SUB') }}</h4>
          <h2 class="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">
            {{ $t('RENTAL.PROCESS_TITLE') }}
          </h2>
          <p class="text-gray-500 max-w-2xl mx-auto text-sm md:text-base font-medium">{{ $t('RENTAL.PROCESS_DESC') }}</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <!-- Desktop connecting line -->
          <div class="hidden lg:block absolute top-[40px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-gray-200 to-transparent z-0"></div>
          
          <div v-for="(step, i) in translatedSteps" :key="i" class="relative z-10 flex flex-col items-center text-center group" data-aos="zoom-in" :data-aos-delay="i * 100">
            <div class="w-20 h-20 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-2xl mb-6 shadow-md group-hover:scale-110 group-hover:border-brand-600 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all duration-400">
              <i :class="['pi text-brand-600 text-xl transition-transform duration-300 group-hover:scale-110', step.icon]"></i>
            </div>
            <div class="bg-[#f8fafc] border border-gray-100 p-6 rounded-[24px] w-full flex-1 hover:border-brand-200 hover:shadow-[0_12px_40px_rgba(220,38,38,0.08)] hover:-translate-y-2 transition-all duration-500 group-hover:bg-white">
              <div class="text-brand-600 font-black mb-3 text-sm tracking-widest uppercase opacity-70">{{ $t('RENTAL.STEP', { number: i + 1 }) }}</div>
              <h3 class="font-black text-gray-900 mb-3 uppercase tracking-wide group-hover:text-brand-600 transition-colors duration-300">{{ step.title }}</h3>
              <p class="text-sm text-gray-500 font-medium leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AOS from 'aos'
import Pagination from '@/components/common/Pagination.vue'
import { useProductStore } from '@/store/product.store'
import { useConfigStore } from '@/store/config'
import { PAGE_KEYS, CATEGORIES_BY_TYPE } from '@/constants'
import { ROUTE_NAMES } from '@/router'
import type { IProduct } from '@/types/product'

defineOptions({
  name: 'RentalPage',
})

const productStore = useProductStore()
const configStore = useConfigStore()
const { locale, t } = useI18n()
const router = useRouter()

const categories = CATEGORIES_BY_TYPE[PAGE_KEYS.RENTAL]
const selectedCategories = ref<string[]>([])
const sortOption = ref('newest')

const getName = (product: IProduct) => {
  if (!product) return ''
  const key = `name_${locale.value}` as keyof IProduct
  return (product[key] as string) || product.name_vi || ''
}

const goToProduct = (slug: string) => {
  if (slug) router.push({ name: ROUTE_NAMES.PRODUCT_DETAIL, params: { slug } })
}

const getFilterParams = (page: number = 1) => {
  return {
    productType: PAGE_KEYS.RENTAL,
    limit: 12,
    page,
    category:
      selectedCategories.value.length > 0
        ? (selectedCategories.value as any)
        : undefined,
    sortBy: sortOption.value === 'newest' ? 'createdAt' : 'price',
    sortOrder: (sortOption.value === 'price_desc'
      ? 'DESC'
      : sortOption.value === 'price_asc'
      ? 'ASC'
      : 'DESC') as 'ASC' | 'DESC' | undefined,
  }
}

const handleFilterChange = async () => {
  await productStore.fetchPublicProducts(getFilterParams(1))
}

const changeRentalPage = async (page: number) => {
  await productStore.fetchPublicProducts(getFilterParams(page))
  window.scrollTo({ top: 300, behavior: 'smooth' })
}

onMounted(async () => {
  await productStore.fetchPublicProducts(getFilterParams(1))
  AOS.init()
  AOS.refresh()
})

const translatedSteps = computed(() => [
  { icon: 'pi-headphones', title: t('RENTAL.STEPS.STEP1_TITLE', 'TIẾP NHẬN YÊU CẦU'), desc: t('RENTAL.STEPS.STEP1_DESC', 'Lắng nghe nhu cầu, tư vấn hạng mục thiết bị phù hợp với tính chất sự kiện.') },
  { icon: 'pi-file-pdf', title: t('RENTAL.STEPS.STEP2_TITLE', 'BÁO GIÁ & KÝ KẾT'), desc: t('RENTAL.STEPS.STEP2_DESC', 'Lên checklist chi tiết, chốt báo giá cạnh tranh minh bạch và ký hợp đồng.') },
  { icon: 'pi-truck', title: t('RENTAL.STEPS.STEP3_TITLE', 'SETUP THIẾT BỊ'), desc: t('RENTAL.STEPS.STEP3_DESC', 'Vận chuyển và setup thiết bị tận nơi đúng timeline cam kết, test chuẩn xác.') },
  { icon: 'pi-verified', title: t('RENTAL.STEPS.STEP4_TITLE', 'HỖ TRỢ TRỰC TIẾP'), desc: t('RENTAL.STEPS.STEP4_DESC', 'Kỹ thuật viên trực suốt sự kiện, xử lý sự cố lập tức đảm bảo thành công 100%.') }
])
</script>
