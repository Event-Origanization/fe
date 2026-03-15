<template>
  <header
    class="relative z-50 w-full border-b border-indigo-900/40 bg-[#050510]/80 backdrop-blur-md"
  >
    <div class="container mx-auto px-4 h-20 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2 relative group">
        <div
          class="w-12 h-12 bg-red-600 rounded flex items-center justify-center text-white font-bold text-2xl tracking-tighter shadow-[0_0_15px_rgba(220,38,38,0.5)] transform group-hover:scale-105 transition-all"
        >
          5P
        </div>
      </router-link>

      <!-- Menu Navigation -->
      <nav class="hidden lg:flex items-center gap-8 font-medium text-[15px]">
        <router-link
          to="/"
          class="relative transition-colors hover:text-brand-500 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-brand-500 after:transition-all after:duration-300"
          :class="[$route.path === '/' ? 'text-brand-500 after:w-full shadow-brand-500 drop-shadow-sm' : 'text-gray-300 after:w-0 hover:after:w-full']"
        >
          {{ configStore.getConfigValue('MENU', 'MENU_HOME', $t('NAV.HOME')) }}
        </router-link>
        <router-link
          to="/about"
          class="relative transition-colors hover:text-brand-500 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-brand-500 after:transition-all after:duration-300"
          :class="[$route.path === '/about' ? 'text-brand-500 after:w-full shadow-brand-500 drop-shadow-sm' : 'text-gray-300 after:w-0 hover:after:w-full']"
        >
          {{ configStore.getConfigValue('MENU', 'MENU_ABOUT', $t('NAV.ABOUT')) }}
        </router-link>
        <a
          href="#"
          class="text-gray-300 hover:text-brand-500 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-brand-500 hover:after:w-full after:transition-all after:duration-300"
        >
          {{ configStore.getConfigValue('MENU', 'MENU_SERVICES', $t('NAV.PRODUCTS')) }}
        </a>
        <a
          href="#"
          class="text-gray-300 hover:text-brand-500 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-brand-500 hover:after:w-full after:transition-all after:duration-300"
        >
          {{ configStore.getConfigValue('MENU', 'MENU_NEWS', $t('NAV.POSTS')) }}
        </a>
        <a
          href="#"
          class="text-gray-300 hover:text-brand-500 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-brand-500 hover:after:w-full after:transition-all after:duration-300"
        >
          {{ configStore.getConfigValue('MENU', 'MENU_CONTACT', $t('NAV.CONTACT')) }}
        </a>
      </nav>

      <!-- Search & Languages -->
      <div class="hidden md:flex items-center gap-6">
        <div class="relative">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            class="bg-[#111322] border border-gray-700 text-sm rounded-full px-4 py-1.5 w-48 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-gray-200 placeholder-gray-500 transition-all"
          />
          <svg
            class="w-4 h-4 absolute right-3 top-2 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>

        <!-- Language Selector -->
        <LanguageSelector dark />
      </div>

      <!-- Mobile Toggle -->
      <button class="lg:hidden text-white p-2" @click="$emit('toggle-menu')">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition
      enter-active-class="transition-transform duration-500 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-500 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div v-if="mobileMenuOpen" class="fixed inset-0 z-[100] lg:hidden">
        <!-- Backdrop -->
        <div @click="$emit('toggle-menu')" class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        
        <!-- Content -->
        <div class="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm bg-[#050510] border-l border-white/10 p-6 flex flex-col gap-6 shadow-2xl">
           <div class="flex items-center justify-between mb-4">
              <div class="w-10 h-10 bg-red-600 rounded flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(220,38,38,0.5)]">5P</div>
              <button @click="$emit('toggle-menu')" class="p-2 text-gray-400 hover:text-white transition-colors">
                 <i class="pi pi-times text-2xl"></i>
              </button>
           </div>
           
           <nav class="flex flex-col gap-2">
             <router-link to="/" @click="$emit('toggle-menu')" class="text-lg font-bold py-3 border-b border-white/5 text-gray-300 hover:text-brand-500 transition-colors flex items-center justify-between group">
               {{ configStore.getConfigValue('MENU', 'MENU_HOME', $t('NAV.HOME')) }}
               <i class="pi pi-chevron-right text-xs opacity-0 group-hover:opacity-100 transition-all"></i>
             </router-link>
             <router-link to="/about" @click="$emit('toggle-menu')" class="text-lg font-bold py-3 border-b border-white/5 text-gray-300 hover:text-brand-500 transition-colors flex items-center justify-between group">
               {{ configStore.getConfigValue('MENU', 'MENU_ABOUT', $t('NAV.ABOUT')) }}
               <i class="pi pi-chevron-right text-xs opacity-0 group-hover:opacity-100 transition-all"></i>
             </router-link>
             <a href="#" class="text-lg font-bold py-3 border-b border-white/5 text-gray-300 hover:text-brand-500 transition-colors flex items-center justify-between group">
               {{ configStore.getConfigValue('MENU', 'MENU_SERVICES', $t('NAV.PRODUCTS')) }}
               <i class="pi pi-chevron-right text-xs opacity-0 group-hover:opacity-100 transition-all"></i>
             </a>
             <a href="#" class="text-lg font-bold py-3 border-b border-white/5 text-gray-300 hover:text-brand-500 transition-colors flex items-center justify-between group">
               {{ configStore.getConfigValue('MENU', 'MENU_NEWS', $t('NAV.POSTS')) }}
               <i class="pi pi-chevron-right text-xs opacity-0 group-hover:opacity-100 transition-all"></i>
             </a>
             <a href="#" class="text-lg font-bold py-3 border-b border-white/5 text-gray-300 hover:text-brand-500 transition-colors flex items-center justify-between group">
               {{ configStore.getConfigValue('MENU', 'MENU_CONTACT', $t('NAV.CONTACT')) }}
               <i class="pi pi-chevron-right text-xs opacity-0 group-hover:opacity-100 transition-all"></i>
             </a>
           </nav>
           
           <!-- Mobile Languages -->
           <div class="mt-auto pb-8">
             <p class="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">{{ $t('NAV.LANGUAGES') || 'Languages' }}</p>
             <div class="grid grid-cols-1 gap-3">
                <button v-for="lang in LANGUAGES" :key="lang.code" @click="changeLang(lang.code); $emit('toggle-menu')"
                  class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all border"
                  :class="[locale === lang.code ? 'bg-brand-500/10 border-brand-500/30 text-brand-500' : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10']"
                >
                  <img :src="lang.flag" :alt="lang.name" class="w-6 h-4 object-cover rounded-sm" />
                  <span class="font-bold">{{ lang.name }}</span>
                  <i v-if="locale === lang.code" class="pi pi-check text-xs ml-auto"></i>
                </button>
             </div>
           </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { setLocale, type SupportedLocale } from '@/config/i18n'
import { useConfigStore } from '@/store/config'
import { LANGUAGES } from '@/constants/languages'
import LanguageSelector from '../common/LanguageSelector.vue'

defineOptions({
  name: 'AppHeader',
})

const { locale } = useI18n()
const configStore = useConfigStore()

const changeLang = (code: string) => {
  setLocale(code as SupportedLocale)
}

defineProps<{
  mobileMenuOpen?: boolean
}>()

defineEmits<{
  (e: 'toggle-menu'): void
}>()
</script>

<style scoped>
.shadow-brand-500 {
  text-shadow: 0 0 10px rgba(220, 38, 38, 0.4);
}
</style>
