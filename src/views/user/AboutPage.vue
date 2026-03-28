<template>
  <div class="w-full bg-white min-h-screen text-gray-900 font-outfit overflow-hidden">
    
    <!-- PREMIUM HERO SECTION -->
    <section class="relative pt-40 pb-20 px-6 lg:px-20 max-w-[1440px] mx-auto min-h-[80vh] flex flex-col items-center justify-center text-center">
      <!-- Background Decor -->
      <div class="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div class="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-yellow-400/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div class="relative z-10" data-aos="zoom-out" data-aos-duration="1500">
        <h1 v-html="$t('ABOUT.HERO.TITLE')" class="text-7xl md:text-[9vw] font-black uppercase tracking-tighter leading-[0.85] text-gray-900 mb-8 select-none">
        </h1>
        <p class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed" data-aos="fade-up" data-aos-delay="300">
          {{ $t('ABOUT.HERO.DESC') }}
        </p>
      </div>

      <!-- Animated Arrow Down -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
         <i class="pi pi-angle-double-down text-brand-600 text-3xl opacity-50"></i>
      </div>
    </section>

    <!-- VISION & MISSION - MODERN CARDS -->
    <section class="max-w-[1440px] mx-auto px-6 lg:px-20 py-24 relative">
       <!-- Decorative shapes -->
       <div class="absolute top-0 right-0 w-64 h-64 border-[30px] border-gray-100 rounded-full -mr-32 -mt-32 pointer-events-none"></div>
       
       <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-stretch">
          <!-- VISION -->
          <div class="group bg-gray-50 rounded-[60px] p-12 lg:p-16 flex flex-col justify-between hover:bg-brand-600 transition-all duration-700 cursor-default" data-aos="fade-right">
              <div>
                <span class="text-brand-600 group-hover:text-white text-xs font-black uppercase tracking-[0.4em] mb-4 block">{{ $t('ABOUT.TARGET') }}</span>
                <h2 class="text-4xl md:text-5xl font-black text-gray-900 group-hover:text-white mb-6 uppercase tracking-tight">
                  {{ $t('ABOUT.VISION_TITLE') }}
                </h2>
                <p class="text-gray-600 group-hover:text-white/80 text-lg leading-relaxed font-medium">
                  {{ $t('ABOUT.VISION_DESC') }}
                </p>
             </div>
             <div class="mt-12 flex justify-end">
                <div class="w-16 h-16 rounded-full border border-gray-200 group-hover:border-white/30 flex items-center justify-center text-brand-600 group-hover:text-white transition-all transform group-hover:rotate-45">
                   <i class="pi pi-arrow-up-right text-2xl font-bold"></i>
                </div>
             </div>
          </div>

          <!-- MISSION -->
          <div class="group bg-yellow-400 rounded-[60px] p-12 lg:p-16 flex flex-col justify-between hover:bg-black transition-all duration-700 cursor-default" data-aos="fade-left">
             <div>
                <span class="text-gray-900 group-hover:text-yellow-400 text-xs font-black uppercase tracking-[0.4em] mb-4 block">{{ $t('ABOUT.PATH') }}</span>
                <h2 class="text-4xl md:text-5xl font-black text-gray-900 group-hover:text-white mb-6 uppercase tracking-tight">
                  {{ $t('ABOUT.MISSION_TITLE') }}
                </h2>
                <p class="text-gray-800 group-hover:text-white/80 text-lg leading-relaxed font-medium">
                  {{ $t('ABOUT.MISSION_DESC') }}
                </p>
             </div>
             <div class="mt-12 flex justify-end">
                <div class="w-16 h-16 rounded-full border border-gray-900/10 group-hover:border-white/30 flex items-center justify-center text-gray-900 group-hover:text-white transition-all transform group-hover:-rotate-45">
                   <i class="pi pi-arrow-right text-2xl font-bold"></i>
                </div>
             </div>
          </div>
       </div>
    </section>

    <!-- CORE VALUES - INTERACTIVE CIRCLES -->
    <section class="bg-gray-900 text-white py-32 relative overflow-hidden">
       <!-- Background Pattern -->
       <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle, #dc2626 1px, transparent 1px); background-size: 30px 30px;"></div>
       
       <div class="container mx-auto px-6 relative z-10 text-center">
          <h2 class="text-5xl md:text-6xl font-black uppercase mb-20 tracking-tighter" data-aos="fade-up">
            Our Core <span class="text-brand-500">Values</span>
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-32">
             <!-- Value 1 -->
             <div class="flex flex-col items-center group" data-aos="fade-up" data-aos-delay="0">
                <div class="relative w-40 h-40 flex items-center justify-center mb-8">
                   <div class="absolute inset-0 bg-brand-600 rounded-full group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(220,38,38,0.5)]"></div>
                   <i class="pi pi-briefcase text-4xl text-white relative z-10"></i>
                </div>
                <h3 class="text-2xl font-bold mb-4 uppercase tracking-widest">{{ $t('ABOUT.CORE_CLIENT') }}</h3>
                <p class="text-gray-400 max-w-xs mx-auto text-sm leading-relaxed transition-colors group-hover:text-white">
                  {{ $t('ABOUT.CORE_CLIENT_SUB') }}
                </p>
             </div>

             <!-- Value 2 -->
             <div class="flex flex-col items-center group" data-aos="fade-up" data-aos-delay="200">
                <div class="relative w-40 h-40 flex items-center justify-center mb-8">
                   <div class="absolute inset-0 bg-yellow-400 rounded-full group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(250,204,21,0.5)]"></div>
                   <i class="pi pi-building text-4xl text-gray-900 relative z-10"></i>
                </div>
                <h3 class="text-2xl font-bold mb-4 uppercase tracking-widest text-white group-hover:text-yellow-400">{{ $t('ABOUT.CORE_COMPANY') }}</h3>
                <p class="text-gray-400 max-w-xs mx-auto text-sm leading-relaxed transition-colors group-hover:text-white">
                  {{ $t('ABOUT.CORE_COMPANY_SUB') }}
                </p>
             </div>

             <!-- Value 3 -->
             <div class="flex flex-col items-center group" data-aos="fade-up" data-aos-delay="400">
                <div class="relative w-40 h-40 flex items-center justify-center mb-8">
                   <div class="absolute inset-0 bg-white rounded-full group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(255,255,255,0.2)]"></div>
                   <i class="pi pi-users text-4xl text-gray-900 relative z-10"></i>
                </div>
                <h3 class="text-2xl font-bold mb-4 uppercase tracking-widest">{{ $t('ABOUT.CORE_COLLEAGUE') }}</h3>
                <p class="text-gray-400 max-w-xs mx-auto text-sm leading-relaxed transition-colors group-hover:text-white">
                  {{ $t('ABOUT.CORE_COLLEAGUE_SUB') }}
                </p>
             </div>
          </div>
       </div>
    </section>

     <!-- BIG STATS PARALLAX EFFECT -->
    <section class="py-40 bg-white relative overflow-hidden flex flex-col items-center justify-center">
       <div class="absolute -left-20 top-0 text-[25vw] font-black text-gray-50 select-none leading-none tracking-tighter">{{ $t('ABOUT.SUCCESS') }}</div>
       
       <div class="relative z-10 text-center" data-aos="zoom-in">
          <span class="text-gray-900 font-black text-xl md:text-2xl uppercase tracking-[0.5em] mb-4 block">{{ $t('ABOUT.SINCE') }}</span>
          <h2 class="text-8xl md:text-[12vw] font-black text-brand-600 leading-none tracking-tighter mb-4">
             <span v-count-up="'1000'">1000</span>+
          </h2>
          <p class="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-widest">{{ $t('ABOUT.PROJECTS_DONE') }}</p>
       </div>
    </section>

    <!-- CEO MESSAGE - PREMIUM FRAMED -->
    <section class="max-w-[1440px] mx-auto px-6 lg:px-20 py-32 bg-gray-50 rounded-[100px_100px_0_0] relative overflow-hidden">
       <!-- Decorative Yellow Circle -->
       <div class="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-yellow-400 rounded-full opacity-60 z-0"></div>
       
       <div class="flex flex-col lg:flex-row items-center gap-20 relative z-10">
          
          <!-- IMAGE LEFT -->
          <div class="lg:w-1/2 relative" data-aos="fade-right">
             <div class="relative group">
                <!-- Decorative Border Frame -->
                <div class="absolute -top-6 -left-6 bottom-6 right-6 border-8 border-brand-600 rounded-3xl z-0 transition-all group-hover:-top-2 group-hover:-left-2 duration-500"></div>
                <!-- Image -->
                <div class="relative z-10 overflow-hidden rounded-3xl shadow-2xl">
                   <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" 
                        class="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="CEO" />
                </div>
                <!-- Red Label Tag -->
                <div class="absolute bottom-10 -right-10 bg-brand-600 px-8 py-4 text-white rounded-xl shadow-xl z-20 transform hover:scale-110 transition-transform">
                   <h4 class="font-black uppercase text-xl">{{ $t('ABOUT.CEO_NAME') }}</h4>
                   <p class="text-xs font-bold tracking-widest text-red-100">{{ $t('ABOUT.CEO_TITLE') }}</p>
                </div>
             </div>
          </div>

          <!-- TEXT RIGHT -->
          <div class="lg:w-1/2 space-y-8" data-aos="fade-left">
             <h3 class="text-5xl font-black text-gray-900 uppercase leading-none border-l-8 border-brand-600 pl-8 mb-12">
               {{ $t('ABOUT.LETTER_FROM') }}<br />{{ $t('ABOUT.OUR_LEADER') }}
             </h3>
             <div class="text-gray-600 text-lg leading-relaxed font-medium space-y-6">
                <p>{{ $t('ABOUT.CEO_P1') }}</p>
                <p>{{ $t('ABOUT.CEO_P2') }}</p>
                <p>{{ $t('ABOUT.CEO_P3') }}</p>
                <p>{{ $t('ABOUT.CEO_P4') }}</p>
                <div class="pt-8">
                   <p class="text-gray-900 font-black text-xl uppercase tracking-tighter">{{ $t('ABOUT.CEO_CLOSING') }}</p>
                   <div class="h-1 w-24 bg-brand-600 mt-4 rounded-full"></div>
                </div>
             </div>
          </div>
       </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AOS from 'aos'

onMounted(() => {
  AOS.init({
    duration: 1000,
    once: true,
  })
})
</script>

<style scoped>
/* Red line animation for aesthetic touch */
@keyframes drawLine {
  0% { transform: scaleX(0); }
  100% { transform: scaleX(1); }
}

.text-brand-600 {
  color: #dc2626;
}

::selection {
  background: #dc2626;
  color: white;
}
</style>
