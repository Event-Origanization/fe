<!-- src/components/common/BaseModal.vue -->
<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="show"
        class="fixed inset-0 z-[99998] overflow-y-auto bg-gray-900/75 transition-opacity backdrop-blur-sm"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <!-- This container is to center the modal content -->
        <div class="flex items-center justify-center min-h-screen p-4 sm:p-6">
          
          <!-- Background Overlay (Click to close) -->
          <div class="fixed inset-0 transition-opacity" aria-hidden="true" @click="$emit('close')"></div>

          <!-- Modal content -->
          <transition name="zoom">
            <div
              v-if="show"
              :class="[
                'relative bg-white dark:bg-gray-900 rounded-2xl text-left shadow-2xl transform transition-all w-full my-8 mx-auto flex flex-col overflow-hidden',
                maxWidthClass || (isCustomWidth ? '' : 'max-w-md'),
              ]"
              :style="{
                maxHeight: '75vh',
                ...(isCustomWidth ? { maxWidth: props.maxWidth } : {})
              }"
            >
              <!-- Close button -->
              <button
                @click="$emit('close')"
                class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors z-10 p-1"
              >
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <!-- Header -->
              <div class="px-6 pt-6 pb-4 sm:px-8 sm:pt-8 border-b border-gray-100 dark:border-gray-800">
                <slot name="header">
                  <h3
                    v-if="title"
                    class="text-xl font-bold text-gray-900 dark:text-white pr-8"
                    id="modal-title"
                  >
                    {{ title }}
                  </h3>
                </slot>
              </div>

              <!-- Body -->
              <div class="px-6 py-6 sm:px-8 sm:py-8 flex-1 overflow-y-auto min-h-0 custom-scrollbar">
                <slot></slot>
              </div>

              <!-- Footer -->
              <div
                v-if="$slots.footer"
                class="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 sm:px-8 sm:flex sm:flex-row-reverse gap-3 border-t border-gray-200 dark:border-gray-700"
              >
                <slot name="footer"></slot>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  maxWidth: {
    type: String,
    default: 'md',
  },
})

defineEmits(['close'])

const maxWidthClass = computed(() => {
  return (
    {
      'max-w-sm': props.maxWidth === 'sm',
      'max-w-md': props.maxWidth === 'md',
      'max-w-lg': props.maxWidth === 'lg',
      'max-w-xl': props.maxWidth === 'xl',
      'max-w-2xl': props.maxWidth === '2xl',
      'max-w-3xl': props.maxWidth === '3xl',
      'max-w-4xl': props.maxWidth === '4xl',
      'max-w-5xl': props.maxWidth === '5xl',
      'max-w-6xl': props.maxWidth === '6xl',
      'max-w-7xl': props.maxWidth === '7xl',
      'max-w-full': props.maxWidth === 'full',
    }[props.maxWidth] || ''
  )
})

const isCustomWidth = computed(() => {
  return props.maxWidth?.includes('vw') || 
         props.maxWidth?.includes('%') || 
         props.maxWidth?.includes('px') || 
         props.maxWidth?.includes('rem')
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.zoom-enter-active,
.zoom-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #374151;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style>
