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

import { vCountUp } from '@/directives/vCountUp'

const pinia = createPinia()
const app = createApp(App)

app.directive('count-up', vCountUp)

import VueTelInput from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'

app.use(primeVuePreset).use(PrimeVue).use(pinia).use(router).use(i18n)
  .use(VueTelInput, {
    defaultCountry: 'VN',
    preferredCountries: ['VN', 'US', 'GB', 'CN', 'KR', 'JP'],
  })
  .mount('#app')

AOS.init({
  duration: 800,
  once: false, // Ensure animations trigger every time you scroll
  offset: 100,
  mirror: true, // This enables repeating the animation when scrolling past them
})
