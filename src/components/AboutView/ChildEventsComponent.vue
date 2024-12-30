<template>
    <section class="section child-events">
      <Swiper
        :modules="modules"
        navigation
        :pagination="{ clickable: true }"
        spaceBetween="20"
        slidesPerView="2"
        class="child-swiper"
      >
        <SwiperSlide v-for="child in children" :key="child.id">
          <div class="children-wrapper">
            <div class="single-children-wrapper">
              <img class="child-img" :src="getImage(child.image)" />
              <h1 class="child-name">{{ child.name }}</h1>
              <p class="child-text" v-html="child.description"></p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from "vue";
  import { Swiper, SwiperSlide } from "swiper/vue";
  import { Navigation, Pagination } from "swiper/modules";
  
  export default defineComponent({
    name: "ChildEventsComponent",
    data () {
        modules: [Navigation, Pagination]
    },
    components: {
      Swiper,
      SwiperSlide,
    },
    props: {
      children: {
        type: Array as PropType<Array<{ id: number; name: string; description: string; image: string }>>,
        required: true,
      },
      getImage: {
        type: Function as PropType<(url: string) => string>,
        required: true,
      },
    },
  });
  </script>
  
  <style scoped>
.child-events {
  display: flex;
  gap: 1rem;
  padding-left: 5rem;
  padding-right: 5rem;
  margin-bottom: 2rem;
}
.child-name {
  font-size: 2rem;
  line-height: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
}
.child-text {
  font-size: 1.3rem;
}
.child-img {
  display: flex;
  width: 100%;
  max-width: 30rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
}
.single-children-wrapper {
  background-color: #f3f3f3;
  padding: 2rem;
  height: 35rem;
  border-radius: 2rem;
  width: 34rem;
}
.children-wrapper {
  display: flex;
  width: 100%;
  flex-direction: row;
}
  </style>
  