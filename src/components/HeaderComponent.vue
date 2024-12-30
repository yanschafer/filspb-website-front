<template>
    <div v-if="contrastStore.isOverlayVisible" class="overlay animate__animated animate__fadeIn"></div>
<div class="navbar">
    <div class="number">
        <a class="link-number" :href="`telme:${systemData.name}`">{{systemData.name}}</a>
    </div>
    <div class="nav-group">
        <div class="nav-link">
            <router-link to="/about" class="nav-link-text">О НАС</router-link>
        </div>
        <div class="nav-link">
            <router-link to="/events" class="nav-link-text">АФИША</router-link>
        </div>
        <div class="nav-link">
            <router-link to="/contacts" class="nav-link-text">КОНТАКТЫ</router-link>
        </div>
    </div>
    <div class="contrast-mode">
        <div class="eye-img-wrapper">
            <img class="eye-img" src="../assets/Icons/eye-solid.svg" />
        </div>
        <div class="contrast-mode-text" @click="toggleContrastMode">
            ВЕРСИЯ ДЛЯ СЛАБОВИДЯЩИХ
        </div>
    </div>
    <div class="social-links-group">
        <div class="icon-wrapper">
            <img @click="toggleContrastMode" class="social-icon" src="../assets/Icons/eye-solid.svg" >
        </div>
        <div class="icon-wrapper">
            <img @click="goTg" class="social-icon" src="../assets/Icons/telegram.svg" >
        </div>
        <div class="icon-wrapper">
            <img @click="goVK" class="social-icon" src="../assets/Icons/vk.svg" >
        </div>
    </div>
</div>
</template>

<script lang="ts">
//@ts-nocheck

import SystemModel from "@/api/modules/system/system.model";
import { useContrastStore } from "@/stores/contrastStore";

export default {
  name: "HeaderComponent",
  data: () => ({
    systemData: {},
    isContrastMode: false, // Состояние версии для слабовидящих
  }),
  async created() {
    const systemModel = new SystemModel();
    this.systemData = (await systemModel.getSystemData()).getData();

    const contrastStore = useContrastStore();
    contrastStore.initialize(); // Проверим состояние на странице

    console.log(this.systemData);
  },
  computed: {
    contrastStore() {
      return useContrastStore();
    },
    isOverlayVisible() {
      return this.contrastStore.isOverlayVisible; // Безопасный доступ через computed
    }
  },
  methods: {
    goTg() {
      window.location = this.systemData.telegram;
    },
    goVK() {
      window.location = this.systemData.vk;
    },
    toggleContrastMode() {
      const contrastStore = useContrastStore();
      contrastStore.toggleContrastMode();
    },
  }
};
</script>




<style scoped>
/* Белый оверлей */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.5s ease-in-out; /* Плавное исчезновение */
}

.overlay.v-enter-active,
.overlay.v-leave-active {
  opacity: 1;
}
.overlay.v-enter, .overlay.v-leave-to {
  opacity: 0;
}
.navbar {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    height: 15vh;
    padding-left: 5rem;
    padding-right: 5rem;
}

.eye-img-wrapper {
    display: flex;
    justify-content: center;
}
.icon-wrapper {
    display: flex;
}
.social-links-group {
    display: flex;
    flex-direction: row;
    gap: 1rem;
}
.social-icon {
    width: 100%;
    max-width: 20px;
}
.nav-group {
    display: flex;
    gap: 1rem;
    align-items: center;
    
}
.nav-link-text {
    font-weight: 500;
    transition: all 0.3s ease-in-out;
    color: black;
    text-decoration: none;
}
.nav-link-text:hover {
    color: #fbc800;
    cursor: pointer;
}
.link-number {
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
}
.link-number:hover {
    color: #fbc800;
}
.contrast-mode {
    display: flex;
    gap: 1rem;
    align-items: center;
}
.contrast-mode-text {
    font-weight: 500;
}
    .link-number {
        color: black;
        font-size: 18px;
    }
    .eye-img {
        width: 100%;
        max-width: 20px;
    }
</style>
