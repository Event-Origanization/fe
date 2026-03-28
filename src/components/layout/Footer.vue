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
            <p class="text-gray-900 text-base font-medium leading-relaxed max-w-[360px] mb-8">
              {{ $t('FOOTER.DESC') }}
            </p>

            <!-- Socials -->
            <div class="flex items-center gap-3 mb-6">
              <a :href="configStore.getConfigValue('SOCIAL', 'SOCIAL_LINKEDIN', '#')" class="w-10 h-10 bg-yellow-400 text-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-900 hover:text-yellow-400 transition-colors shadow-sm">
                <i class="pi pi-linkedin font-bold text-base"></i>
              </a>
              <a :href="configStore.getConfigValue('SOCIAL', 'SOCIAL_INSTAGRAM', '#')" class="w-10 h-10 bg-yellow-400 text-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-900 hover:text-yellow-400 transition-colors shadow-sm">
                <i class="pi pi-instagram font-bold text-base"></i>
              </a>
              <a :href="configStore.getConfigValue('SOCIAL', 'SOCIAL_YOUTUBE', '#')" class="w-10 h-10 bg-yellow-400 text-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-900 hover:text-yellow-400 transition-colors shadow-sm">
                <i class="pi pi-youtube font-bold text-base"></i>
              </a>
              <a :href="configStore.getConfigValue('SOCIAL', 'SOCIAL_ZALO', '#')" class="w-10 h-10 bg-yellow-400 text-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-900 hover:text-yellow-400 transition-colors shadow-sm">
                <i class="pi pi-link font-bold text-base"></i>
              </a>
            </div>
            
            <!-- Slogan in Red -->
            <p class="text-red-600 text-lg font-bold leading-snug max-w-[450px]">
              {{ $t('FOOTER.SLOGAN') }}
            </p>
          </div>

          <!-- Right Section (Columns & Logos) -->
          <div class="lg:w-[65%] flex flex-col justify-between pt-4">
            <!-- 5 Columns -->
            <div class="grid grid-cols-2 lg:grid-cols-5 gap-6 text-base mb-16">
              
              <!-- Col 1 -->
              <div class="flex flex-col gap-4">
                <div>
                  <div class="text-red-500 font-bold text-base uppercase">{{ $t('NAV.ABOUT') }}</div>
                </div>
                <ul class="space-y-4 font-medium text-gray-700 text-[16px] tracking-wide pr-4">
                  <li><router-link to="/about" class="hover:text-red-500 transition-colors block leading-snug">{{ $t('FOOTER.EXPLORE_SCIENCE') }}</router-link></li>
                  <li><router-link to="/about" class="hover:text-red-500 transition-colors block leading-snug">{{ $t('FOOTER.INTERACTIVE_EXP') }}</router-link></li>
                  <li><router-link to="/about" class="hover:text-red-500 transition-colors block leading-snug">{{ $t('FOOTER.INTERACTIVE_DEC') }}</router-link></li>
                  <li><router-link to="/about" class="hover:text-red-500 transition-colors block leading-snug">{{ $t('FOOTER.INTERACTIVE_DIS') }}</router-link></li>
                </ul>
              </div>

              <!-- Col 2 -->
              <div class="flex flex-col gap-4">
                <div>
                  <div class="text-red-500 font-bold text-base uppercase">{{ $t('NAV.EVENTS') }}</div>
                </div>
                <ul class="space-y-4 font-medium text-gray-700 text-[16px] tracking-wide">
                  <li><router-link to="/events" class="hover:text-red-500 transition-colors block leading-snug">{{ $t('FOOTER.CVBE_LAB') }}</router-link></li>
                  <li><router-link to="/events" class="hover:text-red-500 transition-colors block leading-snug">{{ $t('FOOTER.CROWD_LAB') }}</router-link></li>
                </ul>
              </div>

              <!-- Col 3 -->
              <div class="flex flex-col gap-4">
                <div>
                  <div class="text-red-500 font-bold text-base uppercase">{{ $t('NAV.NEWS') }}</div>
                </div>
                <ul class="space-y-4 font-medium text-gray-700 text-[16px] tracking-wide">
                  <li><router-link to="/news" class="hover:text-red-500 transition-colors block leading-snug">{{ $t('FOOTER.MULTIMEDIA') }}</router-link></li>
                  <li><router-link to="/news" class="hover:text-red-500 transition-colors block leading-snug">{{ $t('FOOTER.BLOG') }}</router-link></li>
                  <li><router-link to="/news" class="hover:text-red-500 transition-colors block leading-snug">{{ $t('FOOTER.EVENTS') }}</router-link></li>
                </ul>
              </div>

              <!-- Col 4 -->
              <div class="flex flex-col gap-4">
                <div>
                  <div class="text-red-500 font-bold text-base uppercase">{{ $t('NAV.RENTAL') }}</div>
                </div>
              </div>

              <!-- Col 5 -->
              <div class="flex flex-col gap-4">
                <div> <!-- align title down to match other columns that have red text above them -->
                  <h4 class="text-red-500 font-bold text-base uppercase"><router-link to="/contact" class="hover:text-red-500 transition-colors">{{ $t('NAV.CONTACT') }}</router-link></h4>
                </div>
              </div>

            </div>

            <!-- Partner Logos Row -->
            <div class="flex flex-wrap items-center justify-start lg:justify-between gap-6 pb-2">
               <!-- LMU -->
               <div class="h-10 px-3 bg-[#428042] text-white font-bold flex items-center justify-center gap-2 rounded-sm select-none">
                 <span class="text-xl tracking-tighter leading-none mt-0.5">LMU</span>
                 <div class="flex flex-col text-[4px] leading-tight text-left mt-0.5 border-l border-white/50 pl-1.5 opacity-90">
                   <span>LUDWIG-</span>
                   <span>MAXIMILIANS-</span>
                   <span>UNIVERSITÄT</span>
                   <span>MÜNCHEN</span>
                 </div>
               </div>
               
               <!-- EU & ERC -->
               <div class="flex items-center gap-4 select-none">
                 <div class="h-10 w-16 bg-[#003399] flex items-center justify-center relative rounded-sm">
                   <div class="text-yellow-400 flex items-center justify-center">
                     <div class="w-8 h-8 rounded-full border-[1.5px] border-yellow-400 border-dotted"></div>
                   </div>
                 </div>
                 <div class="h-10 flex items-center justify-center font-serif italic pr-1">
                   <div class="text-[#f15a24] font-black text-xl tracking-tighter flex items-center gap-1 opacity-70">
                     <i class="pi pi-sun text-lg"></i>
                     erc
                   </div>
                 </div>
               </div>
               
               <!-- DFG -->
               <div class="h-10 text-[#003c7e] font-black text-3xl flex items-center gap-3 select-none">
                 DFG 
                 <span class="text-[7px] leading-[1.2] font-semibold text-[#006699] flex flex-col font-sans uppercase">
                   <span>Deutsche</span>
                   <span>Forschungsgemeinschaft</span>
                 </span>
               </div>
               
               <!-- VolkswagenStiftung -->
               <div class="h-10 flex items-center gap-2 font-bold tracking-tight text-[#0a1e3f] select-none text-[15px]">
                 <div class="grid grid-cols-3 gap-[2px] w-4">
                   <div class="w-1 h-1 bg-[#0a1e3f] rounded-full" v-for="i in 9" :key="i"></div>
                 </div>
                 VolkswagenStiftung
               </div>
               
               <!-- bidt -->
               <div class="h-10 flex items-center font-bold text-3xl tracking-tighter text-[#1b2554] select-none">
                 bidt
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
import { useConfigStore } from '@/store/config'
defineOptions({
  name: 'AppFooter',
})

const configStore = useConfigStore()
</script>
