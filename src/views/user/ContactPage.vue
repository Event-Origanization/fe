<template>
  <div class="w-full bg-white min-h-screen text-gray-900 font-outfit overflow-hidden pb-20">
    <!-- HERO SECTION WITH DECORATIVE SHAPES -->
    <section class="relative pt-32 pb-20 px-6 lg:px-20 max-w-[1440px] mx-auto min-h-[700px] flex flex-col lg:flex-row items-center justify-between gap-16">
      
      <!-- Abstract Background Decor -->
      <div class="absolute top-[10%] right-0 w-[400px] h-[400px] border-[40px] border-yellow-400/20 rounded-full -mr-40 pointer-events-none"></div>
      <div class="absolute bottom-[20%] left-[-5%] w-[300px] h-[300px] bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <!-- LEFT SIDE: TITLE & ILLUSTRATIVE ELEMENT -->
      <div class="lg:w-1/2 relative z-10" data-aos="fade-right">
        <h1 class="text-6xl md:text-8xl font-black uppercase tracking-tight leading-[0.9] text-gray-900 mb-12">
          GET<br />IN TOUCH
        </h1>
        
        <!-- Abstract Illustration Area (Mimicking the image's hand/shape) -->
        <div class="relative w-full max-w-sm mt-10">
           <!-- Decorative dotted pattern -->
           <div class="absolute -bottom-10 -left-10 grid grid-cols-6 gap-2 opacity-50">
             <div v-for="i in 36" :key="i" class="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
           </div>
           
           <!-- Creative Shape / Image -->
           <div class="relative z-10">
              <div class="w-64 h-64 bg-yellow-400 rounded-2xl rotate-12 absolute -top-4 -left-4 opacity-10"></div>
              <div class="relative overflow-hidden rounded-3xl shadow-2xl transform -rotate-2 border-8 border-white">
                <img src="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?q=80&w=2020&auto=format&fit=crop" alt="Handshake" class="w-full aspect-square object-cover" />
              </div>
           </div>
        </div>
      </div>

      <!-- RIGHT SIDE: CONTACT FORM ON PURPLE-LIKE (now RED) SHAPE -->
      <div class="lg:w-1/2 relative z-10" data-aos="fade-left">
        <!-- The big rounded shape behind the form -->
        <div class="relative bg-brand-600 rounded-[100px_40px_100px_100px] p-8 md:p-12 shadow-2xl">
           <!-- Form -->
           <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
              <div class="flex flex-col md:flex-row gap-6">
                 <div class="flex-1">
                   <input v-model="form.name" type="text" :placeholder="$t('CONTACT.FORM.FULLNAME')" 
                     class="w-full bg-white rounded-full px-8 py-4 text-gray-900 font-semibold placeholder-gray-400 shadow-lg border-none focus:ring-2 focus:ring-yellow-400 outline-none transition-all" />
                 </div>
                 <div class="flex-1">
                   <input v-model="form.email" type="email" :placeholder="$t('CONTACT.FORM.EMAIL')" 
                     class="w-full bg-white rounded-full px-8 py-4 text-gray-900 font-semibold placeholder-gray-400 shadow-lg border-none focus:ring-2 focus:ring-yellow-400 outline-none transition-all" />
                 </div>
              </div>
              <div>
                <textarea v-model="form.message" rows="4" :placeholder="$t('CONTACT.FORM.MESSAGE_PLACEHOLDER')"
                  class="w-full bg-white rounded-[32px] px-8 py-6 text-gray-900 font-semibold placeholder-gray-400 shadow-lg border-none focus:ring-2 focus:ring-yellow-400 outline-none transition-all resize-none"></textarea>
              </div>
              
              <div class="flex justify-center mt-4">
                <button type="submit" :disabled="isSending"
                  class="bg-yellow-400 hover:bg-white text-gray-900 font-black px-12 py-4 rounded-full uppercase tracking-widest text-sm flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95 shadow-xl disabled:opacity-50">
                  {{ isSending ? $t('CONTACT.FORM.SENDING') : $t('CONTACT.FORM.SEND') }}
                  <i class="pi pi-arrow-up-right text-xs"></i>
                </button>
              </div>
           </form>

           <!-- Bottom decorative dots -->
           <div class="absolute -bottom-6 -right-6 grid grid-cols-10 gap-2 opacity-50 hidden md:grid">
             <div v-for="i in 50" :key="i" class="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
           </div>
        </div>
      </div>
    </section>

    <!-- ENQUIRIES & ADRESS SECTION -->
    <section class="max-w-[1440px] mx-auto px-6 lg:px-20 py-20 relative">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        
        <!-- ENQUIRIES BOXES -->
        <div class="flex flex-col gap-6" data-aos="fade-up">
           <div class="bg-gray-100 rounded-[30px] p-10 flex flex-col gap-6">
              <div>
                <h3 class="text-2xl font-black text-gray-900 mb-2">Press enquiries</h3>
                <p class="text-gray-600 font-medium">5PeventBooking@gmail.com</p>
              </div>
              <div>
                <h3 class="text-2xl font-black text-gray-900 mb-2">General enquiries</h3>
                <div class="flex flex-col gap-1">
                  <p class="text-gray-600 font-medium"><span class="font-bold text-gray-900 uppercase text-sm">Booking:</span> 5P.research@gmail.com</p>
                  <p class="text-gray-600 font-medium"><span class="font-bold text-gray-900 uppercase text-sm">Media:</span> info@5Pmedia.net</p>
                </div>
              </div>
           </div>

           <!-- ADDRESS BOX (Light Yellow) -->
           <div class="bg-yellow-50 rounded-[30px] p-10" data-aos="fade-up" data-aos-delay="100">
              <h3 class="text-2xl font-black text-gray-900 mb-6">Address</h3>
              <div class="flex flex-col gap-4 text-gray-800 font-medium leading-relaxed">
                <p>{{ contactAddress }}</p>
                <div class="pt-4 flex flex-col gap-2">
                   <p class="text-lg font-bold">Hotline: {{ contactHotline }}</p>
                   <p class="text-lg font-bold">Email: {{ contactEmail }}</p>
                </div>
              </div>
           </div>
        </div>

        <!-- JOB ENQUIRIES / CTA SECTION -->
        <div class="relative flex items-center justify-center pt-20" data-aos="zoom-in">
           <!-- Large Yellow Circle Decor -->
           <div class="absolute w-[400px] h-[400px] bg-yellow-400 rounded-full opacity-70 z-0"></div>
           
           <!-- Hovering White Card -->
           <div class="relative z-10 bg-white/95 backdrop-blur shadow-2xl rounded-[40px] p-12 md:p-16 text-center max-w-sm transform hover:-translate-y-4 transition-all duration-500">
              <h3 class="text-3xl font-black text-gray-900 mb-8 leading-tight">For job enquiries, please see</h3>
              <router-link to="/about" class="bg-brand-600 hover:bg-black text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all">
                JOIN US
                <i class="pi pi-arrow-up-right text-xs"></i>
              </router-link>
           </div>
           
           <!-- Decorative Arrow Shape -->
           <div class="absolute right-0 bottom-0 text-brand-600 opacity-20 transform translate-x-1/2 translate-y-1/2 pointer-events-none">
              <i class="pi pi-arrow-up-right text-[200px]"></i>
           </div>
        </div>
      </div>
    </section>

    <!-- SOCIAL MEDIA BANNER -->
    <section class="max-w-[1440px] mx-auto px-6 lg:px-20 py-10" data-aos="fade-up">
       <div class="bg-brand-600 rounded-[50px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <h2 class="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
            FOLLOW US<br />ON SOCIAL MEDIA
          </h2>
          
          <div class="flex flex-wrap items-center gap-4 justify-center">
             <a v-for="(s, k) in socials" :key="k" :href="s.link" target="_blank"
               class="w-14 h-14 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center hover:bg-white transition-all transform hover:scale-110 shadow-lg">
               <i :class="['pi text-xl', s.icon]"></i>
             </a>
          </div>
       </div>
    </section>

    <!-- MAP SECTION -->
    <section class="max-w-[1440px] mx-auto px-6 lg:px-20 py-20" data-aos="fade-up">
       <div class="flex items-center gap-6 mb-10">
         <h2 class="text-4xl font-black uppercase text-gray-900 whitespace-nowrap">Find Us</h2>
         <div class="h-1 flex-1 bg-gray-100 rounded-full relative overflow-hidden">
            <div class="absolute inset-0 bg-brand-600 w-24 animate-[slide_3s_infinite]"></div>
         </div>
       </div>
       
       <div class="rounded-[50px] overflow-hidden shadow-2xl border-8 border-white bg-gray-200 aspect-[16/7] md:aspect-[21/9] relative">
          <iframe
            :src="parsedMapSrc"
            width="100%"
            height="100%"
            style="border:0;"
            :allowfullscreen="true"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            class="block w-full h-full"
          ></iframe>
       </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AOS from 'aos'
import { useConfigStore } from '@/store/config'
import { useContactMessageStore } from '@/store/contactMessage.store'
import { useToast } from '@/composables/useToast'
import { validateEmail, validateStringField } from '@/utils/validation'

const { t } = useI18n()
const configStore = useConfigStore()
const contactMessageStore = useContactMessageStore()
const { toastSuccess, toastError } = useToast()

onMounted(async () => {
  await configStore.fetchAllConfigs()
  AOS.init({ duration: 1000, once: true })
})

const isSending = ref(false)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const handleSubmit = async () => {
  const nameRes = validateStringField(form.name, t('CONTACT.FORM.FULLNAME'))
  if (!nameRes.isValid) return toastError(nameRes.error || 'Name invalid')

  const emailRes = validateEmail(form.email)
  if (!emailRes.isValid) return toastError(emailRes.error || 'Email invalid')

  const msgRes = validateStringField(form.message, t('CONTACT.FORM.MESSAGE'))
  if (!msgRes.isValid) return toastError(msgRes.error || 'Message invalid')

  isSending.value = true
  try {
    await contactMessageStore.createContactMessage(form)
    toastSuccess(t('CONTACT.FORM.TOAST_SUCCESS'))
    Object.assign(form, { name: '', email: '', phone: '', message: '' })
  } catch {
    toastError(t('CONTACT.FORM.TOAST_ERROR'))
  } finally {
    isSending.value = false
  }
}

// Dynamic values from Store
const contactAddress = computed(() => configStore.getConfigValue('CONTACT', 'CONTACT_ADDRESS', '122/46 Thạnh Xuân 22, Q.12, TP.HCM'))
const contactHotline = computed(() => configStore.getConfigValue('CONTACT', 'CONTACT_HOTLINE', '0369 150 431'))
const contactEmail = computed(() => configStore.getConfigValue('CONTACT', 'CONTACT_EMAIL', 'info.marketingevent5p@gmail.com'))
const contactMapIframe = computed(() => configStore.getConfigValue('CONTACT', 'CONTACT_MAP_IFRAME', ''))

const parsedMapSrc = computed(() => {
  const value = contactMapIframe.value;
  if (!value) return '';
  if (value.trim().toLowerCase().startsWith('<iframe')) {
    const match = value.match(/src="([^"]+)"/);
    if (match && match[1]) return match[1];
  }
  return value;
});

const socials = computed(() => [
  { icon: 'pi-facebook', link: configStore.getConfigValue('SOCIAL', 'SOCIAL_FACEBOOK', '#') },
  { icon: 'pi-twitter', link: configStore.getConfigValue('SOCIAL', 'SOCIAL_TWITTER', '#') },
  { icon: 'pi-linkedin', link: configStore.getConfigValue('SOCIAL', 'SOCIAL_LINKEDIN', '#') },
  { icon: 'pi-instagram', link: configStore.getConfigValue('SOCIAL', 'SOCIAL_INSTAGRAM', '#') },
  { icon: 'pi-youtube', link: configStore.getConfigValue('SOCIAL', 'SOCIAL_YOUTUBE', '#') }
])
</script>

<style scoped>
@keyframes slide {
  from { transform: translateX(-100%); }
  to { transform: translateX(400%); }
}
</style>
