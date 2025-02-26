<template>
  <div class="skeleton-wrapper" :style="{ aspectRatio }">
    <div class="skeleton-overlay"></div>
  </div>
</template>

<script>
export default {
  name: 'ImageSkeleton',
  props: {
    aspectRatio: {
      type: String,
      default: '16/9'
    }
  }
}
</script>

<style scoped>
.skeleton-wrapper {
  width: 100%;
  background-color: #f0f0f0;
  position: relative;
  overflow: hidden;
}

.skeleton-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
