<template>
  <footer
    class="mt-12 bg-[#050510]/95 pt-16 border-t border-gray-900 border-opacity-50 relative overflow-hidden"
  >
    <!-- Decoration lines -->
    <div
      class="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-600 via-pink-600 to-red-600 shadow-[0_0_20px_rgba(219,39,119,0.8)]"
    ></div>
    <div class="container mx-auto px-4 pb-12">
      <!-- Subcribe Form inside glowing border -->
      <div
        class="max-w-3xl mx-auto bg-gradient-to-r from-gray-900 to-gray-800 p-[1px] rounded-full mb-16 drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] text-white"
      >
        <div class="bg-black rounded-full flex items-center p-2 pr-2 overflow-hidden shadow-inner">
          <div class="pl-6 flex-shrink-0 flex items-center gap-2">
            <svg
              class="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
            <span class="text-white font-medium uppercase text-sm tracking-widest"
              >Đăng ký nhận tin</span
            >
          </div>
          <div class="w-px h-6 bg-gray-700 mx-4"></div>
          <input
            type="email"
            placeholder="Email của bạn..."
            class="bg-transparent flex-1 text-white text-sm focus:outline-none placeholder-gray-600 py-2"
          />
          <button
            class="bg-[#111] border border-gray-700 hover:bg-gray-800 text-white p-2 rounded-full transition-colors flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <!-- Brand -->
        <div class="md:col-span-1 space-y-4 text-center md:text-left">
          <div
            class="w-16 h-16 bg-red-600 rounded flex items-center justify-center text-white font-bold text-3xl mx-auto md:mx-0 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
          >
            5P
          </div>
          <h3 class="font-bold text-brand-500 uppercase tracking-wider text-base mt-4">5P EVENT</h3>
        </div>

        <!-- Info List -->
        <div
          class="md:col-span-2 space-y-3 text-gray-400 leading-relaxed text-center md:text-left border-l border-gray-800 pl-4 md:pl-8"
        >
          <p>
            <strong class="text-white uppercase"
              >CÔNG TY TNHH TRUYỀN THÔNG VÀ TỔ CHỨC SỰ KIỆN 5P EVENT</strong
            >
          </p>
          <p class="flex items-start gap-2 justify-center md:justify-start">
            <svg
              class="w-4 h-4 text-gray-500 mt-1 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            <span
              >Landmark 81, Vinhomes Central Park, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh,
              TP.HCM</span
            >
          </p>
          <p class="flex items-center gap-2 justify-center md:justify-start">
            <svg
              class="w-4 h-4 text-gray-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              ></path>
            </svg>
            <span>Hotline: 090 123 4567</span>
          </p>
          <p class="flex items-center gap-2 justify-center md:justify-start">
            <svg
              class="w-4 h-4 text-gray-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
            <span>Email: admin@5pevent.vn</span>
          </p>
        </div>

        <!-- Socials and Links -->
        <div class="md:col-span-1 space-y-4 text-center md:text-right text-white">
          <h4 class="text-white font-medium font-outfit uppercase tracking-widest text-xs mb-6">
            Kết nối với chúng tôi
          </h4>
          <div class="flex items-center justify-center md:justify-end gap-3 cursor-pointer">
            <!-- Facebook -->
            <div
              class="w-10 h-10 rounded-full border border-gray-700 bg-gray-900/50 flex items-center justify-center hover:bg-brand-500 hover:border-brand-500 transition-colors"
            >
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"
                />
              </svg>
            </div>
            <!-- Youtube -->
            <div
              class="w-10 h-10 rounded-full border border-gray-700 bg-gray-900/50 flex items-center justify-center hover:bg-brand-500 hover:border-brand-500 transition-colors"
            >
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M21.58,7.19A2.71,2.71,0,0,0,19.67,5.3c-1.68-.45-8.44-.45-8.44-.45s-6.76,0-8.45.45A2.67,2.67,0,0,0,.87,7.19C.42,8.87.42,12.5.42,12.5s0,3.63.45,5.31A2.71,2.71,0,0,0,2.78,19.7c1.69.45,8.45.45,8.45.45s6.76,0,8.44-.45a2.71,2.71,0,0,0,1.91-1.89c.45-1.68.45-5.31.45-5.31s0-3.63-.45-5.31Zm-13,8.41V9.4l5.95,3.1-5.95,3.1Z"
                />
              </svg>
            </div>
            <!-- Zalo Placeholder -->
            <div
              class="w-10 h-10 rounded-full border text-xs font-bold border-gray-700 bg-gray-900/50 flex items-center justify-center hover:bg-brand-500 hover:border-brand-500 transition-colors text-white"
            >
              Zalo
            </div>
          </div>
          <div class="pt-8 text-gray-600 text-[11px] uppercase tracking-wider">
            © 2026 5P EVENT TRADING CO.,LTD
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>
