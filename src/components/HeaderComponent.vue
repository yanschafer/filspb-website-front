<template>
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
        <div class="contrast-mode-text">
            ВЕРСИЯ ДЛЯ СЛАБОВИДЯЩИХ
        </div>
    </div>
    <div class="social-links-group">
        <div class="icon-wrapper">
            <img class="social-icon" src="../assets/Icons/eye-solid.svg" >
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

import SystemModel from '@/api/modules/system/system.model';

export default {
  name: "HeaderComponent",
  data: () => ({
    systemData: {}
  }),
  async created() {
    const systemModel = new SystemModel()
    this.systemData = (await systemModel.getSystemData()).getData()
    console.log(this.systemData)
  },
  methods: {
    goTg() {
        window.location = this.systemData.telegram
    },
    goVK() {
        window.location = this.systemData.vk
    }
  }
}
</script>

<style scoped>
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
