<template>
  <section class="footer-section">
    <div class="footer-header">
      <img class="logo" src="../assets/logo_osnovnoy_black.png" />
      <div class="social-links">
        <div class="contrast-mode">
          <div class="eye-img-wrapper">
            <img class="eye-img" src="../assets/Icons/eye-solid.svg" />
          </div>
          <div @click="toggleContrastMode" class="contrast-mode-text">ВЕРСИЯ ДЛЯ СЛАБОВИДЯЩИХ</div>
        </div>
        <div class="links-group">
            <!-- <div class="link-wrapper">
                <img class="icon yandex" src="../assets/Icons/yandex-brands-solid.svg" />
            </div> -->
            <div @click="goTg" class="link-wrapper">
                <img class="icon" src="../assets/Icons/telegram.svg" />
            </div>
            <div @click="goVK" class="link-wrapper">
                <img class="icon" src="../assets/Icons/vk.svg" />
            </div>
        </div>
      </div>
    </div>
    <div class="content-row">
      <div class="info-col">
        <span class="title">
          <b>Государственная</b><br />
          <b>филармония</b><br />
          <nobr><b>Санкт-Петербурга</b></nobr
          ><br />
          для детей и молодежи
        </span>
      </div>
      <div class="links-col">
        <span class="city">{{systemData.city}}</span>
        <a class="location-link">
            {{systemData.addressShort}}
        </a>
        <a class="phone-link" :href="`telme:${systemData.name}`">
            {{systemData.name}}
        </a>
        <div class="nav-links-group">
            <a class="nav-link" @click="$router.push({path: '/documents'})">ДОКУМЕНТЫ</a>
            <a class="nav-link" href="https://zakupki.gov.ru/epz/main/public/home.html">ГОСЗАКАЗ</a>
            <a class="nav-link" @click="$router.push({path: '/contacts'})">КОНТАКТЫ</a>
        </div>
        <span>Разработала студия Волкова, 2024</span>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { useContrastStore } from "@/stores/contrastStore";
//@ts-nocheck
import SystemModel from '@/api/modules/system/system.model';

export default {
  name: "FooterComponent",
  data: () => ({
    systemData: {}
  }),
  async created() {
    const systemModel = new SystemModel()
    this.systemData = (await systemModel.getSystemData()).getData()
    const contrastStore = useContrastStore();
    contrastStore.initialize();
  },
  methods: {
    toggleContrastMode() {
      const contrastStore = useContrastStore();
      contrastStore.toggleContrastMode();
    },
    goTg() {
        window.location = this.systemData.telegram
    },
    goVK() {
        window.location = this.systemData.vk
    }
  }
};
</script>


<style scoped>
.nav-link {
    font-weight: 600;
    cursor: pointer;
}
.nav-links-group {
    display: flex;
    gap: 2rem;
    font-weight: 700;
}
.links-col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
}
.city {
    font-weight: 600;
    font-size: 1.5rem;
}
.social-links {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}
.link-wrapper {
    display: flex;
}
a {
    text-decoration: none;
    color: black;
    font-weight: 500;
}
.footer-section {
  background-color: #fbc800;
  padding-right: 5rem;
  padding-left: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 2rem;
  padding-top: 2rem;
}
.links-group {
    display: flex;
    gap: 1rem;
}
.footer-header {
  display: flex;
  justify-content: space-between;
}
.content-row {
  display: flex;
  justify-content: space-between;
}
.logo {
  width: 100%;
  max-width: 200px;
}
.title {
  font-size: 3rem;
  line-height: 3rem;
}
.icon {
    width: 100%;
    height: 100%;
    max-width: 30px;
    max-height: 30px;
}
.info-col {
  display: flex;
  flex-direction: column;
}
.contrast-mode {
    display: flex;
    gap: 1rem;
    align-items: center;
}
.contrast-mode-text {
    font-weight: 500;
}
.eye-img {
        width: 100%;
        max-width: 20px;
    }
    .eye-img-wrapper {
    display: flex;
    justify-content: center;
}
</style>
