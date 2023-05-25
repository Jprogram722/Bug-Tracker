<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-bug-primary">
    <SiteNav />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import SiteNav from './components/SiteNav.vue'
</script>


