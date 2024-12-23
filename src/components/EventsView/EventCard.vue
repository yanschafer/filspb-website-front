<template>
  <div class="card-wrapper" :class="{ 'outdated': isOutdated }">
    <div class="overlay">
      <h3 class="heading">{{ cardData.title }}</h3>
      <span class="subheading">{{ cardData.location }}</span>
      <div class="authors">
        <div v-for="(author, index) in cardData.authors" :key="index">
          <div class="author-position">{{ author.position }}</div>
          <div class="author-name">{{ author.name }}</div>
        </div>
      </div>
      <div class="chips">
        <div class="chip" v-for="(tag, index) in cardData.tags" :key="index">
          {{ tag }}
        </div>
      </div>
      <button class="overlay-button">купить билет</button>
      <div class="min-price">от {{ cardData.price }}</div>
    </div>
    <div class="header-row">
      <div class="header-col">
        <div class="date">{{ cardData.date }}</div>
        <div class="time">{{ cardData.time }}</div>
      </div>
      <div class="header-col">
        <div class="clock-row">
          <i class="fa-regular fa-clock"></i>
          <div class="clock-text">{{ cardData.duration }}</div>
        </div>
      </div>
    </div>
    <div class="img-wrapper">
      <img class="card-img" :src="cardData.imageUrl" />
    </div>
    <h3 class="heading">{{ cardData.title }}</h3>
    <p class="description">{{ cardData.description }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: "EventCard",
  props: {
    cardData: {
      type: Object,
      required: true,
    },
    isOutdated: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.card-wrapper {
  width: 20rem;
  height: 100%;
  min-height: 40rem;
  padding: 1rem 1rem 2rem 1rem;
  background: #f3f3f3;
  border-radius: 2rem;
  position: relative;
  overflow: hidden;
  filter: none;
  transition: filter 0.3s;
}

.card-wrapper.outdated {
  filter: grayscale(100%);
  pointer-events: none;
}

.overlay {
  padding: 1rem 1rem 2rem 1rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fbc800;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;
}

.card-wrapper:hover .overlay {
  opacity: 1;
  visibility: visible;
}

.overlay-button {
  padding: 1rem 2rem;
  background-color: #000;
  color: #fff;
  width: 100%;
  border: none;
  border-radius: 40rem;
  cursor: pointer;
  border: 2px solid black;
  font-size: 1.2rem;
  transition: all 0.3s ease-in-out;
}

.overlay-button:hover {
  background-color: transparent;
  border: 2px solid black;
  color: black;
}

.header-row {
  display: flex;
  justify-content: space-between;
}

.header-col {
  display: flex;
  flex-direction: column;
}

.clock-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.clock-text {
  font-weight: 500;
}

.date {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1em;
}

.time {
  font-size: 2.5rem;
  font-weight: 600;
}

.img-wrapper {
  display: flex;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.card-img {
  width: 100%;
  border-radius: 1rem;
}

.heading {
  font-size: 2rem;
  line-height: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.description {
  font-size: 1.1rem;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.chip {
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 40rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 0.5rem;
  padding-top: 0.3rem;
  font-size: 17px;
  text-align: center;
  width: 100%;
  max-width: fit-content;
}
</style>
