<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
.hidden {
  display: none !important;
}
.swiper-button-next,
.swiper-button-prev {
  color: #fbc800!important;
}

/* Цвет для буллетов в пагинации */
.swiper-pagination-bullet {
  background-color: #fbc800!important;
}

/* Цвет активного буллета */
.swiper-pagination-bullet-active {
  background-color: #fbc800!important;
  transform: scale(1.2)!important; 
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
:root {
    --p-select-focus-border-color: #f3ca00!important; 
}
</style>
