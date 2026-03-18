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
          TỔ CHỨC SỰ KIỆN
        </h1>
        <div class="flex items-center justify-center gap-2 text-sm md:text-base font-medium text-gray-300 uppercase tracking-widest" data-aos="fade-up" data-aos-delay="100">
          <router-link to="/" class="hover:text-red-500 transition-colors">TRANG CHỦ</router-link>
          <span class="text-gray-600">-</span>
          <span class="text-red-500 font-bold drop-shadow-[0_0_5px_rgba(220,38,38,0.6)]">TỔ CHỨC SỰ KIỆN</span>
        </div>
      </div>
      
      <!-- Bottom Red Glow Line -->
      <div class="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50 shadow-[0_0_10px_rgba(220,38,38,1)]"></div>
    </section>

    <!-- MAIN CONTENT -->
    <main class="container mx-auto px-4 py-16">
      
      <!-- RECENT NEWS SECTION (TIN GẦN ĐÂY) -->
      <section class="mb-24">
        <div class="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
          <h2 class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 uppercase tracking-widest" data-aos="fade-right">
            TIN GẦN ĐÂY
          </h2>
          <div class="flex items-center gap-2 cursor-pointer group" data-aos="fade-left">
            <span class="text-sm font-bold uppercase text-gray-400 group-hover:text-white transition-colors">Tin tức</span>
            <div class="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-red-600 transition-all text-gray-400 group-hover:text-white">
              <i class="pi pi-angle-right text-xs"></i>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Left: Big Images -->
          <div class="lg:col-span-7 flex flex-col gap-4" data-aos="fade-up">
            <!-- Top large image -->
            <div class="w-full aspect-video rounded overflow-hidden relative group cursor-pointer border border-white/5 hover:border-red-500/30 transition-all">
              <img src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1200" alt="News 1" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <!-- Bottom 2 halves -->
            <div class="grid grid-cols-2 gap-4">
              <div class="w-full aspect-[4/3] rounded overflow-hidden relative group cursor-pointer border border-white/5 hover:border-red-500/30 transition-all">
                <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800" alt="News 2" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 origin-center" />
                <div class="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">HOT</div>
              </div>
              <div class="w-full aspect-[4/3] rounded overflow-hidden relative group cursor-pointer border border-white/5 hover:border-red-500/30 transition-all">
                <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800" alt="News 3" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 origin-center" />
                <div class="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">HOT</div>
              </div>
            </div>
          </div>

          <!-- Right: Scrollable News List -->
          <div class="lg:col-span-5 bg-white/[0.02] border border-white/5 rounded-lg p-5" data-aos="fade-left" data-aos-delay="200">
            <div class="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
               <h3 class="text-lg font-bold text-white flex items-center gap-2">
                 TIN TỨC 
                 <div class="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                   <i class="pi pi-angle-right text-xs"></i>
                 </div>
               </h3>
               <div class="cursor-pointer text-gray-500 hover:text-white transition-colors">
                   <i class="pi pi-ellipsis-h"></i>
               </div>
            </div>
            
            <div class="h-[600px] overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-4">
              <!-- Item 1 -->
              <div v-for="i in 6" :key="i" class="flex gap-4 group cursor-pointer border-b border-white/5 pb-4 last:border-0 hover:bg-white/[0.02] p-2 rounded transition-colors">
                <div class="w-32 aspect-video rounded overflow-hidden shrink-0 relative">
                  <img :src="`https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=400&ixlib=rb-4.0.3`" alt="News Thumbnail" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div class="absolute top-1 left-1 bg-red-600 w-5 h-5 flex items-center justify-center rounded-sm shadow-sm text-[10px] font-bold">5P</div>
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-sm text-gray-200 group-hover:text-red-500 transition-colors line-clamp-2 leading-snug mb-2">
                    03 "ĐIỂM CHẠM" GIỮ CHÂN KHÁCH HÀNG TRONG SỰ KIỆN RA MẮT SẢN PHẨM MỚI
                  </h4>
                  <p class="text-xs text-gray-500 line-clamp-2">
                    3 yếu tố quan trọng làm nên thành công của sự kiện ra mắt...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- LIBRARY SECTION (KHO THƯ VIỆN) -->
      <section class="mb-16">
        <div class="text-center mb-10" data-aos="fade-up">
          <h2 class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-gray-400 uppercase tracking-widest mb-6">
            KHO THƯ VIỆN
          </h2>
          
          <div class="flex justify-center gap-2">
            <button 
              @click="activeTab = 'images'" 
              class="px-6 py-2 border rounded font-bold text-xs uppercase tracking-widest transition-all duration-300"
              :class="activeTab === 'images' ? 'border-red-600 bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.5)]' : 'border-white/20 text-gray-400 hover:border-white/50 hover:text-white'"
            >
              HÌNH ẢNH
            </button>
            <button 
              @click="activeTab = 'videos'" 
              class="px-6 py-2 border rounded font-bold text-xs uppercase tracking-widest transition-all duration-300"
              :class="activeTab === 'videos' ? 'border-red-600 bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.5)]' : 'border-white/20 text-gray-400 hover:border-white/50 hover:text-white'"
            >
              VIDEO
            </button>
          </div>
        </div>

        <!-- Grid Images -->
        <div v-if="activeTab === 'images'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-in">
          <div v-for="i in 6" :key="'img'+i" class="group relative rounded-lg overflow-hidden aspect-[4/3] bg-white/5 border border-white/5 hover:border-red-500/30 cursor-pointer">
            <img :src="`https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&ixlib=rb-4.0.3`" alt="Gallery" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
              <span class="text-red-500 text-xs font-bold tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">SỰ KIỆN NỔI BẬT</span>
              <h3 class="text-white font-bold leading-tight transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                YEAR END PARTY 2024 VNPAY VỚI CHỦ ĐỀ "TẾT TÂN THỜI"
              </h3>
              <div class="text-gray-400 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">17/05/2026</div>
            </div>
            <!-- Top left mark -->
            <div class="absolute top-0 left-0 w-10 h-10 bg-red-600 [clip-path:polygon(0_0,100%_0,0_100%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>

        <!-- Grid Videos -->
        <div v-if="activeTab === 'videos'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-in">
          <div v-for="i in 6" :key="'vid'+i" class="group relative rounded-lg overflow-hidden aspect-video bg-white/5 border border-white/5 hover:border-red-500/30 cursor-pointer">
            <img :src="`https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800`" alt="Gallery Video" class="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-60 transition-all duration-700" />
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-14 h-14 rounded-full bg-red-600/80 text-white flex items-center justify-center pl-1 group-hover:scale-110 shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-transform">
                <i class="pi pi-play text-xl"></i>
              </div>
            </div>
            <div class="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
              <h3 class="text-white font-bold text-sm line-clamp-1">HIGHLIGHT VIDEO SỰ KIỆN YEU FESTIVAL</h3>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center mt-12 gap-2" data-aos="fade-up">
          <button class="w-8 h-8 flex items-center justify-center rounded border border-red-600 bg-red-600 text-white text-sm font-medium">1</button>
          <button class="w-8 h-8 flex items-center justify-center rounded border border-white/20 text-gray-400 hover:border-white/50 hover:text-white transition-colors text-sm">2</button>
          <button class="w-8 h-8 flex items-center justify-center rounded border border-white/20 text-gray-400 hover:border-white/50 hover:text-white transition-colors text-sm">3</button>
          <button class="w-8 h-8 flex items-center justify-center rounded border border-white/20 text-gray-400 hover:border-white/50 hover:text-white transition-colors text-sm">
            <i class="pi pi-angle-right text-xs"></i>
          </button>
          <button class="px-3 py-1 h-8 flex items-center justify-center rounded border border-white/20 text-gray-400 hover:border-white/50 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider">Trang cuối</button>
        </div>

      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AOS from 'aos'

const activeTab = ref<'images' | 'videos'>('images')

onMounted(() => {
  AOS.refresh()
})
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
