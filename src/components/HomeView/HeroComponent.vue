<template>
  <section class="section">
    <div class="search-box">
      <div class="search-icon-wrapper">
        <img
          class="search-icon"
          src="../../assets/Icons/magnifying-glass-solid.svg"
        />
      </div>
      <input
        @keyup.enter="onSearch"
        v-model="searchValue"
        class="search-input"
        type="text"
      />
    </div>
    <swiper
      navigation
      :pagination="{ clickable: true }"
      :modules="modules"
      loop
      class="my-swiper"
    >
      <swiper-slide>
        <section>
          <div class="container">
            <img
              :style="{ transform: calculateTransform(0.2) }"
              class="hero-img hero-img-xl"
              :src="randomImages[0]"
            />
            <img
              :style="{ transform: calculateTransform(0.2) }"
              class="hero-img hero-img-s"
              :src="randomImages[1]"
            />
            <img
              :style="{ transform: calculateTransform(0.2) }"
              class="hero-img hero-img-l"
              :src="randomImages[2]"
            />
            <div class="hero">
              <div class="hero-title">
                <b>Государственная филармония</b><br />
                <nobr><b>Санкт-Петербурга</b></nobr
                ><br />
                <nobr>для детей и молодежи</nobr>
              </div>
            </div>
          </div>
        </section>
      </swiper-slide>
      <swiper-slide v-for="(slide, index) in slides" :key="index">
        <div class="slide-content">
          <div class="slide-img-col">
            <div class="slide-img-wrapper">
              <img :src="slide.desktopImage" alt="Slide Image" class="slide-image" />
            </div>
            <div class="slide-img-wrapper">
              <img :src="slide.mobileImage" alt="Slide Image" class="slide-image" />
            </div>
          </div>
          <div class="slide-content-col">
            <h2 class="slide-title">{{ slide.title }}</h2>
            <p class="slide-text" v-html="slide.text"></p>
            <a :href="slide.link" class="slide-button">
              {{ slide.buttonText }}
            </a>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import SliderModel from "@/api/modules/slider/slider.model";

