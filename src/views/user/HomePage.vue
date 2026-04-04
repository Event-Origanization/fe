<template>
  <div class="w-full bg-white text-gray-900 overflow-hidden font-outfit">
    <!-- HERO SECTION -->
    <section class="relative pt-20 pb-12 lg:pt-32 lg:pb-32 container mx-auto px-4">
      <!-- Decor dots -->
      <div class="absolute top-10 left-10 w-32 h-32 opacity-20 hidden lg:block">
        <div class="grid grid-cols-6 gap-2">
          <div v-for="i in 36" :key="i" class="w-1.5 h-1.5 rounded-full bg-brand-500"></div>
        </div>
      </div>

      <!-- Inner: stack on mobile, side-by-side on lg -->
      <div class="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        <!-- Text content -->
        <div class="w-full lg:w-1/2 relative z-10 space-y-6" data-aos="fade-right">
          <h4 class="text-brand-600 font-bold uppercase tracking-widest text-sm lg:text-base">
            {{ $t('HOME.HERO.SUBTITLE') }}
          </h4>
          <h1 class="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-[1.1] uppercase whitespace-pre-line">
            {{ heroData?.title_vi || $t('HOME.HERO.DEFAULT_TITLE') }}
          </h1>
          <div class="pt-2 pb-1">
            <a href="#about-snippet" class="group inline-flex items-center gap-3 bg-brand-600 hover:bg-gray-900 text-white font-black py-4 px-10 rounded-full shadow-xl shadow-brand-600/30 hover:shadow-gray-900/30 transition-all duration-500 hover:-translate-y-1 active:translate-y-0">
              {{ $t('HOME.HERO.LEARN_MORE') }} <i class="pi pi-arrow-down text-xs transition-transform group-hover:translate-y-1"></i>
            </a>
          </div>
          <p class="text-gray-800 font-medium max-w-lg leading-relaxed text-base lg:text-lg">
            {{ $t('HOME.HERO.SLOGAN_P1') }}<br/>
            <span class="text-brand-600 block mt-2 tracking-wide font-bold">{{ $t('HOME.HERO.SLOGAN_P2') }}</span>
          </p>
        </div>

        <!-- Image -->
        <div class="w-full lg:w-1/2 relative" data-aos="fade-left">
          <div class="w-full hero-img-wrap relative z-10">
            <img
              :src="heroData?.thumbnail || ''"
              class="w-full h-full object-cover rounded-tl-[60px] rounded-br-[60px] sm:rounded-tl-[100px] sm:rounded-br-[100px] shadow-2xl"
              :alt="heroData?.title_vi || 'Hero Banner'"
            />
          </div>
          <!-- Abstract Shapes -->
          <div class="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-500 rounded-full opacity-10 blur-2xl z-0"></div>
          <div class="absolute -top-10 -right-10 w-64 h-64 border-[20px] border-gray-100 rounded-full z-0 hidden sm:block"></div>
        </div>
      </div>
    </section>

    <!-- OUR SERVICES (VỀ CHÚNG TÔI) -->
    <section id="about-snippet" class="about-services-section py-24 relative overflow-hidden">
      <!-- Animated background blobs -->
      <div class="services-blob services-blob--1"></div>
      <div class="services-blob services-blob--2"></div>
      <div class="services-blob services-blob--3"></div>

      <div class="container mx-auto px-4 relative z-10">
        <!-- Section Header -->
        <div class="text-center mb-16" data-aos="fade-up">
          <span class="inline-block text-brand-600 font-black uppercase tracking-widest text-sm mb-3">{{ $t('HOME.ABOUT_SNIPPET.LABEL') }}</span>
          <h2 class="text-4xl lg:text-5xl font-black text-gray-900 uppercase tracking-tighter">{{ $t('HOME.ABOUT_SNIPPET.TITLE') }}</h2>
          <p class="text-gray-500 font-medium mt-4 max-w-xl mx-auto">{{ $t('HOME.ABOUT_SNIPPET.SECTORS') }}</p>
        </div>

        <!-- 4-column horizontal panel row -->
        <div class="services-track" ref="servicesTrackRef">
          <!-- Panel 0: Về chúng tôi (intro) -->
          <div class="service-panel service-panel--intro" data-aos="fade-up" data-aos-delay="0">
            <div class="service-panel__inner">
              <div class="service-panel__icon-wrap service-panel__icon-wrap--red">
                <i class="pi pi-star-fill"></i>
              </div>
              <h3 class="service-panel__title">{{ $t('HOME.ABOUT_SNIPPET.TITLE') }}</h3>
              <p class="service-panel__desc">{{ $t('HOME.ABOUT_SNIPPET.SECTORS') }}</p>
              <div class="service-panel__badge">Nova Events</div>
            </div>
            <div class="service-panel__decor"></div>
          </div>

          <!-- Panel 1: Tổ chức sự kiện trọn gói -->
          <div class="service-panel service-panel--light" data-aos="fade-up" data-aos-delay="100">
            <div class="service-panel__img-wrap">
              <img src="@/assets/images/images-home/TCSKTG.avif" alt="Tổ chức sự kiện" class="service-panel__img" />
              <div class="service-panel__img-overlay"></div>
            </div>
            <div class="service-panel__content">
              <div class="service-panel__tag">01</div>
              <h3 class="service-panel__title service-panel__title--dark">{{ $t('HOME.ABOUT_SNIPPET.EVENT_TITLE') }}</h3>
              <p class="service-panel__desc service-panel__desc--dark">{{ $t('HOME.ABOUT_SNIPPET.EVENT_DESC') }}</p>
              <button @click="$router.push({ name: ROUTE_NAMES.EVENTS })" class="service-panel__btn service-panel__btn--red">
                {{ $t('HOME.ABOUT_SNIPPET.VIEW_DETAILS') }} <i class="pi pi-arrow-up-right"></i>
              </button>
            </div>
          </div>

          <!-- Panel 2: Cho thuê thiết bị sự kiện (short/raised) -->
          <div class="service-panel service-panel--light service-panel--sunk" data-aos="fade-up" data-aos-delay="200">
            <div class="service-panel__img-wrap">
              <img src="@/assets/images/images-home/CTTBSK.avif" alt="Cho thuê thiết bị" class="service-panel__img" />
              <div class="service-panel__img-overlay"></div>
            </div>
            <div class="service-panel__content">
              <div class="service-panel__tag">02</div>
              <h3 class="service-panel__title service-panel__title--dark">{{ $t('HOME.ABOUT_SNIPPET.RENTAL_TITLE') }}</h3>
              <p class="service-panel__desc service-panel__desc--brand">{{ $t('HOME.ABOUT_SNIPPET.RENTAL_DESC') }}</p>
              <button @click="$router.push({ name: ROUTE_NAMES.RENTAL })" class="service-panel__btn service-panel__btn--red">
                {{ $t('HOME.ABOUT_SNIPPET.VIEW_DETAILS') }} <i class="pi pi-arrow-up-right"></i>
              </button>
            </div>
          </div>

          <!-- Panel 3: Âm thanh & Ánh sáng (dark, tall) -->
          <div class="service-panel service-panel--dark service-panel--raised" data-aos="fade-up" data-aos-delay="300">
            <div class="service-panel__content service-panel__content--centered">
              <div class="service-panel__sound-icon">
                <i class="pi pi-volume-up"></i>
                <i class="pi pi-sun"></i>
              </div>
              <div class="service-panel__tag service-panel__tag--light">03</div>
              <h3 class="service-panel__title service-panel__title--brand">{{ $t('HOME.ABOUT_SNIPPET.SOUND_LIGHT_TITLE') }}</h3>
              <p class="service-panel__desc service-panel__desc--light">{{ $t('HOME.ABOUT_SNIPPET.SOUND_LIGHT_DESC') }}</p>
              <button @click="$router.push({ name: ROUTE_NAMES.SOUND_LIGHT })" class="service-panel__btn service-panel__btn--outline">
                {{ $t('HOME.ABOUT_SNIPPET.VIEW_DETAILS') }} <i class="pi pi-arrow-up-right"></i>
              </button>
            </div>
            <div class="service-panel__glow"></div>
          </div>
        </div>

        <!-- Mobile scroll progress bar -->
        <div class="services-scrollbar-wrap lg:hidden" ref="scrollbarWrap">
          <div class="services-scrollbar-track">
            <div class="services-scrollbar-thumb" ref="scrollbarThumb"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED (GIỚI THIỆU CHUNG) -->
    <section class="py-32 relative bg-white overflow-hidden">
      <!-- DECORATIVE BACKGROUND ELEMENTS -->
      <!-- Large Purple Circle -->
      <div class="absolute top-[10%] left-[40%] w-[600px] h-[600px] bg-[#eef1ff] rounded-full z-0 opacity-80 pointer-events-none"></div>
      <!-- Large Red Glow Circle -->
      <div class="absolute -top-[10%] -right-[15%] w-[700px] h-[700px] bg-brand-500 rounded-full z-0 opacity-50 pointer-events-none"></div>
      
      <!-- Tree/Book Artwork at bottom-center -->
      <div class="absolute bottom-[20%] left-[55%] w-[450px] aspect-square z-10 pointer-events-none opacity-80 mix-blend-multiply transition-all duration-1000" data-aos="zoom-in" data-aos-delay="400">
        <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format" class="w-full h-full object-contain grayscale" alt="Tree book decor" />
      </div>

      <div class="container mx-auto px-4 relative z-20 overflow-visible">
        <!-- Title & Navigation Controls -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div class="max-w-xl" data-aos="fade-down">
            <h2 class="text-5xl lg:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">{{ $t('HOME.FEATURED_SWIPER.TITLE') }}</h2>
            <p class="text-gray-500 font-bold text-lg leading-snug">{{ $t('HOME.FEATURED_SWIPER.DESC') }}</p>
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
            v-for="(item, index) in displayHighlights" 
            :key="index"
            class="!w-[320px] md:!w-[420px]"
          >
            <div 
              class="w-full rounded-[40px] p-10 shadow-sm relative group hover:shadow-2xl hover:-translate-y-5 hover:scale-[1.01] transition-all duration-500 ease-in-out h-full cursor-pointer"
              :class="[
                index % 2 === 0 ? 'bg-[#e2e2ea]' : 'bg-brand-50 mt-32'
              ]"
              data-aos="fade-up"
              :data-aos-delay="index * 100"
            >
              <!-- Icon Box -->
              <div class="flex gap-2 mb-10">
                <div 
                  class="p-2.5 rounded-xl shadow-sm"
                  :class="index % 2 === 0 ? 'bg-brand-500' : 'bg-[#8b92b6]'"
                >
                  <i :class="[item.icon, 'text-white font-extrabold']"></i>
                </div>
              </div>
              
              <h4 
                class="text-3xl font-black text-gray-900 leading-tight mb-6 line-clamp-2 min-h-[4.5rem] cursor-help"
                v-tooltip.top="item.displayTitle"
              >
                {{ item.displayTitle }}
              </h4>
              
              <p 
                class="text-gray-600 font-medium text-sm mb-6 leading-relaxed line-clamp-3 cursor-help"
                v-tooltip.bottom="item.displayContent"
              >
                {{ item.displayContent }}
              </p>
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
          <h2 class="text-4xl font-black text-gray-900 uppercase mb-4">{{ $t('HOME.QUICK_CONTACT.TITLE') }}</h2>
          <p class="text-gray-600 mb-6 font-medium">
            {{ $t('HOME.QUICK_CONTACT.DESC') }}
          </p>
          <p class="text-brand-600 font-bold text-lg">
            {{ $t('HOME.QUICK_CONTACT.HINT') }}
          </p>
        </div>

        <!-- Right Form -->
        <div class="md:w-1/2 w-full relative z-10" data-aos="fade-left">
          <div class="bg-[#8b92b6] rounded-[40px] p-8 md:p-10 shadow-xl relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>
            
            <form @submit.prevent="submitForm" class="space-y-4 relative z-10">
              <div class="flex flex-col sm:flex-row gap-4">
                <input v-model="form.name" type="text" :placeholder="$t('HOME.QUICK_CONTACT.PLACEHOLDER_NAME') || 'Họ và tên'" class="flex-1 bg-white border-none rounded-full px-6 py-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-brand-500 outline-none w-full" />
                <input v-model="form.email" type="email" :placeholder="$t('HOME.QUICK_CONTACT.PLACEHOLDER_EMAIL') || 'Email'" class="flex-1 bg-white border-none rounded-full px-6 py-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-brand-500 outline-none w-full" />
              </div>
              <div class="bg-white rounded-full flex items-center pr-4 shadow-sm focus-within:ring-2 focus-within:ring-brand-500 transition-all">
                <vue-tel-input
                  v-model="form.phone"
                  mode="international"
                  :autoFormat="true"
                  :validCharactersOnly="true"
                  :inputOptions="{ placeholder: $t('CONTACT.FORM.PHONE_PLACEHOLDER') || 'SĐT (Tuỳ chọn)', styleClasses: 'w-full bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 h-[3.5rem] !px-4 !shadow-none focus:!ring-0' }"
                  class="w-full !border-none !shadow-none !bg-transparent rounded-full !outline-none"
                ></vue-tel-input>
              </div>
              <textarea v-model="form.message" :placeholder="$t('HOME.QUICK_CONTACT.PLACEHOLDER_MESSAGE') || 'Nội dung'" rows="4" class="w-full bg-white border-none rounded-[20px] px-6 py-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-brand-500 outline-none resize-none"></textarea>
              <div class="flex justify-end pt-2">
                <button type="submit" :disabled="isSending" class="group/btn bg-brand-500 hover:bg-brand-600 text-white font-black py-3.5 px-10 rounded-full shadow-xl shadow-brand-500/30 hover:shadow-brand-600/40 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  {{ isSending ? 'ĐANG GỬI...' : $t('HOME.QUICK_CONTACT.SEND_BTN') || 'GỬI ĐI' }} <i class="pi pi-arrow-up-right font-bold text-xs transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" v-if="!isSending"></i>
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
import { onMounted, onUnmounted, ref, computed, nextTick, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import AOS from 'aos'
import { useConfigStore } from '@/store/config'
import { useHomeVideoStore } from '@/store/homeVideo'
import { useHighlightStore } from '@/store/highlight'
import { useToast } from '@/composables/useToast'
import { ROUTE_NAMES } from '@/router'
import { useContactMessageStore } from '@/store/contactMessage.store'
import { validateEmail, validateStringField } from '@/utils/validation'

// SWIPER IMPORTS
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation as SwiperNavigation, Pagination as SwiperPagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

defineOptions({
  name: 'HomePage',
})

const configStore = useConfigStore()
const highlightStore = useHighlightStore()
const homeVideoStore = useHomeVideoStore()
const contactMessageStore = useContactMessageStore()
const { toastSuccess, toastError } = useToast()
const { t, locale } = useI18n()

// ICONS LIST FOR ROTATION
const FEATURED_ICONS = [
  'pi pi-star-fill',
  'pi pi-bolt',
  'pi pi-check-circle',
  'pi pi-users',
  'pi pi-calendar',
  'pi pi-briefcase',
  'pi pi-lightbulb',
  'pi pi-shield',
  'pi pi-verified'
]

const heroData = computed(() => {
  if (homeVideoStore.videos.length > 0) {
    return homeVideoStore.videos[0]
  }
  return null
})

import type { IHighlight } from '@/types/highlight'

// ... (các import khác giữ nguyên)

const displayHighlights = computed(() => {
  return highlightStore.highlights.map((item, idx) => {
    const currentLocale = locale.value as 'vi' | 'en' | 'zh'
    const titleKey = `title_${currentLocale}` as keyof IHighlight
    const contentKey = `content_${currentLocale}` as keyof IHighlight
    
    return {
      ...item,
      displayTitle: (item[titleKey] as string) || item.title_vi,
      displayContent: (item[contentKey] as string) || item.content_vi,
      icon: FEATURED_ICONS[idx % FEATURED_ICONS.length]
    }
  })
})

// --- Services scrollbar refs ---
const servicesTrackRef = ref<HTMLElement | null>(null)
const scrollbarThumb = ref<HTMLElement | null>(null)

let scrollListener: (() => void) | null = null

onMounted(async () => {
  await Promise.all([
    configStore.fetchAllConfigs(),
    homeVideoStore.fetchVideos({ isActive: true, limit: 1 }),
    highlightStore.fetchPublicHighlights()
  ])
  AOS.refresh()

  // Wire up services scrollbar progress
  await nextTick()
  const track = servicesTrackRef.value
  const thumb = scrollbarThumb.value
  if (track && thumb) {
    scrollListener = () => {
      const maxScroll = track.scrollWidth - track.clientWidth
      if (maxScroll <= 0) return
      const progress = track.scrollLeft / maxScroll
      // Thumb is 25% wide, so it can move 75% of the track width
      const trackEl = scrollbarThumb.value?.parentElement
      const trackWidth = trackEl ? trackEl.clientWidth : 200
      const thumbMove = progress * trackWidth * 0.75
      thumb.style.transform = `translateX(${thumbMove}px)`
    }
    track.addEventListener('scroll', scrollListener, { passive: true })
  }
})

onUnmounted(() => {
  if (servicesTrackRef.value && scrollListener) {
    servicesTrackRef.value.removeEventListener('scroll', scrollListener)
  }
})

const isSending = ref(false)
const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const submitForm = async () => {
  const nameRes = validateStringField(form.name, t('CONTACT.FORM.FULLNAME') || 'Họ và tên')
  if (!nameRes.isValid) return toastError(nameRes.error || 'Vui lòng nhập họ và tên')

  const emailRes = validateEmail(form.email)
  if (!emailRes.isValid) return toastError(emailRes.error || 'Vui lòng nhập email hợp lệ')

  const msgRes = validateStringField(form.message, t('CONTACT.FORM.MESSAGE_PLACEHOLDER') || 'Nội dung')
  if (!msgRes.isValid) return toastError(msgRes.error || 'Vui lòng nhập nội dung nhắn gửi')

  isSending.value = true
  try {
    const dataToSend = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone ? form.phone.trim() : undefined,
      message: form.message.trim()
    }
    
    await contactMessageStore.createContactMessage(dataToSend)
    toastSuccess(t('HOME.QUICK_CONTACT.SUCCESS') || 'Gửi tin nhắn thành công, chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.')
    Object.assign(form, { name: '', email: '', phone: '', message: '' })
  } catch {
    toastError('Gửi tin nhắn thất bại. Vui lòng thử lại sau.')
  } finally {
    isSending.value = false
  }
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

/* ========================================
   SERVICES SECTION
   ======================================== */
.about-services-section {
  background: linear-gradient(160deg, #f0f4ff 0%, #fafbff 50%, #fff0f0 100%);
}

/* Animated BG blobs */
.services-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
  animation: blobFloat 8s ease-in-out infinite alternate;
}
.services-blob--1 {
  width: 500px; height: 500px;
  background: rgba(220, 38, 38, 0.07);
  top: -100px; left: -150px;
  animation-delay: 0s;
}
.services-blob--2 {
  width: 400px; height: 400px;
  background: rgba(59, 130, 246, 0.06);
  bottom: -100px; right: -100px;
  animation-delay: -3s;
}
.services-blob--3 {
  width: 300px; height: 300px;
  background: rgba(250, 204, 21, 0.08);
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -5s;
}
@keyframes blobFloat {
  from { transform: scale(1) translate(0, 0); }
  to   { transform: scale(1.15) translate(20px, 20px); }
}

:deep(.vue-tel-input:focus-within) {
  box-shadow: none !important;
  border-color: transparent !important;
}
:deep(.vti__input) {
  padding-left: 10px !important;
}
:deep(.vti__dropdown) {
  padding: 0 10px;
  border-radius: 9999px;
  background-color: transparent;
}
:deep(.vti__dropdown:hover) {
  background-color: #f1f5f9;
}

/* Track: horizontal scroll on mobile, 4-col on desktop */
.services-track {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 8px;
  scrollbar-width: none;
}
.services-track::-webkit-scrollbar { display: none; }

/* Panel base */
.service-panel {
  flex: 0 0 min(300px, 80vw);
  scroll-snap-align: start;
  border-radius: 32px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.45s cubic-bezier(.22,1,.36,1), box-shadow 0.45s ease;
  cursor: pointer;
  min-height: 420px;
}
.service-panel:hover {
  transform: translateY(-12px) scale(1.015);
}

/* 4-col layout on lg screens */
@media (min-width: 1024px) {
  .services-track {
    overflow-x: visible;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    padding-bottom: 0;
    align-items: start;
  }
  .service-panel {
    flex: unset;
    min-height: 520px;
  }
  /* Tall panels: intro (0) and dark (3) — natural height */
  /* Short/sunk panels: panel 2 (rental) drops down */
  .service-panel--sunk {
    margin-top: 64px;
  }
  /* Raised: event (1) and dark (3) — pushed up — handled by sunk on neighbors */
  .service-panel--raised {
    margin-top: -48px;
  }
}

/* ---- INTRO panel (red) ---- */
.service-panel--intro {
  background: linear-gradient(145deg, #dc2626 0%, #991b1b 100%);
  box-shadow: 0 20px 60px rgba(220,38,38,0.25);
  justify-content: space-between;
}
.service-panel--intro:hover {
  box-shadow: 0 32px 80px rgba(220,38,38,0.35);
}
.service-panel__inner {
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 16px;
  position: relative;
  z-index: 2;
}
.service-panel__decor {
  position: absolute;
  bottom: -40px; right: -40px;
  width: 180px; height: 180px;
  border: 40px solid rgba(255,255,255,0.1);
  border-radius: 50%;
  z-index: 1;
  transition: transform 0.7s ease;
}
.service-panel--intro:hover .service-panel__decor {
  transform: scale(1.3) rotate(20deg);
}

.service-panel__icon-wrap {
  width: 56px; height: 56px;
  border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}
.service-panel__icon-wrap--red {
  background: rgba(255,255,255,0.18);
  color: #fff;
  backdrop-filter: blur(10px);
}
.service-panel__title {
  font-size: 1.5rem;
  font-weight: 900;
  color: #fff;
  line-height: 1.25;
  margin: 0;
}
.service-panel__title--dark { color: #111827; }
.service-panel__title--brand { color: #ef4444; }
.service-panel__desc {
  font-size: 0.9rem;
  color: rgba(255,255,255,0.82);
  font-weight: 500;
  line-height: 1.6;
  margin: 0;
  flex: 1;
}
.service-panel__desc--dark  { color: #6b7280; }
.service-panel__desc--brand { color: #dc2626; }
.service-panel__desc--light { color: #d1d5db; }

.service-panel__badge {
  display: inline-block;
  background: rgba(255,255,255,0.15);
  color: #fff;
  font-weight: 800;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 6px 16px;
  border-radius: 100px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.2);
  width: fit-content;
  margin-top: auto;
}

/* ---- LIGHT panel (white) ---- */
.service-panel--light {
  background: #fff;
  box-shadow: 0 8px 40px rgba(0,0,0,0.07);
}
.service-panel--light:hover {
  box-shadow: 0 24px 64px rgba(220,38,38,0.12);
}

.service-panel__img-wrap {
  width: 100%; height: 220px;
  position: relative;
  overflow: hidden;
}
.service-panel__img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}
.service-panel--light:hover .service-panel__img {
  transform: scale(1.08);
}
.service-panel__img-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(220,38,38,0.08));
  transition: background 0.4s ease;
}
.service-panel--light:hover .service-panel__img-overlay {
  background: linear-gradient(to bottom, transparent 20%, rgba(220,38,38,0.18));
}

.service-panel__content {
  padding: 28px 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}
.service-panel__content--centered {
  align-items: flex-start;
  justify-content: center;
  padding: 40px 32px;
  height: 100%;
}

.service-panel__tag {
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #dc2626;
  background: #fef2f2;
  padding: 4px 12px;
  border-radius: 100px;
  width: fit-content;
}
.service-panel__tag--light {
  color: #f87171;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.15);
}

/* Buttons */
.service-panel__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 900;
  font-size: 0.85rem;
  padding: 12px 24px;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
  width: fit-content;
}
.service-panel__btn i {
  transition: transform 0.3s ease;
  font-size: 0.75rem;
}
.service-panel__btn:hover i {
  transform: translateX(3px) translateY(-3px);
}
.service-panel__btn--red {
  background: #dc2626;
  color: #fff;
  box-shadow: 0 8px 24px rgba(220,38,38,0.25);
}
.service-panel__btn--red:hover {
  background: #111827;
  box-shadow: 0 12px 32px rgba(0,0,0,0.2);
  transform: translateY(-2px);
}
.service-panel__btn--outline {
  background: transparent;
  color: #fff;
  border: 2px solid rgba(255,255,255,0.3);
  backdrop-filter: blur(8px);
}
.service-panel__btn--outline:hover {
  background: #dc2626;
  border-color: #dc2626;
  box-shadow: 0 8px 24px rgba(220,38,38,0.4);
  transform: translateY(-2px);
}

/* ---- DARK panel ---- */
.service-panel--dark {
  background: linear-gradient(145deg, #0f172a 0%, #1e293b 100%);
  box-shadow: 0 20px 60px rgba(0,0,0,0.25);
  position: relative;
  overflow: hidden;
}
.service-panel--dark:hover {
  box-shadow: 0 32px 80px rgba(220,38,38,0.2);
}
.service-panel__glow {
  position: absolute;
  width: 300px; height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(220,38,38,0.25) 0%, transparent 70%);
  bottom: -80px; right: -80px;
  pointer-events: none;
  transition: transform 0.7s ease;
}
.service-panel--dark:hover .service-panel__glow {
  transform: scale(1.4);
}

.service-panel__sound-icon {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
}
.service-panel__sound-icon i {
  font-size: 2rem;
  color: #ef4444;
  animation: iconPulse 2s ease-in-out infinite alternate;
}
.service-panel__sound-icon i:last-child {
  animation-delay: -1s;
  color: #f59e0b;
}
@keyframes iconPulse {
  from { opacity: 0.6; transform: scale(0.95); }
  to   { opacity: 1;   transform: scale(1.05); }
}

/* Mobile scroll progress bar */
.hero-img-wrap {
  aspect-ratio: 4/3;
  min-height: 260px;
}

.services-scrollbar-wrap {
  margin-top: 20px;
  padding: 0 4px;
}
.services-scrollbar-track {
  height: 3px;
  background: #e2e8f0;
  border-radius: 100px;
  position: relative;
  overflow: hidden;
}
.services-scrollbar-thumb {
  position: absolute;
  top: 0; left: 0;
  height: 100%;
  width: 25%;
  background: linear-gradient(90deg, #dc2626, #f87171);
  border-radius: 100px;
  transition: transform 0.1s linear;
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
  background: #dc2626 !important;
  transform: scale(1.25);
}
</style>
