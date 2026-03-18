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
          ÂM THANH ÁNH SÁNG
        </h1>
        <div class="flex items-center justify-center gap-2 text-sm md:text-base font-medium text-gray-300 uppercase tracking-widest" data-aos="fade-up" data-aos-delay="100">
          <router-link to="/" class="hover:text-red-500 transition-colors">TRANG CHỦ</router-link>
          <span class="text-gray-600">-</span>
          <span class="text-red-500 font-bold drop-shadow-[0_0_5px_rgba(220,38,38,0.6)]">ÂM THANH ÁNH SÁNG</span>
        </div>
      </div>
      
      <!-- Bottom Red Glow Line -->
      <div class="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50 shadow-[0_0_10px_rgba(220,38,38,1)]"></div>
    </section>

    <!-- MAIN CONTENT -->
    <main class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- TRÁI: DANH SÁCH GÓI DỊCH VỤ -->
        <div class="lg:col-span-8 flex flex-col gap-6" data-aos="fade-right">
          <div class="mb-4">
            <h2 class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 uppercase tracking-widest">
              GÓI DỊCH VỤ
            </h2>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
            <!-- Sản phẩm / Gói -->
            <div v-for="(item, idx) in packages" :key="idx" class="group flex flex-col items-center cursor-pointer bg-white/[0.02] border border-white/5 rounded-lg overflow-hidden hover:border-red-500/50 hover:bg-white/[0.05] transition-all duration-300" data-aos="zoom-in" :data-aos-delay="idx * 50">
              <div class="w-full aspect-[4/3] bg-white/10 p-4 relative overflow-hidden flex items-center justify-center">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 drop-shadow-lg" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div class="p-4 w-full text-center border-t border-white/5">
                <h3 class="font-bold text-sm md:text-base text-gray-200 group-hover:text-red-400 transition-colors line-clamp-2">
                  {{ item.name }}
                </h3>
              </div>
            </div>
          </div>
          
          <!-- Pagination -->
          <div class="flex justify-center mt-12 gap-2" data-aos="fade-up">
            <button class="w-8 h-8 flex items-center justify-center rounded border border-red-600 bg-red-600 text-white text-sm font-medium shadow-[0_0_10px_rgba(220,38,38,0.5)]">1</button>
            <button class="w-8 h-8 flex items-center justify-center rounded border border-white/20 text-gray-400 hover:border-white/50 hover:text-white transition-colors text-sm">2</button>
            <button class="w-8 h-8 flex items-center justify-center rounded border border-white/20 text-gray-400 hover:border-white/50 hover:text-white transition-colors text-sm">3</button>
            <button class="w-8 h-8 flex items-center justify-center rounded border border-white/20 text-gray-400 hover:border-white/50 hover:text-white transition-colors text-sm">
              <i class="pi pi-angle-right text-xs"></i>
            </button>
            <button class="px-3 py-1 h-8 flex items-center justify-center rounded border border-white/20 text-gray-400 hover:border-white/50 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider">Trang cuối</button>
          </div>
        </div>

        <ScrollableNewsList
          class="lg:col-span-4"
          data-aos="fade-left"
          data-aos-delay="200"
          :items="[...newsItems, ...newsItems, ...newsItems, ...newsItems]"
        >
          <template #header>
            <div class="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <h2 class="text-xl font-bold uppercase tracking-widest text-white">Tin tức</h2>
              <div class="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 transition-all text-gray-400 hover:text-white cursor-pointer group">
                <i class="pi pi-angle-right text-xs group-hover:translate-x-0.5 transition-transform"></i>
              </div>
            </div>
          </template>
        </ScrollableNewsList>

      </div>
      
      <!-- LỢI ÍCH KHI CHỌN CHÚNG TÔI -->
      <section class="mt-28 mb-12" data-aos="fade-up">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-gray-400 uppercase tracking-widest mb-4">
            VÌ SAO CHỌN DỊCH VỤ CỦA CHÚNG TÔI?
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto">Hệ thống thiết bị âm thanh ánh sáng chuyên nghiệp cùng đội ngũ kỹ thuật giàu kinh nghiệm là nền tảng vững chắc cho sự kiện của bạn.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(benefit, i) in benefits" :key="i" class="bg-white/5 border border-white/10 p-6 rounded-lg text-center hover:-translate-y-2 hover:border-red-500/50 hover:bg-white/[0.08] hover:shadow-[0_10px_30px_rgba(220,38,38,0.15)] transition-all duration-300 group">
            <div class="w-16 h-16 mx-auto bg-gradient-to-br from-red-600 to-red-900 rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(220,38,38,0.5)] group-hover:scale-110 transition-transform">
              <i :class="['pi text-2xl text-white', benefit.icon]"></i>
            </div>
            <h3 class="font-bold text-white mb-3 tracking-wide uppercase text-sm">{{ benefit.title }}</h3>
            <p class="text-xs text-gray-400 leading-relaxed">{{ benefit.desc }}</p>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AOS from 'aos'