export default {
  name: "HeroComponent",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Navigation, Pagination, Autoplay],
      autoplay: {
      delay: 4000, 
      disableOnInteraction: false, 
    },
    };
  },
  data() {
    return {
      searchValue: "",
      randomImages: [] as string[],
      scrollY: 0,
      slides: [],
    };
  },
  async created() {
    const sliderModel = new SliderModel()
    this.slides = (await sliderModel.getSlides()).getData()
  },
  methods: {
    onSearch() {
      this.$router.push({ path: "/search/" + this.searchValue });
    },
    handleScroll() {
      this.scrollY = window.scrollY;
    },
    calculateTransform(offset: number) {
      return `translate3d(0, ${-this.scrollY * offset}px, 0)`;
    },
    generateRandomImages() {
      const totalImages = 14;
      const imageNumbers = Array.from({ length: totalImages }, (_, i) => i + 1);

      for (let i = imageNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imageNumbers[i], imageNumbers[j]] = [imageNumbers[j], imageNumbers[i]];
      }

      this.randomImages = imageNumbers
        .slice(0, 3)
        .map(
          (num) =>
            new URL(`../../assets/CircleImages/${num}.png`, import.meta.url)
              .href
        );
    },
  },
  mounted() {
    this.generateRandomImages();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.slide-button {
  background-color: #fbc800;
  color: black;
  padding: 1rem;
  font-size: 18px;
  border-radius: 40rem;
  margin-top: 2rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease-in-out;
}
.slide-button:hover {
  background-color: black;
  color: white;
}
.slide-text {
  font-size: 1.1rem;
  margin-top: 1rem;
}
.slide-content {
  display: flex;
  gap: 2rem;
  width: 100%;
  height: 100vh;
  padding-left: 5rem;
  padding-right: 5rem;
}
.slide-title {
  font-size: 4rem;
  line-height: 4rem;
  font-weight: 700;
}
.slide-content-col {
  display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}
.slide-img-wrapper {
  border-radius: 50%;
  overflow: hidden;
  object-fit: contain;
  display: flex;
  height: 30rem;
  width: 30rem;
  overflow: hidden; 
  border-radius: 50%;
}
.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.slide-img-col {
  width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.section {
  background-image: url("../../assets/Hero/hero_bg-min.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 5.4rem;
  line-height: 5.4rem;
  width: 100%;
  max-width: 70vw;
  margin: 0 auto 5rem;
  text-align: center;
}

@media (max-width: 768px) {
  .section {
    height: auto !important;
    background-size: 150%;
    background-position: center 20%;
  }

  .hero-title {
    font-size: 2.5rem !important;
    line-height: 2.8rem !important;
    padding: 0 2.5rem !important;
    text-align: center !important;
  }

  .slide-content {
    flex-direction: column!important;
    padding: 1rem 3rem!important;
    gap: 1rem!important;
    height: auto!important;
    min-height: calc(100vh - 4rem)!important;
    align-items: center!important;
    justify-content: center!important;
    align-content: center!important;
  }

  .slide-img-col {
    width: 100%!important;
  }

  .slide-img-wrapper {
    height: 8rem!important;
    width: 8rem!important;
  }

  .slide-title {
    font-size: 2rem!important;
    line-height: 2.2rem!important;
  }

  .slide-text {
    font-size: 1rem!important;
    margin-top: 0.5rem!important;
  }

  .slide-button {
    font-size: 16px!important;
    padding: 0.75rem!important;
    margin-top: 1rem!important;
    width: 100%!important;
    text-align: center!important
  }
}

@media (max-width: 480px) {
  :deep(.swiper) {
    height: 100% !important;
  }
  .hero-img {
    max-width: 250px !important;
  }
  .hero-img-l {
    display: none!important;
  }
  .hero-img-xl {
    width: 10rem!important;
    height: 8rem!important;
    left: 14rem!important;
  }
  .section {
    height: 500px!important;
    overflow: hidden;
  }
  .hero-title {
    font-size: 1.8rem !important;
        line-height: 1.8rem !important;
        padding: 0!important;
        text-align: center !important;
  }

  .slide-button {
    margin: 1rem auto !important;
    display: block !important;
    text-align: center !important;
    width: fit-content !important;
  }

  .search-box {
    padding: 0.4rem;
  }

  .search-input {
    font-size: 0.9rem !important;
  }

  .slide-img-wrapper {
    width: 250px;
    height: 250px;
  }

  .slide-title {
    font-size: 1.8rem;
    line-height: 2.2rem;
  }
}

.search-box {
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 2rem;
  padding: 0.5rem;
  width: 90%;
  max-width: 400px;
}

.search-icon-wrapper {
  width: 1rem;
  min-width: 1rem;
}

.search-input {
  border: none;
  background-color: transparent;
  padding: 0;
  outline: none;
  font-size: 1.5rem;
  min-width: 200px;
}

.container {
  z-index: 2;
  height: 100vh;
  background-size: contain;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
}

.hero-img-xl {
  position: absolute;
  width: 14rem;
  height: 14rem;
  left: 10rem;
  top: 20%;
}

.hero-img-l {
  position: absolute;
  width: 10rem;
  height: 10rem;
  bottom: -2rem;
  left: 50.3rem;
}

.hero-img-s {
  position: absolute;
  width: 13rem;
  height: 13.5rem;
  right: 10rem;
  top: 5rem;
}

.hero-img {
  object-fit: contain;
}

.slide-content {
  display: flex;
  gap: 2rem;
  width: 100%;
  height: 100vh;
  padding-left: 5rem;
  padding-right: 5rem;
}

.slide-title {
  font-size: 4rem;
  line-height: 4rem;
  font-weight: 700;
}

.slide-content-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.slide-img-wrapper {
  border-radius: 50%;
  overflow: hidden;
  object-fit: contain;
  display: flex;
  height: 30rem;
  width: 30rem;
  overflow: hidden;
  border-radius: 50%;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-img-col {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.all-events-link {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  text-decoration: none;
  color: black;
  display: none;
}

@media (max-width: 768px) {
  .all-events-link {
    display: block;
  }
}

.arrow {
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
}
</style>