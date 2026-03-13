<!-- src/components/common/BaseModal.vue -->
<template>
  <transition name="fade">
    <div
      v-if="show"
      class="absolute inset-0 z-[99998] overflow-y-auto bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex items-center justify-center min-h-full p-4">
        <!-- Overlay -->
        <transition name="fade">
          <div
            v-if="show"
            class="absolute inset-0"
            aria-hidden="true"
            style="pointer-events: none"
            @click="$emit('close')"
          ></div>
        </transition>

        <!-- Modal content -->
        <transition name="zoom">
          <div
            v-if="show"
            :class="[
              'relative bg-white dark:bg-gray-900 rounded-2xl text-left overflow-y-auto shadow-2xl transform transition-all w-full my-8 mx-auto',
              maxWidthClass || (isViewportWidth ? '' : 'max-w-md'),
            ]"
            :style="isViewportWidth ? { maxWidth: props.maxWidth } : {}"
          >
            <!-- Close button -->
            <button
              @click="$emit('close')"
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors z-10"
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
            <div class="px-6 pt-6 pb-4 sm:px-8 sm:pt-8">
              <slot name="header">
                <h3
                  v-if="title"
                  class="text-xl font-bold text-gray-900 dark:text-white"
                  id="modal-title"
                >
                  {{ title }}
                </h3>
              </slot>
            </div>

            <!-- Body -->
            <div class="px-6 pb-6 sm:px-8 sm:pb-8">
              <slot></slot>
            </div>

            <!-- Footer -->
            <div
              v-if="$slots.footer"
              class="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 sm:px-8 sm:flex sm:flex-row-reverse gap-3"
            >
              <slot name="footer"></slot>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
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

const isViewportWidth = computed(() => {
  return props.maxWidth?.includes('vw') || props.maxWidth?.includes('%')
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
</style>
