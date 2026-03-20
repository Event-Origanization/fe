<template>
  <div class="w-full bg-[#050510] min-h-screen text-white">

    <!-- PAGE BANNER -->
    <section class="relative pt-32 pb-20 flex flex-col items-center justify-center text-center border-b border-red-900/30 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-b from-red-900/40 via-[#050510]/80 to-[#050510]"></div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-red-600/20 blur-[100px] rounded-full pointer-events-none"></div>
      </div>
      <div class="relative z-10 w-full max-w-7xl mx-auto px-4">
        <h1 class="text-4xl md:text-6xl font-black uppercase text-white mb-4 tracking-widest drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]" data-aos="fade-down">
          LIÊN HỆ
        </h1>
        <div class="flex items-center justify-center gap-2 text-sm md:text-base font-medium text-gray-300 uppercase tracking-widest" data-aos="fade-up" data-aos-delay="100">
          <router-link to="/" class="hover:text-red-500 transition-colors">TRANG CHỦ</router-link>
          <span class="text-gray-600">-</span>
          <span class="text-red-500 font-bold drop-shadow-[0_0_5px_rgba(220,38,38,0.6)]">LIÊN HỆ</span>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50 shadow-[0_0_10px_rgba(220,38,38,1)]"></div>
    </section>

    <!-- CONTACT CARDS -->
    <section class="container mx-auto px-4 py-20">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div v-for="(card, i) in contactCards" :key="i"
          class="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-red-500/40 hover:bg-white/[0.06] hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(220,38,38,0.15)] transition-all duration-400 overflow-hidden cursor-pointer"
          :data-aos="i === 0 ? 'flip-left' : i === 1 ? 'zoom-in-up' : 'flip-right'"
          :data-aos-delay="i * 120" data-aos-duration="700">
          <!-- bg glow on hover -->
          <div class="absolute inset-0 bg-gradient-to-b from-red-600/0 via-red-600/0 to-red-600/0 group-hover:from-red-700/10 transition-all duration-500 rounded-2xl"></div>
          <div class="relative z-10">
            <div class="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(220,38,38,0.5)] group-hover:scale-110 transition-transform duration-300">
              <i :class="['pi text-2xl text-white', card.icon]"></i>
            </div>
            <h3 class="font-black uppercase tracking-widest text-sm text-white mb-2">{{ card.title }}</h3>
            <p class="text-gray-300 text-sm leading-relaxed mb-5">{{ card.value }}</p>
            <a :href="card.link" :target="card.external ? '_blank' : '_self'"
              class="inline-flex items-center gap-2 px-5 py-2 border border-red-600 rounded-full text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-red-600 hover:text-white hover:shadow-[0_0_12px_rgba(220,38,38,0.5)] transition-all duration-300">
              {{ card.linkLabel }}
              <i class="pi pi-arrow-right text-[10px]"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- FORM + INFO BLOCK -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">

        <!-- INFO LEFT -->
        <div class="lg:col-span-5 flex flex-col gap-8" data-aos="fade-right" data-aos-duration="800" data-aos-delay="100">
          <div>
            <p class="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">5P Event</p>
            <h2 class="text-3xl md:text-4xl font-black uppercase leading-tight text-white mb-4">
              HÃY KẾT NỐI <br /><span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">CÙNG CHÚNG TÔI</span>
            </h2>
            <p class="text-gray-400 leading-relaxed text-sm">
              Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng bạn trong từng dự án sự kiện. Hãy để lại thông tin và chúng tôi sẽ phản hồi trong thời gian sớm nhất.
            </p>
          </div>

          <!-- Info items -->
          <div class="flex flex-col gap-5">
            <div v-for="(info, j) in infoItems" :key="j" class="flex items-start gap-4 group">
              <div class="w-10 h-10 shrink-0 rounded-lg bg-red-600/20 border border-red-600/30 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-500 transition-all duration-300">
                <i :class="['pi text-red-500 group-hover:text-white transition-colors text-sm', info.icon]"></i>
              </div>
              <div>
                <div class="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">{{ info.label }}</div>
                <div class="text-sm text-gray-200">{{ info.value }}</div>
              </div>
            </div>
          </div>

          <!-- Socials -->
          <div class="flex items-center gap-3 mt-2">
            <span class="text-xs text-gray-500 uppercase tracking-widest font-bold">THEO DÕI:</span>
            <a v-for="(s, k) in socials" :key="k" :href="s.link"
              class="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:border-red-500 hover:text-white hover:scale-110 hover:shadow-[0_0_12px_rgba(220,38,38,0.5)] transition-all duration-300">
              <i :class="['pi text-sm', s.icon]"></i>
            </a>
          </div>
        </div>

        <!-- FORM RIGHT -->
        <div class="lg:col-span-7" data-aos="fade-left" data-aos-delay="150">
          <form @submit.prevent="handleSubmit" class="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 md:p-10 flex flex-col gap-6 backdrop-blur-sm">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div class="flex flex-col gap-2">
                <label class="text-xs font-bold uppercase tracking-widest text-gray-400">Họ và tên <span class="text-red-500">*</span></label>
                <input v-model="form.name" type="text" placeholder="Nguyễn Văn A"
                  class="contact-input" required />
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-xs font-bold uppercase tracking-widest text-gray-400">Email <span class="text-red-500">*</span></label>
                <input v-model="form.email" type="email" placeholder="email@domain.com"
                  class="contact-input" required />
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-xs font-bold uppercase tracking-widest text-gray-400">Số điện thoại</label>
              <input v-model="form.phone" type="tel" placeholder="0369 150 431"
                class="contact-input" />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-xs font-bold uppercase tracking-widest text-gray-400">Nội dung <span class="text-red-500">*</span></label>
              <textarea v-model="form.message" rows="5" placeholder="Vui lòng nhập yêu cầu của bạn..."
                class="contact-input resize-none" required></textarea>
            </div>

            <button type="submit"
              :disabled="isSending"
              class="group w-full py-4 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-black uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70">
              <i class="pi pi-send group-hover:translate-x-1 transition-transform"></i>
              <span v-if="!isSending">GỬI TIN NHẮN</span>
              <span v-else>ĐANG GỬI...</span>
            </button>

            <!-- Success message -->
            <transition name="slide-fade">
              <div v-if="submitSuccess" class="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-bold">
                <i class="pi pi-check-circle text-lg"></i>
                Cảm ơn bạn! Chúng tôi sẽ liên hệ lại sớm nhất có thể.
              </div>
            </transition>
          </form>
        </div>
      </div>

      <!-- GOOGLE MAP SECTION -->
      <div data-aos="fade-up" class="mb-4">
        <div class="flex items-center gap-4 mb-8">
          <div class="h-[2px] flex-1 bg-gradient-to-r from-transparent to-red-600/40"></div>
          <h2 class="text-xl font-black uppercase tracking-widest text-white whitespace-nowrap">
            <i class="pi pi-map-marker text-red-500 mr-2"></i>TÌM CHÚNG TÔI TRÊN BẢN ĐỒ
          </h2>
          <div class="h-[2px] flex-1 bg-gradient-to-l from-transparent to-red-600/40"></div>
        </div>
        <div class="rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(220,38,38,0.1)] relative">
          <!-- Map overlay effect on top edge -->
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent z-10 opacity-60"></div>
          <iframe
            :src="parsedMapSrc"
            width="100%"
            height="450"
            style="border:0; filter: invert(90%) hue-rotate(180deg) brightness(0.9) contrast(0.9) saturate(0.9);"
            :allowfullscreen="true"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            class="block w-full"
          ></iframe>
          <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent z-10 opacity-60"></div>
        </div>
        <p class="text-center text-gray-500 text-xs mt-3 uppercase tracking-widest font-medium">{{ contactAddress }}</p>
      </div>
    </section>

  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import AOS from 'aos'
