<script lang="ts">
export default {
  name: "NewsCard",
  props: {
    cardData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <div class="card-wrapper">
    <div class="img-wrapper">
      <img class="card-img" :src="cardData.imageUrl" />
    </div>
    <div class="header-row">
      <div class="header-col">
        <div class="date">{{ cardData.date }}</div>
      </div>
    </div>
    <h3 class="heading">{{ cardData.title }}</h3>
    <p class="description">{{ cardData.description }}</p>
  </div>
</template>

<style scoped>
.card-wrapper {
  width: 20rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.header-row {
  display: flex;
  justify-content: space-between;
}

.header-col {
  display: flex;
  flex-direction: column;
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
  height: 12rem; 
  overflow: hidden; 
  border-radius: 1rem;
}

.card-img {
  width: 100%;
  border-radius: 1rem;
  object-fit: cover;
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

</style>
