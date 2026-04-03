<template>
  <div class="bg-[#dcf0fc] rounded-xl overflow-hidden shadow-sm transition-all duration-300">
    <!-- Header -->
    <div 
      class="flex items-center justify-between p-4 md:px-5 cursor-pointer bg-[#dcf0fc] hover:bg-[#d0ebfa] transition-colors"
      @click="isOpen = !isOpen"
    >
      <h3 class="font-extrabold text-[#2a3754] tracking-wide text-[15px] uppercase">{{ title }}</h3>
      <i :class="['pi', isOpen ? 'pi-chevron-up' : 'pi-chevron-down', 'text-[#2a3754] font-black transition-transform duration-300']"></i>
    </div>
    
    <!-- Content List -->
    <Transition name="sidebar-slide">
      <div v-show="isOpen" class="border-t border-[#b8dcf5]">
        <ul class="p-4 md:px-5 py-3 flex flex-col gap-3 max-h-[60vh] overflow-y-auto custom-scrollbar">
          <slot></slot>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    required: true
  }
})

const isOpen = ref(true)
</script>

<style scoped>
.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
  transition: all 0.4s ease-in-out;
  max-height: 500px;
  opacity: 1;
}
.sidebar-slide-enter-from,
.sidebar-slide-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

/* Custom Scrollbar for TOC */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent; 
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #b8dcf5; 
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #4581e6; 
}
</style>
