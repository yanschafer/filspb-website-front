<template>
  <div @click="goTo(cardData.id)" class="card-wrapper" :class="{ 'outdated': isOutdated }">
    <div class="overlay">
      <h3 class="heading">{{ cardData.name }}</h3>
      <span class="subheading">{{ cardData.platformName + "\n" + cardData.platformAddress }}</span>
      <div class="authors">
        <div v-for="(author, index) in cardData.authors" :key="index">
          <div class="author-position">{{ author.position }}</div>
          <div class="author-name">{{ author.name }}</div>
        </div>
      </div>
      <div class="chips">
        <div class="chip" v-for="(tag, index) in cardData.tags" :key="index">
          {{ tag.name }}
        </div>
      </div>
      <div class="btn-row">
        <div id="wb-button-root" class="wb-button-root" :data-performance_id="getPerformanceId(cardData.purchaseLink)">Купить билет</div>
      </div>
      <div class="min-price">от {{ cardData.price }}р</div>
    </div>
    <div class="header-row">
      <div class="header-col">
        <div class="date">{{ formatDate(cardData.date) }}</div>
        <div class="time">{{ cardData.time }}</div>
      </div>
      <div class="header-col">
        <div class="clock-row">
          <i class="fa-regular fa-clock"></i>
          <div class="clock-text">{{ cardData.eventTime }}</div>
        </div>
      </div>
    </div>
    <div class="img-wrapper">
      <img class="card-img" :src="getImage(cardData.image)" />
    </div>
    <h3 class="heading">{{ cardData.name }}</h3>
    <p class="description" v-html="cardData.shortDescription"></p>
  </div>
</template>

<script lang="ts">
import appConf from '@/api/conf/app.conf';

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
  methods: {
    formatDate(timestamp: number) {
      const date = new Date(timestamp);
      return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
    },
    goTo(eventId: number) {
      this.$router.push({path: `/event/${eventId}`})
    },
    getImage(url: string) {
      if (url[0] == "/") return `${appConf.proto}://${appConf.endpoint}/files${url}`
      else return url
    },
    getPerformanceId(purchaseLink: string): string {
      return purchaseLink ? purchaseLink.replace('pl', '') : '';
    }
  }
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
.min-price {
  text-align: center;
}
#wb-button-root {
  font-size: 1.3rem!important;
  padding: 0.3rem 1rem 0.5rem!important;
  background-color: black!important;
  color: white!important;
  font-weight: 200!important;
  max-width: fit-content!important;
  border-radius: 40rem!important;
  border: 1px solid black!important;
  cursor: pointer!important;
  transition: all 0.3s ease-in-out!important;
  text-align:center;
}

#wb-button-root:hover {
  background: transparent;
  color: black;
}
.btn-row {
  display: flex;
  justify-content: center;
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
  height: 12rem;
  max-height: 12rem;
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
