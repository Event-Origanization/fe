<template>
  <router-link to="/" class="lg:hidden">
    <div
      class="text-2xl font-bold bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent"
    >
      5P<span class="text-red-500">Event</span>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
