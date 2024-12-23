<script lang="ts">
export default {
  name: "HeroComponent",
  data() {
    return {
      randomImages: [] as string[],
      scrollY: 0,
    };
  },
  methods: {
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
    window.addEventListener("scroll", this.handleScroll); // Слушаем событие прокрутки
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll); // Очищаем слушатель
  },
};
</script>

<template>
  <section class="section">
    <div class="search-box">
        <div class="search-icon-wrapper">
          <img
            class="search-icon"
            src="../../assets/Icons/magnifying-glass-solid.svg"
          />
        </div>
        <input class="search-input" type="text" />
      </div>
    <div class="container">
      <img :style="{ transform: calculateTransform(0.2) }" class="hero-img hero-img-xl" :src="randomImages[0]" />
      <img :style="{ transform: calculateTransform(0.2) }" class="hero-img hero-img-s" :src="randomImages[1]" />
      <img :style="{ transform: calculateTransform(0.2) }" class="hero-img hero-img-l" :src="randomImages[2]" />
      <div class="hero">
        <div class="hero-title">
          <b>Государственная филармония</b> <nobr><b>Санкт-Петербурга</b></nobr
          ><br /><nobr>для детей и молодежи</nobr>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-title {
  font-size: 5.4rem;
  line-height: 5.4rem;
  width: 100%;
  max-width: 70vw;
  margin: 0 auto 5rem;
  text-align: center;
}
.container {
  z-index: 2;
  height: 80vh;
  background-image: url("../../assets/Hero/hero_bg-min.png");
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
.search-box {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-bottom: 2px solid black;
  width: max-content;
  height: fit-content;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 8;
}
.search-icon-wrapper {
  width: 100%;
  min-width: 1rem;
}
.search-input {
  border: none;
  background-color: transparent;
  padding: 0;
  outline: none;
  font-size: 1.5rem;
}
</style>
