<template>
  <div class="w-full bg-white text-gray-900 overflow-hidden font-outfit">
    <!-- HERO SECTION -->
    <section class="relative pt-20 pb-16 lg:pt-32 lg:pb-32 container mx-auto px-4 flex flex-col lg:flex-row items-center">
      <!-- Decor dots -->
      <div class="absolute top-10 left-10 w-32 h-32 opacity-20 hidden lg:block">
        <div class="grid grid-cols-6 gap-2">
          <div v-for="i in 36" :key="i" class="w-1.5 h-1.5 rounded-full bg-brand-500"></div>
        </div>
      </div>
      
      <!-- Text content -->
      <div class="lg:w-1/2 relative z-10 space-y-6" data-aos="fade-right">
        <h4 class="text-brand-600 font-bold uppercase tracking-widest text-sm lg:text-base">
          CÔNG TY TỔ CHỨC SỰ KIỆN 5P EVENT
        </h4>
        <h1 class="text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-[1.1] uppercase">
          MUNICH INTERACTIVE<br/>
          INTELLIGENCE<br/>
          INITIATIVE
        </h1>
        <div class="pt-4 pb-2">
          <router-link to="/about" class="group inline-flex items-center gap-3 bg-brand-600 hover:bg-gray-900 text-white font-black py-4 px-10 rounded-full shadow-xl shadow-brand-600/30 hover:shadow-gray-900/30 transition-all duration-500 hover:-translate-y-1 active:translate-y-0">
            TÌM HIỂU THÊM VỀ CHÚNG TÔI <i class="pi pi-arrow-up-right text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
          </router-link>
        </div>
        <p class="text-gray-800 font-medium max-w-lg leading-relaxed text-lg">
          Addressing Individualism and rethinking how to be together<br/>
          <span class="text-brand-600 block mt-2 tracking-wide font-bold">SÁNG TẠO trong ý tưởng - CHỈN CHU trong khâu tổ chức - TỐI GIẢM về chi phí</span>
        </p>
      </div>

      <!-- Image Collage -->
      <div class="lg:w-1/2 mt-12 lg:mt-0 relative" data-aos="fade-left">
        <div class="w-full aspect-[4/3] relative z-10">
          <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop" class="w-full h-full object-cover rounded-tl-[100px] rounded-br-[100px] shadow-2xl" alt="Hero Banner" />
        </div>
        <!-- Abstract Shapes -->
        <div class="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-500 rounded-full opacity-10 blur-2xl z-0"></div>
        <div class="absolute -top-10 -right-10 w-64 h-64 border-[20px] border-gray-100 rounded-full z-0"></div>
      </div>
    </section>

    <!-- OUR LABS (VỀ CHÚNG TÔI) -->
    <section class="py-24 relative bg-[#f5f8fc]">
      <!-- Background Shapes -->
      <div class="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 rounded-l-[150px]"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="flex flex-col lg:flex-row gap-16">
          <!-- Left Text -->
          <div class="lg:w-1/3 relative" data-aos="fade-up">
            <div class="bg-brand-500 text-white rounded-tl-[40px] rounded-br-[40px] p-10 shadow-xl relative z-10 mt-10">
              <h2 class="text-3xl font-black mb-4 uppercase">VỀ CHÚNG TÔI</h2>
              <p class="font-medium">5P EVENT hoạt động chính trên 3 lĩnh vực</p>
            </div>
            <!-- Hand / Eye illustration placeholder -->
            <img src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=400&auto=format&fit=crop" class="mt-8 rounded-full w-48 h-48 object-cover object-center shadow-lg border-8 border-white mx-auto grayscale" alt="Abstract" />
          </div>

          <!-- Cards -->
          <div class="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 lg:-mt-10">
            <!-- Card 1 -->
            <div class="bg-white rounded-[40px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] flex flex-col items-center text-center group cursor-pointer hover:shadow-[0_24px_60px_rgba(220,38,38,0.12)] hover:-translate-y-3 hover:border hover:border-brand-100 transition-all duration-500 border border-transparent" data-aos="fade-up" data-aos-delay="100">
              <div class="w-full h-48 rounded-[20px] overflow-hidden mb-6 relative">
                <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=500&auto=format&fit=crop" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Trọn gói" />
                <div class="absolute inset-0 bg-brand-600/0 group-hover:bg-brand-600/10 transition-all duration-500"></div>
              </div>
              <h3 class="font-black text-2xl mb-2 text-gray-900 group-hover:text-brand-600 transition-colors duration-300">TỔ CHỨC SỰ KIỆN<br/>TRỌN GÓI</h3>
              <p class="text-gray-500 mb-6 font-medium text-sm">Interdisciplinary Research Lab from Munich</p>
              <button @click="$router.push('/events')" class="group/btn bg-brand-600 hover:bg-gray-900 text-white font-black py-3 px-7 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg shadow-brand-600/20 hover:shadow-gray-900/20 hover:-translate-y-0.5 active:translate-y-0">
                TÌM HIỂU THÊM <i class="pi pi-arrow-up-right text-xs transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"></i>
              </button>
            </div>
            
            <!-- Card 2 -->
            <div class="bg-white rounded-[40px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] flex flex-col items-center text-center group cursor-pointer hover:shadow-[0_24px_60px_rgba(220,38,38,0.12)] transition-all duration-500 translate-y-12 hover:translate-y-8 border border-transparent hover:border-brand-100" data-aos="fade-up" data-aos-delay="200">
              <div class="w-full h-48 rounded-[20px] overflow-hidden mb-6 relative">
                <img src="https://images.unsplash.com/photo-1598368195835-915001ff7a91?q=80&w=500&auto=format&fit=crop" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Cho thuê TB" />
                <div class="absolute inset-0 bg-brand-600/0 group-hover:bg-brand-600/10 transition-all duration-500"></div>
              </div>
              <h3 class="font-black text-2xl mb-2 text-gray-900 group-hover:text-brand-600 transition-colors duration-300">CHO THUÊ THIẾT BỊ<br/>SỰ KIỆN 5P</h3>
              <p class="text-brand-600 mb-6 font-medium text-sm px-4">Cung cấp bàn ghế, backdrop, nhà bạt, atsa sự kiện...</p>
              <button @click="$router.push('/rental')" class="group/btn bg-brand-600 hover:bg-gray-900 text-white font-black py-3 px-7 rounded-full transition-all duration-300 flex items-center gap-2 mt-auto shadow-lg shadow-brand-600/20 hover:shadow-gray-900/20 hover:-translate-y-0.5 active:translate-y-0">
                TÌM HIỂU THÊM <i class="pi pi-arrow-up-right text-xs transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"></i>
              </button>
            </div>
            
            <!-- Card 3 -->
            <div class="md:col-span-2 bg-gray-900 rounded-[40px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.15)] flex flex-col items-center text-center group cursor-pointer hover:shadow-[0_24px_60px_rgba(220,38,38,0.2)] hover:-translate-y-3 transition-all duration-500 mt-12 md:mt-0 w-full max-w-sm mx-auto border border-white/5 hover:border-brand-600/30" data-aos="fade-up" data-aos-delay="300">
              <h3 class="font-black text-2xl mb-2 text-brand-500 group-hover:text-brand-400 transition-colors">7SEVEN</h3>
              <p class="text-gray-300 mb-6 font-semibold text-sm">Cho thuê âm thanh, ánh sáng, màn hình LED chuyên nghiệp</p>
              <button @click="$router.push('/rental')" class="group/btn bg-brand-600 hover:bg-white text-white hover:text-brand-600 font-black py-3 px-7 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg shadow-brand-600/20 hover:-translate-y-0.5 active:translate-y-0">
                TÌM HIỂU THÊM <i class="pi pi-arrow-up-right text-xs transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED (GIỚI THIỆU CHUNG) -->
    <section class="py-32 relative bg-white overflow-hidden">
      <!-- DECORATIVE BACKGROUND ELEMENTS -->
      <!-- Large Purple Circle -->
      <div class="absolute top-[10%] left-[40%] w-[600px] h-[600px] bg-[#eef1ff] rounded-full z-0 opacity-80 pointer-events-none"></div>
      <!-- Large Yellow Circle -->
      <div class="absolute -top-[10%] -right-[15%] w-[700px] h-[700px] bg-[#fdfc86] rounded-full z-0 opacity-90 pointer-events-none"></div>
      
      <!-- Tree/Book Artwork at bottom-center -->
      <div class="absolute bottom-[20%] left-[55%] w-[450px] aspect-square z-10 pointer-events-none opacity-80 mix-blend-multiply transition-all duration-1000" data-aos="zoom-in" data-aos-delay="400">
        <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format" class="w-full h-full object-contain grayscale" alt="Tree book decor" />
      </div>

      <div class="container mx-auto px-4 relative z-20 overflow-visible">
        <!-- Title & Navigation Controls -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div class="max-w-xl" data-aos="fade-down">
            <h2 class="text-5xl lg:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">FEATURED</h2>
            <p class="text-gray-500 font-bold text-lg leading-snug">See our latest news and research<br/>publications by our two labs</p>
          </div>
          
          <!-- NAVIGATION ARROWS -->
          <div class="flex gap-4" data-aos="fade-left">
            <button class="featured-prev w-14 h-14 rounded-full border-2 border-gray-200 flex items-center justify-center hover:bg-gray-900 hover:border-gray-900 hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed">
              <i class="pi pi-chevron-left text-lg"></i>
            </button>
            <button class="featured-next w-14 h-14 rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:border-gray-900 hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed">
              <i class="pi pi-chevron-right text-lg"></i>
            </button>
          </div>
        </div>

        <!-- SWIPER CAROUSEL CONTAINER -->
        <swiper
          :modules="[SwiperNavigation, SwiperPagination]"
          :slides-per-view="'auto'"
          :space-between="40"
          :navigation="{
            prevEl: '.featured-prev',
            nextEl: '.featured-next',
          }"
          :pagination="{
            clickable: true,
            el: '.featured-pagination',
          }"
          class="featured-swiper !overflow-visible pb-24"
        >
          <swiper-slide 
            v-for="(item, index) in featuredItems" 
            :key="index"
            class="!w-[320px] md:!w-[420px]"
          >
            <div 
              class="w-full rounded-[40px] p-10 shadow-sm relative group hover:shadow-2xl hover:-translate-y-3 transition-all duration-700"
              :class="[
                index % 2 === 0 ? 'bg-[#e2e2ea]' : 'bg-[#fdfdf5] mt-32'
              ]"
              data-aos="fade-up"
              :data-aos-delay="index * 100"
            >
              <!-- Icon Box -->
              <div class="flex gap-2 mb-10">
                <div 
                  v-for="(icon, iconIdx) in item.icons" 
                  :key="iconIdx"
                  class="p-2.5 rounded-xl shadow-sm"
                  :class="index % 2 === 0 ? 'bg-[#faff00]' : 'bg-[#8b92b6]'"
                >
                  <i :class="[icon, index % 2 === 0 ? 'text-gray-900' : 'text-white', 'font-extrabold']"></i>
                </div>
              </div>
              
              <h4 class="text-3xl font-black text-gray-900 leading-tight mb-6 line-clamp-2 min-h-[4.5rem]">
                {{ item.title }}
              </h4>
              
              <p class="text-gray-600 font-medium text-sm mb-10 leading-relaxed line-clamp-3">
                {{ item.description }}
              </p>
              
              <button 
                class="font-black px-8 py-3 rounded-full text-sm inline-flex items-center gap-3 transition-all duration-500 shadow-lg active:scale-95 group/btn"
                :class="index % 2 === 0 ? 'bg-[#faff00] text-gray-900 hover:bg-gray-900 hover:text-white' : 'bg-[#8b92b6] text-white hover:bg-gray-900'"
              >
                {{ item.buttonText }} <i class="pi pi-arrow-up-right font-bold transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"></i>
              </button>
            </div>
          </swiper-slide>
        </swiper>

        <!-- Pagination Indicators -->
        <div class="featured-pagination flex justify-center gap-4 mt-8"></div>
      </div>
    </section>

    <!-- CONTACT FORM SECTION -->
    <section class="py-24 relative container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center justify-between bg-[#f8fafc] rounded-[40px] p-10 lg:p-16 relative shadow-sm border border-gray-100">
        <!-- Decor Dots -->
        <div class="absolute -top-6 -right-6 text-brand-500 opacity-20">
          <div class="grid grid-cols-5 gap-2">
            <div v-for="i in 25" :key="i" class="w-2 h-2 rounded-full bg-current"></div>
          </div>
        </div>

        <!-- Left Graphic / Text -->
        <div class="md:w-5/12 mb-10 md:mb-0 relative z-10" data-aos="fade-right">
          <div class="w-32 h-32 mb-8 mx-auto md:mx-0">
             <img src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=200&auto=format&fit=crop" class="w-full h-full object-cover rounded-full grayscale mix-blend-multiply" alt="Brain book" />
          </div>
          <h2 class="text-4xl font-black text-gray-900 uppercase mb-4">CONTACT US</h2>
          <p class="text-gray-600 mb-6 font-medium">
            For any inquiries or to learn more about Mi3 and its transformative programs, feel free to get in touch with us.
          </p>
          <p class="text-brand-600 font-bold text-lg">
            Liên hệ để được tư vấn và hỗ trợ nhanh chóng nhất!
          </p>
        </div>

        <!-- Right Form -->
        <div class="md:w-1/2 w-full relative z-10" data-aos="fade-left">
          <div class="bg-[#8b92b6] rounded-[40px] p-8 md:p-10 shadow-xl relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>
            
            <form @submit.prevent="submitForm" class="space-y-4 relative z-10">
              <div class="flex flex-col sm:flex-row gap-4">
                <input type="text" placeholder="Enter your full name" class="flex-1 bg-white border-none rounded-full px-6 py-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-brand-500 outline-none w-full" />
                <input type="email" placeholder="Enter your e-mail address" class="flex-1 bg-white border-none rounded-full px-6 py-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-brand-500 outline-none w-full" />
              </div>
              <textarea placeholder="Type your message" rows="4" class="w-full bg-white border-none rounded-[20px] px-6 py-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-brand-500 outline-none resize-none"></textarea>
              <div class="flex justify-end pt-2">
                <button type="submit" class="group/btn bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black py-3.5 px-10 rounded-full shadow-xl shadow-yellow-400/30 hover:shadow-yellow-300/40 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 flex items-center gap-2">
                  SEND US <i class="pi pi-arrow-up-right font-bold text-xs transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AOS from 'aos'
