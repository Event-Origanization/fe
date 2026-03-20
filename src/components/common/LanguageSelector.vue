<!-- src/components/common/LanguageSelector.vue -->
<template>
  <div class="relative" ref="selectorRef">
    <button
      @click.stop="isOpen = !isOpen"
      class="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm font-semibold"
      :class="[
        dark 
          ? 'bg-white/5 border border-white/10 hover:bg-white/10' 
          : 'bg-gray-100 border border-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
      ]"
    >
      <svg class="w-4 h-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
      <img
        v-if="currentLang"
        :src="currentLang.flag"
        :alt="currentLang.name"
        class="w-4 h-2.5 object-cover rounded-sm ml-1"
      />
      <span 
        class="text-xs uppercase tracking-tighter"
        :class="[dark ? 'text-gray-300' : 'text-gray-700 dark:text-gray-300']"
      >
        {{ currentLang?.code }}
      </span>
      <svg 
        class="w-3.5 h-3.5 text-gray-400 transition-transform duration-300" 
        :class="{'rotate-180': isOpen}"
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
        v-if="isOpen"
        class="absolute right-0 mt-2 w-32 rounded-xl overflow-hidden shadow-2xl z-[60]"
        :class="[
          dark 
            ? 'bg-[#0d0d1a] border border-white/10 backdrop-blur-xl' 
            : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800'
        ]"
      >
        <div class="py-1">
          <button
            v-for="lang in LANGUAGES"
            :key="lang.code"
            @click="changeLang(lang.code)"
            class="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors"
            :class="[
              locale === lang.code 
                ? 'text-brand-500 bg-brand-500/5' 
                : dark ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            ]"
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
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { LANGUAGES } from '@/constants/languages'

defineProps({
  dark: {
    type: Boolean,
    default: false
  }
})

const { locale } = useI18n()
const isOpen = ref(false)
const selectorRef = ref<HTMLElement | null>(null)

const currentLang = computed(() => 
  LANGUAGES.find(lang => lang.code === locale.value) || LANGUAGES[0]
)

const changeLang = (code: string) => {
  locale.value = code
  localStorage.setItem('user-locale', code)
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (selectorRef.value && !selectorRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>
