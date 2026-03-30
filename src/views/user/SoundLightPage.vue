<template>
  <div class="w-full bg-white min-h-screen text-gray-900 font-outfit pb-20">
    <!-- PAGE BANNER -->
    <section class="relative pt-32 pb-20 flex flex-col items-center justify-center text-center border-b border-gray-100 overflow-hidden bg-[#0a0a0f]">
      <!-- Background Effects -->
      <div class="absolute inset-0 z-0">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-red-600/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-red-600/5 to-transparent"></div>
      </div>
      
      <div class="relative z-10 w-full max-w-7xl mx-auto px-4">
        <h1 class="text-4xl md:text-6xl font-black uppercase text-white mb-4 tracking-tighter" data-aos="fade-down">
          7SEVEN
        </h1>
        <div class="flex items-center justify-center gap-2 text-sm md:text-base font-bold text-gray-400 uppercase tracking-widest" data-aos="fade-up" data-aos-delay="100">
          <router-link to="/" class="hover:text-red-600 transition-colors">{{ $t('COMMON.BREADCRUMB_HOME') }}</router-link>
          <span class="text-gray-300">-</span>
          <span class="text-red-600">{{ configStore.getConfigValue('MENU', 'MENU_SOUND_LIGHT', '7SEVEN') }}</span>
        </div>
      </div>
    </section>

    <!-- MAIN CONTENT -->
    <main class="container mx-auto px-4 py-20">
      
      <!-- DANH MỤC: ÂM THANH ÁNH SÁNG 7SEVEN -->
      <section class="mb-24">
        <div class="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-4" data-aos="fade-right">
          <div>
            <h4 class="text-red-600 font-bold uppercase tracking-widest text-sm mb-2">7SEVEN PARTNER</h4>
            <h2 class="text-3xl font-black text-gray-900 uppercase tracking-widest">
              {{ configStore.getConfigValue('MENU', 'MENU_SOUND_LIGHT', 'ÂM THANH ÁNH SÁNG') }}
            </h2>
          </div>
          <p class="text-gray-500 font-medium mt-4 md:mt-0 max-w-sm text-sm">Hệ thống âm thanh, ánh sáng, màn hình LED chuyên nghiệp, đẳng cấp quốc tế.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <!-- Loading -->
          <div v-if="productStore.loading" class="col-span-full flex justify-center items-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
          <!-- Sản phẩm -->
          <div v-for="(item, idx) in productStore.soundLightProducts" :key="item.id" @click="goToProduct(item.slug)" class="group flex flex-col cursor-pointer bg-white border border-gray-100 shadow-sm rounded-[24px] overflow-hidden hover:border-red-200 hover:shadow-[0_16px_50px_rgba(220,38,38,0.12)] hover:-translate-y-3 transition-all duration-500" data-aos="fade-up" :data-aos-delay="idx % 4 * 100">
            <div class="w-full aspect-[4/3] bg-gray-50 relative overflow-hidden flex items-center justify-center">
              <img :src="item.images && item.images[0] ? item.images[0] : 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=400'" :alt="getName(item)" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div class="absolute inset-0 bg-red-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                <span class="bg-white text-red-600 text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 scale-90 group-hover:scale-100">Chi tiết →</span>
              </div>
            </div>
            <div class="p-6 w-full text-center flex flex-col items-center justify-center min-h-[100px]">
              <h3 class="font-black text-lg text-gray-900 group-hover:text-red-600 transition-colors duration-300 line-clamp-2 uppercase">
                {{ getName(item) }}
              </h3>
            </div>
          </div>
        </div>
        
        <!-- Pagination -->
        <Pagination
          v-if="productStore.soundLightTotalPages > 1"
          :current-page="productStore.soundLightCurrentPage"
          :total-pages="productStore.soundLightTotalPages"
          :total-items="0"
          :limit="12"
          hide-info
          hide-limit
          @page-change="changePage"
          class="mt-12"
          data-aos="fade-up"
        />
      </section>

      <!-- QUY TRÌNH DỊCH VỤ -->
      <section class="mt-32 pt-20 border-t border-gray-100" data-aos="fade-up">
        <div class="text-center mb-16">
          <h4 class="text-red-600 font-bold uppercase tracking-widest text-sm mb-2">QUY TRÌNH CHUYÊN NGHIỆP</h4>
          <h2 class="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">
            GIẢI PHÁP KỸ THUẬT TOÀN DIỆN
          </h2>
          <p class="text-gray-500 max-w-2xl mx-auto text-sm md:text-base font-medium">Chúng tôi mang đến sự hoàn hảo cho mọi không gian sự kiện bằng công nghệ hiện đại và đội ngũ kỹ thuật tận tâm.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <!-- Desktop connecting line -->
          <div class="hidden lg:block absolute top-[40px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-gray-200 to-transparent z-0"></div>
          
          <div v-for="(step, i) in translatedSteps" :key="i" class="relative z-10 flex flex-col items-center text-center group" data-aos="zoom-in" :data-aos-delay="i * 100">
            <div class="w-20 h-20 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-2xl mb-6 shadow-md group-hover:scale-110 group-hover:border-red-600 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all duration-400">
              <i :class="['pi text-red-600 text-xl transition-transform duration-300 group-hover:scale-110', step.icon]"></i>
            </div>
            <div class="bg-[#f8fafc] border border-gray-100 p-6 rounded-[24px] w-full flex-1 hover:border-red-200 hover:shadow-[0_12px_40px_rgba(220,38,38,0.08)] hover:-translate-y-2 transition-all duration-500 group-hover:bg-white">
              <div class="text-red-600 font-black mb-3 text-sm tracking-widest uppercase opacity-70">Bước {{ i + 1 }}</div>
              <h3 class="font-black text-gray-900 mb-3 uppercase tracking-wide group-hover:text-red-600 transition-colors duration-300">{{ step.title }}</h3>
              <p class="text-sm text-gray-500 font-medium leading-relaxed">{{ step.desc }}</p>
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
import Pagination from '@/components/common/Pagination.vue'
import { useProductStore } from '@/store/product.store'
import { useConfigStore } from '@/store/config'
import { PAGE_KEYS } from '@/constants'
import { ROUTE_NAMES } from '@/router'
import type { IProduct } from '@/types/product'

