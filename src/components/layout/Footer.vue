<template>
  <footer class="relative mt-20 pt-16 font-outfit">
    <!-- Gray Background Container -->
    <div class="bg-[#e9ecf2] rounded-tl-[100px] md:rounded-tl-[180px] relative pt-16 pb-4 md:mt-10">
      
      <!-- Top Right Yellow Shape extending higher -->
      <div class="absolute -top-[40px] md:-top-[60px] right-0 w-[40%] md:w-[25%] h-[80px] md:h-[120px] bg-brand-500 rounded-bl-[80px] md:rounded-bl-[150px] z-0"></div>

      <!-- Main Container -->
      <div class="mx-auto px-10 lg:px-20 relative z-10 w-full">
        <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 justify-between">
          
          <!-- Left Section (Logo, Text, Socials) -->
          <div class="lg:w-[35%] flex flex-col pt-2">
            <!-- Actual Logo Image -->
            <div class="mb-8">
              <router-link to="/" class="inline-block relative">
                <img src="@/assets/images/LOGO-5P.png" alt="5P EVENT Logo" class="h-20 md:h-36 object-contain" />
              </router-link>
            </div>

            <!-- Description -->
            <p class="text-red-600 text-base font-bold leading-relaxed max-w-[400px] mb-8">
              {{ $t('FOOTER.SLOGAN') }}
            </p>

            <!-- Socials -->
            <div class="flex items-center gap-3 mb-6">
              <a :href="configStore.getConfigValue('SOCIAL', 'SOCIAL_FACEBOOK', '#')" target="_blank" class="w-10 h-10 bg-yellow-400 text-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-900 hover:text-yellow-400 transition-colors shadow-sm">
                <i class="pi pi-facebook font-bold text-base"></i>
              </a>
              <a :href="configStore.getConfigValue('SOCIAL', 'SOCIAL_INSTAGRAM', '#')" target="_blank" class="w-10 h-10 bg-yellow-400 text-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-900 hover:text-yellow-400 transition-colors shadow-sm">
                <i class="pi pi-instagram font-bold text-base"></i>
              </a>
              <a :href="configStore.getConfigValue('SOCIAL', 'SOCIAL_YOUTUBE', '#')" target="_blank" class="w-10 h-10 bg-yellow-400 text-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-900 hover:text-yellow-400 transition-colors shadow-sm">
                <i class="pi pi-youtube font-bold text-base"></i>
              </a>
              <a :href="configStore.getConfigValue('SOCIAL', 'SOCIAL_ZALO', '#')" target="_blank" class="w-10 h-10 bg-yellow-400 text-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-900 hover:text-yellow-400 transition-colors shadow-sm">
                <i class="pi pi-link font-bold text-base"></i>
              </a>
            </div>
          </div>

          <!-- Right Section (Columns & Logos) -->
          <div class="lg:w-[65%] flex flex-col justify-between pt-4">
            <!-- Dynamic Columns from Config -->
            <div class="grid grid-cols-2 lg:grid-cols-5 gap-6 text-base mb-16">
              <div v-for="(col, idx) in footerColumns" :key="idx" class="flex flex-col gap-4">
                <div class="text-red-500 font-bold text-base uppercase">
                   <router-link :to="getRoutePath(col.link)" class="hover:text-red-500 transition-colors">
                     {{ col.title[currentLocale] || col.title.vi }}
                   </router-link>
                </div>
                <ul v-if="col.items && col.items.length" class="space-y-4 font-medium text-gray-700 text-[16px] tracking-wide pr-4">
                  <li v-for="(item, itemIdx) in col.items" :key="itemIdx">
                    <router-link :to="getRoutePath(item.link)" class="hover:text-red-500 transition-colors block leading-snug">
                      {{ item.title[currentLocale] || item.title.vi }}
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Partner Logos Row (Dynamic) -->
            <div class="w-full pr-40">
              <div class="w-full flex flex-wrap items-center justify-start lg:justify-between gap-8 pb-4 min-h-[50px]">
               <template v-for="(logo, idx) in partnerLogos" :key="idx">
                 <a v-if="logo.link" 
                   :href="logo.link" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   class="hover:opacity-75 transition-all duration-300 transform hover:scale-105 text-left"
                   :title="logo.name"
                 >
                   <img v-if="logo.image" :src="logo.image" :alt="logo.name" class="h-8 md:h-10 lg:h-16 object-contain filter transition-all" />
                   <span v-else class="text-[13px] font-black text-blue-400 uppercase tracking-widest text-blue-500 transition-colors">{{ logo.name }}</span>
                 </a>
                 <div v-else class="select-none">
                   <img v-if="logo.image" :src="logo.image" :alt="logo.name" class="h-8 md:h-10 lg:h-16 object-contain filter" />
                   <span v-else class="text-[13px] font-black text-blue-400 uppercase tracking-widest">{{ logo.name }}</span>
                 </div>
               </template>
            </div>
            </div>
          </div>
        </div>

        <!-- Yellow Bottom Line -->
        <div class="w-full h-[3px] bg-brand-400 mt-8 lg:mt-12"></div>
        
        <!-- Copyright Text -->
        <div class="text-center py-6 opacity-0 h-10">
           <!-- Space below line -->
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useConfigStore } from '@/store/config'
import { useSeoStore } from '@/store/seo'
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'AppFooter',
})

const configStore = useConfigStore()
const seoStore = useSeoStore()
const { locale } = useI18n()

const currentLocale = computed(() => locale.value || 'vi')

const footerColumns = computed(() => {
  const json = configStore.getConfigValue('FOOTER', 'FOOTER_COLUMNS', '')
  if (!json) return []
  try {
    return JSON.parse(json)
  } catch (e) {
    console.error('Failed to parse footer columns JSON', e)
    return []
  }
})

const getRoutePath = (pageKey: string) => {
  if (!pageKey) return '/'
  if (pageKey === 'HOME') return '/'
  const meta = seoStore.getSeoMetaByPage(pageKey)
  return meta?.path || '/'
}

const partnerLogos = computed(() => {
  const json = configStore.getConfigValue('FOOTER', 'FOOTER_PARTNER_LOGOS', '[]')
  try {
    return JSON.parse(json)
  } catch (e) {
    console.error('Failed to parse partner logos', e)
    return []
  }
})

onMounted(async () => {
  if (seoStore.seoMetas.length === 0) {
    await seoStore.fetchAllSeoMeta()
  }
})
</script>
