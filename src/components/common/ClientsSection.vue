<template>
  <section class="py-24 container mx-auto px-4 bg-white">
    <div class="bg-[#8b92b6] rounded-[40px] px-4 md:px-8 py-16 relative overflow-hidden text-center max-w-5xl mx-auto shadow-xl border border-gray-100" data-aos="zoom-in">
       <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_rgba(220,38,38,0.8)]"></div>
       
       <div class="inline-block bg-white text-brand-600 font-black uppercase tracking-widest px-8 md:px-12 py-4 rounded-full shadow-lg mb-8 -mt-24 border border-gray-100 text-lg md:text-xl transform hover:-translate-y-1 transition-transform">
         {{ $t('EVENTS_PAGE.CLIENTS_TITLE') }}
       </div>
       
       <!-- Logos Grid -->
       <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-12 gap-x-8 items-center justify-items-center opacity-90">
          <template v-if="partnerStore.activePartners.length > 0">
            <div v-for="partner in partnerStore.activePartners" 
                 :key="partner.id" 
                 class="w-full flex flex-col items-center justify-center hover:opacity-100 hover:scale-110 transition-all cursor-pointer group/logo"
                 :title="partner.name">
              <div class="w-full h-16 md:h-20 flex items-center justify-center mb-2">
                <img v-if="partner.logo" 
                     :src="partner.logo" 
                     :alt="partner.name" 
                     class="max-w-full max-h-full object-contain filter invert opacity-60 group-hover/logo:opacity-100 transition-all duration-300" />
                <span v-else class="font-black text-white/50 tracking-wider text-sm md:text-base uppercase text-center line-clamp-1 px-2 border border-white/10 py-2 rounded-lg bg-white/5">
                  {{ partner.name }}
                </span>
              </div>
            </div>
          </template>
          <template v-else>
            <div v-for="i in 12" :key="'dummy-'+i" class="w-full flex justify-center hover:opacity-100 transition-all cursor-not-allowed">
              <span class="font-black text-white/20 tracking-wider text-xs md:text-sm uppercase italic">Partner {{ i }}</span>
            </div>
          </template>
       </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { usePartnerStore } from '@/store/partner.store'

const partnerStore = usePartnerStore()

onMounted(async () => {
  if (partnerStore.activePartners.length === 0) {
    await partnerStore.fetchActivePartners()
  }
})
</script>
