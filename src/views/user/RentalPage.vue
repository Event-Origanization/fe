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
          CHO THUÊ THIẾT BỊ SỰ KIỆN
        </h1>
        <div class="flex items-center justify-center gap-2 text-sm md:text-base font-medium text-gray-300 uppercase tracking-widest" data-aos="fade-up" data-aos-delay="100">
          <router-link to="/" class="hover:text-red-500 transition-colors">TRANG CHỦ</router-link>
          <span class="text-gray-600">-</span>
          <span class="text-red-500 font-bold drop-shadow-[0_0_5px_rgba(220,38,38,0.6)]">CHO THUÊ THIẾT BỊ SỰ KIỆN</span>
        </div>
      </div>
      
      <!-- Bottom Red Glow Line -->
      <div class="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50 shadow-[0_0_10px_rgba(220,38,38,1)]"></div>
    </section>

    <!-- MAIN CONTENT -->
    <main class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- TRÁI: DANH SÁCH HẠNG MỤC -->
        <div class="lg:col-span-8 flex flex-col gap-6" data-aos="fade-right">
          <div class="mb-4">
            <h2 class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 uppercase tracking-widest text-[#cfcfcf]">
              HẠNG MỤC SỰ KIỆN
            </h2>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
            <!-- Sản phẩm / Hạng mục -->
            <div v-for="(item, idx) in rentalItems" :key="idx" class="group flex flex-col cursor-pointer bg-white/[0.02] border border-white/5 rounded-lg overflow-hidden hover:border-red-500/50 hover:bg-white/[0.05] hover:shadow-[0_5px_20px_rgba(220,38,38,0.15)] transition-all duration-300" data-aos="zoom-in" :data-aos-delay="idx * 50">
              <div class="w-full aspect-[4/3] bg-white/10 relative overflow-hidden flex items-center justify-center">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 drop-shadow-lg" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div class="p-4 w-full text-center border-t border-white/5 flex items-center justify-center min-h-[70px]">
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

        <!-- PHẢI: TIN TỨC SỰ KIỆN -->
        <ScrollableNewsList
          class="lg:col-span-4"
          data-aos="fade-left"
          data-aos-delay="200"
          :items="mockNews"
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
      
      <!-- QUY TRÌNH THUÊ THIẾT BỊ (NEW SECTION) -->
      <section class="mt-28 mb-12" data-aos="fade-up">
        <div class="text-center mb-16">
          <h2 class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-gray-400 uppercase tracking-widest mb-4">
            QUY TRÌNH THUÊ THIẾT BỊ TẠI 5P EVENT
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto">Chuyên nghiệp, nhanh chóng và hỗ trợ tận tình từ khâu tư vấn đến lúc sự kiện hoàn tất.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <!-- Đường line nối (chỉ hiện trên màn hình lớn) -->
          <div class="hidden lg:block absolute top-[40px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-40 z-0"></div>
          
          <div v-for="(step, i) in steps" :key="i" class="relative z-10 flex flex-col items-center text-center group" data-aos="zoom-in" :data-aos-delay="i * 100">
            <div class="w-20 h-20 rounded-full bg-[#050510] border-2 border-red-600 flex items-center justify-center text-2xl mb-6 shadow-[0_0_15px_rgba(220,38,38,0.5)] group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300">
              <i :class="['pi text-red-500 group-hover:text-white transition-colors', step.icon]"></i>
            </div>
            <div class="bg-white/5 border border-white/10 p-5 rounded-lg w-full flex-1 hover:border-red-500/50 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300">
              <div class="text-red-500 font-bold mb-2 text-sm tracking-widest">BƯỚC {{ i + 1 }}</div>
              <h3 class="font-bold text-white mb-2 uppercase text-sm tracking-wide">{{ step.title }}</h3>
              <p class="text-xs text-gray-400 leading-relaxed">{{ step.desc }}</p>
            </div>
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

const rentalItems = [
  { name: 'Cho Thuê Cổng Hơi Sự Kiện', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400' },
  { name: 'Cho Thuê Trụ Cắt Băng Khai Trương', image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=400' },
  { name: 'Cho Thuê Bục Phát Biểu', image: 'https://images.unsplash.com/photo-1519671482749-fd0987c33992?q=80&w=400' },
  { name: 'Cho Thuê Bộ Bàn Ghế Sự Kiện', image: 'https://plus.unsplash.com/premium_photo-1681400650965-72d8eb69f4c3?q=80&w=400' },
  { name: 'Cung Cấp Hashtag Sự Kiện', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400' },
  { name: 'Cung Cấp Mascot Sự Kiện', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400' },
  { name: 'Cung Cấp Teabreak Sự Kiện', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=400' },
  { name: 'Cung Cấp Nhóm Nhảy Sexy', image: 'https://images.unsplash.com/photo-1504609774515-ecbad39dbcf0?q=80&w=400' },
  { name: 'Cung Cấp PG Sự Kiện', image: 'https://images.unsplash.com/photo-1492108719814-2ab6ca9a1506?q=80&w=400' },
  { name: 'Cho Thuê Bàn IBM', image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=400' },
  { name: 'Cho Thuê Dù Lệch Tâm', image: 'https://plus.unsplash.com/premium_photo-1681400650965-72d8eb69f4c3?q=80&w=400' },
  { name: 'Cho Thuê Ghế Banquet', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400' }
]

const newsItemsBase = [
  { 
    title: 'TEAMBUILDING 08/01/2023 THU HÚT HƠN 100 NHÂN SỰ', 
    desc: 'Với hơn 100 nhân sự tham dự, teambuilding GHOT tái hiện lịch sử hào hùng...', 
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    title: 'TỔ CHỨC SỰ KIỆN KHAI TRƯƠNG ĐỘC ĐÁO - CHIẾN LƯỢC TẠO SÓNG TRUYỀN THÔNG', 
    desc: 'Bí quyết giúp sự kiện khai trương trở thành tâm điểm chú ý trên mạng xã hội...', 
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    title: 'CHI PHÍ TỔ CHỨC LỄ MỞ BÁN BẤT ĐỘNG SẢN: BẢNG DỰ TRÙ & CÁCH TỐI ƯU', 
    desc: 'Bảng dự trù chi phí chi tiết và cách tối ưu ngân sách hiệu quả nhất...', 
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    title: 'HỘI NGHỊ KHÁCH HÀNG - CHÌA KHÓA GIỮ CHÂN VÀ GẮN KẾT', 
    desc: 'Dịch vụ tổ chức hội nghị khách hàng chuyên nghiệp, trọn gói...', 
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=400' 
  }
]

// Lặp data để đủ dài kích hoạt Scrollbar
const mockNews = [...newsItemsBase, ...newsItemsBase, ...newsItemsBase, ...newsItemsBase]

const steps = [
  { icon: 'pi-comments', title: 'TIẾP NHẬN YÊU CẦU', desc: 'Lắng nghe nhu cầu, tư vấn hạng mục thiết bị phù hợp với tính chất sự kiện.' },
  { icon: 'pi-file-edit', title: 'BÁO GIÁ & KÝ KẾT', desc: 'Lên checklist chi tiết, chốt báo giá cạnh tranh minh bạch và ký hợp đồng.' },
  { icon: 'pi-truck', title: 'SETUP THIẾT BỊ', desc: 'Vận chuyển và setup thiết bị tận nơi đúng timeline cam kết, test chuẩn xác.' },
  { icon: 'pi-star-fill', title: 'HỖ TRỢ TRỰC TIẾP', desc: 'Kỹ thuật viên trực suốt sự kiện, xử lý sự cố lập tức đảm bảo thành công 100%.' }
]
</script>
