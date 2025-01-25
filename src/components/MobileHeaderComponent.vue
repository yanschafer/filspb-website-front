<template>
  <div>
    <!-- Верхняя панель (всегда видима) -->
    <div class="header-top">
      <a :href="`tel:${systemData.name}`" class="phone">{{ systemData.name }}</a>
      <div class="social-icons">
        <div class="icon" @click="toggleContrastMode">
          <img class="social-icon" :src="eyeIcon" alt="Версия для слабовидящих" />
        </div>
        <div class="icon" @click="goTg">
          <img class="social-icon" :src="telegramIcon" alt="Telegram" />
        </div>
        <div class="icon" @click="goVK">
          <img class="social-icon" :src="vkIcon" alt="VK" />
        </div>
      </div>
      <button class="menu-btn" @click="toggleMenu">
        <div v-if="!isMenuVisible" class="burger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div v-else class="close-icon">×</div>
      </button>
    </div>

    <!-- Меню -->
    <Transition name="menu-fade">
      <div v-if="isMenuVisible" class="mobile-menu">
        <!-- Верхняя панель в меню -->
        <div class="menu-top">
          <a :href="`tel:${systemData.name}`" class="phone">{{ systemData.name }}</a>
          <div class="social-icons">
            <div class="icon" @click="toggleContrastMode">
              <img class="social-icon" :src="eyeIcon" alt="Версия для слабовидящих" />
            </div>
            <div class="icon" @click="goTg">
              <img class="social-icon" :src="telegramIcon" alt="Telegram" />
            </div>
            <div class="icon" @click="goVK">
              <img class="social-icon" :src="vkIcon" alt="VK" />
            </div>
          </div>
          <button class="menu-btn" @click="toggleMenu">
            <div class="close-icon">×</div>
          </button>
        </div>

        <nav class="nav-menu">
          <router-link to="/about" @click="toggleMenu">о нас</router-link>
          <router-link to="/events" @click="toggleMenu">афиша</router-link>
          <router-link to="/news" @click="toggleMenu">новости</router-link>
          <router-link to="/contacts" @click="toggleMenu">контакты</router-link>
          <router-link to="/accessibility" @click="toggleMenu">доступная среда</router-link>
          <div class="sub-menu">
            <router-link to="/documents" @click="toggleMenu">Документы</router-link>
            <router-link to="/goszakaz" @click="toggleMenu">Госзаказ</router-link>
          </div>
        </nav>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useContrastStore } from "@/stores/contrastStore";
import SystemModel from "@/api/modules/system/system.model";
import eyeIcon from '@/assets/Icons/eye-solid.svg';
import telegramIcon from '@/assets/Icons/telegram.svg';
import vkIcon from '@/assets/Icons/vk.svg';

export default defineComponent({
  name: "MobileHeaderComponent",
  setup() {
    const isMenuVisible = ref(false);
    const systemData = ref({});
    const contrastStore = useContrastStore();

    const toggleMenu = () => {
      isMenuVisible.value = !isMenuVisible.value;
    };

    const toggleContrastMode = () => {
      contrastStore.toggleContrastMode();
    };

    const goTg = () => {
      window.location.href = systemData.value.telegram;
    };

    const goVK = () => {
      window.location.href = systemData.value.vk;
    };

    onMounted(async () => {
      const systemModel = new SystemModel();
      systemData.value = (await systemModel.getSystemData()).getData();
      contrastStore.initialize();
    });

    return {
      isMenuVisible,
      toggleMenu,
      systemData,
      eyeIcon,
      telegramIcon,
      vkIcon,
      toggleContrastMode,
      goTg,
      goVK
    };
  },
});
</script>

<style scoped>
.header-top, .menu-top {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: white;
  z-index: 1000;
}

.menu-top {
  background-color: #fbc800;
}

.phone {
  color: black;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
}

.social-icons {
  display: flex;
  gap: 15px;
  align-items: center;
}

.icon {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.menu-btn {
  background: transparent;
  border: 1px solid black;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2000;
}

.menu-btn.active {
  background: #fbc800;
  border-color: black;
  border-width: 2px;
}

.burger-icon {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
}

.burger-icon span {
  display: block;
  width: 18px;
  height: 2px;
  background-color: black;
}

.close-icon {
  font-size: 1.5rem;
  color: black;
  line-height: 1;
}

.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #fbc800;
  display: flex;
  flex-direction: column;
  z-index: 1500;
}

.nav-menu {
  padding: 2rem;
  display: flex;
  flex-direction: column;
    align-items: center;
  margin-top: 100px;
  gap: 25px;
  gap: 1.5rem;
}

.nav-menu a {
  color: black;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: uppercase;
}

.sub-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}

.sub-menu a {
  font-size: 1rem;
  text-transform: none;
}

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.3s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}
</style>