<template>
  <div
    class="bg-[#050510] min-h-screen text-white font-sans overflow-x-hidden relative selection:bg-brand-500 selection:text-white pb-20"
  >
    <!-- BACKGROUND GIAO THOA ÁNH SÁNG NEON -->
    <div class="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <!-- Laser Đỏ/Hồng trái -->
      <div
        class="absolute top-[10%] -left-[20%] w-[60%] h-[100%] bg-pink-600/20 blur-[150px] rounded-full transform rotate-45 pointer-events-none"
      ></div>
      <div
        class="absolute top-[40%] -left-[10%] w-[50%] h-[80%] bg-blue-600/10 blur-[130px] rounded-full transform -rotate-12 pointer-events-none"
      ></div>
      <!-- Laser Xanh dương phải -->
      <div
        class="absolute top-[20%] -right-[20%] w-[60%] h-[100%] bg-blue-600/20 blur-[150px] rounded-full transform -rotate-45 pointer-events-none"
      ></div>
      <div
        class="absolute bottom-[0%] right-[10%] w-[50%] h-[80%] bg-pink-600/10 blur-[130px] rounded-full pointer-events-none"
      ></div>
      <!-- Grid pattern overlay (optional) -->
      <div
        class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"
      ></div>
    </div>

    <!-- Pass trạng thái menu qua provide -->
    <Header :mobile-menu-open="mobileMenuOpen" @toggle-menu="mobileMenuOpen = !mobileMenuOpen" />

    <main class="relative z-10 flex-1">
      <router-view />
    </main>

    <!-- Scroll to Top Button -->
    <button
      v-if="showScrollTop"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
      aria-label="Scroll to top"
    >
      <svg
        class="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, onUnmounted } from 'vue'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

const mobileMenuOpen = ref(false)
const showScrollTop = ref(false)

// Provide để Header có thể dùng (nếu cần)
provide('mobileMenuOpen', mobileMenuOpen)

// Scroll to top functionality
const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
