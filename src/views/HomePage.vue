<template>
  <div class="home-page">
    <HeroSection />
    <WorksheetGrid />
  </div>
</template>

<script setup>
import HeroSection from '../components/HeroSection.vue'
import WorksheetGrid from '../components/WorksheetGrid.vue'
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}
</style>
