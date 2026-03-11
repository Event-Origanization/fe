<template>
  <header
    class="relative z-50 w-full border-b border-indigo-900/40 bg-[#050510]/80 backdrop-blur-md"
  >
    <div class="container mx-auto px-4 h-20 flex items-center justify-between">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2 relative group">
        <div
          class="w-12 h-12 bg-red-600 rounded flex items-center justify-center text-white font-bold text-2xl tracking-tighter shadow-[0_0_15px_rgba(220,38,38,0.5)] transform group-hover:scale-105 transition-all"
        >
          5P
        </div>
      </a>

      <!-- Menu Navigation -->
      <nav class="hidden lg:flex items-center gap-8 font-medium text-[15px]">
        <router-link
          to="/"
          class="text-brand-500 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-brand-500 transition-colors shadow-brand-500 drop-shadow-md"
          >Trang chủ</router-link
        >
        <a
          href="#"
          class="text-gray-300 hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
          >Giới thiệu</a
        >
        <a
          href="#"
          class="text-gray-300 hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
          >Tổ chức sự kiện</a
        >
        <a
          href="#"
          class="text-gray-300 hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
          >Cho thuê thiết bị sự kiện</a
        >
        <a
          href="#"
          class="text-gray-300 hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
          >Tin tức</a
        >
      </nav>

      <!-- Search & Languagues -->
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
        <div class="flex items-center gap-2 text-sm font-semibold">
          <button class="flex items-center gap-1 opacity-70 hover:opacity-100 transition">
            <img
              src="https://flagcdn.com/w20/vn.png"
              alt="VN"
              class="w-5 h-3.5 object-cover rounded-sm"
            />
            VN
          </button>
          <span class="text-gray-600">|</span>
          <button class="flex items-center gap-1 opacity-50 hover:opacity-100 transition">
            <img
              src="https://flagcdn.com/w20/gb.png"
              alt="EN"
              class="w-5 h-3.5 object-cover rounded-sm"
            />
            EN
          </button>
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
  </header>
</template>

<script setup lang="ts">
defineProps<{
  mobileMenuOpen?: boolean
}>()

defineEmits<{
  (e: 'toggle-menu'): void
}>()
</script>
