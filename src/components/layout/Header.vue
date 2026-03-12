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
          {{ $t('NAV.HOME') }}
        </router-link>
        <router-link
          to="/about"
          class="relative transition-colors hover:text-brand-500 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-brand-500 after:transition-all after:duration-300"
          :class="[$route.path === '/about' ? 'text-brand-500 after:w-full shadow-brand-500 drop-shadow-sm' : 'text-gray-300 after:w-0 hover:after:w-full']"
        >
          {{ $t('NAV.ABOUT') }}
        </router-link>
        <a
          href="#"
          class="text-gray-300 hover:text-brand-500 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-brand-500 hover:after:w-full after:transition-all after:duration-300"
        >
          {{ $t('NAV.PRODUCTS') }}
        </a>
        <a
          href="#"
          class="text-gray-300 hover:text-brand-500 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-brand-500 hover:after:w-full after:transition-all after:duration-300"
        >
          {{ $t('NAV.POSTS') }}
        </a>
        <a
          href="#"
          class="text-gray-300 hover:text-brand-500 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-brand-500 hover:after:w-full after:transition-all after:duration-300"
        >
          {{ $t('NAV.CONTACT') }}
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

        <!-- Language Selector Dropdown -->
        <div class="relative">
          <button
            @click.stop="isLangOpen = !isLangOpen"
            class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-semibold"
          >
            <svg class="w-4 h-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <img
              :src="currentLang?.flag"
              :alt="currentLang?.name"
              class="w-4 h-2.5 object-cover rounded-sm ml-1"
            />
            <span class="text-gray-300 group-hover:text-white transition-colors text-xs uppercase tracking-tighter">{{ currentLang?.code }}</span>
            <svg 
              class="w-3.5 h-3.5 text-gray-500 transition-transform duration-300" 
              :class="{'rotate-180': isLangOpen}"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0 -translate-y-2"
            enter-to-class="transform scale-100 opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="transform scale-100 opacity-100 translate-y-0"
            leave-to-class="transform scale-95 opacity-0 -translate-y-2"
          >
            <div
              v-if="isLangOpen"
              v-click-outside="() => isLangOpen = false"
              class="absolute right-0 mt-2 w-32 bg-[#0d0d1a] border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl z-[60]"
            >
              <div class="py-1">
                <button
                  v-for="lang in languages"
                  :key="lang.code"
                  @click="changeLang(lang.code)"
                  class="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-white/5"
                  :class="[locale === lang.code ? 'text-brand-500 bg-brand-500/5' : 'text-gray-300 hover:text-white']"
                >
                  <img
                    :src="lang.flag"
                    :alt="lang.name"
                    class="w-5 h-3.5 object-cover rounded-sm"
                  />
                  {{ lang.name }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
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
               {{ $t('NAV.HOME') }}
               <i class="pi pi-chevron-right text-xs opacity-0 group-hover:opacity-100 transition-all"></i>
             </router-link>
             <router-link to="/about" @click="$emit('toggle-menu')" class="text-lg font-bold py-3 border-b border-white/5 text-gray-300 hover:text-brand-500 transition-colors flex items-center justify-between group">
               {{ $t('NAV.ABOUT') }}
               <i class="pi pi-chevron-right text-xs opacity-0 group-hover:opacity-100 transition-all"></i>
             </router-link>
             <a href="#" class="text-lg font-bold py-3 border-b border-white/5 text-gray-300 hover:text-brand-500 transition-colors flex items-center justify-between group">
               {{ $t('NAV.PRODUCTS') }}
               <i class="pi pi-chevron-right text-xs opacity-0 group-hover:opacity-100 transition-all"></i>
             </a>
             <a href="#" class="text-lg font-bold py-3 border-b border-white/5 text-gray-300 hover:text-brand-500 transition-colors flex items-center justify-between group">
               {{ $t('NAV.POSTS') }}
               <i class="pi pi-chevron-right text-xs opacity-0 group-hover:opacity-100 transition-all"></i>
             </a>
             <a href="#" class="text-lg font-bold py-3 border-b border-white/5 text-gray-300 hover:text-brand-500 transition-colors flex items-center justify-between group">
               {{ $t('NAV.CONTACT') }}
               <i class="pi pi-chevron-right text-xs opacity-0 group-hover:opacity-100 transition-all"></i>
             </a>
           </nav>
           
           <!-- Mobile Languages -->
           <div class="mt-auto pb-8">
             <p class="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">{{ $t('NAV.LANGUAGES') || 'Languages' }}</p>
             <div class="grid grid-cols-1 gap-3">
                <button v-for="lang in languages" :key="lang.code" @click="changeLang(lang.code); $emit('toggle-menu')"
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
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale, type SupportedLocale } from '@/config/i18n'

const { locale } = useI18n()
const isLangOpen = ref(false)

const languages = [
  { code: 'vi', name: 'VN', flag: 'https://flagcdn.com/w20/vn.png' },
  { code: 'en', name: 'EN', flag: 'https://flagcdn.com/w20/gb.png' },
  { code: 'cn', name: 'CN', flag: 'https://flagcdn.com/w20/cn.png' },
]

const currentLang = computed(() => languages.find(l => l.code === locale.value) || languages[0])

const changeLang = (code: string) => {
  setLocale(code as SupportedLocale)
  isLangOpen.value = false
}

defineProps<{
  mobileMenuOpen?: boolean
}>()

defineEmits<{
  (e: 'toggle-menu'): void
}>()

// Custom directive for clicking outside
const vClickOutside = {
  mounted(el: any, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      // Check that click was outside the el and its children
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: any) {
    document.removeEventListener('click', el.clickOutsideEvent)
  },
}
</script>

<style scoped>
.shadow-brand-500 {
  text-shadow: 0 0 10px rgba(220, 38, 38, 0.4);
}
</style>
