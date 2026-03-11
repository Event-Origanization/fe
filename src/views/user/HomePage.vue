<template>
  <div class="w-full">
    <!-- Các nội dung bên trong Header/Navbar đã được chuyển tới layout Header.vue -->
    <main class="relative z-10">
      <!-- HERO & VIDEO SECTION -->
      <section class="pt-16 pb-12 container mx-auto px-4 flex flex-col items-center">
        <!-- Title CHI PHÍ -->
        <h1
          class="text-5xl md:text-7xl font-black italic tracking-wider mb-8 text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-600 filter drop-shadow-[0_4px_10px_rgba(234,179,8,0.5)]"
        >
          CHI PHÍ
        </h1>

        <!-- Sub Badges (Hợp lý - Tối ưu) -->
        <div class="flex justify-between w-full max-w-6xl relative z-20 -mb-5 px-4 md:px-0">
          <div
            class="bg-gradient-to-r from-fuchsia-600 to-pink-500 text-white font-black italic text-xl md:text-2xl px-12 py-3 [clip-path:polygon(0_0,100%_0,85%_100%,0%_100%)] drop-shadow-[0_0_15px_rgba(219,39,119,0.8)] shadow-pink-500 animate-pulse"
          >
            HỢP LÝ
          </div>
          <div
            class="bg-gradient-to-l from-fuchsia-600 to-pink-500 text-white font-black italic text-xl md:text-2xl px-12 py-3 [clip-path:polygon(15%_0,100%_0,100%_100%,0%_100%)] drop-shadow-[0_0_15px_rgba(219,39,119,0.8)] shadow-pink-500 animate-pulse animation-delay-200"
          >
            TỐI ƯU
          </div>
        </div>

        <!-- Main Video Frame -->
        <div class="w-full max-w-6xl mx-auto relative group">
          <!-- Cyberpunk glowing frame -->
          <div
            class="absolute -inset-[3px] bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 rounded-sm blur-[2px] opacity-75 group-hover:opacity-100 group-hover:blur-[6px] transition-all duration-1000 [clip-path:polygon(5%_0%,95%_0%,100%_5%,100%_95%,95%_100%,5%_100%,0%_95%,0%_5%)]"
          ></div>

          <div
            class="relative w-full aspect-video bg-[#0a0a0a] [clip-path:polygon(5%_0%,95%_0%,100%_5%,100%_95%,95%_100%,5%_100%,0%_95%,0%_5%)] flex items-center justify-center overflow-hidden border-2 border-transparent"
          >
            <!-- Dummy Video/Welcome Background -->
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
              class="absolute w-full h-full object-cover opacity-60 mix-blend-screen scale-105 group-hover:scale-100 transition-transform duration-[3s]"
              alt="Stage Welcome"
            />

            <div class="relative z-10 flex flex-col items-center">
              <div
                class="w-32 h-32 md:w-48 md:h-48 rounded-full border border-blue-400/50 flex items-center justify-center p-2 backdrop-blur-sm shadow-[0_0_30px_rgba(59,130,246,0.3)] inset-0 animate-[spin_10s_linear_infinite]"
              >
                <!-- Inner circle -->
                <div
                  class="w-full h-full rounded-full border border-red-500/50 border-t-red-500 border-l-transparent border-b-transparent border-r-transparent animate-[spin_5s_linear_infinite_reverse]"
                ></div>
              </div>
              <!-- Absolute centered text -->
              <h2
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl md:text-5xl font-black tracking-[0.2em] text-white mix-blend-overlay opacity-90"
              >
                WELCOME
              </h2>
            </div>

            <!-- Stage girls mock (just abstract shapes to mimic the dancers from your image) -->
            <div
              class="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent z-10"
            ></div>
          </div>

          <!-- Bottom cyber decor borders -->
          <div
            class="absolute -bottom-8 left-0 flex gap-4 w-1/3 h-6 [clip-path:polygon(0_0,100%_0,90%_100%,0_100%)] bg-pink-600/80"
          ></div>
          <div
            class="absolute -bottom-8 right-0 flex gap-4 w-1/3 h-6 [clip-path:polygon(0_0,100%_0,100%_100%,10%_100%)] bg-pink-600/80"
          ></div>
        </div>

        <!-- STATS BLOCK -->
        <div
          class="mt-20 w-full max-w-5xl mx-auto border-t border-b border-white/10 py-8 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        >
          <div
            class="flex flex-col md:flex-row justify-between items-center text-center gap-10 md:gap-0"
          >
            <div class="flex-1 space-y-2 relative group cursor-default">
              <h3
                class="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
              >
                3
              </h3>
              <p class="text-gray-400 uppercase text-sm tracking-widest font-semibold">Lĩnh vực</p>
            </div>
            <div class="hidden md:block w-px h-16 bg-white/10"></div>
            <div class="flex-1 space-y-2 relative group cursor-default">
              <h3
                class="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
              >
                1500<span class="text-brand-500">+</span>
              </h3>
              <p class="text-gray-400 uppercase text-sm tracking-widest font-semibold">Sự kiện</p>
            </div>
            <div class="hidden md:block w-px h-16 bg-white/10"></div>
            <div class="flex-1 space-y-2 relative group cursor-default">
              <h3
                class="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
              >
                500<span class="text-brand-500">+</span>
              </h3>
              <p class="text-gray-400 uppercase text-sm tracking-widest font-semibold">
                Thương hiệu
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- HIGHLIGHT PROJECTS -->
      <section class="py-16 container mx-auto px-4 text-center">
        <h2
          class="text-3xl md:text-4xl font-black mb-4 uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 drop-shadow-md"
        >
          Dự án nổi bật
        </h2>
        <p class="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-12">
          5P Event luôn tự hào về các dự án đã thực hiện được đầu tư chỉn chu, chuyên nghiệp nhằm
          đem lại trải nghiệm tuyệt vời nhất cho khách hàng.
        </p>

        <!-- Project Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
          <!-- Item 1 -->
          <div
            class="group relative overflow-hidden bg-black/50 border border-white/5 hover:border-brand-500/50 transition-colors duration-500 aspect-[4/3] cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop"
              class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              alt="VIFON Event"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"
            ></div>
            <div
              class="absolute bottom-0 left-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <h4
                class="text-brand-500 text-xs font-bold tracking-widest uppercase mb-1 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
              >
                Kỷ niệm - Tri ân
              </h4>
              <h3 class="text-lg font-bold text-white uppercase drop-shadow-lg">
                Gala Kỷ Niệm 60 Năm VIFON
              </h3>
            </div>
          </div>

          <!-- Item 2 -->
          <div
            class="group relative overflow-hidden bg-black/50 border border-white/5 hover:border-blue-500/50 transition-colors duration-500 aspect-[4/3] cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop"
              class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              alt="Event"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"
            ></div>
            <div
              class="absolute bottom-0 left-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <h4
                class="text-blue-400 text-xs font-bold tracking-widest uppercase mb-1 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
              >
                Âm Ngiạc - Giải trí
              </h4>
              <h3 class="text-lg font-bold text-white uppercase drop-shadow-lg">
                YEU FESTIVAL 2026
              </h3>
            </div>
          </div>

          <!-- Item 3 -->
          <div
            class="group relative overflow-hidden bg-black/50 border border-white/5 hover:border-pink-500/50 transition-colors duration-500 aspect-[4/3] cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop"
              class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              alt="Tet Event"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"
            ></div>
            <div
              class="absolute bottom-0 left-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <h4
                class="text-pink-400 text-xs font-bold tracking-widest uppercase mb-1 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
              >
                Tiệc cuối năm
              </h4>
              <h3 class="text-lg font-bold text-white uppercase drop-shadow-lg">
                YEAR END PARTY - ĐẠI GIA ĐÌNH SUNJIN
              </h3>
            </div>
          </div>

          <!-- Item 4 -->
          <div
            class="group relative overflow-hidden bg-black/50 border border-white/5 hover:border-purple-500/50 transition-colors duration-500 aspect-[4/3] cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop"
              class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              alt="Tech Event"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"
            ></div>
            <div
              class="absolute bottom-0 left-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <h4
                class="text-purple-400 text-xs font-bold tracking-widest uppercase mb-1 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
              >
                Hội thảo
              </h4>
              <h3 class="text-lg font-bold text-white uppercase drop-shadow-lg">
                Tech Show - Giới thiệu sản phẩm mới
              </h3>
            </div>
          </div>

          <!-- Item 5 -->
          <div
            class="group relative overflow-hidden bg-black/50 border border-white/5 hover:border-orange-500/50 transition-colors duration-500 aspect-[4/3] cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop"
              class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              alt="Event"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"
            ></div>
            <div
              class="absolute bottom-0 left-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <h4
                class="text-orange-400 text-xs font-bold tracking-widest uppercase mb-1 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
              >
                Teambuilding
              </h4>
              <h3 class="text-lg font-bold text-white uppercase drop-shadow-lg">
                Teambuilding Lãnh Đạo V-Group
              </h3>
            </div>
          </div>

          <!-- Item 6 -->
          <div
            class="group relative overflow-hidden bg-black/50 border border-white/5 hover:border-teal-500/50 transition-colors duration-500 aspect-[4/3] cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=800&auto=format&fit=crop"
              class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              alt="Event"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"
            ></div>
            <div
              class="absolute bottom-0 left-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <h4
                class="text-teal-400 text-xs font-bold tracking-widest uppercase mb-1 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
              >
                Khai trương
              </h4>
              <h3 class="text-lg font-bold text-white uppercase drop-shadow-lg">
                Lễ Khai Trương Siêu Thị Điện Máy
              </h3>
            </div>
          </div>
        </div>

        <div class="mt-12">
          <button
            class="bg-[#d41c1c] text-white font-medium px-8 py-2.5 rounded hover:bg-red-700 hover:shadow-[0_0_15px_rgba(220,38,38,0.6)] transition-all duration-300 relative overflow-hidden group"
          >
            <span class="relative z-10">Xem Thêm +</span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </button>
        </div>
      </section>

      <!-- LIGHT/NEON LASER SECTION (Vùng ơi mở ra + Partners) -->
      <section class="py-20 relative text-center border-t border-white/5">
        <div
          class="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"
        ></div>

        <div class="container mx-auto px-4 z-10 relative">
          <h2
            class="text-3xl md:text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 uppercase tracking-widest"
          >
            Vùng ơi mở ra,
          </h2>
          <p class="text-gray-300 font-light mb-10 max-w-3xl mx-auto">
            Điểm kết nối điểm chạm trải nghiệm thông qua các sự kiện đẳng cấp. Thấu hiểu và đồng
            hành truyền tải thông điệp trọn vẹn. Khác biệt để tạo nên sự độc bản.
          </p>
          <button
            class="border border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white px-8 py-2 rounded-full font-medium transition-all shadow-[0_0_10px_rgba(220,38,38,0.2)] hover:shadow-[0_0_20px_rgba(220,38,38,0.6)]"
          >
            Xem thêm
          </button>

          <!-- PARTNERS -->
          <div class="mt-24">
            <div class="inline-block relative mb-12">
              <h3
                class="text-xl md:text-2xl font-black uppercase text-gray-200 tracking-[0.2em] relative z-10"
              >
                Khách hàng của chúng tôi
              </h3>
              <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-4 bg-brand-500/20 blur-md -z-10"
              ></div>
            </div>

            <!-- Partner Logos Grid -->
            <div
              class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-8 gap-y-12 items-center justify-items-center opacity-70"
            >
              <!-- Just mocked SVG / IMG for partners, using font-bold text for placeholder if images not available -->
              <div
                class="w-full flex justify-center hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
              >
                <span class="font-bold text-xl italic font-serif">Sunjin</span>
              </div>
              <div
                class="w-full flex justify-center hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
              >
                <span class="font-bold text-xl tracking-widest text-[#0066ff]">NOVALAND</span>
              </div>
              <div
                class="w-full flex justify-center hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
              >
                <span class="font-bold text-xl uppercase font-mono">ZKTEco</span>
              </div>
              <div
                class="w-full flex justify-center hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
              >
                <span class="font-bold text-xl uppercase font-sans">VDDLAND</span>
              </div>
              <div
                class="w-full flex justify-center hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
              >
                <span class="font-bold text-xl uppercase tracking-tighter text-red-500">VIFON</span>
              </div>

              <div
                class="w-full flex justify-center hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
              >
                <span class="font-bold text-xl font-serif">REAL CLOTHES</span>
              </div>
              <div
                class="w-full flex justify-center hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
              >
                <span class="font-bold text-xl italic text-blue-400">Vietjet.com</span>
              </div>
              <div
                class="w-full flex justify-center hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
              >
                <span class="font-bold text-xl font-mono">PHU DONG</span>
              </div>
              <div
                class="w-full flex justify-center hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
              >
                <span class="font-bold text-2xl tracking-tighter">dathop</span>
              </div>
              <div
                class="w-full flex justify-center hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
              >
                <span class="font-bold text-xl uppercase tracking-widest text-[#ed1b24]"
                  >KYO WON</span
                >
              </div>

              <div
                class="w-full flex justify-center hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
              >
                <span class="font-bold text-xl uppercase">Fox Group</span>
              </div>
              <div
                class="w-full flex justify-center hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
              >
                <span class="font-bold text-xl italic">CJ ViNa</span>
              </div>
              <div
                class="w-full flex justify-center hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
              >
                <span class="font-bold text-2xl font-serif">GihOt</span>
              </div>
              <div
                class="w-full flex justify-center hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
              >
                <span class="font-bold text-xl font-mono border border-white p-1">samtec</span>
              </div>
              <div
                class="w-full flex justify-center hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
              >
                <span class="font-bold text-xl italic text-green-400">LUXURY</span>
              </div>
            </div>
          </div>

          <!-- ABOUT US FOOTER DECOR -->
          <div
            class="mt-32 border-t border-b border-white/10 py-8 text-center relative max-w-4xl mx-auto"
          >
            <h3 class="text-xl md:text-2xl font-black uppercase text-gray-200 tracking-widest mb-4">
              Về Chúng Tôi
            </h3>
            <p class="text-brand-500 font-medium mb-4 uppercase">
              5P EVENT - KIẾN TẠO CẢM XÚC, THU TRỌN THƯƠNG HIỆU
            </p>
            <p class="text-gray-400 text-sm leading-relaxed max-w-3xl mx-auto">
              5P EVENT mang đến những TUYỆT TÁC SỰ KIỆN NGHỆ THUẬT VÀ DỊCH VỤ SỰ KIỆN CHUYÊN NGHIỆP,
              TOÀN DIỆN, THÔNG MINH, TĨNH TẾ. Từ đó, tạo ra giá trị khác biệt mang đậm tính cách
              thương hiệu doanh nghiệp, tạo vị thế trước hàng triệu đối thủ & đối tượng khách hàng
              tiềm năng.
            </p>
          </div>
        </div>
      </section>

      <!-- FOOTER CONTACT & SUBSCRIPTION đã được chuyển tới Footer.vue -->
    </main>
  </div>
</template>

<script setup lang="ts">
// Script component
</script>

<style scoped>
/* Animation Utilities Optional Helper */
.animation-delay-200 {
  animation-delay: 0.2s;
}
.animation-delay-400 {
  animation-delay: 0.4s;
}
.animation-delay-600 {
  animation-delay: 0.6s;
}

/* Custom selection */
::selection {
  background-color: #ef4444;
  color: #fff;
}
</style>
