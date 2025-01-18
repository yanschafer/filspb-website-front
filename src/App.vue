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

/* Глобальные стили для мобильного меню */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999998;
}

.mobile-menu-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fbc800;
  z-index: 9999999;
}
</style>
