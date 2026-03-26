<template>
  <header
    ref="headerRef"
    class="fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out"
    :class="[
      isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/80 backdrop-blur-md py-5',
      isVisible ? 'translate-y-0' : '-translate-y-full'
    ]"
  >
    <div class="container mx-auto px-6 lg:px-10 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2 group">
        <img src="@/assets/images/LOGO-5P.png" alt="5P EVENT" class="h-12 md:h-16 object-contain transition-all duration-300 group-hover:scale-105" />
      </router-link>

      <!-- Menu Navigation (Centered) -->
      <nav class="hidden lg:flex items-center gap-10 font-black text-[13px] uppercase tracking-[0.2em] text-gray-900">
        <router-link
          v-for="item in menuItems" :key="item.path"
          :to="item.to"
          class="relative transition-all hover:text-brand-600 py-2 group/nav"
          :class="[$route.path === item.path || $route.name === item.name ? 'text-brand-600' : 'text-gray-900']"
        >
          {{ item.label }}
          <!-- Underline effect -->
          <span class="absolute bottom-0 left-0 w-0 h-[3px] bg-brand-600 transition-all duration-300 group-hover/nav:w-full"
            :class="[$route.path === item.path || $route.name === item.name ? 'w-full' : 'w-0']"></span>
        </router-link>
      </nav>

      <!-- Right Actions: Search & Languages -->
      <div class="hidden md:flex items-center gap-6">
        <!-- Search -->
        <div class="relative group/search">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            class="bg-gray-100 border border-gray-200 text-sm rounded-full px-5 py-2 w-48 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-gray-900 placeholder-gray-400 transition-all font-semibold"
          />
          <button class="absolute right-3 top-2.5 text-gray-400 hover:text-brand-600 transition-colors">
            <i class="pi pi-search text-sm"></i>
          </button>
        </div>

        <!-- Language Selector -->
        <LanguageSelector />
      </div>

      <!-- Mobile Toggle -->
      <button class="lg:hidden text-gray-900 p-2 hover:text-brand-600 transition-colors" @click="$emit('toggle-menu')">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 8h16M4 16h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </header>

  <!-- Mobile Menu Overlay -->
  <Transition
    enter-active-class="transition-all duration-500 ease-in-out"
    enter-from-class="opacity-0 translate-y-[-20px]"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-300 ease-in-out"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-[-20px]"
  >
    <div v-if="mobileMenuOpen" 
      class="fixed left-0 right-0 bottom-0 z-[99] lg:hidden bg-gray-950"
      :style="{ top: isVisible ? headerHeight + 'px' : '0px' }"
    >
      <div class="container mx-auto px-6 py-10 flex flex-col gap-8 h-full overflow-y-auto">
         <nav class="flex flex-col gap-4">
           <router-link v-for="item in menuItems" :key="item.path" 
              :to="item.to" @click="$emit('toggle-menu')" 
              class="text-4xl font-black uppercase tracking-tighter transition-colors"
              :class="[$route.path === item.path || $route.name === item.name ? '!text-brand-500' : 'text-white hover:text-brand-500']">
              {{ item.label }}
           </router-link>
         </nav>
         
         <div class="mt-auto pb-10 border-t border-white/10 pt-10">
            <div class="flex items-center justify-between mb-8">
              <span class="text-xs font-black uppercase tracking-widest text-gray-500">Reach us</span>
              <div class="flex gap-4">
                 <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-600 hover:text-white transition-all"><i class="pi pi-facebook"></i></a>
                 <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-600 hover:text-white transition-all"><i class="pi pi-instagram"></i></a>
              </div>
            </div>
            <div class="bg-white/5 p-4 rounded-2xl flex justify-center">
              <LanguageSelector />
            </div>
         </div>
      </div>
    </div>
  </Transition>

  <!-- Spacer to prevent content jump due to fixed header -->
  <div :style="{ height: headerHeight + 'px' }" class="transition-all duration-300"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useConfigStore } from '@/store/config'
import LanguageSelector from '../common/LanguageSelector.vue'

defineOptions({
  name: 'AppHeader',
})

const route = useRoute()
const { t } = useI18n()
const configStore = useConfigStore()

const isScrolled = ref(false)
const isVisible = ref(true)
const lastScrollY = ref(0)
const headerRef = ref<HTMLElement | null>(null)
const headerHeight = ref(96)

const updateHeaderHeight = () => {
  if (headerRef.value) {
    headerHeight.value = headerRef.value.clientHeight
  }
}

const handleScroll = () => {
  const currentScrollY = Math.max(0, window.scrollY)
  const delta = 5

  // Scrolled state
  isScrolled.value = currentScrollY > 50

  if (Math.abs(currentScrollY - lastScrollY.value) < delta) {
    return
  }

  // Hide/Show logic
  if (currentScrollY > lastScrollY.value && currentScrollY > 100) {
    isVisible.value = false
  } else {
    isVisible.value = true
  }

  lastScrollY.value = currentScrollY
  updateHeaderHeight()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', updateHeaderHeight)
  setTimeout(updateHeaderHeight, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', updateHeaderHeight)
})

watch(isScrolled, () => {
  setTimeout(updateHeaderHeight, 350)
})

defineProps<{
  mobileMenuOpen?: boolean
}>()

defineEmits<{
  (e: 'toggle-menu'): void
}>()

const menuItems = computed(() => [
  { label: configStore.getConfigValue('MENU', 'MENU_HOME', t('NAV.HOME')), to: { name: 'Home' }, name: 'Home', path: '/' },
  { label: configStore.getConfigValue('MENU', 'MENU_ABOUT', t('NAV.ABOUT')), to: { name: 'About' }, name: 'About', path: '/about' },
  { label: configStore.getConfigValue('MENU', 'MENU_EVENTS', 'Dự án thực hiện'), to: { name: 'Events' }, name: 'Events', path: '/events' },
  { label: configStore.getConfigValue('MENU', 'MENU_RENTAL', 'Thiết bị sự kiện'), to: { name: 'Rental' }, name: 'Rental', path: '/rental' },
  { label: configStore.getConfigValue('MENU', 'MENU_NEWS', 'Tin tức'), to: '/news', path: '/news' },
  { label: configStore.getConfigValue('MENU', 'MENU_CONTACT', 'Liên hệ'), to: { name: 'Contact' }, name: 'Contact', path: '/contact' }
])
</script>

<style scoped>
.router-link-exact-active:not(.text-4xl) {
  color: #dc2626;
}
</style>
