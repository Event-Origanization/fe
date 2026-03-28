<template>
  <ToastContainer />
  <ThemeProvider>
    <RouterView />
  </ThemeProvider>
</template>

<script setup lang="ts">
import { watch, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ThemeProvider from '@/components/layout/ThemeProvider.vue'
import ToastContainer from '@/components/common/ToastContainer.vue'
import { useSeoStore } from '@/store/seo'
import { useConfigStore } from '@/store/config'

const route = useRoute()
const { locale } = useI18n()
const seoStore = useSeoStore()
const configStore = useConfigStore()

// Dynamic Font Loading
const currentFont = computed(() => configStore.getConfigValue('GENERAL', 'SYSTEM_FONT', 'Outfit'))

watch(currentFont, (newFont) => {
  if (newFont) {
    // 1. Update/Add Google Fonts link
    const fontId = 'dynamic-google-font'
    let link = document.getElementById(fontId) as HTMLLinkElement
    if (!link) {
      link = document.createElement('link')
      link.id = fontId
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
    const formattedName = newFont.replace(/\s+/g, '+')
    link.href = `https://fonts.googleapis.com/css2?family=${formattedName}:wght@100..900&display=swap`

    // 2. Update CSS variable
    document.documentElement.style.setProperty('--font-main', `"${newFont}", sans-serif`)
  }
}, { immediate: true })

// Watch for route or locale changes to update SEO tags
watch(
  [() => route.name, () => locale.value],
  async ([newName]) => {
    if (newName) {
      // Ensure SEO data is loaded
      if (seoStore.seoMetas.length === 0) {
        await seoStore.fetchAllSeoMeta()
      }
      
      const applied = seoStore.updateSeoTags(newName as string)
      
      // Fallback to route meta title if no SEO found
      if (!applied && route.meta.title) {
        document.title = route.meta.title as string
      }
    }
  },
  { immediate: true }
)

onMounted(async () => {
  // Initial fetch if needed
  if (seoStore.seoMetas.length === 0) {
    await seoStore.fetchAllSeoMeta()
  }
  await configStore.fetchAllConfigs()
})
</script>
