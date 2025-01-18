<template>
  <section class="partners">
    <h1 class="heading">Наши партнеры</h1>
    <div class="swiper-container">
      <Swiper
        :slides-per-view="slidesPerView"
        :space-between="20"
        loop="true"
        :modules="modules"
        navigation
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
        }"
        class="partners-swiper"
      >
        <SwiperSlide v-for="partner in partners" :key="partner.id">
          <div class="partner-img-wrapper">
            <img :src="getImage(partner.image)" alt="Partner Logo" class="partner-logo" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay } from "swiper/modules";
import PartnersModel from "@/api/modules/partners/partners.model";
import appConf from "@/api/conf/app.conf";
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: "PartnersComponent",
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    const slidesPerView = ref(8);

    const updateSlidesPerView = () => {
      const width = window.innerWidth;
      if (width < 480) {
        slidesPerView.value = 3;
      } else if (width < 768) {
        slidesPerView.value = 3;
      } else if (width < 1024) {
        slidesPerView.value = 4;
      } else if (width < 1280) {
        slidesPerView.value = 6;
      } else {
        slidesPerView.value = 8;
      }
    };

    onMounted(() => {
      updateSlidesPerView();
      window.addEventListener('resize', updateSlidesPerView);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateSlidesPerView);
    });

    return {
      slidesPerView
    };
  },
  data: () => ({
    partners: [],
    modules: [Navigation, Autoplay]
  }),
  async created() {
    const partnersModel = new PartnersModel();
    this.partners = (await partnersModel.getAll()).getData();
  },
  methods: {
    getImage(url: string) {
      if (!url) return;
      if (url[0] === "/") {
        return `${appConf.proto}://${appConf.endpoint}/files${url}`;
      }
      return url;
    }
  }
};
</script>

<style scoped>
.partners {
  padding: 0 5rem;
  margin-top: 3rem;
  position: relative;
}

.heading {
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 2rem;
}

.swiper-container {
  position: relative;
  padding: 0 80px; /* Увеличиваем отступы для десктопа */
  margin: 0 -80px;
  overflow: hidden;
}

.partner-img-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  padding: 0 10px;
}

.partner-logo {
  width: 100%;
  max-width: 100px;
  height: 100%;
  max-height: 100px;
  object-fit: contain;
  user-select: none;
}

/* Стили для кнопок навигации */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  top: 50%;
  transform: translateY(-50%);
  margin-top: 0;
  z-index: 10;
}

:deep(.swiper-button-prev) {
  left: 20px; /* Отодвигаем кнопки от края */
}

:deep(.swiper-button-next) {
  right: 20px; /* Отодвигаем кнопки от края */
}

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  font-size: 20px;
  color: #000;
}

:deep(.swiper-button-disabled) {
  opacity: 0.5;
}

/* Медиа-запросы */
@media screen and (max-width: 1280px) {
  .partners {
    padding: 0 4rem;
  }

  .heading {
    font-size: 2.5rem;
  }

  .swiper-container {
    padding: 0 70px;
    margin: 0 -70px;
  }

  :deep(.swiper-button-prev) {
    left: 15px;
  }

  :deep(.swiper-button-next) {
    right: 15px;
  }
}

@media screen and (max-width: 1024px) {
  .partners {
    padding: 0 3rem;
  }

  .heading {
    font-size: 2.2rem;
  }

  .partner-logo {
    max-width: 90px;
    max-height: 90px;
  }

  .swiper-container {
    padding: 0 60px;
    margin: 0 -60px;
  }

  :deep(.swiper-button-prev) {
    left: 10px;
  }

  :deep(.swiper-button-next) {
    right: 10px;
  }
}

@media screen and (max-width: 768px) {
  .partners {
    padding: 0 2rem;
  }

  .heading {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  .swiper-container {
    padding: 0 45px;
    margin: 0 -45px;
  }

  .partner-logo {
    max-width: 80px;
    max-height: 80px;
  }

  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    width: 35px;
    height: 35px;
  }

  :deep(.swiper-button-next::after),
  :deep(.swiper-button-prev::after) {
    font-size: 18px;
  }

  :deep(.swiper-button-prev) {
    left: 5px;
  }

  :deep(.swiper-button-next) {
    right: 5px;
  }
}

@media screen and (max-width: 480px) {
  .partners {
    padding: 0 1rem;
  }

  .heading {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .swiper-container {
    padding: 0 40px;
    margin: 0 -40px;
  }

  .partner-logo {
    max-width: 70px;
    max-height: 70px;
  }

  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    width: 30px;
    height: 30px;
  }

  :deep(.swiper-button-next::after),
  :deep(.swiper-button-prev::after) {
    font-size: 16px;
  }
}
:deep(.swiper-button-disabled) {
  opacity: 0.5;
}

/* Медиа-запросы */
@media screen and (max-width: 1280px) {
  .partners {
    padding: 0 4rem;
  }

  .heading {
    font-size: 2.5rem;
  }

  .swiper-container {
    padding: 0 70px;
    margin: 0 -70px;
  }

  :deep(.swiper-button-prev) {
    left: 15px;
  }

  :deep(.swiper-button-next) {
    right: 15px;
  }
}

@media screen and (max-width: 1024px) {
  .partners {
    padding: 0 3rem;
  }

  .heading {
    font-size: 2.2rem;
  }

  .partner-logo {
    max-width: 90px;
    max-height: 90px;
  }

  .swiper-container {
    padding: 0 60px;
    margin: 0 -60px;
  }

  :deep(.swiper-button-prev) {
    left: 10px;
  }

  :deep(.swiper-button-next) {
    right: 10px;
  }
}

@media screen and (max-width: 768px) {
  .partners {
    padding: 0 2rem;
  }

  .heading {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  .swiper-container {
    padding: 0 45px;
    margin: 0 -45px;
  }

  .partner-logo {
    max-width: 80px;
    max-height: 80px;
  }

  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    width: 35px;
    height: 35px;
  }

  :deep(.swiper-button-next::after),
  :deep(.swiper-button-prev::after) {
    font-size: 18px;
  }

  :deep(.swiper-button-prev) {
    left: 5px;
  }

  :deep(.swiper-button-next) {
    right: 5px;
  }
}

@media screen and (max-width: 480px) {
  .partners {
    padding: 0 1rem;
  }

  .heading {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .swiper-container {
    padding: 0 40px;
    margin: 0 -40px;
  }

  .partner-logo {
    max-width: 70px;
    max-height: 70px;
  }

  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    width: 30px;
    height: 30px;
  }

  :deep(.swiper-button-next::after),
  :deep(.swiper-button-prev::after) {
    font-size: 16px;
  }
}
</style>



