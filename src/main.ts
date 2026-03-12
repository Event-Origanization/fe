import '@/assets/main.css'
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import primeVuePreset from '@/config/primevue.preset'
import { createPinia } from 'pinia'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'primeicons/primeicons.css'
import i18n from '@/config/i18n'

// Import PrimeVue
import PrimeVue from 'primevue/config'

const pinia = createPinia()
const app = createApp(App)

app.use(primeVuePreset).use(PrimeVue).use(pinia).use(router).use(i18n).mount('#app')

AOS.init({
  duration: 800,
  once: false,
  offset: 100,
})
