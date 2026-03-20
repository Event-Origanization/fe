<template>
  <div class="w-full">
    <main class="relative z-10">
      <!-- HERO & VIDEO SECTION -->
      <section class="pt-4 pb-12 w-full mx-auto px-4 flex flex-col items-center">
        <!-- Main Video Frame -->
        <HomeVideoBanner />

        <!-- STATS BLOCK -->
        <div
          class="mt-20 w-full max-w-5xl mx-auto border-t border-b border-white/10 py-8 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div
            class="flex flex-col md:flex-row justify-between items-center text-center gap-10 md:gap-0"
          >
            <div class="flex-1 space-y-2 relative group cursor-default stats-item-group">
              <h3
                class="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] animate-stats-glow"
              >
                <span v-count-up="configStore.getConfigValue('STATISTICS', 'STATS_FIELDS', '3')">
                  {{ configStore.getConfigValue('STATISTICS', 'STATS_FIELDS', '3') }}
                </span>
              </h3>
              <p class="text-gray-400 uppercase text-sm tracking-widest font-semibold">{{ $t('HOME.STATS.FIELDS') }}</p>
            </div>
            <div class="hidden md:block w-px h-16 bg-white/10"></div>
            <div class="flex-1 space-y-2 relative group cursor-default stats-item-group">
              <h3
                class="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] animate-stats-glow"
              >
                <span v-count-up="configStore.getConfigValue('STATISTICS', 'STATS_EVENTS', '1500+')">
                  {{ configStore.getConfigValue('STATISTICS', 'STATS_EVENTS', '1500+') }}
                </span>
              </h3>
              <p class="text-gray-400 uppercase text-sm tracking-widest font-semibold">{{ $t('HOME.STATS.EVENTS') }}</p>
            </div>
            <div class="hidden md:block w-px h-16 bg-white/10"></div>
            <div class="flex-1 space-y-2 relative group cursor-default stats-item-group">
              <h3
                class="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] animate-stats-glow"
              >
                <span v-count-up="configStore.getConfigValue('STATISTICS', 'STATS_BRANDS', '500+')">
                  {{ configStore.getConfigValue('STATISTICS', 'STATS_BRANDS', '500+') }}
                </span>
              </h3>
              <p class="text-gray-400 uppercase text-sm tracking-widest font-semibold">
                {{ $t('HOME.STATS.BRANDS') }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- HIGHLIGHT PROJECTS -->
      <section class="py-16 container mx-auto px-4 text-center">
        <h2
          class="text-3xl md:text-4xl font-black mb-4 uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 drop-shadow-md"
          data-aos="fade-up"
        >
          {{ $t('HOME.PROJECTS.TITLE') }}
        </h2>
        <p class="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
          {{ $t('HOME.PROJECTS.DESC') }}
        </p>

        <!-- Project Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
          <!-- Item 1 -->
          <div
            class="group relative overflow-hidden bg-black/50 border border-white/5 hover:border-brand-500/50 transition-colors duration-500 aspect-[4/3] cursor-pointer"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <img
              src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop"
              class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              alt="VIFON Event"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"
            ></div>
            <div
              class="absolute bottom-0 left-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <h4
                class="text-brand-500 text-xs font-bold tracking-widest uppercase mb-1 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
              >
                Kỷ niệm - Tri ân
              </h4>
              <h3 class="text-lg font-bold text-white uppercase drop-shadow-lg">
                Gala Kỷ Niệm 60 Năm VIFON
              </h3>
            </div>
          </div>

          <!-- Item 2 -->
          <div
            class="group relative overflow-hidden bg-black/50 border border-white/5 hover:border-blue-500/50 transition-colors duration-500 aspect-[4/3] cursor-pointer"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <img
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop"
              class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              alt="Event"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"
            ></div>
            <div
              class="absolute bottom-0 left-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <h4
                class="text-blue-400 text-xs font-bold tracking-widest uppercase mb-1 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
              >
                Âm Nhạc - Giải trí
              </h4>
              <h3 class="text-lg font-bold text-white uppercase drop-shadow-lg">
                YEU FESTIVAL 2026
              </h3>
            </div>
          </div>

          <!-- Item 3 -->
          <div
            class="group relative overflow-hidden bg-black/50 border border-white/5 hover:border-pink-500/50 transition-colors duration-500 aspect-[4/3] cursor-pointer"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <img
              src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop"
              class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              alt="Tet Event"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"
            ></div>
            <div
              class="absolute bottom-0 left-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <h4
                class="text-pink-400 text-xs font-bold tracking-widest uppercase mb-1 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
              >
                Tiệc cuối năm
              </h4>
              <h3 class="text-lg font-bold text-white uppercase drop-shadow-lg">
                YEAR END PARTY - ĐẠI GIA ĐÌNH SUNJIN
              </h3>
            </div>
          </div>

          <!-- Item 4 -->
          <div
            class="group relative overflow-hidden bg-black/50 border border-white/5 hover:border-purple-500/50 transition-colors duration-500 aspect-[4/3] cursor-pointer"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop"
              class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              alt="Tech Event"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"
            ></div>
            <div
              class="absolute bottom-0 left-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <h4
                class="text-purple-400 text-xs font-bold tracking-widest uppercase mb-1 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
              >
                Hội thảo
              </h4>
              <h3 class="text-lg font-bold text-white uppercase drop-shadow-lg">
                Tech Show - Giới thiệu sản phẩm mới
              </h3>
            </div>
          </div>

          <!-- Item 5 -->
          <div
            class="group relative overflow-hidden bg-black/50 border border-white/5 hover:border-orange-500/50 transition-colors duration-500 aspect-[4/3] cursor-pointer"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <img
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop"
              class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              alt="Event"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"
            ></div>
            <div
              class="absolute bottom-0 left-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <h4
                class="text-orange-400 text-xs font-bold tracking-widest uppercase mb-1 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
              >
                Teambuilding
              </h4>
              <h3 class="text-lg font-bold text-white uppercase drop-shadow-lg">
                Teambuilding Lãnh Đạo V-Group
              </h3>
            </div>
          </div>

          <!-- Item 6 -->
          <div
            class="group relative overflow-hidden bg-black/50 border border-white/5 hover:border-teal-500/50 transition-colors duration-500 aspect-[4/3] cursor-pointer"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <img
              src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=800&auto=format&fit=crop"
              class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              alt="Event"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"
            ></div>
            <div
              class="absolute bottom-0 left-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <h4
                class="text-teal-400 text-xs font-bold tracking-widest uppercase mb-1 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
              >
                Khai trương
              </h4>
              <h3 class="text-lg font-bold text-white uppercase drop-shadow-lg">
                Lễ Khai Trương Siêu Thị Điện Máy
              </h3>
            </div>
          </div>
        </div>

        <div class="mt-12" data-aos="fade-up" data-aos-delay="400">
          <button
            class="bg-[#d41c1c] text-white font-medium px-8 py-2.5 rounded hover:bg-red-700 hover:shadow-[0_0_15px_rgba(220,38,38,0.6)] transition-all duration-300 relative overflow-hidden group"
          >
            <span class="relative z-10">{{ $t('HOME.PROJECTS.VIEW_MORE') }}</span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </button>
        </div>
      </section>

      <!-- LIGHT/NEON LASER SECTION -->
      <section class="py-20 relative text-center border-t border-white/5">
        <div
          class="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"
        ></div>

        <div class="container mx-auto px-4 z-10 relative">
          <h2
            class="text-3xl md:text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 uppercase tracking-widest"
            data-aos="fade-up"
          >
            {{ $t('HOME.SLOGAN.TITLE') }}
          </h2>
          <p class="text-gray-300 font-light mb-10 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            {{ $t('HOME.SLOGAN.DESC') }}
          </p>
          <button
            class="border border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white px-8 py-2 rounded-full font-medium transition-all shadow-[0_0_10px_rgba(220,38,38,0.2)] hover:shadow-[0_0_20px_rgba(220,38,38,0.6)]"
            data-aos="fade-up" data-aos-delay="200"
          >
            {{ $t('HOME.SLOGAN.VIEW_MORE') }}
          </button>

          <!-- PARTNERS -->
          <div class="mt-24">
            <div class="inline-block relative mb-12" data-aos="zoom-in">
              <h3
                class="text-xl md:text-2xl font-black uppercase text-gray-200 tracking-[0.2em] relative z-10"
              >
                {{ $t('HOME.PARTNERS.TITLE') }}
              </h3>
              <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-4 bg-brand-500/20 blur-md -z-10"
              ></div>
            </div>

            <!-- Partner Logos Grid -->
            <div
              class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-8 gap-y-12 items-center justify-items-center opacity-70"
              data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200"
            >
              <template v-if="partnerStore.activePartners.length > 0">
                <div 
                  v-for="partner in partnerStore.activePartners" 
                  :key="partner.id"
                  class="w-full flex justify-center hover:opacity-100 hover:scale-110 transition-all cursor-pointer group"
                >
                  <img 
                    v-if="partner.logo" 
                    :src="partner.logo" 
                    :alt="partner.name"
                    class="max-h-12 w-auto object-contain brightness-0 invert opacity-60 group-hover:opacity-100 transition-all"
                  />
                  <span v-else class="font-bold text-xl uppercase tracking-widest text-gray-300">
                    {{ partner.name }}
                  </span>
                </div>
              </template>
              <template v-else>
                <!-- Fallback to static if no partners found in DB yet -->
                <div class="w-full flex justify-center hover:opacity-100 hover:scale-110 transition-all cursor-pointer"><span class="font-bold text-xl italic font-serif">Sunjin</span></div>
                <div class="w-full flex justify-center hover:opacity-100 hover:scale-110 transition-all cursor-pointer"><span class="font-bold text-xl tracking-widest text-[#0066ff]">NOVALAND</span></div>
                <div class="w-full flex justify-center hover:opacity-100 hover:scale-110 transition-all cursor-pointer"><span class="font-bold text-xl uppercase font-mono">ZKTEco</span></div>
                <div class="w-full flex justify-center hover:opacity-100 hover:scale-110 transition-all cursor-pointer"><span class="font-bold text-xl uppercase font-sans">VDDLAND</span></div>
                <div class="w-full flex justify-center hover:opacity-100 hover:scale-110 transition-all cursor-pointer"><span class="font-bold text-xl uppercase tracking-tighter text-red-500">VIFON</span></div>
                <div class="w-full flex justify-center hover:opacity-100 hover:scale-110 transition-all cursor-pointer"><span class="font-bold text-xl font-serif">REAL CLOTHES</span></div>
              </template>
            </div>
          </div>

          <!-- ABOUT US FOOTER DECOR -->
          <div
            class="mt-32 border-t border-b border-white/10 py-8 text-center relative max-w-4xl mx-auto"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <h3 class="text-xl md:text-2xl font-black uppercase text-gray-200 tracking-widest mb-4">
              {{ $t('HOME.ABOUT_SNIPPET.TITLE') }}
            </h3>
            <p class="text-brand-500 font-medium mb-4 uppercase">
              {{ $t('HOME.ABOUT_SNIPPET.SLOGAN') }}
            </p>
            <p class="text-gray-400 text-sm leading-relaxed max-w-3xl mx-auto">
              {{ $t('HOME.ABOUT_SNIPPET.DESC') }}
            </p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AOS from 'aos'
import HomeVideoBanner from '@/components/home-video/HomeVideoBanner.vue'
import { useConfigStore } from '@/store/config'
import { usePartnerStore } from '@/store/partner.store'

const configStore = useConfigStore()
const partnerStore = usePartnerStore()

onMounted(async () => {
  await Promise.all([
    configStore.fetchAllConfigs(),
    partnerStore.fetchActivePartners()
  ])
  AOS.refresh()
})
</script>

<style scoped>
.animation-delay-200 {
  animation-delay: 0.2s;
}
.animation-delay-400 {
  animation-delay: 0.4s;
}
.animation-delay-600 {
  animation-delay: 0.6s;
}
::selection {
  background-color: #ef4444;
  color: #fff;
}
</style>