import { useConfigStore } from '@/store/config'
import { useContactMessageStore } from '@/store/contactMessage.store'
import { useToast } from '@/composables/useToast'
import { validateEmail, validatePhone, validateStringField } from '@/utils/validation'

const configStore = useConfigStore()
const contactMessageStore = useContactMessageStore()
const { toastSuccess, toastError } = useToast()

onMounted(async () => {
  await configStore.fetchAllConfigs()
  AOS.refresh()
})

const isSending = ref(false)
const submitSuccess = ref(false)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const handleSubmit = async () => {
  // Validate fields
  const nameRes = validateStringField(form.name, 'Họ và tên')
  if (!nameRes.isValid) {
    toastError(nameRes.error || 'Tên là bắt buộc')
    return
  }

  const emailRes = validateEmail(form.email)
  if (!emailRes.isValid) {
    toastError(emailRes.error || 'Email không hợp lệ')
    return
  }

  if (form.phone) {
    const phoneRes = validatePhone(form.phone)
    if (!phoneRes.isValid) {
      toastError(phoneRes.error || 'Số điện thoại không hợp lệ')
      return
    }
  }

  const msgRes = validateStringField(form.message, 'Nội dung')
  if (!msgRes.isValid) {
    toastError(msgRes.error || 'Nội dung là bắt buộc')
    return
  }

  isSending.value = true
  submitSuccess.value = false

  try {
    await contactMessageStore.createContactMessage({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message
    })
    
    submitSuccess.value = true
    Object.assign(form, { name: '', email: '', phone: '', message: '' })
    toastSuccess('Tin nhắn của bạn đã được gửi thành công!')
    
    setTimeout(() => { submitSuccess.value = false }, 5000)
  } catch {
    toastError(contactMessageStore.error || 'Có lỗi xảy ra khi gửi tin nhắn, vui lòng thử lại sau.')
  } finally {
    isSending.value = false
  }
}