import { useConfigStore } from '@/store/config'
import { useToast } from '@/composables/useToast'

// SWIPER IMPORTS
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation as SwiperNavigation, Pagination as SwiperPagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

defineOptions({
  name: 'HomePage',
})

const router = useRouter()
const configStore = useConfigStore()
const { toastSuccess } = useToast()

const featuredItems = [
  {
    title: 'So sieht kluges Management für künftige Regierung aus',
    description: 'Paper by Bahador Bahrami and Mi3 alumni Dardo Ferreiro cited in article. Wirtschaftswoche, 2025. (In German).',
    buttonText: 'GO TO THE POST',
    icons: ['pi pi-file-o', 'pi pi-users']
  },
  {
    title: 'Collective responsibility, collective blame',
    description: 'Interview with Bahador Bahrami. Olafor Eliasson Channel. 2019.',
    buttonText: 'GO TO THE POST',
    icons: ['pi pi-play', 'pi pi-image']
  },
  {
    title: 'Why A.I. Should Be Afraid of Us',
    description: 'Interview with Mi3 head Ophelia Deroy. The New York Times, 2021.',
    buttonText: 'GO TO THE POST',
    icons: ['pi pi-file-o', 'pi pi-lightbulb']
  },
  {
    title: 'The Touch Test: The Results',
    description: 'Ophelia Deroy, Guest speaker. 2020. BBC 4 Radio.',
    buttonText: 'GO TO THE POST',
    icons: ['pi pi-microphone', 'pi pi-star']
  },
  {
    title: 'New Horizons in Virtual Reality',
    description: 'A study on human-computer interaction in professional workspace environments.',
    buttonText: 'GO TO THE POST',
    icons: ['pi pi-eye', 'pi pi-compass']
  }
]

onMounted(async () => {
  await configStore.fetchAllConfigs()
  AOS.refresh()
})

const submitForm = () => {
  toastSuccess('Đã gửi liên hệ thành công!')
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1; 
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1; 
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8; 
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<style>
/* Swiper Custom Styles */
.featured-pagination .swiper-pagination-bullet {
  width: 14px;
  height: 14px;
  background: #e2e8f0;
  opacity: 1;
  transition: all 0.3s ease;
}
.featured-pagination .swiper-pagination-bullet-active {
  background: #8b92b6 !important;
  transform: scale(1.25);
}
</style>
