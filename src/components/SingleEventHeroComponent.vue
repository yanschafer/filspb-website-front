<template>
  <div class="event-hero-wrapper">
    <div class="event-hero-img-col">
      <img class="event-hero-img" :src="getImage(event.image)" />
    </div>
    <div class="event-hero-content">
      <div class="event-hero-header">
        <div class="event-hero-date-col">
          <h3 class="time">{{ event.time }}</h3>
          <h4 class="date">{{ formatDate(event.date) }}</h4>
        </div>
        <div class="event-hero-time-col">
          <h2 class="time-long">{{ event.eventTime }}</h2>
        </div>
      </div>
      <div class="event-hero-heading">
        <h1 class="heading">{{ event.name }}</h1>
      </div>
      <div class="event-hero-chips">
        <div class="chip" v-for="(chip, index) in event.tags" :key="index">
          {{ chip.name }}
        </div>
      </div>
      <div class="event-hero-place">
        <span class="place">{{ event.platformName }}</span>
      </div>
      <div class="event-hero-adress">
        <span class="adress">{{ event.platformAddress }}</span>
      </div>
      <div v-if="!event.soldOut" @click="buy(event)" class="button">
        купить билет
      </div>
      <div v-else class="button">
        билетов нет
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import appConf from '@/api/conf/app.conf';
import type EventDto from '@/api/modules/event/event.dto';

export default {
  name: "SingleEventHero",
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(timestamp: number) {
      const date = new Date(timestamp);
      return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
    },
    getImage(url: string) {
      if (!url) return null
      if (url[0] == "/") return `${appConf.proto}://${appConf.endpoint}/files${url}`
      else return url
    },
    buy(event: EventDto) {
      // event.purchaseLink
    }
  }
};
</script>

<style scoped>
.event-hero-wrapper {
    background-color: #f3ca00;
    display: flex;
    height: 40rem;
    border-radius: 3rem;
    overflow: hidden;
}
.button:hover {
  background: transparent;
  color: black;
  border: 1px solid black;
}
.button {
  border: 1px solid black;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.event-hero-img-col {
    width: 590px;
    min-width: 590px;
}
.event-hero-img {
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
}
.event-hero-content {
    display: flex;
    flex-direction: column;
    padding: 5rem 7rem;
    width: 100%;
    justify-content: center;
    gap: 1rem;
}
.event-hero-header {
    display: flex;
    align-items: start;
    justify-content: space-between;
}
.time {
    font-size: 1.6rem;
    font-weight: 600;
}
.date {
    font-size: 1.5rem;
    font-weight: 600;
}
.time-long {
    font-size: 1.5rem;
    font-weight: 600;
}
.heading {
    font-size: 3rem;
    line-height: 3rem;
    font-weight: 700;
}
.event-hero-chips {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
}
.chip {
    height: 2rem;
    border: 1px solid #000;
    font-size: 1.2rem;
    line-height: 2rem;
    padding: 0 1.1rem;
    border-radius: 1.8rem;
    font-family: 'Times', 'Georgia';
    font-weight: 400;
    display: inline-block;
    vertical-align: middle;
}
.event-hero-place {
    font-size: 1.3rem;
}
.event-hero-adress {
    font-size: 1.3rem;
}
.button {
    font-size: 1.3rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.3rem;
    padding-bottom: 0.5rem;
    background-color: black;
    color: white;
    font-weight: 200;
    max-width: fit-content;
    border-radius: 40rem;
}
</style>