// Config-based dynamic values
const contactAddress = computed(() => configStore.getConfigValue('CONTACT', 'CONTACT_ADDRESS', '122/46 Thạnh Xuân 22, P. Thạnh Xuân 22, Q.12, TP.HCM'))
const contactMapIframe = computed(() => configStore.getConfigValue('CONTACT', 'CONTACT_MAP_IFRAME', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.178855780718!2d106.68459131533487!3d10.72714419234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f6bce7e1a23%3A0x8b3c65d00e2b8048!2s122%2F46%20Th%E1%BA%A1nh%20Xu%C3%A2n%2022%2C%20Ph%C6%B0%E1%BB%9Dng%20Th%E1%BA%A1nh%20Xu%C3%A2n%2022%2C%20Qu%E1%BA%ADn%2012%2C%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh!5e0!3m2!1svi!2svn!4v1700000000000!5m2!1svi!2svn'))

const parsedMapSrc = computed(() => {
  const value = contactMapIframe.value;
  if (!value) return '';
  // Nếu copy nguyên thẻ iframe từ google map
  if (value.trim().toLowerCase().startsWith('<iframe')) {
    const match = value.match(/src="([^"]+)"/);
    if (match && match[1]) {
      return match[1];
    }
  }
  return value; // Trường hợp admin chỉ lưu mỗi link
});
const contactHotline = computed(() => configStore.getConfigValue('CONTACT', 'CONTACT_HOTLINE', '0369 150 431'))
const contactEmail = computed(() => configStore.getConfigValue('CONTACT', 'CONTACT_EMAIL', 'info.marketingevent5p@gmail.com'))

const contactCards = computed(() => [
  { icon: 'pi-map-marker', title: 'ĐỊA CHỈ', value: contactAddress.value, link: `https://maps.google.com/?q=${encodeURIComponent(contactAddress.value)}`, linkLabel: 'Bản đồ', external: true },
  { icon: 'pi-phone', title: 'LIÊN HỆ CHÚNG TÔI', value: contactHotline.value, link: `tel:${contactHotline.value.replace(/\s+/g, '')}`, linkLabel: 'Gọi ngay', external: false },
  { icon: 'pi-envelope', title: 'GỬI MAIL', value: contactEmail.value, link: `mailto:${contactEmail.value}`, linkLabel: 'Gửi email', external: false }
])

const infoItems = computed(() => [
  { icon: 'pi-map-marker', label: 'Địa chỉ', value: contactAddress.value },
  { icon: 'pi-phone', label: 'Điện thoại', value: contactHotline.value },
  { icon: 'pi-envelope', label: 'Email', value: contactEmail.value },
  { icon: 'pi-clock', label: 'Giờ làm việc', value: 'Thứ 2 – Thứ 7: 8:00 – 18:00' }
])

const socials = computed(() => [
  { icon: 'pi-facebook', link: configStore.getConfigValue('SOCIAL', 'SOCIAL_FACEBOOK', '#') },
  { icon: 'pi-youtube', link: configStore.getConfigValue('SOCIAL', 'SOCIAL_YOUTUBE', '#') },
  { icon: 'pi-comments', link: configStore.getConfigValue('SOCIAL', 'SOCIAL_ZALO', '#') }
])
</script>

<style scoped>
.contact-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 12px 16px;
  color: white;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
}
.contact-input::placeholder {
  color: rgba(255, 255, 255, 0.25);
}
.contact-input:focus {
  border-color: rgba(220, 38, 38, 0.6);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  background: rgba(255, 255, 255, 0.06);
}
.contact-input option {
  background: #0f0f1a;
  color: white;
}

/* Slide-fade transition for success message */
.slide-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from {
  transform: translateY(-8px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}
</style>
