<template>
    <section class="partners">
            <h1 class="heading">Наши партнеры</h1>
    <Swiper
      :slides-per-view="8"
      space-between="1"
      loop="true"
      :modules="modules"
      navigation
      autoplay
      class="partners-swiper"
    >
      <SwiperSlide v-for="partner in partners" :key="partner.id">
        <div class="partner-img-wrapper">
          <img :src="getImage(partner.image)" alt="Partner Logo" class="partner-logo" />
        </div>
      </SwiperSlide>
    </Swiper>
    </section>
  </template>
  
  <script lang="ts">
  import { Swiper, SwiperSlide } from "swiper/vue";
  import { Navigation, Autoplay } from "swiper/modules";
  import PartnersModel from "@/api/modules/partners/partners.model";
  import appConf from "@/api/conf/app.conf";
  
  export default {
    name: "PartnersComponent",
    components: {
      Swiper,
      SwiperSlide
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
    padding-left: 5rem;
    padding-right: 5rem;
    margin-top: 3rem;
  }
  .heading {
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 2rem;
}
  .partner-img-wrapper {
    display: flex;
    width: 100px;
    height: 100px;
  }
  .partner-logo {
    width: 100%;
    max-width: 100px;
    height: 100%;
    max-height: 100px;
    object-fit: contain;
    user-select: none;
  }
  </style>