defineOptions({
  name: 'SoundLightPage',
})

const productStore = useProductStore()
const configStore = useConfigStore()
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
  window.scrollTo({ top: 300, behavior: 'smooth' })
}

onMounted(async () => {
  await productStore.fetchPublicProducts({ 
    productType: PAGE_KEYS.SOUND_LIGHT, 
    limit: 12, 
    page: 1 
  })
  AOS.init()
  AOS.refresh()
})

const translatedSteps = computed(() => [
  { icon: 'pi-search', title: t('SOUND_LIGHT.STEPS.STEP1_TITLE', 'KHẢO SÁT & TƯ VẤN'), desc: t('SOUND_LIGHT.STEPS.STEP1_DESC', 'Khảo sát thực tế không gian và tư vấn giải pháp kỹ thuật tối ưu nhất') },
  { icon: 'pi-file-edit', title: t('SOUND_LIGHT.STEPS.STEP2_TITLE', 'PHƯƠNG ÁN & BÁO GIÁ'), desc: t('SOUND_LIGHT.STEPS.STEP2_DESC', 'Lên sơ đồ bố trí thiết bị và gửi báo giá chi tiết từng hạng mục') },
  { icon: 'pi-cog', title: t('SOUND_LIGHT.STEPS.STEP3_TITLE', 'THI CÔNG & VẬN HÀNH'), desc: t('SOUND_LIGHT.STEPS.STEP3_DESC', 'Lắp đặt chuyên nghiệp và đội ngũ kỹ thuật trực vận hành suốt sự kiện') },
  { icon: 'pi-check-circle', title: t('SOUND_LIGHT.STEPS.STEP4_TITLE', 'HOÀN TẤT & NGHIỆM THU'), desc: t('SOUND_LIGHT.STEPS.STEP4_DESC', 'Tháo dỡ thiết bị gọn gàng và hoàn thành các thủ tục nghiệm thu') }
])
</script>
