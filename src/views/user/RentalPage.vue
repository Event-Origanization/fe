<template>
  <div class="w-full bg-[#0a0a0a] min-h-screen text-white overflow-hidden pb-12 pt-24">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl md:text-6xl font-black mb-8 tracking-widest uppercase text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        {{ $t('NAV.RENTAL') }}
      </h1>
      <div class="max-w-4xl mx-auto text-center space-y-6">
        <p class="text-xl text-gray-300">
           {{ $t('HOME.PROJECTS.DESC') }}
        </p>
        <div class="py-12 flex justify-center">
            <div class="relative w-72 h-80 flex-shrink-0 flex items-center justify-center">
              <div class="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-red-600 to-red-900 [clip-path:polygon(50%_0%,0%_100%,100%_100%)] shadow-[0_0_50px_rgba(220,38,38,0.8)]"></div>
              <div class="absolute inset-x-1 bottom-1 top-2 bg-gradient-to-t from-[#0a0a0a] via-[#1a0505] to-red-950 [clip-path:polygon(50%_0%,0%_100%,100%_100%)] flex flex-col items-center justify-center pb-8">
                <h1 class="text-6xl font-black text-white uppercase tracking-tighter drop-shadow-md">5P</h1>
                <p class="text-lg tracking-[0.5em] font-bold text-red-500 mt-2">EVENT</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Rental Page component
</script>
