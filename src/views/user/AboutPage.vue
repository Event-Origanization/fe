<template>
  <div class="w-full bg-[#0a0a0a] min-h-screen text-white overflow-hidden pb-12">
    <!-- VISION & MISSION section with Triangle -->
    <section class="relative w-full h-auto min-h-[600px] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      <div class="absolute inset-0 top-1/2 w-full h-px bg-red-600/30 shadow-[0_0_20px_theme(colors.red.600)]"></div>
      <div class="absolute top-1/2 left-0 w-full h-[300px] bg-gradient-to-t from-red-900/40 via-transparent to-transparent -translate-y-1/2 blur-2xl pointer-events-none"></div>

      <div class="container mx-auto px-4 relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-12">
        <!-- VISION (Left) -->
        <div class="flex-1 text-center md:text-right" data-aos="fade-right" data-aos-duration="1000">
          <h2 class="text-3xl font-black mb-4 tracking-widest uppercase drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">
            {{ $t('ABOUT.VISION_TITLE') }}
          </h2>
          <p class="text-gray-300 text-sm max-w-sm md:ml-auto leading-relaxed">
            {{ $t('ABOUT.VISION_DESC') }}
          </p>
        </div>

        <!-- CENTER TRIANGLE -->
        <div class="relative w-72 h-80 flex-shrink-0 flex items-center justify-center" data-aos="zoom-in" data-aos-duration="1200">
          <div class="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-red-600 to-red-900 [clip-path:polygon(50%_0%,0%_100%,100%_100%)] shadow-[0_0_50px_rgba(220,38,38,0.8)]"></div>
          <div class="absolute inset-x-1 bottom-1 top-2 bg-gradient-to-t from-[#0a0a0a] via-[#1a0505] to-red-950 [clip-path:polygon(50%_0%,0%_100%,100%_100%)] flex flex-col items-center justify-center pb-8">
            <h1 class="text-6xl font-black text-white uppercase tracking-tighter drop-shadow-md">5P</h1>
            <p class="text-lg tracking-[0.5em] font-bold text-red-500 mt-2">EVENT</p>
          </div>
          <div class="absolute -bottom-8 w-[150%] h-16 left-1/2 -translate-x-1/2 bg-red-600/20 blur-[20px] rounded-full"></div>
        </div>

        <!-- MISSION (Right) -->
        <div class="flex-1 text-center md:text-left" data-aos="fade-left" data-aos-duration="1000">
          <h2 class="text-3xl font-black mb-4 tracking-widest uppercase drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">
            {{ $t('ABOUT.MISSION_TITLE') }}
          </h2>
          <p class="text-gray-300 text-sm max-w-sm leading-relaxed">
            {{ $t('ABOUT.MISSION_DESC') }}
          </p>
        </div>
      </div>
    </section>

    <!-- PROJECT COMPLETED STATS -->
    <section class="py-12 relative flex items-center justify-center overflow-hidden" data-aos="fade-up" data-aos-duration="1000">
      <h2 class="absolute text-[8vw] md:text-[10vw] font-black text-white/5 uppercase tracking-tighter whitespace-nowrap leading-none select-none">
        THINK DIFFERENT
      </h2>
      <div class="relative z-10 text-center font-black uppercase stats-item-group">
        <p class="text-lg md:text-xl tracking-widest mb-1 text-gray-300">MORE</p>
        <p class="text-5xl md:text-7xl text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] tracking-tighter animate-stats-glow" v-count-up="'1000'">1000</p>
        <p class="text-xl md:text-2xl mt-2 tracking-[0.2em] text-gray-200">{{ $t('ABOUT.STAT_LABEL') }}</p>
        <div class="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-4"></div>
      </div>
    </section>

    <!-- THE 4 VALUES -->
    <section class="w-full flex flex-col mx-auto">

      <!-- 01 -->
      <div class="relative w-full h-[400px] flex items-center overflow-hidden group">
        <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen scale-100 group-hover:scale-105 transition-transform duration-[2s]" alt="Concert" />
        <div class="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80"></div>
        <div class="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center content-center h-full">
          <div class="md:w-1/2 flex items-center justify-center relative h-full" data-aos="fade-right" data-aos-duration="1000">
            <div class="absolute w-[250px] h-[250px] md:w-[350px] md:h-[350px] bg-red-800/60 rounded-full blur-xl mix-blend-screen"></div>
            <div class="absolute w-[180px] h-[180px] md:w-[250px] md:h-[250px] bg-pink-600/50 rounded-full blur-md flex items-center justify-center p-8 text-center ml-12 shadow-[0_0_50px_rgba(219,39,119,0.5)] border border-pink-500/20 backdrop-blur-sm transition-all group-hover:bg-pink-600/70">
               <div class="flex flex-col text-center items-center h-full justify-center w-full">
                 <p class="text-xs text-white/90 drop-shadow-md pb-4 font-medium uppercase tracking-widest border-b border-pink-400/30 w-full mb-2">{{ $t('ABOUT.VALUES.S1_DESC') }}</p>
                 <h3 class="font-black text-xl tracking-[0.2em] mt-1">{{ $t('ABOUT.VALUES.S1_NAME') }}</h3>
               </div>
            </div>
          </div>
          <div class="md:w-1/2 flex items-center justify-start pointer-events-none mt-4 md:mt-0" data-aos="fade-left" data-aos-duration="1200">
            <span class="text-[120px] md:text-[200px] font-black italic leading-none text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] opacity-90 relative -ml-16 md:-ml-32">01</span>
          </div>
        </div>
      </div>

      <!-- 02 -->
      <div class="relative w-full h-[400px] flex items-center overflow-hidden group">
        <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen scale-100 group-hover:scale-105 transition-transform duration-[2s]" alt="Stage" />
        <div class="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80"></div>
        <div class="container mx-auto px-4 relative z-10 flex flex-col md:flex-row-reverse items-center content-center h-full">
          <div class="md:w-1/2 flex items-center justify-center relative h-full" data-aos="fade-left" data-aos-duration="1000">
            <div class="absolute w-[250px] h-[250px] md:w-[350px] md:h-[350px] bg-red-800/60 rounded-full blur-xl mix-blend-screen -mr-12"></div>
            <div class="absolute w-[180px] h-[180px] md:w-[250px] md:h-[250px] bg-pink-600/50 rounded-full blur-md flex items-center justify-center p-8 text-center -ml-12 shadow-[0_0_50px_rgba(219,39,119,0.5)] border border-pink-500/20 backdrop-blur-sm transition-all group-hover:bg-pink-600/70">
               <div class="flex flex-col text-center items-center h-full justify-center w-full">
                 <p class="text-xs text-white/90 drop-shadow-md pb-4 font-medium uppercase tracking-widest border-b border-pink-400/30 w-full mb-2">{{ $t('ABOUT.VALUES.S2_DESC') }}</p>
                 <h3 class="font-black text-xl tracking-[0.2em] mt-1">{{ $t('ABOUT.VALUES.S2_NAME') }}</h3>
               </div>
            </div>
          </div>
          <div class="md:w-1/2 flex items-center justify-end pointer-events-none mt-4 md:mt-0" data-aos="fade-right" data-aos-duration="1200">
            <span class="text-[120px] md:text-[200px] font-black italic leading-none text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] opacity-90 relative -mr-16 md:-mr-32">02</span>
          </div>
        </div>
      </div>

      <!-- 03 -->
      <div class="relative w-full h-[400px] flex items-center overflow-hidden group">
        <img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen scale-100 group-hover:scale-105 transition-transform duration-[2s]" alt="Audience" />
        <div class="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80"></div>
        <div class="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center content-center h-full">
          <div class="md:w-1/2 flex items-center justify-center relative h-full" data-aos="fade-right" data-aos-duration="1000">
            <div class="absolute w-[250px] h-[250px] md:w-[350px] md:h-[350px] bg-red-800/60 rounded-full blur-xl mix-blend-screen ml-12"></div>
            <div class="absolute w-[180px] h-[180px] md:w-[250px] md:h-[250px] bg-pink-600/50 rounded-full blur-md flex items-center justify-center p-8 text-center ml-24 shadow-[0_0_50px_rgba(219,39,119,0.5)] border border-pink-500/20 backdrop-blur-sm transition-all group-hover:bg-pink-600/70">
               <div class="flex flex-col text-center items-center h-full justify-center w-full">
                 <p class="text-xs text-white/90 drop-shadow-md pb-4 font-medium uppercase tracking-widest border-b border-pink-400/30 w-full mb-2">{{ $t('ABOUT.VALUES.S3_DESC') }}</p>
                 <h3 class="font-black text-xl tracking-[0.2em] mt-1">{{ $t('ABOUT.VALUES.S3_NAME') }}</h3>
               </div>
            </div>
          </div>
          <div class="md:w-1/2 flex items-center justify-start pointer-events-none mt-4 md:mt-0" data-aos="fade-left" data-aos-duration="1200">
            <span class="text-[120px] md:text-[200px] font-black italic leading-none text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] opacity-90 relative -ml-16 md:-ml-32">03</span>
          </div>
        </div>
      </div>

      <!-- 04 -->
      <div class="relative w-full h-[400px] flex items-center overflow-hidden group">
        <img src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2000&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen scale-100 group-hover:scale-105 transition-transform duration-[2s]" alt="Party" />
        <div class="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80"></div>
        <div class="container mx-auto px-4 relative z-10 flex flex-col md:flex-row-reverse items-center content-center h-full">
          <div class="md:w-1/2 flex items-center justify-center relative h-full" data-aos="fade-left" data-aos-duration="1000">
            <div class="absolute w-[250px] h-[250px] md:w-[350px] md:h-[350px] bg-red-800/60 rounded-full blur-xl mix-blend-screen -mr-12"></div>
            <div class="absolute w-[180px] h-[180px] md:w-[250px] md:h-[250px] bg-pink-600/50 rounded-full blur-md flex items-center justify-center p-8 text-center -ml-24 shadow-[0_0_50px_rgba(219,39,119,0.5)] border border-pink-500/20 backdrop-blur-sm transition-all group-hover:bg-pink-600/70">
               <div class="flex flex-col text-center items-center h-full justify-center w-full">
                 <p class="text-xs text-white/90 drop-shadow-md pb-4 font-medium uppercase tracking-widest border-b border-pink-400/30 w-full mb-2">{{ $t('ABOUT.VALUES.S4_DESC') }}</p>
                 <h3 class="font-black text-xl tracking-[0.2em] mt-1">{{ $t('ABOUT.VALUES.S4_NAME') }}</h3>
               </div>
            </div>
          </div>
          <div class="md:w-1/2 flex items-center justify-end pointer-events-none mt-4 md:mt-0" data-aos="fade-right" data-aos-duration="1200">
            <span class="text-[120px] md:text-[200px] font-black italic leading-none text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] opacity-90 relative -mr-16 md:-mr-32">04</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CORE VALUES -->
    <section class="py-16 bg-[#050505] text-center border-t border-b border-white/5 relative z-10">
      <h2 class="text-2xl md:text-3xl font-black mb-12 uppercase tracking-[0.3em] inline-block border border-white/20 px-10 py-3 relative bg-black shadow-[0_0_15px_rgba(255,255,255,0.1)]" data-aos="fade-up">
        {{ $t('ABOUT.CORE_VALUES_TITLE') }}
      </h2>
      <div class="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24">
        <div class="flex flex-col items-center" data-aos="flip-up" data-aos-delay="0">
          <div class="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-tr from-[#1a1a1a] via-[#333] to-[#1a1a1a] flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300 [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] border border-white/10">
             <i class="pi pi-briefcase text-3xl pb-2"></i>
             <h4 class="font-black text-red-500 tracking-wider">{{ $t('ABOUT.CORE_CLIENT') }}</h4>
          </div>
          <p class="mt-4 text-xs tracking-widest text-gray-400 w-40 leading-relaxed text-center">{{ $t('ABOUT.CORE_CLIENT_SUB') }}</p>
        </div>
        <div class="flex flex-col items-center" data-aos="flip-up" data-aos-delay="200">
          <div class="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-tr from-[#1a1a1a] via-[#333] to-[#1a1a1a] flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300 [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] border border-white/10">
             <i class="pi pi-building text-3xl pb-2"></i>
             <h4 class="font-black text-red-500 tracking-wider">{{ $t('ABOUT.CORE_COMPANY') }}</h4>
          </div>
          <p class="mt-4 text-xs tracking-widest text-gray-400 w-40 leading-relaxed text-center">{{ $t('ABOUT.CORE_COMPANY_SUB') }}</p>
        </div>
        <div class="flex flex-col items-center" data-aos="flip-up" data-aos-delay="400">
          <div class="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-tr from-[#1a1a1a] via-[#333] to-[#1a1a1a] flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300 [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] border border-white/10">
             <i class="pi pi-users text-3xl pb-2"></i>
             <h4 class="font-black text-red-500 tracking-wider">{{ $t('ABOUT.CORE_COLLEAGUE') }}</h4>
          </div>
          <p class="mt-4 text-xs tracking-widest text-gray-400 w-40 leading-relaxed text-center">{{ $t('ABOUT.CORE_COLLEAGUE_SUB') }}</p>
        </div>
      </div>
    </section>

    <!-- EVENT MEDIA WEDDING -->
    <section class="w-full relative py-20 bg-black min-h-[500px] flex items-center justify-center overflow-hidden border-b border-white/5">
      <img src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=2000" class="absolute w-full h-full object-cover opacity-20 filter saturate-50" />
      <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80"></div>
      <div class="relative z-10 flex flex-col items-center justify-center text-center group cursor-pointer" data-aos="zoom-in" data-aos-duration="1500">
        <div class="absolute -z-10 text-[30vw] md:text-[20vw] font-black text-white/5 select-none inset-0 flex items-center justify-center leading-none mt-4">5P</div>
        <div class="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/30 flex justify-center items-center relative hover:scale-110 transition-transform active:scale-95">
          <div class="absolute inset-0 rounded-full border border-white border-dashed animate-[spin_10s_linear_infinite]"></div>
          <i class="pi pi-play text-2xl md:text-3xl text-white ml-2 drop-shadow-md"></i>
        </div>
        <h2 class="mt-12 text-2xl md:text-5xl font-black tracking-[0.2em] md:tracking-[0.4em] drop-shadow-lg text-white">
          {{ $t('ABOUT.MEDIA_TITLE') }}
        </h2>
        <div class="flex gap-4 mt-6">
          <div class="w-10 h-10 rounded bg-[#4267B2] flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform"><i class="pi pi-facebook"></i></div>
          <div class="w-10 h-10 rounded bg-[#FF0000] flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform"><i class="pi pi-youtube"></i></div>
        </div>
      </div>
    </section>

    <!-- CEO / FOUNDER SECTION -->
    <section class="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-16 relative">
      <div class="absolute left-0 bottom-0 w-[50vw] h-64 border-t border-purple-500/20 [border-radius:100%_100%_0_0] pointer-events-none mix-blend-screen opacity-50"></div>
      <div class="absolute right-0 bottom-0 w-[80vw] h-48 border-t border-blue-500/20 [border-radius:100%_100%_0_0] pointer-events-none mix-blend-screen opacity-50"></div>

      <div class="flex-1 space-y-6 text-sm text-gray-300 leading-relaxed font-light z-10" data-aos="fade-right" data-aos-duration="1200">
        <h3 class="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-8 border-l-4 border-red-600 pl-4">
          {{ $t('ABOUT.CEO_GREETING') }}
        </h3>
        <p>{{ $t('ABOUT.CEO_P1') }}</p>
        <p>{{ $t('ABOUT.CEO_P2') }}</p>
        <p>{{ $t('ABOUT.CEO_P3') }}</p>
        <p>{{ $t('ABOUT.CEO_P4') }}</p>
        <p class="font-bold text-white uppercase text-base tracking-widest pt-4 drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
          {{ $t('ABOUT.CEO_CLOSING') }}
        </p>
      </div>

      <div class="flex-1 w-full max-w-md relative" data-aos="fade-left" data-aos-duration="1200" data-aos-delay="200">
        <div class="relative w-full aspect-[3/4] overflow-hidden rounded-sm filter drop-shadow-[0_0_30px_rgba(255,255,255,0.05)] border border-white/10 group cursor-default">
          <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent z-10 transition-all duration-500 group-hover:h-3/4"></div>
          <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800" alt="CEO" class="absolute inset-0 w-full h-full object-cover grayscale opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" />
          <div class="absolute bottom-6 left-6 z-20 transform -translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <h4 class="text-xl font-bold uppercase tracking-wider text-white">{{ $t('ABOUT.CEO_NAME') }}</h4>
            <p class="text-red-500 text-xs font-bold tracking-[0.2em] uppercase">{{ $t('ABOUT.CEO_TITLE') }}</p>
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
  AOS.refresh()
})
</script>

<style scoped>
::selection {
  background: #dc2626;
  color: white;
}
</style>