import ScrollableNewsList from '@/components/ScrollableNewsList.vue'

onMounted(() => {
  AOS.refresh()
})

const packages = [
  { name: 'Gói Âm Thanh < 70 khách (không có ca sĩ)', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=400' },
  { name: 'Gói Âm Thanh < 70 Khách (có ca sĩ)', image: 'https://images.unsplash.com/photo-1516280440502-c2e39ea2fbaa?q=80&w=400' },
  { name: 'Gói Âm Thanh < 150 Khách', image: 'https://plus.unsplash.com/premium_photo-1681400650965-72d8eb69f4c3?q=80&w=400' },
  { name: 'Gói Âm Thanh < 200 Khách', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=400' },
  { name: 'Gói Âm Thanh < 250 Khách', image: 'https://images.unsplash.com/photo-1520114009623-2882199b4566?q=80&w=400' },
  { name: 'Gói Âm Thanh 300 - 500 Khách', image: 'https://images.unsplash.com/photo-1516280440502-c2e39ea2fbaa?q=80&w=400' },
  { name: 'Gói Âm Thanh 1000 Khách', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=400' },
  { name: 'Gói Âm Thanh > 2000 Khách', image: 'https://plus.unsplash.com/premium_photo-1681400650965-72d8eb69f4c3?q=80&w=400' },
  { name: 'Gói Ánh Sáng Cơ Bản 1', image: 'https://images.unsplash.com/photo-1516280440502-c2e39ea2fbaa?q=80&w=400' },
]

const newsItems = [
  { 
    title: 'THUÊ ĐƠN VỊ TỔ CHỨC YEP - TIÊU CHÍ LỰA CHỌN VÀ LƯU Ý QUAN TRỌNG', 
    desc: 'Tìm hiểu các tiêu chí chọn đơn vị tổ chức Year End Party uy tín...', 
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    title: 'SO SÁNH TỔ CHỨC YEP TẠI NHÀ HÀNG - KHÁCH SẠN - ROOFTOP - OUTDOOR', 
    desc: 'So sánh các mô hình tổ chức Year End Party phổ biến...', 
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    title: 'NHỮNG LỖI PHỔ BIẾN KHI TỔ CHỨC TIỆC CUỐI NĂM VÀ CÁCH TRÁNH', 
    desc: 'Khám phá những lỗi thường gặp khi tổ chức YEP và cách phòng tránh...', 
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    title: 'CÁCH LỰA CHỌN ĐỊA ĐIỂM TỔ CHỨC YEP PHÙ HỢP THEO NGÂN SÁCH', 
    desc: 'Bí quyết chọn địa điểm hoàn hảo giúp tối ưu ngân sách...', 
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=400' 
  }
]

const benefits = [
  { icon: 'pi-bolt', title: 'THIẾT BỊ HIỆN ĐẠI', desc: 'Sở hữu hệ thống âm thanh ánh sáng đời mới nhất, nhập khẩu 100%.' },
  { icon: 'pi-users', title: 'KỸ THUẬT VIÊN PRO', desc: 'Đội ngũ kỹ thuật viên dày dặn kinh nghiệm, xử lý tình huống linh hoạt.' },
  { icon: 'pi-wallet', title: 'CHI PHÍ TỐI ƯU', desc: 'Mang đến mức chi phí hợp lý nhất đi kèm với chất lượng dịch vụ đỉnh cao.' },
  { icon: 'pi-check-circle', title: 'CAM KẾT THÀNH CÔNG', desc: 'Chúng tôi đảm bảo sự trơn tru, hoàn hảo cho khâu kỹ thuật của sự kiện.' }
]
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
