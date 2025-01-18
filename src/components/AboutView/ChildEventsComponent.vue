<template>
  <section class="section child-events">
    <Swiper
      :modules="modules"
      :navigation="true"
      :pagination="{ clickable: true }"
      :space-between="20"
      :slides-per-view="1"
      :breakpoints="{
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        }
      }"
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
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default defineComponent({
  name: "ChildEventsComponent",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Navigation, Pagination]
    };
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
  padding-left: 1rem;
  padding-right: 1rem;
  margin-bottom: 2rem;
  max-width: 100vw;
  overflow: hidden;
}

.child-swiper {
  width: 100%;
  height: 100%;
  padding: 1rem;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #000;
}

:deep(.swiper-pagination-bullet-active) {
  background: #000;
}

.child-name {
  font-size: 2rem;
  line-height: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
}

.child-text {
  font-size: 1.3rem;
  line-height: 1.6;
}

.child-img {
  display: block;
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 1rem;
  margin: 0 auto 1.5rem;
  object-fit: cover;
  aspect-ratio: 16/9;
}

.single-children-wrapper {
  background-color: #f3f3f3;
  padding: 1.5rem;
  min-height: 600px;
  border-radius: 1rem;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  overflow: hidden;
}

.children-wrapper {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  padding: 0.5rem;
}

@media screen and (max-width: 768px) {
  .child-img {
    max-width: 300px;
  }

  .single-children-wrapper {
    max-width: 350px;
    padding: 1rem;
    min-height: auto;
  }

  .child-name {
    font-size: 1.6rem;
    line-height: 1.6rem;
  }

  .child-text {
    font-size: 1.1rem;
  }
}

@media screen and (max-width: 480px) {
  .child-img {
    max-width: 250px;
  }

  .single-children-wrapper {
    max-width: 300px;
  }

  .child-name {
    font-size: 1.4rem;
    line-height: 1.4rem;
  }

  .child-text {
    font-size: 1rem;
  }
}
</style>